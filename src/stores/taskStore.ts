import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: number
}

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Task[]>([])

  // Load from localStorage on startup
  const savedTasks = localStorage.getItem('tasks')
  if (savedTasks) {
    try {
      tasks.value = JSON.parse(savedTasks)
    } catch (err) {
      console.error('Failed to parse tasks from localStorage:', err)
    }
  }

  // Auto-save to localStorage when tasks change
  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem('tasks', JSON.stringify(newTasks))
    },
    { deep: true }
  )

  // Actions
  const addTask = (title: string, description: string) => {
    tasks.value.push({
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: Date.now()
    })
  }

  const editTask = (id: string, newTitle: string, newDescription: string) => {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.title = newTitle
      task.description = newDescription
    }
  }

  const toggleTask = (id: string) => {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.completed = !task.completed
  }

  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  const clearCompleted = () => {
    tasks.value = tasks.value.filter(t => !t.completed)
  }

  return {
    tasks,
    addTask,
    editTask,
    toggleTask,
    deleteTask,
    clearCompleted,
  }
})
