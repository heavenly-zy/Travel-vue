const changeCity = function (state, city) {
  state.city = city
  localStorage.setItem('city', city)
}
export default {
  changeCity
}
