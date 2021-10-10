import axios from 'axios'

class Auth {
  constructor(api) {
    this.api = api
  }

  login = async (email, password) => {
    const formData = new FormData()
    formData.append('username', email)
    formData.append('password', password)
    return await this.api.post('/auth/login', formData)
  }

  logout = async () => await this.api.post('/auth/logout', {})
}

class Me {
  constructor(api) {
    this.api = api
  }

  get = async () => await this.api.get('/users/me')
  patch = async (data) => await this.api.patch('/users/me', data)
}

class User {
  constructor(api) {
    this.api = api
  }

  getList = async (Page = 0, PerPage = 10) =>
    await this.api.get('/users', {
      headers: { Page, PerPage },
    })

  get = async (id) => await this.api.get(`/users/${id}`)
  patch = async (id, data) => await this.api.patch(`/users/${id}`, data)
  delete = async (id) => await this.api.delete(`/users/${id}`)
}

export class API {
  constructor(prefix = '/api/v0', config = {}) {
    this.api = axios.create({
      baseURL: prefix,
      withCredentials: true,
      ...config,
    })
    this.auth = new Auth(this)
    this.me = new Me(this)
    this.user = new User(this)
  }

  get = async (...args) => {
    try {
      const response = await this.api.get(...args)
      return { ...response.data, ok: true }
    } catch (error) {
      return { ...error, ok: false }
    }
  }

  patch = async (...args) => {
    try {
      const response = await this.api.patch(...args)
      return { ...response.data, ok: true }
    } catch (error) {
      return { ...error, ok: false }
    }
  }

  post = async (...args) => {
    try {
      const response = await this.api.post(...args)
      return { ...response.data, ok: true }
    } catch (error) {
      return { ...error, ok: false }
    }
  }

  delete = async (...args) => {
    try {
      const response = await this.api.delete(...args)
      return { ...response.data, ok: true }
    } catch (error) {
      return { ...error, ok: false }
    }
  }

  errors = (response) => {
    const res = response.response
    const data = res && res.data && typeof res.data !== 'string' ? res.data : {}
    if (!data.message) {
      if (data.msg) {
        data.message = data.msg
      } else if (data.statusText) {
        data.message = data.statusText
      } else if (data.status) {
        data.message = data.status
      } else if (res.statusText) {
        data.message = res.statusText
      } else if (res.status) {
        data.message = res.status
      }
    }
    if (data.errors) {
      Object.getOwnPropertyNames(data.errors).forEach((property) => {
        if (property !== 'message') {
          data.errors[property] = data.errors[property].join(' ')
        }
      })
    }
    return data
  }
}
