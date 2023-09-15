<script setup lang="ts">
import { ref } from 'vue'
import { type bookObject } from './types/Types'

const bookName = ref(''),
  bookAuthor = ref(''),
  bookDescription = ref('')

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
  localStorage.setItem('ListOfBooks', JSON.stringify(book))
}

const clearFormValues = () => {
  bookName.value = ''
  bookAuthor.value = ''
  bookDescription.value = ''
}
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
