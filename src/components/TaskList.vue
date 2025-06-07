<template>
    <div>
        <form @submit.prevent="submitTask">
        <input v-model="newTask" @keyup.enter="addNewTask" placeholder="New Task" type="text">
        <textarea v-model="newTaskDescription" placeholder="Task Description"></textarea>
        <div class="row">
            <input type="submit" value="Submit">
        </div>
        </form>
        <ul>
            <li v-for="task in tasks" :key="task.id">
                <div class="desc">
                    <input :checked="task.completed" @change="toggleTask(task.id)" type="checkbox" >&nbsp;
                    <strong :style="{ textDecoration: task.completed ? 'line-through' : '' }">{{ task.title }}</strong>
                    <button @click="deleteTask(task.id)">X</button>
                    <p>Description: {{ task.description }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useTasks } from '@/composables/useTasks'

const newTask = ref('')
const newTaskDescription = ref('')
const { tasks, addTask, deleteTask, toggleTask, editTask } = useTasks()

const addNewTask = () => {
    if(newTask.value.trim()) {
        addTask(newTask.value.trim(), newTaskDescription.value.trim())
        newTask.value = ''
        newTaskDescription.value = ''
    }
}

const submitTask = () => {
    if(!newTask.value.trim()) return
    addTask(newTask.value.trim(), newTaskDescription.value.trim())
    //Clear Form
    newTask.value = ''
    newTaskDescription.value = ''
}
</script>
<style>
* {
  box-sizing: border-box;
}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

input[type=submit] {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row::after {
  content: "";
  display: table;
  clear: both;
}

ul {
    list-style-type: none;
    margin: 0; padding: 0;
}

.desc {
    text-align: left;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}
</style>