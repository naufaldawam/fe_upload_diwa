import axios from "axios";

axios.defaults.baseURL='http://localhost:8001/'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8081/';


