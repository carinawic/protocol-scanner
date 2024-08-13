const PageLayout = ({ header, subheader, children }) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900'>
      <div className='bg-gray-800 text-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center'>
        <h2 className='text-xl font-semibold mb-4'>{header}</h2>
        <p className='mb-6'>{subheader}</p>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
