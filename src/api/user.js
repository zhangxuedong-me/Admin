import request from '../utils/request'

// 用户登陆
export const userLogin = params => request('GET', '/admin/user/login', params)

// 用户注册
export const userRegister = params => request('GET', '/admin/user/register', params)

// 获取用户的权限数据
export const getUserAuth = params => request('GET', '/admin/user/user_auth', params)

// 获取用户头像
export const getUserImg = params => request('GET', '/admin/user/user_img', params)

// 获取用户登陆时的头像
export const getLoginImg = params => request('GET', '/admin/user/login_img', params)

// 修改用户资料
export const editUserInfo = data => request('POST', '/admin/user/edit_user', data)
