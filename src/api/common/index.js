import axios from 'axios';

const apiCaller = axios.create({
  baseURL: 'https://api-connect.io/',
  validateStatus: function (status) {
    return true;
  },
});

function login({ username, password }) {
  const path = 'id/user/login';

  return apiCaller.post(path, { username, password })
    .then((res) => {
      switch (res.status) {
        case 401:
          return Promise.reject(res.data.error);
        default:
          return Promise.resolve(res.data);
      }
    })
}

export {
  login
}
