<template>
  <div class="card card-small card-hover margin-small-top " v-bind:class="itemClasses">
    <div class="card-header">
      <div class="card-title">
        <img @click="open" src="https://cdn-icons-png.flaticon.com/512/117/117885.png" alt="" width="20" height="20" >
        <span class="float-right text-danger" style="font-size:24px;">{{date.getDate()}}</span>
        <ModalComponent ref='modal' :date="this.date"></ModalComponent>
      </div>
    </div>
  </div>
</template>

<script>
import ModalComponent from "./ModalComponent";

export default {
  name: "CalendarItemComponent",
  components: {ModalComponent},
  data(){
    return {}
  },
  props: ['date'],
  methods: {
    open(){
      this.$refs.modal.show = true;
    },
  },
  computed:{
    itemClasses() {
      const isCurrentDay = (new Date().getDate() === this.$attrs.curday)
      return{
        'bg-dark': isCurrentDay,
        'bg-default': !isCurrentDay,
      }
    }
  }

}
</script>
