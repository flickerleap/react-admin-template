import axios from 'axios';

const api = ({ url = '', method = 'get', data = {} } = {}) => {
    return  axios({
        method,
        url,
        data
    });
};

export default api;