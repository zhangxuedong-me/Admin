const getters = {
  getuserInfo: state => state.user.userInfo,
  roles: state => state.user.roles,
  navBars: state => state.user.navBars,
  cache: state => state.user.cache
}

export default getters