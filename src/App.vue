<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type bookObject } from './types/Types'

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
  <main>
    <img src="logo.svg" />
    <h1>Welcome to BookBuddy!</h1>
    <p>
      Easily organize and display your favorite books by name and authors. Explore your literary
      world at a glance.
    </p>
  </main>
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

  <!-- <template v-for="book in bookList" :key="book.name">
    <h1>{{ book.name }}</h1>
    <h1>{{ book.author }}</h1>
    <p>{{ book.description }}</p>
  </template> -->
</template>

<style>
@import url('../src/assets/base.css');
body {
  background-color: var(--background-color);
}
h1 {
  font-family: var(--avenir-font-black);
}
p {
  font-family: var(--minion-font-regular);
}
</style>
