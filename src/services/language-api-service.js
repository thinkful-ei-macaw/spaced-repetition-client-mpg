import config from '../config'
import TokenService from './token-service'

const LanguageApi = {

    getLanguage() {
        return fetch(`${config.API_ENDPOINT}/language`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then((res) =>
                (!res.ok ?
                    res.json()
                        .then((e) => Promise.reject(e))
                    : res.json()))


    }


}

export default LanguageApi