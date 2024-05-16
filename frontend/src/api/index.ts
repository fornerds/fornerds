import axios, { AxiosRequestConfig, Method } from 'axios'

interface SendParams {
  method: Method
  path: string
  data?: object
  access_token?: string
}

interface ApiFunctionParams {
  path: string
  data?: object
  access_token?: string
}

const send = async ({
  method,
  path,
  data = {},
  access_token = ''
}: SendParams): Promise<any> => {
  const commonUrl = process.env.API_URL as string
  const url = commonUrl + path

  const headers = {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
    Authorization: `Bearer ${access_token}`
  }

  const options: AxiosRequestConfig = {
    method,
    url,
    headers,
    data,
    withCredentials: true
  }

  try {
    const response = await axios(options)
    return response.data
  } catch (error: any) {
    console.error('API Error:', error.response || error.message)
    throw error
  }
}

const getApi = ({ path, access_token }: ApiFunctionParams) =>
  send({ method: 'GET', path, access_token })
const putApi = ({ path, data, access_token }: ApiFunctionParams) =>
  send({ method: 'PUT', path, data, access_token })
const patchApi = ({ path, data, access_token }: ApiFunctionParams) =>
  send({ method: 'PATCH', path, data, access_token })
const postApi = ({ path, data, access_token }: ApiFunctionParams) =>
  send({ method: 'POST', path, data, access_token })
const deleteApi = ({ path, data, access_token }: ApiFunctionParams) =>
  send({ method: 'DELETE', path, data, access_token })

export { getApi, putApi, postApi, patchApi, deleteApi }
