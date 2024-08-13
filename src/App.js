import './App.css';
import React, { useEffect, useState } from 'react';
import InstallPrompt from './components/InstallPrompt';
import CannotDownloadPage from './components/CannotDownloadPage';
import DesktopView from './components/DesktopView';
import { BrowserView, MobileView } from 'react-device-detect';
import MobileApp from './components/MobileApp';

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
      case 'installable': // app is installable via mobile browser
        return <InstallPrompt handleInstallClick={handleInstallClick} />;
      case 'standalone': // we are inside the downloaded mobile app in standalone mode
        return <MobileApp />;
      case 'unsupported': // criteria not met for pwa download prompt (probably due to unsupported browser or https issues)
        return <CannotDownloadPage />;
      case 'unknown': // should never happen
      default:
        return <p>Loading or unknown app status...</p>;
    }
  };

  return { isDev } ? (
    <MobileApp />
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
