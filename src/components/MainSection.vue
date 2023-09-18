<script setup lang="ts">
import FormSection from './FormSection.vue'
import logo from '@/assets/logo.svg'
</script>

<template>
  <Transition appear>
    <main>
      <div class="main-container">
        <img :src="logo" class="page-logo" draggable="false" alt="logo of the page" />
        <h1>Welcome to BookBuddy!</h1>
        <p>
          Let's get started on building your book collection! Please enter the author's name and the
          book's title below to begin displaying your books on the shelf.
        </p>
      </div>
      <FormSection />
    </main>
  </Transition>
</template>

<script lang="ts">
export default {
  name: 'MainSection'
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
