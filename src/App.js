import './App.css';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Canvas, cardID } from './Canvas';
import { CardCanvas } from './HUD';
import { Cadena } from './Cadena';

function App() {
  return (
    <div className='App'>
      <div style={{index: '1', position:'absolute', marginLeft:'.6rem', marginTop:'.6rem'}}>
        <CardCanvas props={cardID} />
        <div style={{marginTop:'.6rem'}}><Cadena /></div>
      </div>
      <div>
        <Canvas />
      </div>
    </div>
  );
}

export default App;
