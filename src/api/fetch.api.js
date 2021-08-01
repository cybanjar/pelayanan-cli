import axios from 'axios';

const baseURL = "http://localhost:8000/api/";

export default {
    doFetch: async (url, body, headers) => {
        let reqBody = null;
        const token = sessionStorage.getItem("token");
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        
        // Request data
        if (!body) {
            reqBody = "";
        } else {
            reqBody = body;
        }
        
        // Request headers
        let reqHeaders = null;
        const configHeaders = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        if (!headers) {
            reqHeaders = "";
        } else {
            reqHeaders = configHeaders;
        }

        const requestURL = baseURL + url;

        const httpOptions = {
            json: {
                request: reqBody
            },
            timeout: 20000
        };

        const requestHeaders = reqHeaders

        try {
            const response = await axios.get(requestURL, httpOptions, requestHeaders);
            const data = await response.data.data;
            const dataResponse = data;

            return dataResponse;
        } catch (error) {
            error.message

            return null;
        }
    },

    doPost: async (url, body) => {
        let reqBody = null;
        // const token = sessionStorage.getItem("token");
        // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        
        // Request data
        if (!body) {
            reqBody = "";
        } else {
            reqBody = body;
        }

        const requestURL = baseURL + url;

        const httpOptions = {
            json: {
                request: reqBody
            },
            timeout: 20000
        };

        try {
            const data = await axios
            .post(requestURL, httpOptions)
            .then((response) => {
                console.log("response : ", response);
            })
            .catch((error) => {
              console.log(error);
            });

            const dataResponse = data;

            return dataResponse;
        } catch (error) {
            error.message

            return null;
        }
    },
};
