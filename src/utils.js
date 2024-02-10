import axios from 'axios';

const BACKEND_URL = 'http://127.0.0.1:8000';

export const AskFeedback = async ({
    answer,
    user_fid,
    prompt_message,
    is_public
}) => {
    const url = `${BACKEND_URL}/crud/generate_feedback/`;
    const data = {
        answer,
        user_fid,
        prompt_message,
        is_public
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response);
        const message = response.data.response;
        
        const feedback = {
            type: 'success',
            message: message
        }

        console.log('feedback object to create',
            feedback)

        return feedback;


    } catch (error) {
        console.error(error);
        return '';
    }
}