import './App.css';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState } from 'react';
import { Canvas } from './Canvas';
import { CardCanvas } from './HUD';
import { Cadena } from './Cadena';

function App() {
  const [cardState, setCardState] = useState(0);

  return (
    <div className='App'>
      <div style={{index: '1', position:'absolute', marginLeft:'.6rem', marginTop:'.6rem'}}>
        <CardCanvas setCardState={setCardState} cardState={cardState} />
        <div style={{marginTop:'.6rem'}}><Cadena /></div>
      </div>
      <div>
        <Canvas handleCanvasChange={setCardState} />
      </div>
    </div>
  );
}

export default App;
