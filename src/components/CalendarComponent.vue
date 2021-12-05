<template>
  <div class="container p-4">
    <button class="btn btn-dark btn-xl" @click="fetchPosts">Синхронизация</button>
    <div class="d-flex flex-wrap">
      <div v-for="(id, i) in weekDay" :key="id" class="calendar-day p-5 text-uppercase">
        {{ weekDay[i] }}
      </div>
      <div v-for="day in days" :key="day" class="calendar-item p-1">
        <calendar-item :date="getCalendarDate(day)" :curday="day" v-if="day"></calendar-item>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarItem from "./CalendarItemComponent";
import {mapActions} from "vuex";
export default {
  name: "CalendarComponent",
  components: {
    CalendarItem,
  },
  data() {
    return {
      weekDay: [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье",
      ],
      days: [],
    };
  },
  methods: {
    ...mapActions(['fetchPosts']),
    getWeekDay(month, year) {
      return new Date(year, month, 1).getUTCDay();
    },
    getDaysOfMonth(month, year) {
      return new Date(year, month + 1, 0).getDate();
    },
    getDays() {
      const currentDay = new Date();
      const month = currentDay.getMonth();
      const year = currentDay.getFullYear();
      const daysInMonth = this.getDaysOfMonth(month, year);
      const firstDayIndex = this.getWeekDay(month, year);
      for (let i = firstDayIndex; i < daysInMonth + firstDayIndex; i++) {
        this.days[i] = i + 1 - firstDayIndex;
      }
      return this.days;
    },
    getCalendarDate(day) {
      const date = new Date();
      date.setDate(day);
      return date;
    },
  },
  created() {
    this.getDays();
  }
};
</script>

<style scoped>
.calendar-item {
  width: calc(100% / 7);
}
.calendar-day {
  width: calc(100% / 7);
}
</style>
