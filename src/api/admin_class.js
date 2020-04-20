import request from '../utils/request'

// 删除分类接口的数据
export const deleteClass = params => request('DELETE', '/admin/adminclass/delete_class', params)

// 获取要修改的分类
export const getEditClass = params => request('GET', '/admin/adminclass/get_edit', params)

// 保存修改的分类数据
export const keepClass = data => request('POST', '/admin/adminclass/keep_class', data)

// 禁用或者恢复分类的使用
export const prohibitAndRecovery = data => request('POST', '/admin/adminclass/prohibit_class', data)
