import { Form, Button, Stack, Modal, Badge, Container } from 'react-bootstrap';
import { BiLayerPlus } from 'react-icons/bi';
import { useEffect, useState } from 'react';

export const Profile = () => {
    const user = sessionStorage.getItem('user');
    const [show, setShow] = useState(false);
    const [interviews, setInterviews] = useState([]);

    const handleShow = () => setShow(true);
    const handleClose = () => { 
        setShow(false);
        // reload the page
        window.location.reload();
    };

    useEffect(() => {
        fetch('http://127.0.0.1:5000/get_interviews')
            .then(response => response.text())
            .then(data => {
                console.log(data);
                setInterviews(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [interviews]);

    const submitForm = () => {
        const job_title = document.getElementById('job_title').value;
        const job_type = document.getElementById('job_type').value;
        const industry = document.getElementById('industry').value;
        const location = document.getElementById('location').value;
        const job_description = document.getElementById('job_description').value;

        if (job_title === '' || job_description === '') {
            alert('Job title and Job description are required');
            return;
        }

        sessionStorage.setItem('job_details', JSON.stringify({
            job_title: job_title,
            job_type: job_type,
            industry: industry,
            location: location,
            job_description: job_description
        }));

        fetch('http://127.0.0.1:5000/generate_interview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                job_title: job_title,
                job_type: job_type,
                industry: industry,
                location: location,
                job_description: job_description
            })
        })
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem('actualQuestion', data.response);
            // reload the page
            window.location.reload();
            // alert(data.response)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }


    return (
        <div className="mt-3">
            <p>You are logged in as: <strong> {user}</strong></p>


            <hr />
            <h4>Find</h4>
            <Stack direction='vertical' gap={3} fluid>
                <Form.Control type="search" placeholder="search" size='lg' />
                <Button style={{ width: "160px" }} variant='dark' className='text-white' onClick={handleShow}>
                    <span><BiLayerPlus /></span>
                    <span> Create New</span>
                </Button>
            </Stack>
            <hr />
            {/* Saved */}
            <div className="mt-3">
                <h4>Saved Interviews</h4>
                {/* TODO CREATE A COMPONENT */}
                {interviews.length === 0 ? <Badge bg="secondary">No interviews saved</Badge> : 
            
                <>
                {
                    JSON.parse(interviews).map((interview, index) => {
                        return (
                            <>
                                <hr />
                                <Container key={index} fluid>
                                    <Button variant='link'>
                                        <h3>{interview.job_title}</h3>
                                    </Button>
                                    {/* <p className='text-muted'>Intewrview time</p> */}
                                </Container>
                            </>
                        )
                    })
                }
                </>
                
                }
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Creating new Interview</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Stack direction="vertical" gap={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Job Title <span className='text-danger'>*</span></Form.Label>
                                    <Form.Control type="text" id='job_title' placeholder="Job Title" />
                                </Form.Group>
                                
                                <Stack gap={3} direction="horizontal">
                                    <Form.Group className="mb-3" style={{ width: "100%" }}>
                                        <Form.Label>Job type</Form.Label>
                                        <Form.Select id='job_type' aria-label="Default select example">
                                            <option>Job type</option>
                                            <option value="internship">Internship</option>
                                            <option value="entry level">Entry level</option>
                                            <option value="mid level">Mid level</option>
                                            <option value="senior level">Senior level</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" style={{ width: "100%" }}>
                                        <Form.Label>Industry</Form.Label>
                                        <Form.Select id='industry' aria-label="Default select example">
                                            <option>Industry</option>
                                            <option value="tech">Tech</option>
                                            <option value="health">Health</option>
                                            <option value="finance">Finance</option>
                                            <option value="education">Education</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" style={{ width: "100%" }}>
                                        <Form.Label>Location</Form.Label>
                                        <Form.Select id='location' aria-label="Default select example">
                                            <option>Location</option>
                                            <option value="remote">Remote</option>
                                            <option value="on-site">On-site</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Stack>


                                <Form.Group className="mb-3">
                                    <Form.Label>Job description <span className='text-danger'>*</span></Form.Label>
                                    <Form.Control as="textarea" id='job_description' rows={4} placeholder="Job description" />
                                </Form.Group>
                            </Stack>

                        </Form>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={submitForm}>Generate Interview</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}