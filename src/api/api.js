import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://front-test.beta.aviasales.ru/',
    headers: {'Content-Type': 'application/json'},
})

export const ticketsAPI = {
    getSearchId(){
        return instance.get(`search`).then((res) => {
            return res.data
        })
    },
    getTickets(searchId){
        return instance.get(`tickets?searchId=${searchId}`).then((res) => {
            return res
        })
    },
}