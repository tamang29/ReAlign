import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/auth`;

// // Function to register a new user
// export const register = async (userData) => {
//     const response = await axios.post(`${API_URL}/register`, userData);
//     if (response.data.token) {
//         localStorage.setItem('userToken', response.data.token);
//     }
//     return response.data;
// };

// Function to login a user
export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('userData', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Function to logout a user
export const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
};
