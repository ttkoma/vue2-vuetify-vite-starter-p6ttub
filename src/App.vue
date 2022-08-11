<template>
  <v-app id="app">
    <v-main class="grey lighten-2">
      <PageContainer>
        <TheNote v-for="(item, i) in state" :id="`note-${i}`" :key="i" v-bind="item" />
      </PageContainer>

      <PageContainer>
        <v-footer app dark>
          <NoteInput @input="onNoteInput" />
        </v-footer>
      </PageContainer>
    </v-main>
  </v-app>
</template>

<script setup>
import TheNote from "./components/Note/TheNote.vue"
import NoteInput from "./components/Note/NoteInput.vue"
import { computed, nextTick, provide, ref } from "vue"
import { useVuetify } from "./composables/useVuetify"
import { PageContainer } from "./components/Ui"

const state = ref([
  {
    comment: 200,
    editable: true,
    fileSize: 30,
    important: true,
  },
  {
    comment: 50,
    editable: false,
    fileSize: 0,
    important: true,
  },
  {
    comment: 0,
    editable: false,
    fileSize: 58,
    important: false,
  },
  {
    comment: 100,
    editable: false,
    fileSize: 0,
    important: false,
  },
])
const { breakpoint, goTo } = useVuetify()
const isDesktop = computed(() => breakpoint.smAndUp)
provide("isDesktop", isDesktop)

const onNoteInput = (event) => {
  state.value.push({
    comment: event.text.length,
    editable: true,
    important: event.isImportant,
    fileSize: event.file ? 30 : 0,
  })

  // После добавления елемента в DOM прокрутим окно до него
  nextTick(() => {
    goTo(`#note-${state.value.length - 1}`)
  })
}
</script>
