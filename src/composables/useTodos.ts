import { ref, watch, computed } from 'vue'

export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: string
  dueDate?: string
  createdAt: number
}

const STORAGE_KEY = 'vue3-premium-todos'

export function useTodos() {
  // Migration logic for old tasks that lack category
  const rawData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  const initialTodos: Todo[] = rawData.map((t: any) => ({
    ...t,
    category: t.category || 'Personal'
  }))

  const todos = ref<Todo[]>(initialTodos)

  // Save to localStorage whenever todos change
  watch(
    todos,
    (newTodos) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
    },
    { deep: true }
  )

  const addTodo = (title: string, category: string = 'Personal', dueDate?: string) => {
    if (!title.trim()) return

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: '',
      completed: false,
      priority: 'medium',
      category,
      dueDate,
      createdAt: Date.now()
    }

    todos.value.unshift(newTodo)
  }

  const deleteTodo = (id: string) => {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }

  const toggleComplete = (id: string) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    const index = todos.value.findIndex(t => t.id === id)
    if (index !== -1) {
      todos.value[index] = { ...todos.value[index], ...updates }
    }
  }

  const getTodoById = (id: string) => {
    return computed(() => todos.value.find(t => t.id === id) || null)
  }

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleComplete,
    updateTodo,
    getTodoById
  }
}
