<template>
<ul class="todo-list">
<li v-for="t of infos" :key="t.id" :class="{editing:t.id == editId}">
  <div class="view">
    <input class="toggle" @click="change(t.id)" type="checkbox" :checked="t.status=='completed'?true:false"/>
    <label @dblclick="edit(t.id)">{{ t.msg }}</label>
    <button class="destroy" @click="destroy(t.id)"></button>
  </div>
  <input class="edit"  v-model="t.msg" @keydown.enter="update">
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
    },
    computed:{
        infos:function(){
            let a = this.todos
            let newArr = []
            for(let i of a){
                if(i.status == 'completed'){
                    newArr.push(i)
                }
            }
            return newArr
        }
    }
}
</script>
<style></style>