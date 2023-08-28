<script setup>
import { ref, onMounted, computed } from "vue"
import { useTodosStore } from '../stores/todosStore'

const store = useTodosStore();
const todoStore = computed(() => store.todos);

const newTodo = ref('');
const todoEdit = ref({});
const openModal = ref(false);

onMounted(() => {
  store.getAllTask()
});

const addTaskHandler = () => {
  if (newTodo.value !== '') {
    const todo = {
      id: crypto.randomUUID(),
      text: newTodo.value,
      done: false
    }
    store.addTodo(todo);
    newTodo.value = "";
  }
}

const openEditTodoModal = (todo) => {
  openModal.value = true
  todoEdit.value = todo
}

const closeModal = () => {
  openModal.value = false
  todoEdit.value = {}
}

const clickOutSide = (e) => {
  if (e.target?.classList.contains('modal')) {
    closeModal()
  }
}

const saveEditTaskHandler = () => {
  todoEdit.value?.text && store.editTodo(todoEdit.value)
  closeModal()
}


</script>

<template>
  <div class="task-block">

    <input @keyup.enter="addTaskHandler()" v-model="newTodo" class="task-block__input" type="text"
      placeholder="Добавьте задачу...">

    <button class="task-block__btn" @click="addTaskHandler()">
      add task
    </button>

    <!--список заметок-->

    <div class="task-block__bottom-section">

      <TransitionGroup class="task-block__list" name="list" tag="ul">
        <li class="task-block__list-item" v-for="todo in todoStore" :key="todo.id">
          <h3 class="task-block__list-item_title">
            {{ todo.text }}
          </h3>

          <div class="task-block__list-item_btn">

            <button @click="store.doneTodo(todo.id)" class="task-block__list-btn task-block__green">
              <i :class="{ 'checked': todo.done }" class="fa fa-solid fa-check"></i>
            </button>

            <button @click="openEditTodoModal(todo)" class="task-block__list-btn task-block__org">
              <i checed class="fa  fa-light fa-pen"></i>
            </button>

            <button @click="store.removeTodo(todo.id)" class="task-block__list-btn task-block__red">
              <i class="fa  fa-light fa-close"></i>
            </button>

          </div>

        </li>
      </TransitionGroup>
    </div>

  </div>
  <!--modal-->


  <Teleport to="body">
    <div v-if="openModal" class="modal" @click="(e) => clickOutSide(e)">
      <div class="modal__content">
        <p class="modal__content_text">Pедактировать заметку</p>
        <input v-model="todoEdit.text" class="modal__content__input" type="text" />
        <div class="modal__content__buttons">
          <button class="agree" @click="saveEditTaskHandler">Cохранить</button>
          <button class="cancel" @click="closeModal">Отменить</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss"></style>
