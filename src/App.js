import './App.css';
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

  // Exemple de simulation de chargement
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false); // Met fin à l'écran de chargement après un délai
  //   }, 3000);
  // }, []);

  return (
    <div className='App'>
      <div style={{zIndex: '1', position:'absolute'}}>
        {isLoading? 
          <LoadingScreen isLoading={isLoading} /> : (
          <div>
            <CardCanvas setCardState={setCardState} cardState={cardState} />
            <div style={{marginTop:'.6rem'}}><Cadena /></div>
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
