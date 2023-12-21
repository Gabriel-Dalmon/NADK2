import React from 'react';
import './HUD.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { ArrowUp, ArrowRight, ArrowLeft, ArrowDown, FastForwardFill, ChevronDoubleUp, HandIndex } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';


export function CardCanvas({ setCardState, cardState }){
  //const [cardState, setCardState] = useState(0);

  const handleCardChange = (newState) => {
    setCardState(newState);
    console.log("Card state changed");
  };

  return (
    <>
      <div className='margin'>
        <Button variant="primary" onClick={() => handleCardChange(0)}>MainCard</Button>
        <Button variant="primary" onClick={() => handleCardChange(1)}>BlueprintCard</Button>
        <Button variant="primary" onClick={() => handleCardChange(2)}>RotationInteractionCard</Button>
      </div>

      {cardState === 0 && <MainCard />}
      {cardState === 1 && <BlueprintCard />}
      {cardState === 2 && <RotationInteractionCard />}
    </>
  );
}

function MainCard() {
    return (
      <Card className="margin text-center">
        <Card.Header>Contrôles</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Card.Title>Déplacements</Card.Title>
              <Card.Text>
                Z <br />
                <ArrowUp color="royalblue" size={24} /> <br />
                <ArrowLeft color="royalblue" size={24} />
                <ArrowDown color="royalblue" size={24} />
                <ArrowRight color="royalblue" size={24} /> <br />
                Q&nbsp;&nbsp;&nbsp;&nbsp;S&nbsp;&nbsp;&nbsp;&nbsp;D <br />
                <FastForwardFill color="royalblue" size={24} /> E <br />
                <ChevronDoubleUp color="royalblue" size={24} /> SPACE
              </Card.Text>
            </ListGroup.Item>
            <ListGroup.Item>
              <Card.Title>Interactions</Card.Title>
              <Card.Text>
                <HandIndex color="royalblue" size={24} /> <br />
                Clic gauche
              </Card.Text>
            </ListGroup.Item>
          </ListGroup>
      </Card>
    );
};


function BlueprintCard() {
  return (
    <Card className="margin text-center">
      <Card.Header>Contrôles</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Card.Title>Quitter Interaction</Card.Title>
            <Card.Text>
              <HandIndex color="royalblue" size={24} /> <br />
              Clic droit
            </Card.Text>
          </ListGroup.Item>
          <ListGroup.Item>
            <Card.Title>Prendre</Card.Title>
            <Card.Text>
              <HandIndex color="royalblue" size={24} /> <br />
              Espace
            </Card.Text>
          </ListGroup.Item>
        </ListGroup>
    </Card>
  );
};


function RotationInteractionCard() {
  return (
    <Card className="margin text-center">
      <Card.Header>Contrôles</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Card.Title>Quitter Interaction</Card.Title>
            <Card.Text>
              <HandIndex color="royalblue" size={24} /> <br />
              Clic droit
            </Card.Text>
          </ListGroup.Item>
          <ListGroup.Item>
            <Card.Title>Tourner Objet</Card.Title>
            <Card.Text>
              <HandIndex color="royalblue" size={24} /> <br />
              bouger la souris
            </Card.Text>
          </ListGroup.Item>
        </ListGroup>
    </Card>
  );
};