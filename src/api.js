const endpoint = "http://127.0.0.1:8000";


export const sendCredentialToTheBackend = (email, userName) => {
//    fetch(`${endpoint}/create_user`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email, userName })
//     });

    console.log("Sending to the backend: ", email, userName);
}

