import Vue from 'vue'
import Vuex from 'vuex'

const url = window.location.origin + '/wp-content/plugins/woo-shipping-dates/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    zones: [],
    hours: [],
    dayTime: [],
    daysModel: [
      {
          name: 'Понедельник',
          value: '1',
      },
      {
          name: 'Вторник',
          value: '2',
      },
      {
          name: 'Среда',
          value: '3',
      },
      {
          name: 'Четверг',
          value: '4',
      },
      {
          name: 'Пятница',
          value: '5',
      },
      {
          name: 'Суббота',
          value: '6',
      },
      {
          name: 'Воскресенье',
          value: '0',
      },
  ],
    
  },
  mutations: {
    setHours(state, hours){
      state.hours = hours
    },
    setTime(state, dayTime){
      const index = state.dayTime.findIndex(item => item.id === dayTime.id)
      if (index !== -1){
        state.dayTime[index] = dayTime
      } else {
        state.dayTime.push(dayTime)
      }
    },
    saveCurrentZone(state, currentZone){
      const index = state.zones.findIndex(zone => zone.id == currentZone.id)
      state.zones[index] = currentZone
    },
    loadShippingZones(state, data){
      state.zones = data.zones
      state.dayTime = data.dayTime
    }
  },
  actions: {
    generateHours({commit}){
      let hours = [];
      for (let i = 1; i < 25; i++){
        hours.push(i + ':00')
      }
      commit('setHours', hours)
    },
    setTime({commit}, dayTime){
      console.log(dayTime)
      commit('setTime', dayTime)
    },
    saveCurrentZone({commit}, zone){
      commit('saveCurrentZone', zone)
    },
    async saveShippingDates({state}){
      const data = JSON.stringify({
        zones: state.zones,
        dayTime: state.dayTime
      })
        let response = await fetch(url + 'save-data.php', {
          method: 'post',
          body: data
        })
        if (response.ok){
          return response.status
        } else {
          console.log(response.status)
        }
    },
    async loadShippingZones({commit}){
      const response = await fetch(
        url + 'load-data.php', {
          method: 'post'
        })
      const data = await response.json()
      if (response.ok){
        commit('loadShippingZones', data)
      } else {
        console.log(response.status)
      }
    }
  },
  getters: {
    getZones (state){
      return state.zones
    },
    getDaysModel (state){
      return state.daysModel
    },
    getHours (state){
      return state.hours
    },
    getDayTime (state){
      return state.dayTime
    }
  },
  modules: {
  }
})
