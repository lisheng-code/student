<template>
<ul class="todo-list">
<li v-for="t of todos" :key="t.id" :class="{editing:t.id == editId}">
  <div class="view">
    <input class="toggle" @click="change(t.id)" type="checkbox" :checked="t.status=='completed'?true:false"/>
    <label @dblclick="edit(t.id)">{{ t.msg }}</label>
    <button class="destroy" @click="destroy(t.id)"></button>
  </div>
  <input class="edit" v-model="t.msg" @keydown.enter="update">
</li>
</ul>
</template>
<script>
export default {
    props:['todos','editId'],
    methods:{
        change(id){
            this.$emit('change',id)
        },
        destroy(id){
            this.$emit('destroy',id)
        },
        update(){
            this.$emit('update')
        },
        edit(id){
            this.$emit('edit',id)
        }
    }
}
</script>
<style></style>
