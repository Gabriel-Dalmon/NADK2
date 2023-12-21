import React from 'react';
import './LoadingScreen.css';
import ReactLoading from 'react-loading';

function LoadingScreen({ isLoading }) {
  return (
    <>
    {isLoading ? (
        <div className="loading-screen">
            <ReactLoading type={'bubbles'} color='black' height={32} width={32} />
            <p>Loading...</p>
        </div>
    ) : (null)}
    </>
  );
}

export default LoadingScreen;
