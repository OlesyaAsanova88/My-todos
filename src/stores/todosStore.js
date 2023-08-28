import { ref } from 'vue'
import { defineStore } from 'pinia'

const TODOS_KEY = 'todos_key'

export const useTodosStore = defineStore('todosStore', () => {
  const todos = ref([]);

  const saveTodo = () => {
    const parsed = JSON.stringify(todos.value);
    localStorage.setItem(TODOS_KEY, parsed);
  }

  const getAllTask = () => {
    if (localStorage.getItem(TODOS_KEY)) {
      try {
        todos.value = JSON.parse(localStorage.getItem(TODOS_KEY));
      } catch (err) {
        console.log(err);
      }
    }
  }

  const addTodo = (todo) => {
    if (todo) {
      todos.value.push(todo);
      saveTodo();
    }
  }

  const editTodo = (editTodo) => {
    todos.value = todos.value.map((todo) => (todo.id === editTodo.id ? editTodo : todo))
    saveTodo()
  }

  const doneTodo = (id) => {
    let todo = todos.value.filter((todo) => todo.id === id)[0];
    todo.done = !todo.done;
    saveTodo();
  }

  const removeTodo = (id) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
    saveTodo();
  }


  return {
    todos,
     getAllTask, 
     addTodo,
     removeTodo,
     saveTodo,
     doneTodo,
     editTodo
  }

})
