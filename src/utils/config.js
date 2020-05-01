// 接口的配置
export const config = {
  baseURL: 'http://localhost:',
  prot: 3000,
  timeout: 15000
}

// 图片懒加载的配置
export const lazyLoad = {

  preLoad: 1.3,

  // 加载中显示的图片
  loading: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2843662159,2317606805&fm=16&gp=0.jpg',

  // 加载失败显示的图片
  error: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=104394466,2625116464&fm=11&gp=0.jpg',

  // 尝试加载一次
  attempt: 1
}

// loading的加载配置
export const loaddingConfig = {
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
}