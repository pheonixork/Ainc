import getConfig from 'next/config';
const {publicRuntimeConfig} = getConfig();

export const apiWrapper = {
    get,
    post,
};

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: {'Access-Control-Allow-Origin': '*', ...authHeader() }
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function authHeader() {
    return { Authorization: `Bearer ${publicRuntimeConfig.modashToken}` };
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if ([401, 403].includes(response.status)) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return Promise.reject('Error');
        }
        
        return data;
    });
}