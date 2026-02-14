// Global Components (attached to window to be accessible)

window.HomePage = ({ t, professions, fullAlphabet, setSelectedProfession, setCurrentView, theme, toggleTheme, lastViewedProfessionId, setLastViewedProfessionId }) => {
    React.useEffect(() => {
        if (lastViewedProfessionId) {
            const element = document.getElementById(`profession-${lastViewedProfessionId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'auto', block: 'center' });
            }
        }
    }, [lastViewedProfessionId]);

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
          <div className="flex space-x-4">
            <button 
              onClick={toggleTheme}
              className="bg-white rounded-lg px-3 py-2 text-gray-800"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </header>

        {/* Welcome Section with Map */}
        <section className="text-center mb-8">
          <div className="bg-white rounded-3xl p-4 md:p-8 shadow-2xl max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('welcome')}</h2>
            <p className="text-xl text-gray-600 mb-8">{t('description')}</p>
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
        <section className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
              {t('professions')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {professions.map((profession) => (
                <div 
                  key={profession.id}
                  id={`profession-${profession.id}`}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 flex flex-col"
                  onClick={() => { 
                    setLastViewedProfessionId(profession.id);
                    setSelectedProfession(profession); 
                    setCurrentView('professions'); 
                  }}
                >
                  <img 
                    src={profession.image} 
                    alt={profession.profession}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-2 md:p-3 flex-grow flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-1">
                        <span className="text-lg md:text-xl font-bold text-purple-600">{profession.letter}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-800 dark:text-white block truncate">{profession.profession}</span>
                        <p className="text-gray-600 dark:text-gray-400 italic mb-2 text-xs line-clamp-2">"{profession.poem}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </section>

        {/* Navigation Buttons */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mt-8">
          <button 
            onClick={() => setCurrentView('history')}
            className="bg-white text-gray-800 py-3 md:py-4 px-6 rounded-xl md:rounded-2xl font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
          >
            {t('history')}
          </button>
          <button 
            onClick={() => setCurrentView('career')}
            className="bg-white text-gray-800 py-3 md:py-4 px-6 rounded-xl md:rounded-2xl font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
          >
            {t('careerGuidance')}
          </button>
          <button 
            onClick={() => setCurrentView('parents')}
            className="bg-white text-gray-800 py-3 md:py-4 px-6 rounded-xl md:rounded-2xl font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
          >
            {t('forParents')}
          </button>
          <button 
            onClick={() => setCurrentView('gallery')}
            className="bg-white text-gray-800 py-3 md:py-4 px-6 rounded-xl md:rounded-2xl font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
          >
            {t('gallery')}
          </button>
          <button 
            onClick={() => setCurrentView('album')}
            className="bg-white text-gray-800 py-3 md:py-4 px-6 rounded-xl md:rounded-2xl font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
          >
            {t('myAlbum')}
          </button>
        </nav>
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
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={() => { setSelectedProfession(null); setCurrentView('home'); }}
          className="mb-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          ← {t('back')}
        </button>

        {selectedProfession && (
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-4">
              
              {/* Header Image and Title */}
              <div className="flex flex-col items-center text-center">
                 <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
                    {selectedProfession.profession}
                  </h2>
                <div className="relative inline-block w-full max-w-md">
                  <img 
                    src={selectedProfession.image} 
                    alt={selectedProfession.profession}
                    className="w-full aspect-square object-cover rounded-3xl shadow-2xl"
                  />
                  <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-yellow-400 text-black w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl font-bold shadow-lg">
                    {selectedProfession.letter}
                  </div>
                </div>
              </div>

               {/* Profession Story Block */}
               <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">{t('story')}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                      {selectedProfession.description}
                    </p>
               </div>

                {/* Poem Section */}
                <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg text-center">
                  <h3 className="text-xl font-bold mb-3">Стихотворная строка:</h3>
                  <p className="text-2xl italic mb-4">"{selectedProfession.poem}"</p>
                  <button className="bg-white text-purple-600 py-2 px-6 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-md">
                    🔊 {t('readPoem')}
                  </button>
                </div>

              {/* Interactive Game Placeholder */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">Интерактивная игра</h3>
                    <div className="bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center mb-4">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">{selectedProfession.game}</span>
                    </div>
                    <button className="w-full bg-green-500 text-white py-3 px-6 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-md">
                      🎮 {t('playGame')}
                    </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                    <button className="bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                      🖨️ {t('print')}
                    </button>
                    <button className="bg-purple-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">
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