import { Form, Button, Stack, Modal, Container, Card } from 'react-bootstrap';
import { BiLayerPlus } from 'react-icons/bi';
import { useState } from 'react';

export const ProfilePage = () => {
    const user = sessionStorage.getItem('user');
    const user_fid = sessionStorage.getItem('user_fid');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const submitForm = () => {
        const form = document.getElementById('form_to_submit');
        const formData = new FormData(form);
        const data = {};
        for (let key of formData.keys()) {
            data[key] = formData.get(key);
        }
        console.log(data);
        handleClose();
    }


    const goToCollection = (collectionId = 1) => {
        console.log('collectionId', collectionId);
    }

    return (
        <div className="mt-5">
            <p>You are logged in as: {user}</p>
            <p>Your user id is: {user_fid}</p>

            <Stack direction='vertical' gap={3} fluid>
                <Form.Control type="search" placeholder="search" />
                <Button style={{ width: "160px" }} variant='primary' onClick={handleShow}>
                    <span><BiLayerPlus /></span>
                    <span> Create New</span>
                </Button>
            </Stack>
            <hr />
            {/* Suggestions */}
            <div className="mt-5">
                <h4>My Suggestions</h4>
                <Card className="hoverable" onClick={() => {
                    goToCollection(1);

                }}>
                    <Container fluid className='mx-auto col-md-7' >
                        <Card.Body >
                            <Card.Title>Core Interviewing Questions</Card.Title>
                            <Card.Text>
                                Click here to view core interviewing questions.
                            </Card.Text>
                        </Card.Body>

                    </Container>
                </Card>
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
                    <Form id='form_to_submit'>

                        <Stack direction="vertical" gap={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Job Title <span className='text-danger'>*</span></Form.Label>
                                <Form.Control type="text" placeholder="Job Title" />
                            </Form.Group>

                            <Stack gap={3} direction="horizontal">
                                <Form.Group className="mb-3" style={{ width: "100%" }}>
                                    <Form.Label>Job type</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Job type</option>
                                        <option value="1">Internship</option>
                                        <option value="2">Entry level</option>
                                        <option value="3">Mid level</option>
                                        <option value="4">Senior level</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" style={{ width: "100%" }}>
                                    <Form.Label>Industry</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Industry</option>
                                        <option value="1">Tech</option>
                                        <option value="2">Health</option>
                                        <option value="3">Finance</option>
                                        <option value="4">Education</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" style={{ width: "100%" }}>
                                    <Form.Label>Location</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Location</option>
                                        <option value="1">Remote</option>
                                        <option value="2">On-site</option>
                                    </Form.Select>
                                </Form.Group>
                            </Stack>


                            <Form.Group className="mb-3">
                                <Form.Label>Job description <span className='text-danger'>*</span></Form.Label>
                                <Form.Control as="textarea" rows={4} placeholder="Job description" />
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