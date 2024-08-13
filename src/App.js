import './App.css';
import React, { useEffect, useState } from 'react';
import InstallPrompt from './components/InstallPrompt';
import CannotDownloadPage from './components/CannotDownloadPage';
import DesktopView from './components/DesktopView';
import { BrowserView, MobileView } from 'react-device-detect';
import MobileAppView from './components/MobileAppView';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [appStatus, setAppStatus] = useState('unsupported');
  const isDev = true;

  useEffect(() => {
    const isStandalone = window.matchMedia(
      '(display-mode: standalone)'
    ).matches;
    if (isStandalone) {
      setAppStatus('standalone');
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setAppStatus('installable');
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

  const renderAppStatus = () => {
    switch (appStatus) {
      case 'installable':
        return <InstallPrompt handleInstallClick={handleInstallClick} />;
      case 'standalone': // app is running in standalone mode
        return <MobileAppView />;
      case 'unsupported':
        return <CannotDownloadPage />;
      case 'unknown':
      default:
        return <p>Loading or unknown app status...</p>;
    }
  };

  return { isDev } ? (
    <MobileAppView />
  ) : (
    <>
      <BrowserView>
        <DesktopView />
      </BrowserView>
      <MobileView>{renderAppStatus()}</MobileView>
    </>
  );
}

export default App;
