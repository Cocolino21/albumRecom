import axiosInstance from "./axiosInstance";


export const authCheck = async () => {
    try {
        console.log('Making auth check request...');
        
        // Log the current cookies
        console.log('Current cookies:', document.cookie);
        
        const response = await axiosInstance.get('/api/auth/check', {
            // Log the full request
            onRequest: config => {
                console.log('Request config:', {
                    headers: config.headers,
                    withCredentials: config.withCredentials,
                    url: config.url
                });
            }
        });
        
        console.log('Auth check response:', {
            status: response.status,
            headers: response.headers,
            data: response.data
        });
        
        return response.status === 200;
    } catch (error) {
        console.error('Auth check error:', {
            message: error.message,
            response: error.response ? {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            } : 'No response',
            request: error.config ? {
                headers: error.config.headers,
                withCredentials: error.config.withCredentials,
                url: error.config.url
            } : 'No config'
        });
        return false;
    }
};

export const logout = async () => {
    try {
        await axiosInstance.post('/api/auth/logout');
        return true;
    } catch (error) {
        console.error('Logout error:', error);
        return false;
    }
};

export const loginCheck = async (dataLogin) => {
    try {
        console.log('Making login request...');
        
        const response = await axiosInstance.post('/api/auth/login', {
            username: dataLogin.username,
            password: dataLogin.password
        });
        
        console.log('Login response:', {
            status: response.status,
            headers: response.headers,
            data: response.data
        });
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const isAuthenticated = await authCheck();
        console.log('Post-login auth check result:', isAuthenticated);
        
        return isAuthenticated;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
};

export const registerUser = async (dataRegister) =>{
    try{
    const response = await axiosInstance.post('/api/auth/register', {
        username: dataRegister.username,
        password: dataRegister.password,
        email: dataRegister.email
    });
    return true;
    }
    catch(error){
        console.error('Register error:', error);
        return false;
    }
}