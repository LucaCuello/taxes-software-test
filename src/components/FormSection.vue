<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type bookObject } from '../types/Types'

const bookName = ref(''),
  bookAuthor = ref(''),
  bookDescription = ref(''),
  bookList = ref([] as bookObject[])

const submitForm = () => {
  const item: bookObject = {
    name: bookName.value,
    author: bookAuthor.value,
    description: bookDescription.value
  }

  saveToLocalStorage(item)
  clearFormValues()
}

const saveToLocalStorage = (book: bookObject) => {
  const { name, author } = book
  if (name.trim() === '' || author.trim() === '') return

  bookList.value = [...bookList.value, book]
  localStorage.setItem('ListOfBooks', JSON.stringify(bookList.value))
}

const clearFormValues = () => {
  const fieldsToClear = [bookName, bookAuthor, bookDescription]
  fieldsToClear.forEach((field) => (field.value = ''))
}

onMounted(() => {
  bookList.value = JSON.parse(localStorage.getItem('ListOfBooks') as string) || []
})
</script>

<template>
  <form @submit.prevent="submitForm">
    <label for="book-name">
      <input type="text" id="book-name" placeholder="Book name" v-model="bookName" />
    </label>
    <label for="book-author">
      <input type="text" id="book-author" placeholder="Book author" v-model="bookAuthor" />
    </label>
    <textarea
      id="description"
      placeholder="Description (Optional)"
      v-model="bookDescription"
    ></textarea>
    <button type="submit">Add to the collection</button>
  </form>
  <div class="book-container">
    <template v-for="book in bookList" :key="book.name">
      <div class="book">
        <div class="book-title-container">
          <img src="logo.svg" />
          <span class="book-name">{{ book.name }}</span>
        </div>
        <div class="book-author-container">
          <div class="line"></div>
          <span class="book-author">{{ book.author }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FormSection'
}
</script>

<style scoped>
.book-container {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  gap: 30px;
  width: 100%;
  max-width: 1000px;
}
.book {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: var(--book-color-variant1);
  width: 50px;
  height: 420px;
  gap: 15px;
  border-radius: 15px 15px 0px 0px;
  padding: 15px 0;
  transition: all 200ms ease;
}

.book-title-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
}

.book-author-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  width: 100%;
}

.book span {
  color: #00000094;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.book-name {
  font-family: var(--avenir-font-book);
  font-weight: 800;
  font-size: 20px;
}

.book-author {
  font-family: var(--minion-font-italic);
  font-weight: 800;
}
.book img {
  width: 40px;
  height: auto;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #00000041;
}

.book:hover {
  width: 250px;
  transition: all 200ms ease;
}

.book:hover span {
  writing-mode: horizontal-tb;
  transition: all 600ms ease-in;
  animation: test 1s forwards;
}

@keyframes test {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
