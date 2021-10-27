import axios from "axios";

const api = axios.create({
    headers:{
        "x-auth-token" : localStorage.getItem("food-app-token")
    }
});
api.defaults.baseURL = 'https://api.homefoodyy.com';
api.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
api.defaults.headers.common['x-auth-token'] = localStorage.getItem("food-app-token")

export default api;
