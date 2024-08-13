import './App.css';
import React, { useEffect, useState } from 'react';
import InstallPrompt from './components/InstallPrompt';
import CannotDownloadPage from './components/CannotDownloadPage';
// import { BrowserView, MobileView } from 'react-device-detect';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return isInstallable ? (
    <InstallPrompt handleInstallClick={handleInstallClick} />
  ) : (
    <CannotDownloadPage />
  );
}

export default App;
