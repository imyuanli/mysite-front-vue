import request from '../service/request'
const BASE_URL = 'http://127.0.0.1:8000/api'

export async function get_login_code(payload) {
  return request.get(BASE_URL + '/get_login_code/', payload)
}
export async function get_background_mage(payload) {
  return request.get(BASE_URL + '/get_background_mage/', payload)
}
