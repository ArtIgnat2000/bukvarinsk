// Global Components (attached to window to be accessible)

// Helper component for menu buttons
const MenuButton = ({ onClick, label, icon }) => (
    <button 
        onClick={onClick}
        className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-200"
    >
        <span className="text-xl">{icon}</span>
        <span className="font-medium">{label}</span>
    </button>
);

window.HomePage = ({ t, professions, fullAlphabet, setSelectedProfession, setCurrentView, theme, toggleTheme, lastViewedProfessionId, setLastViewedProfessionId, initialMenuOpen = false }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(initialMenuOpen);

    React.useEffect(() => {
        setIsSidebarOpen(initialMenuOpen);
    }, [initialMenuOpen]);

    React.useEffect(() => {
        if (lastViewedProfessionId) {
            const element = document.getElementById(`profession-${lastViewedProfessionId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'auto', block: 'center' });
            }
        }
    }, [lastViewedProfessionId]);

    const handleMenuClick = (action) => {
        action();
        setIsSidebarOpen(false);
    };

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative">
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-4 md:mb-8">
          <div className="flex space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="bg-white rounded-lg text-gray-800 hover:bg-gray-100 transition-colors shadow-md flex flex-col justify-center gap-1.5 w-10 h-10 items-center flex-shrink-0"
            >
                <span className="block w-5 h-0.5 bg-gray-800 rounded-full"></span>
                <span className="block w-5 h-0.5 bg-gray-800 rounded-full"></span>
                <span className="block w-5 h-0.5 bg-gray-800 rounded-full"></span>
            </button>
          </div>
          <h1 className="text-lg md:text-3xl font-bold text-white text-right leading-tight">{t('title')}</h1>
        </header>

        {/* Side Menu (Drawer) */}
        {isSidebarOpen && (
            <>
                <div 
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
                <div className="fixed left-0 top-0 h-full w-[85vw] max-w-xs md:w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto border-r border-gray-100 dark:border-gray-800">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Меню</h2>
                            <button 
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-2">
                             <button 
                                onClick={toggleTheme}
                                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-200 mb-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                            >
                                <span className="text-xl">{theme === 'light' ? '🌙' : '☀️'}</span>
                                <span className="font-medium">{theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}</span>
                            </button>

                            <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>

                            <MenuButton onClick={() => handleMenuClick(() => setCurrentView('print_v1'))} label="Печать Азбуки" icon="🖨️" />
                            <MenuButton onClick={() => handleMenuClick(() => setCurrentView('history'))} label={t('history')} icon="📜" />
                            <MenuButton onClick={() => handleMenuClick(() => setCurrentView('career'))} label={t('careerGuidance')} icon="🧭" />
                            <MenuButton onClick={() => handleMenuClick(() => setCurrentView('parents'))} label={t('forParents')} icon="👨‍👩‍👧‍👦" />
                            <MenuButton onClick={() => handleMenuClick(() => setCurrentView('gallery'))} label={t('gallery')} icon="🎨" />
                            <MenuButton onClick={() => handleMenuClick(() => setCurrentView('album'))} label={t('myAlbum')} icon="📒" />
                        </div>
                        
                        <div className="mt-8 text-center text-xs text-gray-400">
                            Версия 1.0.0
                        </div>
                    </div>
                </div>
            </>
        )}

        {/* Welcome Section with Map */}
        <section className="text-center mb-3 md:mb-8">
          <div className="bg-white rounded-2xl p-2 md:p-8 shadow-xl max-w-6xl mx-auto">
            <h2 className="text-base md:text-4xl font-bold text-gray-800 mb-1 md:mb-4">{t('welcome')}</h2>
            <div className="w-full flex justify-center">
              <img 
                src="img/common/main.jpg" 
                alt="Карта Букваринска" 
                className="w-full max-w-4xl h-auto rounded-xl shadow-lg object-contain"
                onError={(e) => {e.target.onerror = null; e.target.src="https://placehold.co/800x400/png?text=Карта+Букваринска"}}
              />
            </div>
          </div>
        </section>

        {/* Professions Grid (Moved from ProfessionPage) */}
        <section className="mb-6 md:mb-12">
            <h3 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-8 text-center">
              {t('professions')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
              {professions.map((profession) => (
                <div 
                  key={profession.id}
                  id={`profession-${profession.id}`}
                  className="w-full cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => { 
                    setLastViewedProfessionId(profession.id);
                    setSelectedProfession(profession); 
                    setCurrentView('professions'); 
                  }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full"> 
                      <img 
                        src={profession.image} 
                        alt={profession.profession}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="p-1.5 md:p-3 flex-grow flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-0.5">
                            <span className="text-base md:text-xl font-bold text-purple-600">{profession.letter}</span>
                            </div>
                            <span className="text-xs md:text-sm font-semibold text-gray-800 dark:text-white block truncate">{profession.profession}</span>
                            <p className="text-gray-500 dark:text-gray-400 italic mt-0.5 text-[10px] md:text-xs line-clamp-2 hidden sm:block">"{profession.poem}"</p>
                        </div>
                      </div>
                  </div>
                </div>
              ))}
            </div>
        </section>
      </div>
    </div>
  );
};

window.ProfessionPage = ({ t, selectedProfession, setSelectedProfession, setCurrentView, theme }) => {
    
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
        {selectedProfession && (
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-3 md:gap-4">

              {/* Back Button */}
              <div>
                <button 
                  onClick={() => { setSelectedProfession(null); setCurrentView('home'); }}
                  className="bg-blue-500 text-white py-1.5 px-3 md:py-2 md:px-4 rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-1 text-sm md:text-base"
                >
                  ← {t('back')}
                </button>
              </div>
              
              {/* Header Image and Title */}
              <div className="flex flex-col items-center text-center">
                 <h2 className="text-2xl md:text-5xl font-bold text-gray-800 dark:text-white mb-1 md:mb-2">
                    {selectedProfession.profession}
                  </h2>
                <div className="relative inline-block w-full max-w-xs md:max-w-md">
                  <img 
                    src={selectedProfession.image} 
                    alt={selectedProfession.profession}
                    className="w-full aspect-square object-cover rounded-2xl md:rounded-3xl shadow-xl"
                  />
                  <div className="absolute -top-3 -right-3 md:-top-6 md:-right-6 bg-yellow-400 text-black w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-4xl font-bold shadow-lg">
                    {selectedProfession.letter}
                  </div>
                </div>
              </div>

               {/* Profession Story Block */}
               <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg">
                    <h3 className="text-base md:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('story')}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-lg">
                      {selectedProfession.description}
                    </p>
               </div>

                {/* Poem Section */}
                <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 md:p-6 rounded-2xl shadow-lg text-center">
                  <h3 className="text-base md:text-xl font-bold mb-2">Стихотворная строка:</h3>
                  <p className="text-lg md:text-2xl italic mb-3">"{selectedProfession.poem}"</p>
                  <button className="bg-white text-purple-600 py-1.5 px-5 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-md text-sm md:text-base">
                    🔊 {t('readPoem')}
                  </button>
                </div>

              {/* Interactive Game Placeholder */}
              <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg">
                    <h3 className="text-base md:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Интерактивная игра</h3>
                    <div className="bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-5 md:p-8 text-center mb-3">
                      <span className="text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base">{selectedProfession.game}</span>
                    </div>
                    <button className="w-full bg-green-500 text-white py-2.5 px-6 rounded-xl font-bold text-base md:text-lg hover:bg-green-600 transition-colors shadow-md">
                      🎮 {t('playGame')}
                    </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                    <button className="bg-blue-500 text-white py-2.5 px-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
                      🖨️ {t('print')}
                    </button>
                    <button className="bg-purple-500 text-white py-2.5 px-4 rounded-xl font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
                      💾 Сохранить
                    </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

window.HistoryPage = ({ t, setCurrentView, theme }) => (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => setCurrentView('home')}
          className="mb-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          ← {t('back')}
        </button>
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            {t('aboutCity')}
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">История создания</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Букваринск был основан в далеком 1960 году как первый город, посвященный 
                  обучению детей профессиям через игровую форму. Идея принадлежала группе 
                  педагогов и художников, которые верили, что каждый ребенок может найти 
                  свое призвание уже в раннем возрасте.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Город стал уникальным местом, где каждая буква алфавита открывает дверь 
                  в мир различных профессий, помогая детям расширять кругозор и развивать 
                  интерес к различным видам деятельности.
                </p>
              </div>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                <span className="text-gray-500">Карта Букваринска</span>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Архитектурный район', 'Научный квартал', 'Творческий центр', 'Образовательная зона'].map((area, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">#{index + 1}</div>
                  <div className="text-sm">{area}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

window.PrintPage = ({ professions, setCurrentView, variant = 1 }) => {
    const handlePrint = () => {
        window.print();
    };

    // Common styles for printable area (A3 Landscape)
    const pageStyle = {
        width: '420mm', // A3 width landscape
        height: '296mm', // A3 height landscape (slightly less than 297 to avoid overflow)
        margin: '0 auto',
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden',
        pageBreakAfter: 'always',
    };

    // Variant 1: Strict Grid (Classic Educational Poster)
    // 33 letters -> Grid 6x6 (36 slots), perfect for filling A3
    // Changed grid to 7 cols to fit better in height, or adjust minimal size
    const renderVariant1 = () => (
        <div style={pageStyle} className="p-6 flex flex-col">
            <h1 className="text-4xl font-bold text-center text-blue-800 mb-4 uppercase tracking-wider border-b-4 border-blue-200 pb-2">
                Азбука Профессий: Путешествие в Букваринск
            </h1>
            {/* Changed to grid-cols-7 to reduce row count to 5 rows (33/7 = 4.7) for better fit */ }
            <div className="flex-grow grid grid-cols-7 gap-x-2 gap-y-3 content-start justify-items-center">
                {professions.map((p) => (
                    <div key={p.id} className="w-full border-2 border-blue-100 rounded-lg p-1.5 flex flex-col items-center bg-white shadow-sm overflow-hidden h-[50mm]">
                        <div className="w-full flex-grow mb-1 overflow-hidden rounded bg-gray-50 relative flex items-center justify-center">
                            <img src={p.image} className="w-full h-full object-contain" alt={p.profession} />
                        </div>
                        <div className="flex items-end justify-between w-full px-1 h-[6mm] relative">
                            <span className="text-2xl font-extrabold text-red-500 leading-none absolute left-0 bottom-0">{p.letter}</span>
                            <span className="text-[9px] font-bold text-gray-800 uppercase tracking-tight text-right leading-none w-full pl-6 flex items-end justify-end h-full pb-0.5">{p.profession}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-2 text-center text-gray-400 text-xs">
                 www.bukvarinsk.ru | Создано для обучения и вдохновения
            </div>
        </div>
    );

    // Variant 2: Modern Masonry / Dynamic (Varied sizes)
    // Emphasize the "City" feel with a more newspaper/magazine layout
    const renderVariant2 = () => (
        <div style={pageStyle} className="bg-slate-50 relative overflow-hidden flex flex-col p-8">
            {/* Background elements */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply opacity-50 z-0"></div>
            <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply opacity-50 z-0"></div>

            <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6 border-b-2 border-slate-800 pb-4">
                     <div className="flex items-center gap-6">
                        <img 
                            src="img/common/main.jpg" 
                            className="w-48 h-24 object-cover rounded-lg shadow-md grayscale hover:grayscale-0 transition-all duration-500"
                            alt="Map"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-6xl font-black text-slate-800 tracking-tighter leading-none">БУКВАРИНСК</h1>
                            <span className="text-xl text-slate-500 font-bold tracking-[0.4em] uppercase mt-1 pl-1">Город Мастеров</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-6xl font-serif italic text-slate-300 transform -rotate-6">А-Я</div>
                     </div>
                </div>
                
                <div className="flex-grow grid grid-cols-7 grid-rows-5 gap-2">
                     {professions.map((p, i) => (
                        <div key={p.id} className="relative group bg-white p-1.5 rounded border border-slate-100 hover:border-slate-300 transition-colors flex flex-col">
                            <div className="w-full flex-grow relative overflow-hidden rounded mb-1 bg-gray-100">
                                <img src={p.image} className="w-full h-full object-cover" alt={p.profession} />
                                <div className="absolute bottom-0 right-0 bg-slate-800/90 text-white text-xs font-bold px-1.5 py-0.5 rounded-tl">{p.letter}</div>
                            </div>
                            <div className="text-center">
                                 <span className="text-[10px] uppercase font-bold text-slate-700 block truncate">{p.profession}</span>
                            </div>
                        </div>
                     ))}
                </div>
                
                <div className="absolute bottom-0 right-0 text-slate-300 text-[10px] font-mono">
                    DESIGN: BUKVARINSK STD.
                </div>
            </div>
        </div>
    );

    const renderVariant3 = () => (
        <div style={pageStyle} className="bg-white p-5 flex flex-col items-center">
            <div className="text-center mb-0 w-full border-b-2 border-slate-100 pb-1">
                <h1 className="text-4xl font-serif text-slate-800 tracking-tight mb-0">Алфавит Профессий</h1>
                <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px] mt-0.5">Букваринск: Город Мастеров</p>
            </div>

            {/* Grid Calculation:
                Total Professions: 28 (It seems there are 28, not 33 as originally thought)
                Target: Fit everything in 5 rows.
                Grid: 6 columns x 5 rows = 30 slots total.
                
                Content:
                - 1 Hero Block (2 slots wide: 2x1)
                - 28 Professions (1 slot each)
                Total: 2 + 28 = 30 slots. PERFECT FIT (5 rows).
            */}
            <div className="flex-grow grid grid-cols-6 gap-3 w-full content-start mt-4">
                 {/* Large Hero Block - spans 2 columns, 1 row */}
                 <div className="col-span-2 row-span-1 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-2 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-inner border border-slate-200 h-[40mm]">
                    <div className="absolute inset-0 opacity-10 bg-[url('img/common/main.jpg')] bg-cover bg-center grayscale mix-blend-multiply"></div>
                    <div className="relative z-10 box-border flex flex-col items-center justify-center h-full">
                        <span className="text-4xl mb-1 block">🎓</span>
                        <h2 className="text-xl font-bold text-slate-700 mb-0 font-serif leading-tight">Мир Знаний</h2>
                        <p className="text-slate-500 text-[9px] leading-tight max-w-[120px] mx-auto mt-1">
                            Изучай профессии и выбирай свое будущее.
                        </p>
                    </div>
                </div>

                 {professions.map((p) => (
                    <div key={p.id} className="bg-white rounded-xl p-1 flex flex-col items-center justify-between border border-slate-100 shadow-sm hover:shadow-md transition-all h-[40mm]">
                        <div className="w-full flex-grow relative mb-1 flex items-center justify-center">
                             {/* Circular image container */}
                             <div className="w-[32mm] h-[32mm] rounded-full overflow-hidden bg-slate-50 border-2 border-slate-100 shadow-sm relative z-0">
                                <img src={p.image} className="w-full h-full object-cover" alt={p.profession} />
                             </div>
                             
                             {/* Large Letter Badge */}
                             <div className="absolute -top-1 left-2 bg-gradient-to-br from-indigo-600 to-blue-500 text-white w-9 h-9 rounded-full flex items-center justify-center text-xl font-extrabold shadow-md border-2 border-white z-10">
                                {p.letter}
                             </div>
                        </div>
                        <div className="w-full text-center h-[3mm] flex items-end justify-center">
                             <span className="text-[8px] font-bold text-slate-700 uppercase tracking-wider block leading-none w-full truncate">{p.profession}</span>
                        </div>
                    </div>
                 ))}
            </div>
            
            <div className="mt-1 w-full flex justify-between text-slate-300 text-[8px] uppercase tracking-widest border-t border-slate-100 pt-0.5">
                 <span>Educational Poster Series</span>
                 <span>Format: A3 Landscape</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col">
            <style>
                {`
                    @media print {
                        @page { 
                            size: A3 landscape; 
                            margin: 0; 
                        }
                        body { 
                            background: white; 
                            -webkit-print-color-adjust: exact; 
                        }
                        .print-controls { display: none !important; }
                        .print-container { 
                            box-shadow: none !important;
                            width: 100% !important;
                            height: 100% !important;
                            page-break-after: always;
                            margin: 0 !important;
                            padding: 0 !important;
                            transform: none !important;
                        }
                    }
                `}
            </style>

            {/* Mobile top bar */}
            <div className="print-controls md:hidden sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md px-3 py-2 flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('home', true)}
                  className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 flex-shrink-0"
                >
                  ← Назад
                </button>
                <div className="flex gap-1 flex-1 overflow-x-auto">
                    <button
                        onClick={() => setCurrentView('print_v1')}
                        className={`px-3 py-1.5 rounded-lg text-sm flex-shrink-0 flex items-center gap-1 ${variant === 1 ? 'bg-blue-100 text-blue-700 font-bold border border-blue-300' : 'bg-gray-100 text-gray-600'}`}
                    >📋 Строгий</button>
                    <button
                        onClick={() => setCurrentView('print_v2')}
                        className={`px-3 py-1.5 rounded-lg text-sm flex-shrink-0 flex items-center gap-1 ${variant === 2 ? 'bg-blue-100 text-blue-700 font-bold border border-blue-300' : 'bg-gray-100 text-gray-600'}`}
                    >📰 Журнал</button>
                    <button
                        onClick={() => setCurrentView('print_v3')}
                        className={`px-3 py-1.5 rounded-lg text-sm flex-shrink-0 flex items-center gap-1 ${variant === 3 ? 'bg-blue-100 text-blue-700 font-bold border border-blue-300' : 'bg-gray-100 text-gray-600'}`}
                    >🎨 Арт</button>
                </div>
                <button
                  onClick={handlePrint}
                  className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                  </svg>
                  Печать
                </button>
            </div>

            {/* Desktop side panel */}
            <div className="print-controls hidden md:flex fixed top-1/2 left-4 transform -translate-y-1/2 z-50 flex-col gap-3 bg-white p-4 rounded-xl shadow-2xl border border-gray-100 max-w-[200px]">
                <div className="text-center mb-2">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Настройки</span>
                </div>
                <button 
                  onClick={() => setCurrentView('home', true)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm w-full"
                >
                  <span>←</span> Назад
                </button>
                <div className="w-full h-px bg-gray-200 my-1"></div>
                <button
                    onClick={() => setCurrentView('print_v1')}
                    className={`px-4 py-3 rounded-lg transition-colors text-left text-sm w-full flex items-center gap-2 ${variant === 1 ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200' : 'hover:bg-gray-50 text-gray-600'}`}
                ><span className="text-lg">📋</span> Строгий</button>
                <button
                    onClick={() => setCurrentView('print_v2')}
                    className={`px-4 py-3 rounded-lg transition-colors text-left text-sm w-full flex items-center gap-2 ${variant === 2 ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200' : 'hover:bg-gray-50 text-gray-600'}`}
                ><span className="text-lg">📰</span> Журнал</button>
                <button
                    onClick={() => setCurrentView('print_v3')}
                    className={`px-4 py-3 rounded-lg transition-colors text-left text-sm w-full flex items-center gap-2 ${variant === 3 ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200' : 'hover:bg-gray-50 text-gray-600'}`}
                ><span className="text-lg">🎨</span> Арт</button>
                <div className="w-full h-px bg-gray-200 my-1"></div>
                <button 
                  onClick={handlePrint}
                  className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-bold shadow-md flex items-center justify-center gap-2 text-sm w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                  </svg>
                  Печать
                </button>
            </div>

            {/* Preview area */}
            <div className="flex-1 overflow-auto flex flex-col items-start md:items-center justify-start md:justify-center py-4 md:py-8 px-0">
                <div className="print-container bg-white shadow-2xl overflow-hidden origin-top-left scale-[0.22] xs:scale-[0.28] sm:scale-[0.38] md:scale-[0.52] lg:scale-[0.65] xl:scale-[0.80] 2xl:scale-100 transition-transform duration-300">
                    {variant === 1 && renderVariant1()}
                    {variant === 2 && renderVariant2()}
                    {variant === 3 && renderVariant3()}
                </div>
            </div>

            <p className="print-controls text-center text-gray-500 text-xs pb-3 px-4">
                Предпросмотр уменьшен. При печати на А3 страница будет чёткой.
            </p>
        </div>
    );
};

window.CareerGuidancePage = ({ t, setCurrentView, theme }) => (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => setCurrentView('home')}
          className="mb-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          ← {t('back')}
        </button>
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            {t('careerTest')}
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                {t('question')} 1: Какое занятие тебе больше всего нравится?
              </h3>
              <div className="space-y-3">
                {['Рисовать и создавать', 'Изучать природу', 'Решать задачи', 'Помогать другим'].map((option, index) => (
                  <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input type="radio" name="q1" className="text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                {t('question')} 2: Что ты хотел бы делать в будущем?
              </h3>
              <div className="space-y-3">
                {['Создавать красивые вещи', 'Открывать новое', 'Помогать людям', 'Строить и изобретать'].map((option, index) => (
                  <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input type="radio" name="q2" className="text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <button className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors">
              {t('finish')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

window.ParentsPage = ({ t, setCurrentView, theme }) => (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => setCurrentView('home')}
          className="mb-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          ← {t('back')}
        </button>
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            {t('parentGuide')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Методические рекомендации</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li>• Создайте комфортную обстановку для обучения</li>
                <li>• Поощряйте самостоятельность ребенка</li>
                <li>• Обсуждайте профессии в повседневной жизни</li>
                <li>• Используйте игры для закрепления знаний</li>
                <li>• Поддерживайте интерес к новым знаниям</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Советы родителям</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li>• Не навязывайте свои предпочтения</li>
                <li>• Позвольте ребенку выбирать самостоятельно</li>
                <li>• Поддерживайте все начинания</li>
                <li>• Хвалите за достижения</li>
                <li>• Развивайте креативное мышление</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

window.GalleryPage = ({ t, setCurrentView, theme }) => (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => setCurrentView('home')}
          className="mb-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          ← {t('back')}
        </button>
        
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            {t('gallery')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gray-200 border-2 border-dashed rounded-t-2xl w-full h-48 flex items-center justify-center">
                  <span className="text-gray-500">Работа ребенка #{item}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white">Работа ученика</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Профессия: Архитектор</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button className="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Загрузить свою работу
            </button>
          </div>
        </div>
      </div>
    </div>
  );

window.AlbumPage = ({ t, setCurrentView, theme, professions }) => (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => setCurrentView('home')}
          className="mb-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          ← {t('back')}
        </button>
        
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            {t('myAlbum')}
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Изученные профессии ({professions.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professions.map((profession) => (
                <div key={profession.id} className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{profession.letter}</span>
                    <span className="text-sm">{profession.profession}</span>
                  </div>
                  <div className="mt-2 text-xs opacity-90">✓ Изучено</div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
                {t('saveProgress')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );