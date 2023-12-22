import './App.css';
import './custom.scss';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState } from 'react';
import { Canvas } from './Canvas';
import { CardCanvas } from './HUD';
import { Cadena } from './Cadena';
import LoadingScreen from './LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cardState, setCardState] = useState(0);
  const [showLock, setShowLock] = useState(false);

  return (
    <div className='App' style={{fontFamily: 'Dancing Script', fontSize: '22px'}}>
      <div style={{zIndex: '1', position:'absolute'}}>
        {isLoading? 
          <LoadingScreen isLoading={isLoading} /> : (
          <div>
            <CardCanvas setCardState={setCardState} cardState={cardState} />
            <div style={{marginTop:'.6rem'}}><Cadena show={showLock} setShow={setShowLock} /></div>
          </div>
        )}
      </div>
      <div>
        <Canvas showLock={()=>{setShowLock(true); SDK3DVerse.engineAPI.detachClientFromScripts(window.clientController); }} setIsLoading={setIsLoading} handleCanvasChange={setCardState} />
      </div>
    </div>
  );
}

export default App;
