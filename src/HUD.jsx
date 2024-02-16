import React from 'react';
import './HUD.css';
// import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import BasiqueCard from './img/Interface.png';
import InteractionCard from './img/Interface_2.png';
import RotationCard from './img/Interface_3.png';
import Basique from './img/Interface_5.png';
import Interaction from './img/Interface_6.png';
import Rotation from './img/Interface_7.png';


export function CardCanvas({ setCardState, cardState }){
  //const [cardState, setCardState] = useState(0);

  const handleCardChange = (newState) => {
    setCardState(newState);
    console.log("Card state changed");
  };

  return (
    <>
      <div className='margin'>
        <Image className='cust-button' src={Basique} onClick={() => handleCardChange(0)} />
        <Image className='cust-button' src={Interaction} onClick={() => handleCardChange(1)} /><br/>
        <Image className='cust-button2' src={Rotation} onClick={() => handleCardChange(2)} />
      </div>

      {cardState === 0 && <Image className='controls fluid text-center' src={BasiqueCard} />}
      {cardState === 1 && <Image className='controls fluid text-center' src={InteractionCard} />}
      {cardState === 2 && <Image className='controls fluid text-center' src={RotationCard} />}
    </>
  );
}

export function CrossHair() {
  return (
    <>
      <div className="crosshair"></div>
    </>
)}