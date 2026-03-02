const { useState } = React;

const App = () => {
    const [currentView, setCurrentView] = useState('home');
    const [theme, setTheme] = useState('light');
    const [selectedProfession, setSelectedProfession] = useState(null);
    const [lastViewedProfessionId, setLastViewedProfessionId] = useState(null);
    const [initialMenuOpen, setInitialMenuOpen] = useState(false);

    const t = (key) => window.translations['ru'][key] || key;

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleViewChange = (view, openMenu = false) => {
        setInitialMenuOpen(openMenu);
        setCurrentView(view);
    };

    const renderCurrentView = () => {
        switch(currentView) {
          case 'home': return <window.HomePage 
            t={t} 
            professions={window.professions} 
            fullAlphabet={window.fullAlphabet} 
            setSelectedProfession={setSelectedProfession} 
            setCurrentView={handleViewChange} 
            theme={theme} 
            toggleTheme={toggleTheme}
            lastViewedProfessionId={lastViewedProfessionId}
            setLastViewedProfessionId={setLastViewedProfessionId}
            initialMenuOpen={initialMenuOpen}
          />;
          case 'professions': return <window.ProfessionPage 
            t={t} 
            selectedProfession={selectedProfession} 
            setSelectedProfession={setSelectedProfession} 
            setCurrentView={handleViewChange} 
            theme={theme} 
          />;
          case 'history': return <window.HistoryPage t={t} setCurrentView={handleViewChange} theme={theme} />;
          case 'career': return <window.CareerGuidancePage t={t} setCurrentView={handleViewChange} theme={theme} />;
          case 'parents': return <window.ParentsPage t={t} setCurrentView={handleViewChange} theme={theme} />;
          case 'gallery': return <window.GalleryPage t={t} setCurrentView={handleViewChange} theme={theme} />;
          case 'album': return <window.AlbumPage t={t} setCurrentView={handleViewChange} theme={theme} professions={window.professions} />;
          case 'print_v1': return <window.PrintPage variant={1} professions={window.professions} setCurrentView={handleViewChange} />;
          case 'print_v2': return <window.PrintPage variant={2} professions={window.professions} setCurrentView={handleViewChange} />;
          case 'print_v3': return <window.PrintPage variant={3} professions={window.professions} setCurrentView={handleViewChange} />;
          default: return <window.HomePage 
            t={t} 
            professions={window.professions} 
            fullAlphabet={window.fullAlphabet} 
            setSelectedProfession={setSelectedProfession} 
            setCurrentView={handleViewChange} 
            theme={theme} 
            toggleTheme={toggleTheme} 
            lastViewedProfessionId={lastViewedProfessionId}
            setLastViewedProfessionId={setLastViewedProfessionId}
            initialMenuOpen={initialMenuOpen}
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