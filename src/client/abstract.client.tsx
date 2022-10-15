import Cookie from 'universal-cookie'
import UserService from '@/services/user.service'
import axios, { AxiosInstance } from 'axios'
import { ApiLink } from '@/types/api-link.types'
import { CollectionResource } from '@/types/collection-resource.types'
import { AbstractEntity } from '@/types/abstract-entity.types'

export abstract class AbstractClient<
    T extends AbstractEntity, // Tipo singular do recurso (e.g. User, Event, Lecture)
    U extends CollectionResource<T>, // Tipo coletivo do recurso (e.g. UserCollection, EventCollection)
> {
    protected axiosClient: AxiosInstance

    protected constructor(endpoint: string) {
        this.axiosClient = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
            headers: { Accept: 'application/json', 'Content-type': 'application/json' },
        })
    }

    public async findEntity(entity: ApiLink): Promise<T> {
        return this.get(entity.href)
    }

    public async listEntity(entity: ApiLink): Promise<U> {
        return this.get(entity.href)
    }

    public async deleteEntity(entity: ApiLink): Promise<void> {
        return this.delete(entity.href)
    }

    public async createEntity(entity: T): Promise<T> {
        return this.post(entity)
    }

    public async updateEntity(entity: ApiLink, updated: T): Promise<T> {
        return this.put(entity.href, updated)
    }

    public async list(): Promise<U> {
        const headers = {
            ...this.authHeader(),
        }
        return this.fetchEndpoint('', null, headers, 'GET')
    }

    public isofetch(url: string, data: object | null, type: string): Promise<any> {
        return this.axiosClient<U>(`${url}`, {
            data: JSON.stringify({ ...data }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: type,
        })
            .then(this.handleResponse)
            .catch((error) => {
                throw error
            })
    }

    public get(url: string): Promise<any> {
        const headers = {
            ...this.authHeader(),
        }
        return this.fetchFromURL(url, null, headers, 'GET')
    }

    public post(data: T): Promise<T> {
        const headers = {
            ...this.authHeader(),
        }
        return this.fetchEndpoint('', data, headers, 'POST')
    }

    public delete(url: string): Promise<void> {
        const headers = {
            ...this.authHeader(),
        }
        return this.fetchFromURL(url, null, headers, 'DELETE')
    }

    public put(url: string, data: T): Promise<T> {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...this.authHeader(),
        }
        return this.fetchFromURL(url, data, headers, 'PUT')
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

    private fetchFromURL(
        url: string,
        data: object | null,
        headers: any,
        type: string,
    ): Promise<any> {
        return axios<any>(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
            data: JSON.stringify({ ...data }),
            headers: headers,
            method: type,
        }).then(this.handleResponse)
    }

    private fetchEndpoint(
        url: string,
        data: object | null,
        headers: any,
        type: string,
    ): Promise<any> {
        return this.axiosClient<any>(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
            data: JSON.stringify({ ...data }),
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