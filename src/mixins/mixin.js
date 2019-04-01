import Moment from 'moment/moment'
var mixin = {
  filters: {
    // 格式化时间 保留日期
    momentShort: function(time) {
      return time ? Moment(time).format('YYYY-MM-DD') : ''
    },
    // 格式化时间 保留秒
    momentLong: function(time) {
      return time ? Moment(time).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    numberFixed: function(number, d = 2) {
      return number ? Number(number).toFixed(d) : Number(0).toFixed(d)
    }
  }
}
export default mixin
