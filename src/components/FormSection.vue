<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type bookObject } from '../types/Types'
import BookSection from './BookSection.vue'

const bookName = ref(''),
  bookAuthor = ref(''),
  bookDescription = ref(''),
  bookColor = ref('book-color-peppermint'),
  bookList = ref([] as bookObject[])

const submitForm = () => {
  const item: bookObject = {
    name: bookName.value,
    author: bookAuthor.value,
    color: bookColor.value,
    description: bookDescription.value,
    read: false
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
  bookColor.value = 'book-color-peppermint'
  fieldsToClear.forEach((field) => (field.value = ''))
}

const removeBook = (selectedBook: {}) => {
  bookList.value = bookList.value.filter((book) => book !== selectedBook)
  localStorage.setItem('ListOfBooks', JSON.stringify(bookList.value))
}

const markAsRead = (index: number) => {
  const book = bookList.value[index]
  book.read = !book.read
  localStorage.setItem('ListOfBooks', JSON.stringify(bookList.value))
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
    <div class="book-color-container">
      <span>Book color:</span>
      <div class="bookshelf-color-container">
        <input
          type="radio"
          id="peppermint"
          value="book-color-peppermint"
          name="bookshelf-color"
          v-model="bookColor"
          checked
        />
        <label for="peppermint" class="peppermint">Peppermint</label>
        <input
          type="radio"
          id="yellow"
          value="book-color-yellow"
          name="bookshelf-color"
          v-model="bookColor"
        />
        <label for="yellow" class="yellow">Yellow</label>
        <input
          type="radio"
          id="sky"
          value="book-color-sky"
          name="bookshelf-color"
          v-model="bookColor"
        />
        <label for="sky" class="sky">Sky</label>
        <input
          type="radio"
          id="peach"
          value="book-color-peach"
          name="bookshelf-color"
          v-model="bookColor"
        />
        <label for="peach" class="peach">Peach</label>
        <input
          type="radio"
          id="lavender"
          value="book-color-lavender"
          name="bookshelf-color"
          v-model="bookColor"
        />
        <label for="lavender" class="lavender">Lavender</label>
      </div>
    </div>

    <textarea
      id="description"
      placeholder="Description (Optional)"
      v-model="bookDescription"
    ></textarea>
    <button type="submit">Add to the collection</button>
  </form>
  <BookSection :book-list="bookList" :mark-as-read="markAsRead" :remove-book="removeBook" />
</template>

<script lang="ts">
export default {
  name: 'FormSection'
}
</script>

<style scoped>
.book-color-container {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  border-right: 1px solid rgba(0, 0, 0, 0.13);
  border-left: 1px solid rgba(0, 0, 0, 0.13);
}
.book-color-container span {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #4b6164;
  padding: 10px 5px;
}

.bookshelf-color-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
}

.bookshelf-color-container input {
  display: none;
}

.bookshelf-color-container label {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  width: 100%;
  height: 100%;
}

.bookshelf-color-container input:checked + label {
  box-shadow: 0px 2px var(--main-color);
}
</style>
