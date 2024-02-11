import { Button, Stack, Form, Toast, Alert, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { AskFeedback, saveAnswer, postGetAnswers, getRandomPromp, getCategoricalPrompts, getRandomPrompt, bookmarkPrompt, getUserBookmarks } from '../utils';

import { useParams } from 'react-router-dom';

export const InterviewPage = () => {
    const [recording, setRecording] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [enableRecording, setEnableRecording] = useState(false);
    const [responseIsPublic, setResponseIsPublic] = useState(false);
    const [questionPrompt, setQuestionPrompt] = useState('Tell me more about yorself');
    const [feedbacks, setFeedbacks] = useState([]);
    const [relatedPrompts, setRelatedPrompts] = useState([]);

    const [transcriptText, setTranscriptText] = useState('');
    const [previousResponses, setPreviousResponses] = useState([]);
    const [viewPreviousResponses, setViewPreviousResponses] = useState(false);
    const [userBookmarks, setUserBookmarks] = useState([]);

    let { collectionId } = useParams();


    const handlePreviewResponses = () => {
        setViewPreviousResponses(!viewPreviousResponses);
    }


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
        const fetchData = async () => {
            const randomPrompt = await getRandomPrompt(collectionId);
            setQuestionPrompt(randomPrompt.prompt);
            populateRelatedPrompts();
            getPreviousResponsesFromYourself(randomPrompt.prompt);
        };

        fetchData();
    }, []);
    const user_fid = sessionStorage.getItem('user_fid');

    const getPreviousResponsesFromYourself = async (question_prompt) => {
        const previousResponses = await postGetAnswers(user_fid, question_prompt);

        setPreviousResponses(previousResponses);
    }

    const populateRelatedPrompts = async () => {
        if (collectionId) {
            const relatedPrompts = await getCategoricalPrompts(collectionId);
            setRelatedPrompts(relatedPrompts);
        }
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
            user_fid: user_fid,
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
            user_fid: user_fid,
            prompt_message: questionPrompt,
            is_public: responseIsPublic,
            timestamp: new Date().toISOString()
        }

        setPreviousResponses([...previousResponses, responsePrompt]);

        saveAnswer(responsePrompt);
    }

    const getRandom = async () => {

        let randomResponse = await getRandomPromp(
            collectionId
        );
        await populateInterviewPage(randomResponse);

    }

    const populateInterviewPage = async (responsePrompt) => {

        setQuestionPrompt(responsePrompt.prompt);
        const userBookmarks = await getUserBookmarks(user_fid);
        console.log("USER BOOKMARKS")
        console.log(userBookmarks);
        setUserBookmarks(userBookmarks);

        getPreviousResponsesFromYourself(responsePrompt.prompt);
    }

    const bookmark = async () => {
        if (isPromptBookmarked()) {
            return;
        }
        // bookmark the current prompt
        await bookmarkPrompt(user_fid, questionPrompt);
        setUserBookmarks([...userBookmarks, questionPrompt]);
    }

    const isPromptBookmarked = () => {
        return userBookmarks.includes(questionPrompt);
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

                <Stack direction="horizontal" gap={2}>
                    {
                        enableRecording ?
                            <Button variant={recording ? "outline-dark" : "outline-primary"} onClick={recordingScreen} >
                                {recording ? "Stop Recording" : "Start Recording"}
                            </Button>
                            : (<></>)

                    }

                    {
                        enableRecording ? (<Button variant="outline-danger" onClick={resetTranscript}>Reset Speech</Button>) : (
                            <Button variant="outline-danger" onClick={() => setTranscriptText('')} >Reset</Button>
                        )
                    }

                </Stack>
                <Button variant="outline-dark" onClick={getRandom}>Random</Button>

                {
                    isPromptBookmarked() ? (<Button variant="outline-dark" disabled>Bookmarked</Button>) : (
                        <Button variant="outline-dark" onClick={bookmark}>Bookmark</Button>)
                }
                <Button variant="outline-dark"  className='ms-auto' onClick={handleFeedBack}>Get Feedback</Button>
                {
                    transcriptText && transcriptText.length > 0 ? (<Button variant="outline-dark" onClick={storeResponse}>Save Response</Button>) : (<></>)
                }





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

            <DropdownButton id="dropdown-basic-button" title="Related Prompts">
                {
                    relatedPrompts && relatedPrompts.map((prompt, index) => {
                        return <Dropdown.Item key={index} onClick={() => populateInterviewPage(prompt)}>{prompt.prompt}</Dropdown.Item>
                    })
                }
            </DropdownButton>

            <br />


            <Form.Check
                type="switch"
                id="custom-switch"
                label="View Previous Responses"
                checked={viewPreviousResponses}
                onChange={handlePreviewResponses}
            />
            {/* Add cards of your previous saved responses */}



            {
                viewPreviousResponses && previousResponses.length > 0 ? <h4>Your previous responses</h4> : ''
            }
            {
                viewPreviousResponses && previousResponses.map((response, index) => (
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
                ))
            }
        </div >
    );
};
