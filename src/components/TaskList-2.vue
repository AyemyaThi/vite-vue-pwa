<template>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <div v-if="editingTaskId === task.id">
          <form @submit.prevent="saveEdit(task.id)">
            <input v-model="editTitle" required />
            <textarea v-model="editDescription" rows="2"></textarea>
            <button type="submit">Save</button>
            <button type="button" @click="cancelEdit">Cancel</button>
          </form>
        </div>
        <div v-else>
          <input type="checkbox" v-model="task.completed" @change="toggleTask(task.id)" />
          <strong>{{ task.title }}</strong>
          <p>{{ task.description }}</p>
          <button @click="startEdit(task)">✏️ Edit</button>
          <button @click="deleteTask(task.id)">🗑️</button>
        </div>
      </li>
    </ul>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useTasks } from '@/composables/useTasks'
  import type { Task } from '@/stores/taskStore'

  const { tasks, deleteTask, toggleTask, editTask } = useTasks()

  const editingTaskId = ref<string | null>(null)
  const editTitle = ref('')
  const editDescription = ref('')

  const startEdit = (task: Task) => {
    editingTaskId.value = task.id
    editTitle.value = task.title
    editDescription.value = task.description
  }

  const cancelEdit = () => {
    editingTaskId.value = null
    editTitle.value = ''
    editDescription.value = ''
  }

  const saveEdit = (id: string) => {
    if (editTitle.value.trim()) {
      editTask(id, editTitle.value.trim(), editDescription.value.trim())
      cancelEdit()
    }
  }
</script>
