let defaultCity = '重庆'

try {
  defaultCity = localStorage.getItem('city') || defaultCity
} catch (e) {
  console.log('你的浏览器不支持localStorage!')
}

export default {
  city: defaultCity
}
