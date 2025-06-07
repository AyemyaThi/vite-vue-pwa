import { storeToRefs } from "pinia";
import { useTaskStore } from "@/stores/taskStore";

export function useTasks() {
    const store = useTaskStore()
    const { tasks } = storeToRefs(store)

    return {
        tasks,
        addTask: store.addTask,
        deleteTask: store.deleteTask,
        toggleTask: store.toggleTask,
        clearCompleted: store.clearCompleted,
        editTask: store.editTask
    }
}