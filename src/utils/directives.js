import Vue from 'vue'
import moment from 'moment'

Vue.directive('date-format', (el, { value }) => {
  moment.locale('pt')
  el.innerHTML = moment(value).format('DD/MM/YY')
})

Vue.directive('dates-format', (el, { value }) => {
  moment.locale('pt')
  el.innerHTML = moment(value).format('ll')
})

Vue.directive('time-format', (el, { value }) => {
  moment.locale('pt')
  el.innerHTML = moment(value).format('HH:mm')
})