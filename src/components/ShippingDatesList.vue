<template>
<div class="shipping-dates">
  <v-container>
      <h1>Shipping Dates</h1>
      <h3>Даты доставки</h3>
      <v-row>
          <v-col
            cols="4">
            <v-select
                label="Выбор зоны"
                placeholder="Выбор зоны"
                :items="zones"
                return-object
                item-text="name"
                item-value="id"
                v-model="currentZone"
                @change="saveCurrentZone">
            </v-select>
          </v-col>
          <v-col
            cols="4">
            <v-checkbox 
                color="success"
                :disabled=!active
                v-for="dayModel in daysModel"
                :key="dayModel.value"
                :label="dayModel.name" 
                v-model="currentZone.days"
                :value="dayModel.value" />
          </v-col>
          <v-col
            
            cols="4">
                <div id="dates-1">
                    <dates 
                        :attach="'#dates-1'"
                        :disabled=!active
                        pickerName="Когда доставки нет"
                        :initialDates="currentZone.excluded"
                        chipColor="red"/>
                </div>
                <v-divider></v-divider>
                <div id="dates-2">
                <dates
                    :attach="'#dates-2'"
                    :disabled=!active
                    pickerName="Когда доставка есть"
                    :initialDates="currentZone.included"
                    chipColor="green"/>
                </div>
          </v-col>
          <v-col cols="12">
              <v-expansion-panels>
              <v-expansion-panel>
                    <v-expansion-panel-header>
                      <h3>Таблица со всеми днями и зонами</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th 
                                        v-for="day in daysModel"
                                        :key="day.value">
                                        {{ day.name }}    
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="zone in zones"
                                    :key="zone.id">
                                    <td>{{ zone.name }}</td>
                                    <td
                                        v-for="day in daysModel"
                                        :key="day.value">
                                        <v-icon
                                            color="success"
                                            v-if="(zone.days.includes(day.value))">
                                            mdi-check
                                        </v-icon>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-expansion-panel-content>
              </v-expansion-panel>
              </v-expansion-panels>
          </v-col>
      </v-row>
      <h3>Время, до которого можно сделать заказ на текущий день</h3>
      <v-row>
          <v-col 
            cols="12" 
            md="3"                     
            v-for="day in daysModel"
            :key="day.value">
                <div :id="`time-${day.value}`">
                    <time-picker
                        :attach="`#time-${day.value}`"
                        :label="day.name"
                        :id="day.value"
                        @setHour="setTime">
                    </time-picker>
                </div>
            </v-col>
            <v-col 
            cols="12" 
            md="3">
                <div 
                    id="time-local">
                    <time-picker
                        :attach="'#time-local'"
                        label="Самовывоз"
                        id="local"
                        @setHour="setTime">
                    </time-picker>
                </div>
            </v-col>
      </v-row>
      <v-row class="justify-center">
            <v-btn
                color="success"
                @click="saveShippingDates">
                Сохранить
            </v-btn>
      </v-row>
      
        <v-dialog
        width="400"
            v-model="savedModal">
            <div
                class="text-center">
                <v-card
                    
                    max-width="400">
                    <v-card-title
                        dark
                        class="justify-end success">
                        <v-icon
                            color="white"
                            @click="savedModal = false">
                            mdi-close
                        </v-icon>
                    </v-card-title>
                    <v-card-text
                        class="pt-3">
                        Даты успешно сохранены!
                    </v-card-text>
                </v-card>
                </div>
        </v-dialog>

        <v-dialog
        width="400"
            v-model="savedError">
            <div
                class="text-center">
                <v-card
                    
                    max-width="400">
                    <v-card-title
                        dark
                        class="justify-end error">
                        <v-icon
                            color="white"
                            @click="savedError = false">
                            mdi-close
                        </v-icon>
                    </v-card-title>
                    <v-card-text
                        class="pt-3">
                        Что-то пошло не так. Обратитесь к разработчику.
                    </v-card-text>
                </v-card>
                </div>
        </v-dialog>
        
  </v-container>
  </div>
</template>

<script>
import Dates from './Dates'
import TimePicker from './TimePicker'
export default {
    name: 'ShippingDatesList',
    components: {
        Dates,
        TimePicker
    },
    data (){
        return {
            currentZone: {},
            savedModal: false,
            savedError: false,
        }
    },
    computed: {
        zones (){
            return this.$store.getters['getZones']
        },
        daysModel (){
            return this.$store.getters['getDaysModel']
        },
        active (){
            return !!Object.keys(this.currentZone).length
        },
        dayTime (){
            return this.$store.getters['getDayTime']
        }
    },
    async created (){
        this.$store.dispatch('generateHours')
        await this.$store.dispatch('loadShippingZones')
    },
    methods: {
        setTime (dayTime){
            this.$store.dispatch('setTime', dayTime)
        },
        async saveShippingDates (){
            try {
                await this.$store.dispatch('saveShippingDates')
                this.savedModal = true
            } catch (error) {
                this.savedError = true
                console.log(error)
            }
        },
        saveCurrentZone (){
            this.$store.dispatch('saveCurrentZone', this.currentZone)
        }
    }
}
</script>

<style>
    .shipping-dates input{
        background-color: #fff;
        border: none;
    }
    .shipping-dates input:focus{
        border: none;
        box-shadow: none;
    }
</style>