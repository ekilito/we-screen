import Cookies from 'js-cookie'

// 和主应用存入cookis时的key保持一致 才能在子应用匹配上获取到
const KEY = 'token_key'

// 获取 token 方法
export function getCookie() {
    return Cookies.get(KEY)
}

// 设置方法
export function setCookie(value) {
    Cookies.set(KEY, value)
}

// 删除方法
export function removeCookie() {
    Cookies.remove(KEY)
}