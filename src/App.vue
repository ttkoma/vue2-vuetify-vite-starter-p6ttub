<template>
  <v-app id="app">
    <v-main class="grey lighten-2">
      <TheContainer class='py-1 '>
        <div v-for="(item, i) in state" :key="i" class='my-2'>
          <TheNote :id="`note-${i}`" v-bind="item" @remove="removeItem(i)" />
        </div>

      </TheContainer>
    </v-main>

    <TheFooter @change="scrollToLastNote" app dark>
      <NoteInput @input="onNoteInput" dark />
    </TheFooter>
  </v-app>
</template>

<script setup>
import { TheNote, NoteInput } from "./components/Note"
import { computed, nextTick, provide, ref } from "vue"
import { useVuetify } from "./composables/useVuetify"
import { TheContainer, TheFooter } from "./components/Ui"
import { notesMock } from "./mocks/notes"

const state = ref([...notesMock, ...notesMock])
const vuetify = useVuetify()

// Делаем свойство доступным во всех дочерних компонентах (inject)
const isDesktop = computed(() => vuetify.breakpoint.smAndUp)
provide("isDesktop", isDesktop)

const scrollToLastNote = () => {
  const scrolOptions = {
    duration: 1500,
    offset: 0,
    easing: "easeInOutQuad",
  }

  vuetify.goTo(`#note-${state.value.length - 1}`, scrolOptions)
}

const onNoteInput = (event) => {
  state.value.push({
    comment: event.text.length,
    editable: true,
    important: event.isImportant,
    fileSize: event.file ? 30 : 0,
  })

  // Прокрутим окно до последнего сообщения, НО ТОЛЬКО ПОСЛЕ отрисовки элемента в DOM
  nextTick(() => {
    scrollToLastNote()
  })
}

const removeItem = (index) => {
  state.value.splice(index, 1)
}
</script>
