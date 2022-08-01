import request from '../service/request'
import getApiBaseUrl from '../utils/base_api_url'
const BASE_URL = 'http://127.0.0.1:8000/api'
// const BASE_URL = 'http://8.136.80.201/api'

export async function get_background_mage(payload) {
  return request.get(BASE_URL + '/get_background_mage/', payload)
}

export async function get_login_code(payload) {
  return request.post(BASE_URL + '/get_login_code/', payload)
}
export async function get_login(payload) {
  return request.post(BASE_URL + '/get_login/', payload)
}
export async function get_user_info(payload) {
  return request.get(BASE_URL + '/get_user_info/', payload)
}
export async function update_info(payload) {
  return request.post(BASE_URL + '/update_info/', payload)
}
export async function save_current_image(payload) {
  return request.post(BASE_URL + '/save_current_image/', payload)
}

