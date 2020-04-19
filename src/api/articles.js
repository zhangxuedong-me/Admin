import request from '../utils/request'

// 创建文章分类的获取数据
export const articlesClassification = data => request('POST', '/admin/articles/article_classification', data)

// 获取文章分类接口的数据
export const getClassificationData = params => request('GET', '/admin/articles/get_classification', params)

// 发表文章的数据接口
export const publishArticle = data => request('POST', '/admin/articles/publish_articles', data)

// 获取文章的数据接口
export const getArticleData = params => request('GET', '/admin/articles/get_articles', params)

// 删除文章的接口
export const deleteArticle = params => request('DELETE', '/admin/articles/delete_article', params)

// 禁止或者恢复发表文章的接口
export const prohibitAndRecovery = data => request('POST', '/admin/articles/prohibit_and_recovery', data)

// 要修改的文章
export const editArticleDetail = params => request('GET', '/admin/articles/edit_article_detail', params)

// 编辑文章的接口
export const editArticle = data => request('POST', '/admin/articles/edit_article', data)
