import axios from 'axios'
// const baseUrl = "http://192.168.1.77:8088/"
const getqq = async (value=require(), url=require()) => {
    return new Promise((resolve, reject) => {
        axios.get("/api/" + url, {
            params: value
        })
            .then(function (response) {
                console.log(response);
                resolve(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    })
}
const postqq = async (value, url) => {
    return new Promise((resolve, reject) => {
        axios.post("/api/" + url, value)
            .then(function (response) {
                // console.log(response);
                resolve(response)
                return response
            })
            .catch(function (error) {
                console.log(error);
            });
    })
}
export { getqq, postqq }