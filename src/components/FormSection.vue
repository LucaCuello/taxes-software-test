<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type bookObject } from '../types/Types'

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

  console.log(item)
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
    <div class="test">
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
  <div class="book-container">
    <template v-for="(book, index) in bookList" :key="book.name">
      <div class="book" :class="book.color">
        <div class="book-title-container">
          <img src="logo.svg" draggable="false" alt="book logo" />
          <span class="book-name">{{ book.name }}</span>
        </div>
        <template v-if="book.read">
          <v-icon
            name="bi-bookmark-check-fill"
            class="read-btn read-filled"
            @click="markAsRead(index)"
          />
        </template>
        <template v-else>
          <v-icon name="bi-bookmark-check" class="read-btn" @click="markAsRead(index)" />
        </template>
        <v-icon name="bi-trash" class="delete-btn" @click="removeBook(book)" />
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
.test {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  border-right: 1px solid rgba(0, 0, 0, 0.13);
  border-left: 1px solid rgba(0, 0, 0, 0.13);
}
.test span {
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
.peppermint,
.book-color-peppermint {
  background-color: var(--book-color-peppermint);
}

.yellow,
.book-color-yellow {
  background-color: var(--book-color-yellow);
}

.sky,
.book-color-sky {
  background-color: var(--book-color-sky);
}

.peach,
.book-color-peach {
  background-color: var(--book-color-peach);
}

.lavender,
.book-color-lavender {
  background-color: var(--book-color-lavender);
}

.bookshelf-color-container input:checked + label {
  box-shadow: 0px 2px var(--main-color);
}

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
  position: relative;
  width: 50px;
  height: 420px;
  gap: 15px;
  border-radius: 15px 15px 0px 0px;
  padding: 15px 0;
  transition: all 200ms ease;
}

.delete-btn,
.read-btn {
  position: absolute;
  cursor: pointer;
  opacity: 0;
  right: 15px;
  color: var(--main-color);
  transition: all 200ms ease;
}

.read-btn {
  right: unset;
  left: 15px;
}

.read-btn:hover {
  transform: scale(1.2);
  transition: all 200ms ease;
}

.delete-btn:hover {
  transform: scale(1.2);
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
  text-align: center;
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

.book:hover .delete-btn,
.book:hover .read-btn {
  opacity: 1;
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
