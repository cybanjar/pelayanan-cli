import ky from "ky";

// const authBaseURL = "http://localhost:3004/";
// ky.defaults.baseURL = "http://localhost:8000/api/";



// export default {
//     doFetch: async (url, body) => {
//         let reqBody = null;
//         if (!body) {
//             reqBody = "";
//         } else {
//             reqBody = body;
//         }

//         const requestURL = authBaseURL + url;

//         const httpOptions = {
//             json: {
                
//             },
//             timeout: 20000
//         };

//         try {
//             const response = await ky.post(requestURL, httpOptions);
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             return { errorMessage: error.message };
//         }
//     },
// };
