import { Button, Stack, Form, Toast, Alert, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Feedback } from '../components/Feedback';
import { AskFeedback, saveAnswer, postGetAnswers } from '../utils';

export const InterviewPage = () => {
    const [recording, setRecording] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [enableRecording, setEnableRecording] = useState(false);
    const [responseIsPublic, setResponseIsPublic] = useState(false);
    const [questionPrompt, setQuestionPrompt] = useState('Tell me more about yorself');
    const [feedbacks, setFeedbacks] = useState([]);

    const [transcriptText, setTranscriptText] = useState('');
    const [previousResponses, setPreviousResponses] = useState([{
        answer: 'I am a software engineer with 5 years of experience',
        user_fid: '12345',
        prompt_message: 'Tell me more about yorself',
        is_public: true,
        timestamp: '2021-09-01T12:00:00'
    }]);



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

    useEffect(() => {
        getPreviousResponsesFromYourself();
    }, []);

    const getPreviousResponsesFromYourself = async () => {
        const previousResponses = await postGetAnswers(sessionStorage.getItem('user_fid'), questionPrompt);
        console.log(previousResponses, 'previousResponses')
        setPreviousResponses(previousResponses);
    }

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

    const handleFeedBack = async () => {

        let responseText = enableRecording ? transcript : transcriptText;
        const feedbackMessage = await AskFeedback({
            answer: responseText,
            user_fid: sessionStorage.getItem('user'),
            prompt_message: questionPrompt,
            is_public: responseIsPublic
        });



        setFeedbacks([feedbackMessage, ...feedbacks]);
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

    const storeResponse = () => {
        
        let responseText = enableRecording ? transcript : transcriptText;
        let responsePrompt = {
            answer: responseText,
            user_fid: sessionStorage.getItem('user_fid'),
            prompt_message: questionPrompt,
            is_public: responseIsPublic,
            timestamp: new Date().toISOString()
        }

        setPreviousResponses([...previousResponses, responsePrompt]);

        saveAnswer(responsePrompt);
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
                <Form.Control as="textarea" placeholder='' value={enableRecording ? transcript : transcriptText} rows={5}

                    onChange={e => setTranscriptText(e.target.value)} />
            </Form.Group>

            <Stack direction="horizontal" gap={2}>
                <Button variant={recording ? "outline-dark" : "outline-primary"} onClick={recordingScreen}>
                    {recording ? "Stop Recording" : "Start Recording"}
                </Button>
                <Button variant="outline-dark" onClick={handleFeedBack}>Get Feedback</Button>
                <Button variant="outline-dark" onClick={storeResponse}>Save</Button>
                <Button variant="outline-danger" className='ms-auto' onClick={resetTranscript}>Reset Speech</Button>
            </Stack>

            <Toast className='mt-3' show={showToast} onClose={toggleShowToast}>
                <Toast.Header>
                    <strong className="me-auto">Feedback</strong>
                    <small>Just now</small>
                </Toast.Header>
                <Toast.Body>
                    {
                        
                        feedbacks.map((feedback, index) => {
                            return <Alert key={index} variant={feedback.type}>{feedback.message}</Alert>
                        })
                    }
                </Toast.Body>
            </Toast>

            <br />
            {/* Add cards of your previous saved responses */}
            <h5>Previous Responses</h5>
            {previousResponses.map((response, index) => (
                <Card className="mb-3" key={index}>
                    <Card.Header>{
                            response.timestamp
                        }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {response.answer}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};
