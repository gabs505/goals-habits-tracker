import axios from 'axios'

const instance=axios.create({
    baseURL:'https://intense-fjord-56282.herokuapp.com/'
    // baseURL:'http://localhost:5000/'
})

export default instance;