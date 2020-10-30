<template>
  <!-- <div 
    class="px-2"> -->
        <v-select

            v-model="dayTimeValue"
            max-width="90%"
            :items="hours"
            :label="label">
        </v-select>
  <!-- </div> -->
</template>

<script>

export default {
    name: 'time-picker',
    props: [
        'label',
        'id',
        'attach'
    ],
    data (){
        return {
            maxHour: this.dayTimeValue,
        }
    },
    computed: {
        hours () {
            return this.$store.getters['getHours']
        },
        dayTimeValue: {
            get (){
                let value;
                const dayTime = this.$store.getters['getDayTime']
                const index = dayTime.findIndex(item => item.id == this.id)
                if (index !== -1){
                    value = dayTime[index].hour
                } else {
                    value = '17:00'
                }
                return value
            },
            set (val){
                const dayTime = {
                    id: this.id,
                    hour: val
                }
                this.$store.dispatch('setTime', dayTime)
            }
        } 
    },
}
</script>

<style>

</style>