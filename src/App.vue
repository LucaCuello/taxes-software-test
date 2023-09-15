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
    <img src="logo.svg" class="page-logo" draggable="false" alt="logo of the page" />
    <h1>Welcome to BookBuddy!</h1>
    <p>
      Let's get started on building your book collection! Please enter the author's name and the
      book's title below to begin displaying your books on the shelf.
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&display=swap');
</style>
