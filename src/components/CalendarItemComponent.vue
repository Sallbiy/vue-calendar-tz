<template>
  <div class="card card-small card-hover margin-small-top " v-bind:class="itemClasses">
    <div class="card-header">
      <div class="card-title">
        <img @click="open" src="https://cdn-icons-png.flaticon.com/512/117/117885.png" alt="" width="20" height="20" >
        <span class="float-right text-danger" style="font-size:24px;">{{date.getDate()}}</span>
        <div v-bind:class="activeTask" class="activeTask float-right " ></div>
        <ModalComponent ref='modal' :date="this.date" :calendarId="this.$attrs.curday"></ModalComponent>
      </div>
    </div>
  </div>
</template>

<script>
import ModalComponent from "./ModalComponent";
import {mapGetters} from "vuex";

export default {
  name: "CalendarItemComponent",
  components: {ModalComponent},
  data(){
    return {

    }
  },
  props: ['date'],
  methods: {
    open(){
      this.$refs.modal.show = true;
    },
    newsa(){
      const mas = (this.allPosts.map((task) => (task.id)))
      const a = mas.includes(this.$attrs.curday, [0])
      console.log(a);
    }
  },
  computed:{
    itemClasses() {
      const isCurrentDay = (new Date().getDate() === this.$attrs.curday)
      return{
        'bg-dark': isCurrentDay,
        'bg-default': !isCurrentDay,
      }
    },
    activeTask(){
      const dataId = (this.allPosts.map((task) => (task.calendar_id)))
      const activeTask = dataId.includes(this.$attrs.curday, [0])
      return{
        'd-block': activeTask,
        'd-none': !activeTask,
      }
    },
    ... mapGetters(['allPosts']),
  },
  created() {
    this.newsa()
  }

}
</script>
<style scoped>
.activeTask{
  width:10px;
  height:10px;
  background:blue;
  border-radius:100%;
}
</style>
