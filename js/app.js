const { useState } = React;

const App = () => {
    const [currentView, setCurrentView] = useState('home');
    const [selectedLanguage, setSelectedLanguage] = useState('ru');
    const [theme, setTheme] = useState('light');
    const [selectedProfession, setSelectedProfession] = useState(null);

    const t = (key) => window.translations[selectedLanguage][key] || key;

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const renderCurrentView = () => {
        switch(currentView) {
          case 'home': return <window.HomePage 
            t={t} 
            professions={window.professions} 
            fullAlphabet={window.fullAlphabet} 
            setSelectedProfession={setSelectedProfession} 
            setCurrentView={setCurrentView} 
            theme={theme} 
            selectedLanguage={selectedLanguage} 
            setSelectedLanguage={setSelectedLanguage} 
            toggleTheme={toggleTheme} 
          />;
          case 'professions': return <window.ProfessionPage 
            t={t} 
            selectedProfession={selectedProfession} 
            setSelectedProfession={setSelectedProfession} 
            setCurrentView={setCurrentView} 
            theme={theme} 
          />;
          case 'history': return <window.HistoryPage t={t} setCurrentView={setCurrentView} theme={theme} />;
          case 'career': return <window.CareerGuidancePage t={t} setCurrentView={setCurrentView} theme={theme} />;
          case 'parents': return <window.ParentsPage t={t} setCurrentView={setCurrentView} theme={theme} />;
          case 'gallery': return <window.GalleryPage t={t} setCurrentView={setCurrentView} theme={theme} />;
          case 'album': return <window.AlbumPage t={t} setCurrentView={setCurrentView} theme={theme} professions={window.professions} />;
          default: return <window.HomePage 
            t={t} 
            professions={window.professions} 
            fullAlphabet={window.fullAlphabet} 
            setSelectedProfession={setSelectedProfession} 
            setCurrentView={setCurrentView} 
            theme={theme} 
            selectedLanguage={selectedLanguage} 
            setSelectedLanguage={setSelectedLanguage} 
            toggleTheme={toggleTheme} 
          />;
        }
    };

    return (
        <div className={`${theme === 'dark' ? 'dark' : ''}`}>
            {renderCurrentView()}
        </div>
    );
};

// Render the App to the root element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);