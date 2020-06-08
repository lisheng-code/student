<template>
  <div id="app">
    <section class="todoapp">
      <!-- 这个是输入 todo的地方   -->
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          v-model="todo"
          @keydown.enter="add"
          autofocus
        />
      </header>
      <!-- This section should be hidden by default and shown when there are todos -->
      <section class="main">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          @click="full"
        />
        <label for="toggle-all">Mark all as complete</label>
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <!-- class =  "completed "  是用横线样式  状态管理  -->
        <router-view
          :todos="todos"
          @change="change"
          @destroy="destroy"
          :editId="editId"
          @update="update"
          @edit="edit"
        ></router-view>
      </section>
      <!-- This footer should hidden by default and shown when there are todos -->
      <footer class="footer">
        <!-- This should be `0 items left` by default -->
        <span class="todo-count"
          ><strong>{{ count }}</strong> item left</span
        >
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
          <li>
            <a
              :class="{ selected: record == 'all' }"
              href="javascript:void(0);"
              @click.prevent="selected('all')"
              >All</a
            >
          </li>
          <li>
            <a
              :class="{ selected: record == 'active' }"
              href="javascript:void(0);"
              @click.prevent="selected('active')"
              >Active</a
            >
          </li>
          <li>
            <a
              :class="{ selected: record == 'completed' }"
              href="javascript:void(0);"
              @click.prevent="selected('completed')"
              >Completed</a
            >
          </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed" @click="clear">Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <!-- Remove the below line ↓ -->
      <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
      <!-- Change this out with your name and url ↓ -->
      <p>Created by <a href="http://todomvc.com">you</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      todo: "",
      todos: [
        { id: 1, msg: "吃饭", status: "active" },
        { id: 2, msg: "看电影", status: "completed" },
        { id: 3, msg: "打豆豆", status: "active" },
      ],
      record: "all",
      editId: -1,
    };
  },
  computed: {
    count: function() {
      return this.todos.length;
    },
  },
  methods: {
    add() {
      let max = this.getMax();
      let obj = { id: max + 1, msg: this.todo, status: "active" };
      this.todos.push(obj);
      this.todo = "";
    },
    selected: function(str) {
      this.record = str;
      window.location = "#/" + str;
    },
    change(id) {
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].id == id) {
          if (this.todos[i].status == "active") {
            this.todos[i].status = "completed";
          } else {
            this.todos[i].status = "active";
          }
        }
      }
    },
    edit(id) {
      this.editId = id;
    },
    update() {
      this.editId = -1;
    },
    destroy(id) {
      for (let i in this.todos) {
        if (this.todos[i].id == id) {
          this.todos.splice(i, 1);
        }
      }
    },
    full() {
      let flag = false;
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].status == "active") {
          flag = true;
        }
      }
      if (flag) {
        for (let i = 0; i < this.todos.length; i++) {
          this.todos[i].status = "completed";
        }
      } else {
        for (let i = 0; i < this.todos.length; i++) {
          this.todos[i].status = "active";
        }
      }
    },
    clear() {
      let newArr = [];
      for (let i in this.todos) {
        if (this.todos[i].status == "active") {
          newArr.push(this.todos[i]);
        }
      }
      this.todos = newArr;
    },
    getMax() {
      let t = this.todos;
      if (t.length > 0) {
        t.sort(function(a, b) {
          return a.id - b.id;
        });
        return t[t.length - 1].id;
      } else {
        return 0;
      }
    },
  },
};
</script>

<style>
@import url("../node_modules/todomvc-common/base.css");
@import url("../node_modules/todomvc-app-css/index.css");
</style>
