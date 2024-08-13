import PageLayout from './PageLayout';

function CannotDownloadPage() {
  return (
    <PageLayout
      header='Bad Browser'
      subheader='Cannot install app via this browser.'
    ></PageLayout>
  );
}

export default CannotDownloadPage;
