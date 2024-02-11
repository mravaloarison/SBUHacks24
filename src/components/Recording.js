import { Button, Stack, Form, Toast, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { RiAiGenerate } from 'react-icons/ri';
import { MdSaveAlt } from 'react-icons/md';

export const Recording = () => {
    const [recording, setRecording] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const actualQuestion = sessionStorage.getItem('actualQuestion');
    const [GeneratedInterviewQuestions, setGeneratedInterviewQuestions] = useState(actualQuestion);
    const [feedback, setFeedback] = useState("");

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
        // send it to the baclkend
        fetch('http://127.0.0.1:5000/generate_feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                question: GeneratedInterviewQuestions,
                answer: transcript
             })
        })
            .then(response => response.json())
            .then(data => {
                setFeedback(data.response);
            });
    };

    const toggleShowToast = () => {
        setShowToast(!showToast);
    }

    const generateQuestion = () => {
        fetch('http://127.0.0.1:5000/generate_interview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: sessionStorage.getItem('job_details')
        })
            .then(response => response.json())
            .then(data => {
                setGeneratedInterviewQuestions(data.response);
                sessionStorage.setItem('actualQuestion', data.response);
            });
    }

    const endInterview = () => {
        sessionStorage.removeItem('actualQuestion');
        sessionStorage.removeItem('job_details');
        window.location.reload();
    }

    const handleSave = () => {
        console.log("works")
        fetch('http://127.0.0.1:5000/save_interview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                job_details: JSON.parse(sessionStorage.getItem('job_details')),
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.response === "success") {
                    alert("Interview saved successfully");
                } else {
                    alert("Error saving interview");
                }
            });
    }
    //
    return (
        <div className="mt-4">
            <Stack direction="horizontal" gap={3}>
                <Button variant='outline-primary' onClick={generateQuestion}>
                    <span><RiAiGenerate /></span>
                    <span> Generate</span>
                </Button>
                <Button variant='outline-primary' onClick={handleSave}>
                    <span><MdSaveAlt /></span>
                    <span> Save</span>
                </Button>
                <Button className='ms-auto' variant='link' onClick={endInterview}>End Interview</Button>
            </Stack>
            <hr />
            <h5>{GeneratedInterviewQuestions}</h5>


            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Your response</Form.Label>
                <Form.Control as="textarea" className='' placeholder='' value={transcript} rows={5} />
            </Form.Group>

            <Stack direction="horizontal" gap={2}>
                <Button variant={recording ? "outline-dark" : "outline-primary"} onClick={myFunction}>
                    {recording ? "Stop Recording" : "Start Recording"}
                </Button>
                <Button variant="outline-danger" onClick={resetTranscript}>Reset Speech</Button>
                <Button variant="outline-dark" className='ms-auto' onClick={handleFeedBack}>Get Feedback</Button>
            </Stack>

            <Toast className='mt-3' show={showToast} onClose={toggleShowToast}>
                <Toast.Header>
                    <strong className="me-auto">Feedback</strong>
                    <small>Just now</small>
                </Toast.Header>
                <Toast.Body>
                    {/* <Feedback type={feedback.type} message={feedback.message} /> */}
                    {feedback} 
                </Toast.Body>
            </Toast>
        </div>
    );
};