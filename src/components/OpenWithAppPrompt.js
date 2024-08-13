import PageLayout from './PageLayout';

function OpenWithAppPrompt({ handleInstallClick }) {
  return (
    <PageLayout
      header='Open App'
      subheader='Open protocol scanner with the app on your phone'
    >
      <button
        onClick={handleInstallClick}
        className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300'
      >
        Open App
      </button>
    </PageLayout>
  );
}

export default OpenWithAppPrompt;
