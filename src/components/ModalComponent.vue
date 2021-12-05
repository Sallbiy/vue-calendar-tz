<template>
  <div class="modal-mask" v-if="show">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header ">
          <slot name="header">
            <button class="btn modal-cancel-button" @click="closeModal">Х</button>
          </slot>
        </div>
        <div class="modal-body">
          <ul v-for="(todo) in posts" :key="todo.id">
            <li>
              {{todo.name}}
              <button @click="deletePostDb(todo.id)" class="btn btn-sm btn-danger float-right">x</button>
            </li>
          </ul>
          <form @submit.prevent="save">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Название задачи</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="todoName">
              </div>
            </div>
            <button class="btn btn-success">Add</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations,mapActions} from 'vuex';

export default {
  name: "ModalComponent",
  props: ['date'],
  data() {
    return {
      show: false,
      todoName:'',
    }
  },
  computed: {
    ... mapGetters(['allPosts']),

    posts() {
      return this.allPosts.filter(post => {
        const deadline = new Date(post.deadline);
        return deadline.getFullYear() === this.date.getFullYear()
          && deadline.getMonth() === this.date.getMonth()
          && deadline.getDate() === this.date.getDate();
      })
    }
  },
  async created () {
    document.addEventListener("keydown", (event) => {
      if (event.key === 'Escape') {
        this.closeModal();
      }
    });
  },
  methods: {
    ...mapActions(['deletePostDb']),
    ...mapMutations(['addPost']),
    closeModal: function () {
      this.show = false;
    },
    async save() {
      this.addPost({name: this.todoName, deadline: this.date.toISOString()})
      this.todoName = ''
    },
  },
  mounted() {
    this.$store.dispatch('fetchPosts')
  },
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 999;
}

.modal-wrapper {
  max-width: 35%;
  width: 35%;
  background-color: #fff;
  padding: 20px;
  overflow-y: auto;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
}

.modal-header {
  text-align: right;
  font-size: 22px;
  letter-spacing: 0;
  line-height: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
li{
  list-style-type: none;
  padding-bottom:10px;
  border-bottom:2px solid black;
}
</style>
