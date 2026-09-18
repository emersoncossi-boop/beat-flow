cat << 'INNEREOF' > temp_onboarding.tsx
          {/* STEP 4: BIO */}
          {currentStep === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
              className="w-full flex flex-col gap-6"
            >
              <div className="text-center mb-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                  Conte sua história. Nós redigimos.
                </h1>
                <p className="text-white/50 text-sm mt-2">Você fornece os tópicos. A IA cria uma bio profissional para contratantes.</p>
              </div>

              <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative">
                
                {!formData.generatedBio ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {['Produtor Musical', 'Toca Vinil', 'Residente em Club', 'Sets Autorais', '10+ anos de carreira', 'Foco em Groove'].map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, bioNotes: prev.bioNotes ? prev.bioNotes + ' • ' + tag : '• ' + tag }))}
                          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <textarea 
                        placeholder="Adicione mais detalhes ou use as tags acima..."
                        value={formData.bioNotes}
                        onChange={e => setFormData({...formData, bioNotes: e.target.value})}
                        className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-[#8A3FFC] transition-colors placeholder:text-white/20 resize-none font-medium leading-relaxed"
                      />
                      
                      <button 
                        onClick={generateAI}
                        disabled={isGeneratingBio || !formData.bioNotes.trim()}
                        className="absolute bottom-4 right-4 h-10 px-4 rounded-xl bg-[#8A3FFC] text-white text-xs font-bold tracking-wide hover:bg-[#722EE6] hover:shadow-[0_0_20px_rgba(138,63,252,0.5)] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGeneratingBio ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Gerando...
                          </>
                        ) : (
                          <>
                            Gerar Bio <Sparkles className="w-4 h-4 text-amber-300" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute -top-3 left-4 px-2 py-0.5 bg-[#8A3FFC] text-white text-[10px] font-bold uppercase rounded-md flex items-center gap-1 shadow-lg z-10">
                      <Sparkles className="w-3 h-3 text-amber-300" /> Gerado por Inteligência Artificial
                    </div>
                    <textarea 
                      value={formData.generatedBio}
                      onChange={e => setFormData({...formData, generatedBio: e.target.value})}
                      className="w-full h-48 bg-[#151226]/50 border border-[#8A3FFC]/50 rounded-2xl p-5 pt-7 text-white focus:outline-none focus:border-[#00D1FF] transition-colors resize-none font-medium leading-relaxed"
                    />
                    <div className="flex justify-end gap-2 mt-3">
                      <button 
                        onClick={() => setFormData({...formData, generatedBio: ''})}
                        className="text-xs text-white/50 hover:text-white transition font-medium"
                      >
                        Descartar e refazer
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <button 
                  onClick={handleBack}
                  className="h-12 px-6 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
                >
                  Voltar
                </button>
                <button 
                  onClick={handleNext}
                  className="h-12 px-8 rounded-xl bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] text-white font-bold tracking-wide hover:shadow-[0_0_25px_rgba(138,63,252,0.4)] transition-all flex items-center gap-2"
                >
                  Continuar <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
INNEREOF

# Backup the original first
cp app/onboarding/page.tsx app/onboarding/page.tsx.bak

# Delete lines from STEP 4 to just before STEP 5
awk '/\{\/\* STEP 4: BIO \*\/\}/{f=1; print; system("cat temp_onboarding.tsx"); next} /\{\/\* STEP 5: SUCCESS \(AHA! MOMENT\) \*\/\}/{f=0} !f' app/onboarding/page.tsx.bak > app/onboarding/page.tsx

rm temp_onboarding.tsx
