import axios from 'axios';

const instance1 = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
}
);
instance1.defaults.headers.commom['Authorization'] = 'AUTH TOKEN the Instance 1';

export default instance1;