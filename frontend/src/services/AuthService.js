import axios from 'axios';

//regeister and login duplicated in RegisterModal and LoginForm, to be solved

const API_URL = `${process.env.REACT_APP_API_URL}/api/auth`; 

// // Function to register a new user
// export const register = async (userData) => {
//     const response = await axios.post(`${API_URL}/register`, userData);
//     if (response.data.token) {
//         localStorage.setItem('userToken', response.data.token);
//     }
//     return response.data;
// };

// // Function to login a user
// export const login = async (userData) => {
//     try {
//         const response = await axios.post(`${API_URL}/login`, userData);
//         if (response.data.token) {
//             localStorage.setItem('userToken', response.data.token);
//             localStorage.setItem('userData', JSON.stringify(response.data.user)); // Update with user data
//         }
//         return response.data;
//     } catch (error) {
//         // Handle login error
//         console.error('Login error:', error);
//         throw error; // Optionally rethrow the error for handling in components
//     }
// };

// Function to logout a user
export const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
};
