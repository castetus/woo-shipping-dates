<template>
  <div class="dates">
    <v-menu
      :attach="attach"
      right
      ref="menu"
      v-model="menu"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :disabled="disabled"
          v-model="date"
          :label="pickerName"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        locale="RU_ru"
        v-model="date"
        no-title
        scrollable
        @change="addDate"
      >
      </v-date-picker>
    </v-menu>
    <div v-if="initialDates" class="pa-2">
      <v-chip
        :color="chipColor"
        class="ma-1"
        close
        outlined
        @click:close="removeDate(n)"
        v-for="(date, n) in initialDates"
        :key="date"
        >{{ date }}</v-chip
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "dates",
  props: ["pickerName", "initialDates", "chipColor", "disabled", "attach"],
  data() {
    return {
      menu: false,
      date: null,
    }
  },
  methods: {
    addDate() {
      let newDate = this.dateFormat(this.date)
      if (this.initialDates.includes(newDate)) {
        return
      }
      this.initialDates.push(newDate)
    },
    removeDate(n) {
      this.initialDates.splice(n, 1)
    },
    dateFormat(date) {
      return date
        .split("-")
        .slice(1, 3)
        .reverse()
        .join(".")
    },
  },
}
</script>

<style></style>
