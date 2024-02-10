import { Button, Stack, Form, Toast, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Feedback } from './Feedback';


export const Recording = () => {
    const [recording, setRecording] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        if (listening) {
            setRecording(true);
        } else {
            setRecording(false);
        }
    }, [listening]);

    const myFunction = () => {
        if (recording) {
            SpeechRecognition.stopListening();

        } else {
            SpeechRecognition.startListening({ continuous: true });
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const handleFeedBack = () => {
        setShowToast(true);
    };

    const toggleShowToast = () => {
        setShowToast(!showToast);
    }

    return (
        <div className="mt-4">
            <Stack direction="horizontal">
                <Button variant='link'>Previous</Button>
                <Button className='ms-auto' variant='link'>Next</Button>
            </Stack>
            <hr />
            <h3>Tell me more about yorself</h3>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Your response</Form.Label>
                <Form.Control as="textarea" placeholder='' value={transcript} rows={5} />
            </Form.Group>

            <Stack direction="horizontal" gap={2}>
                <Button variant={recording ? "outline-dark" : "outline-primary"} onClick={myFunction}>
                    {recording ? "Stop Recording" : "Start Recording"}
                </Button>
                <Button variant="outline-dark" onClick={handleFeedBack}>Get Feedback</Button>
                <Button variant="outline-danger" className='ms-auto' onClick={resetTranscript}>Reset Speech</Button>
            </Stack>

            <Toast className='mt-3' show={showToast} onClose={toggleShowToast}>
                <Toast.Header>
                    <strong className="me-auto">Feedback</strong>
                    <small>Just now</small>
                </Toast.Header>
                <Toast.Body>
                    <Feedback type="warning" message="You should be more carefull regarding ...." />
                </Toast.Body>
            </Toast>
        </div>
    );
};
