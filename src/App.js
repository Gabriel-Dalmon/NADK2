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
  const [show, setShow] = useState(false);

  return (
    <div className='App' style={{fontFamily: 'Dancing Script', fontSize: '22px'}}>
      <div style={{zIndex: '1', position:'absolute'}}>
        {isLoading? 
          <LoadingScreen isLoading={isLoading} /> : (
          <div>
            <CardCanvas setCardState={setCardState} cardState={cardState} />
            <Cadena show={show} setShow={setShow}/>
          </div>
        )}
      </div>
      <div>
        <Canvas setIsLoading={setIsLoading} handleCanvasChange={setCardState} />
      </div>
    </div>
  );
}

export default App;
