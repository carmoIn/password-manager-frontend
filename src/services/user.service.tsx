import Cookie from 'universal-cookie'
import Router from 'next/router'
import { FormLogin, TokenResponse } from '@/types/auth.types'
import FetchService from '@/services/fetch.service'

class UserService {
    public getAuthenticatedToken() {
        const cookies = new Cookie()
        return cookies.get('token')
    }

    public login(login: FormLogin) {
        return FetchService.post(`/login`, login).then((user: TokenResponse) => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            const cookies = new Cookie()
            cookies.set('token', user.access_token)

            return user
        })
    }

    public logout() {
        // remove user from local storage, publish null to user subscribers and redirect to login page
        const cookies = new Cookie()
        cookies.remove('token')
        Router.push('/login')
    }
}

export default new UserService()
