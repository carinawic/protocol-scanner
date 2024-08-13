import React, { useState } from 'react';

const CameraApp = () => {
  const [photo, setPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoFile(file);
      const photoURL = URL.createObjectURL(file);
      setPhoto(photoURL);
    }
  };

  const handleOkClick = () => {
    if (photoFile) {
      // Handle the photo file here (e.g., send to server, process in app)
      console.log('Photo file:', photoFile);

      // Clean up URL object after usage
      URL.revokeObjectURL(photo);

      // You can reset the photo state if needed
      setPhoto(null);
      setPhotoFile(null);
    }
  };

  return (
    <div className='camera-app'>
      {!photo ? (
        <div>
          <input
            type='file'
            accept='image/*'
            capture='environment'
            onChange={handleCapture}
            className='hidden'
            id='cameraInput'
          />
          <label
            htmlFor='cameraInput'
            className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 cursor-pointer'
          >
            Take a Photo
          </label>
        </div>
      ) : (
        <div>
          <img src={photo} alt='Captured' className='captured-photo' />
          <button
            onClick={handleOkClick}
            className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 mt-4'
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraApp;
