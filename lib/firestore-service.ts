import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  onSnapshot,
  serverTimestamp,
  type Unsubscribe 
} from 'firebase/firestore';
import { db } from './firebase';

export interface BookingData {
  id?: string;
  djSlug: string;
  djName: string;
  visitorName?: string;
  visitorContact?: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  budgetRange?: string;
  notes?: string;
  status: 'novo' | 'em_negociacao' | 'proposta_enviada' | 'confirmado' | 'recusado';
  createdAt?: any;
}

export interface MessageData {
  id?: string;
  bookingId: string;
  sender: 'dj' | 'visitor' | 'bot';
  text: string;
  time: string;
  isCustomProposal?: boolean;
  proposalData?: {
    value: string;
    description: string;
  };
  createdAt?: any;
}

// 1. Save or update a booking in Firestore
export async function saveBookingToFirestore(booking: BookingData): Promise<string> {
  try {
    const bookingId = booking.id || `book_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const docRef = doc(db, 'bookings', bookingId);
    
    await setDoc(docRef, {
      ...booking,
      id: bookingId,
      createdAt: serverTimestamp(),
    }, { merge: true });

    return bookingId;
  } catch (error) {
    console.warn('[Firestore] Error saving booking, falling back gracefully:', error);
    return booking.id || `book_${Date.now()}`;
  }
}

// 2. Fetch booking by ID
export async function getBookingFromFirestore(bookingId: string): Promise<BookingData | null> {
  try {
    const docRef = doc(db, 'bookings', bookingId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as BookingData;
    }
    return null;
  } catch (error) {
    console.warn('[Firestore] Error fetching booking:', error);
    return null;
  }
}

// 3. Send message in Private Room
export async function sendPrivateMessageToFirestore(
  bookingId: string, 
  message: Omit<MessageData, 'id' | 'bookingId'>
): Promise<string> {
  try {
    const messagesCol = collection(db, 'bookings', bookingId, 'messages');
    const docRef = await addDoc(messagesCol, {
      ...message,
      bookingId,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.warn('[Firestore] Error sending private message:', error);
    return `msg_${Date.now()}`;
  }
}

// 4. Real-time subscription to private room messages
export function subscribeToPrivateRoomMessages(
  bookingId: string, 
  callback: (messages: MessageData[]) => void
): Unsubscribe {
  try {
    const messagesCol = collection(db, 'bookings', bookingId, 'messages');
    const q = query(messagesCol, orderBy('createdAt', 'asc'));

    return onSnapshot(q, (snapshot) => {
      const msgs: MessageData[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<MessageData, 'id'>),
      }));
      if (msgs.length > 0) {
        callback(msgs);
      }
    }, (err) => {
      console.warn('[Firestore] onSnapshot error:', err);
    });
  } catch (error) {
    console.warn('[Firestore] Subscription setup error:', error);
    return () => {};
  }
}

// 5. Save DJ Profile
export async function saveDJProfileToFirestore(userId: string, profile: any): Promise<void> {
  try {
    const docRef = doc(db, 'users', userId, 'profile', 'main');
    await setDoc(docRef, {
      ...profile,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.warn('[Firestore] Error saving DJ profile:', error);
  }
}
