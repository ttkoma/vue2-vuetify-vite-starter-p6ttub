<template>
  <v-app id="app">
    <v-main class="grey lighten-2">
      <PageContainer>
        <TheNote v-for="(item, i) in state" :id="`note-${i}`" :key="i" v-bind="item" />
      </PageContainer>
    </v-main>

    <v-footer ref="footerRef" app dark>
      <NoteInput @input="onNoteInput" />
    </v-footer>
  </v-app>
</template>

<script setup>
import TheNote from "./components/Note/TheNote.vue"
import NoteInput from "./components/Note/NoteInput.vue"
import { computed, nextTick, provide, ref, onMounted } from "vue"
import { useVuetify } from "./composables/useVuetify"
import { PageContainer } from "./components/Ui"
import { notesMock } from "./mocks/notes"
import * as easings from "vuetify/lib/services/goto/easing-patterns"

const state = ref([...notesMock, ...notesMock])
const vuetify = useVuetify()
const isDesktop = computed(() => vuetify.breakpoint.smAndUp)
provide("isDesktop", isDesktop)

const scrolOptions = {
  duration: 1000,
  offset: 500,
  easing: "easeInOutQuad",
}

const onNoteInput = (event) => {
  state.value.push({
    comment: event.text.length,
    editable: true,
    important: event.isImportant,
    fileSize: event.file ? 30 : 0,
  })

  // После добавления элемента в DOM прокрутим окно до него
  nextTick(() => {
    vuetify.goTo(`#note-${state.value.length - 1}`, scrolOptions)
  })
}

// Ссылка на компонент Footera
const footerRef = ref()

// Следим за высотой футера
// И Обновляем application.footer - для правильного вычисления высоты v-main контейнера
// + плюс при изменении высоты, прокручиваем список до последнего элемента
function observeFooterHeight() {
  const resizeObserver = new ResizeObserver(function (entries) {
    console.log("Size changed", entries[0].target.clientHeight)

    vuetify.application.footer = entries[0].target.clientHeight

    vuetify.goTo(`#note-${state.value.length - 1}`, scrolOptions)
  })

  resizeObserver.observe(footerRef.value.$el)
}

// Запускаем отслеживание высоты
// ТОЛЬКО после монтирования, иначе footerRef.value будет = undefined
onMounted(() => observeFooterHeight())
</script>
