import React from 'react';
import './LoadingScreen.css';
import ReactLoading from 'react-loading';

function LoadingScreen({ isLoading }) {
  return (
    <>
    {isLoading ? (
        <div className='loading-screen'>
          <span className='loading-font'>
            <ReactLoading type={'bubbles'} color='black' height={33} width={33} />
            <p style={{margin: '0'}}>Loading...</p>
          </span>
        </div>
    ) : (null)}
    </>
  );
}

export default LoadingScreen;
