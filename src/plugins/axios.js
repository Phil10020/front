import axios from 'axios'
import { useUserStore } from '@/store/user'
import qs from 'qs'
export const api = axios.create({
  baseURL: import.meta.env.VITE_API
})

export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})

apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  config.headers.authorization = 'Bearer ' + user.token
  return config
})

apiAuth.interceptors.response.use(res => {
  return res
}, error => {
  if (error.response) {
    if (error.response.data.message === '登入逾時' && error.config.url !== '/users/extend') {
      const user = useUserStore()
      // 傳送 JWT 舊換新請求
      return apiAuth.patch('/users/extend')
        .then(({ data }) => {
          // 如果舊換新成功，更新 user store 的 JWT
          user.token = data.result
          // 修改原發生錯誤的請求的 JWT
          error.config.headers.authorization = 'Bearer ' + user.token
          // 重新傳送原請求
          return axios(error.config)
        })
        .catch(() => {
          // 如果舊換新失敗，登出
          user.logout()
          // 回傳原錯誤到呼叫 axios 的地方
          return Promise.reject(error)
        })
    }
  }
  // 如果失敗的請求沒回應，或不是過期，回傳原錯誤到呼叫 axios 的地方
  return Promise.reject(error)
})

// 政府資料API-------------------
async function getAccessToken () {
  const parameter = {
    grant_type: 'client_credentials',
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: import.meta.env.VITE_CLIENT_SECRET
  }

  const authUrl =
    'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token'
  try {
    const res = await axios({
      method: 'POST',
      url: authUrl,
      data: qs.stringify(parameter),
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    })
    const accesstoken = res.data
    return {
      authorization: `Bearer ${accesstoken.access_token}`
    }
  } catch (err) {
    return err
  }
}

const accessToken = await getAccessToken()

const createApiInstance = (baseURL, headers = {}) => axios.create({
  baseURL,
  headers: {
    ...headers,
    Authorization: accessToken.authorization
  }
})

export const sportApi = createApiInstance('https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/', {
  Authorization: accessToken.authorization
})
export const foodApi = createApiInstance('https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/', {
  Authorization: accessToken.authorization
})
export const hotelApi = createApiInstance('https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel/', {
  Authorization: accessToken.authorization
})
export const activityApi = createApiInstance('https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity/', {
  Authorization: accessToken.authorization
})
export const tdxApi = createApiInstance('https://tdx.transportdata.tw/api/basic/v2/Tourism/', {
  Authorization: accessToken.authorization
})
export const cityApi = createApiInstance('https://tdx.transportdata.tw/api/basic/v2/Basic/City?%24format=JSON', {
  Authorization: accessToken.authorization
})
