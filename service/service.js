import request from '../service/request'

// const BASE_URL = 'http://127.0.0.1:8000/api'

const BASE_URL = 'http://8.136.80.201:8000/api'

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
export async function get_basic_settings(payload) {
    return request.get(BASE_URL + '/get_basic_settings/', payload)
}
export async function update_basic_settings(payload) {
    return request.post(BASE_URL + '/update_basic_settings/', payload)
}
export async function get_url_icon(payload) {
    return request.post(BASE_URL + '/get_url_icon/', payload)
}
export async function get_url_title(payload) {
    return request.post(BASE_URL + '/get_url_title/', payload)
}
export async function update_shortcuts(payload) {
    return request.post(BASE_URL + '/update_shortcuts/', payload)
}
export async function update_search_engines(payload) {
    return request.post(BASE_URL + '/update_search_engines/', payload)
}
export async function update_sticky_note(payload) {
    return request.post(BASE_URL + '/update_sticky_note/', payload)
}
