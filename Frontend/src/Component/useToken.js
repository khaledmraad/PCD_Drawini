import { useState } from 'react';

function useToken() {

    function getToken() {
        const userToken = localStorage.getItem('email');
        return userToken && userToken
    }

    const [token, setToken] = useState(getToken());

    function saveToken(userToken) {
        localStorage.setItem('email', userToken);
        setToken(userToken);
    };

    function removeToken() {
        localStorage.removeItem("email");
        setToken(null);
    }

    return {
        setToken: saveToken,
        token,
        removeToken
    }

}

export default useToken;