// import ky from 'ky';
import axios from 'axios'

const baseURL = "http://localhost:8000/api/";

export default {
    
    doFetch: async (url, body) => {
        const token = sessionStorage.getItem('token');

        let reqBody = null;
        if (!body) {
            reqBody = "";
        } else {
            reqBody = body;
        }

        // let reqHeaders = null;
        // if(!headers) {
        //     reqHeaders = ""
        // } else {
        //     reqHeaders = sessionStorage.getItem("token");
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     }
        // }

        const requestURL = baseURL + url;

        const httpOptions = {
            json: {
                request: reqBody
            },
            timeout: 20000
        };

        try {
            const response = await axios.post(requestURL, httpOptions);
            console.log('response', response);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("ERRRR:: ",error.response.data);
            // return { 
            //     errorMessage: error.message,
            // };
        }
    },
};
