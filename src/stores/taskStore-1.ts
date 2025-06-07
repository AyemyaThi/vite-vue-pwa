import { defineStore } from 'pinia'

export interface Task {
    id: string
    title: string
    description: string
    completed: boolean
    createdAt: number
}

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [] as Task[]
    }),
    actions: {
        addTask(title: string, description: string) {
            this.tasks.push({
                id: Date.now().toString(),
                title,
                description,
                completed: false,
                createdAt: Date.now(),
            })
        },
        toggleTask(id: string) {
            const task = this.tasks.find(t => t.id === id)
            if(task) task.completed = !task.completed
        },
        deleteTask(id: string) {
            this.tasks = this.tasks.filter(t => t.id !== id)
        },
        clearCompleted() {
            this.tasks = this.tasks.filter(t => !t.completed)
        },
        editTask(id: string, newTitle: string, newDescription: string) {
            const task = this.tasks.find(t => t.id === id)
            if(task) {
                task.title = newTitle
                task.description = newDescription
            }
        }
    }
})