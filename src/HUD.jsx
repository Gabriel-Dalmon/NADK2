import React from 'react';
import './HUD.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { ArrowUp, ArrowRight, ArrowLeft, ArrowDown, FastForwardFill, ChevronDoubleUp, HandIndex } from 'react-bootstrap-icons';


export function CardCanvas({props}){
  if(props === 0){
    return(<MainCard />)
  }else if(props === 1){
    return(<BlueprintCard />)
  }else if(props === 2){
    return(<RotationInteractionCard />)
  }
}

function MainCard() {
    return (
      <Card className="text-center">
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
    <Card className="text-center">
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
    <Card className="text-center">
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