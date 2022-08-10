<template>
  <v-app id="app">
    <v-container>
      <TheNote />
    </v-container>
  </v-app>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import TheNote from './components/Note/TheNote.vue'

export default defineComponent({
  name: 'App',
  components: {
    TheNote,
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
