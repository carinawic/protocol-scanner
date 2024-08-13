import PageLayout from './PageLayout';

function InstallPrompt({ handleInstallClick }) {
  return (
    <PageLayout
      header='Download App'
      subheader='Install protocol scanner on your phone'
    >
      <button
        onClick={handleInstallClick}
        className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300'
      >
        Download
      </button>
    </PageLayout>
  );
}

export default InstallPrompt;
