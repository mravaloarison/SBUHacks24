import { Button, Stack, Form, Toast, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Feedback } from '../components/Feedback';
import { AskFeedback } from '../utils';

export const InterviewPage = () => {
    const [recording, setRecording] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [enableRecording, setEnableRecording] = useState(false);
    const [responseIsPublic, setResponseIsPublic] = useState(false);
    const [questionPrompt, setQuestionPrompt] = useState('Tell me more about yorself');
    const [feedbacks, setFeedbacks] = useState([]);

    const [transcriptText, setTranscriptText] = useState('');



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

    const recordingScreen = () => {
        if (recording) {
            SpeechRecognition.stopListening();

        } else {
            SpeechRecognition.startListening({ continuous: true });
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const handleFeedBack = async  () => {

        let responseText = enableRecording ? transcript : transcriptText;
        const feedbackMessage = await AskFeedback({
            answer: responseText,
            user_fid: sessionStorage.getItem('user'),
            prompt_message: questionPrompt,
            is_public: responseIsPublic
        });

        

        setFeedbacks([...feedbacks, feedbackMessage]);
        setShowToast(true);

    };

    const toggleShowToast = () => {
        setShowToast(!showToast);
    }

    const toggleRecording = () => {
        setEnableRecording(!enableRecording);
    };

    const toggleResponseIsPublic = () => {
        setResponseIsPublic(!responseIsPublic);
    }


    return (
        <div className="mt-4">
            <hr />
            <h3>
                {questionPrompt}
            </h3>


            <Form.Check
                type="switch"
                id="custom-switch"
                label="Enable Recording"
                checked={enableRecording}
                onChange={toggleRecording}
            />

            <Form.Check
                type="switch"
                id="custom-switch"
                label="Publish your response Public"
                checked={responseIsPublic}
                onChange={toggleResponseIsPublic}
            />

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Your response</Form.Label>
                <Form.Control as="textarea" placeholder='' value={enableRecording ? transcript:  transcriptText} rows={5}  
                
  onChange={e => setTranscriptText(e.target.value)} />
            </Form.Group>

            <Stack direction="horizontal" gap={2}>
                <Button variant={recording ? "outline-dark" : "outline-primary"} onClick={recordingScreen}>
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
                    {
                        feedbacks.reverse().map((feedback, index) => {
                            return <Alert key={index} variant={feedback.type}>{feedback.message}</Alert>
                        })
                    }
                </Toast.Body>
            </Toast>
        </div>
    );
};
