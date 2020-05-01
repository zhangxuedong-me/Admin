import moment from 'moment'

const filters = {

  relativeTime (value) {
    return moment(value).startOf('second').fromNow()
  },

  formatTime (value, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(value).format(format)
  },

  statusFilter (status) {
    const statusText = ['审核通过', '草稿', '待审核', '审核失败']

    if (status === undefined) return []

    if (status.length) {

      status.forEach(item => {
        
        item.statusContent = statusText[item.status]
      })
    }
    return status
  }
}

export default filters
