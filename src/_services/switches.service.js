import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const switchesService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/switches.json`, requestOptions).then(handleResponse);
}