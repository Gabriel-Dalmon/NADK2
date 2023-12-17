import React from 'react';
import './HUD.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { ArrowUp, ArrowRight, ArrowLeft, ArrowDown, FastForwardFill, ChevronDoubleUp, HandIndex } from 'react-bootstrap-icons';

export function ControlsCard() {
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
              <Card.Title>Intéractions</Card.Title>
              <Card.Text>
                <HandIndex color="royalblue" size={24} /> <br />
                Clic gauche
              </Card.Text>
            </ListGroup.Item>
          </ListGroup>
      </Card>
    );
};

