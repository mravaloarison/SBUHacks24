import React from 'react';

import { Form, Button, Stack, Modal, Container, Card } from 'react-bootstrap';


import { BsAppIndicator } from 'react-icons/bs';

import { useNavigate } from 'react-router-dom';
export const DashboardPage = () => {

    const navigate = useNavigate();

    const goToCollection = (collectionId = 1) => {
        console.log('collectionId', collectionId);
        navigate("/interview/" + collectionId);
    }


    return (
        <div className="mt-4 text-center">
            <h3>
                <span><BsAppIndicator /></span>
                <span> Find Public Interview Sets</span>
            </h3>
            <hr />
            <p className='mb-4'>Be more confident with your next job Interview using our AI based trainer.</p>

            <Container fluid className='mx-auto mb-3 '>
                <p>Find public interview sets</p>

                <div className="row justify-content-between">

                    <Card className="hoverable col-md-5" onClick={() => {
                        goToCollection(1);

                    }}>
                        <Container fluid className='mx-auto' >
                            <Card.Body >
                                <Card.Title>Core Interviewing Questions</Card.Title>
                                <Card.Text>
                                    Click here to view core interviewing questions.
                                </Card.Text>
                            </Card.Body>

                        </Container>
                    </Card>


                    <Card className="hoverable col-md-5" onClick={() => {
                        goToCollection(2);

                    }}>
                        <Container fluid className='mx-auto' >
                            <Card.Body >
                                <Card.Title>Top Behavioural Questions</Card.Title>
                                <Card.Text>
                                    This is a collection of behavioural interview questions.
                                </Card.Text>
                            </Card.Body>

                        </Container>
                    </Card>
                </div>
            </Container>

        </div >
    )
}