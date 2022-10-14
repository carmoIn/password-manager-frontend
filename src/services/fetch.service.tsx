import Cookie from 'universal-cookie'
import UserService from '@/services/user.service'

class FetchService {
    public isofetch(url: string, data: object, type: string): Promise<any> {
        return fetch(`${process.env.PUBLIC_API_URL}${url}`, {
            body: JSON.stringify({ ...data }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: type,
        })
            .then((response: Response) => response.json())
            .then(this.handleResponse)
            .catch((error) => {
                throw error
            })
    }

    public get(url: string, data: object): Promise<any> {
        const headers = {
            Accept: 'application/json',
            ...this.authHeader(),
        }
        return this.isofetchAuthed(url, data, headers, 'GET')
    }

    public post(url: string, data: object): Promise<any> {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...this.authHeader(),
        }
        return this.isofetchAuthed(url, data, headers, 'POST')
    }

    public put(url: string, data: object): Promise<any> {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...this.authHeader(),
        }
        return this.isofetchAuthed(url, data, headers, 'PUT')
    }

    private authHeader() {
        // return auth header with jwt if user is logged in and request is to the api url
        const token: string = UserService.getAuthenticatedToken()
        if (token) {
            return { Authorization: `Bearer ${token}` }
        } else {
            return { Authorization: 'None' }
        }
    }

    private isofetchAuthed(
        url: string,
        data: object,
        headers: HeadersInit,
        type: string,
    ): Promise<any> {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
            body: JSON.stringify({ ...data }),
            headers: headers,
            method: type,
        }).then(this.handleResponse)
    }

    private handleResponse(response) {
        return response.text().then((text) => {
            const data = text && JSON.parse(text)

            if (!response.ok) {
                if ([401, 403].includes(response.status) && UserService.getAuthenticatedToken()) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    UserService.logout()
                }

                const error = (data && data.message) || response.statusText
                return Promise.reject(error)
            }

            return data
        })
    }
}

export default new FetchService()
