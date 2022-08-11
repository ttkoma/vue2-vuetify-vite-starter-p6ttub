<template>

      <v-textarea
        v-model="noteModel.text"
        append-outer-icon="mdi-send"
        auto-grow
        class="text-body-2"
        color="green"
        dense
        flat
        hide-details
        full-width
        placeholder="Начните писать"
        prepend-icon="mdi-attachment"
        :rows='isDesktop + 1'
        :row-height="28"
        solo-inverted
        dark

        @focusin="toggleFocused"
        @focusout="toggleFocused"
        @click:prepend="onClickAttachment"
        @click:append-outer="onSend"
        @keydown.ctrl.enter="onSend"
      >
        <template #prepend-inner>
          <v-icon :color="importantIconColor" @click="toggleImportant" left>mdi-alert-circle-outline</v-icon>
        </template>
      </v-textarea>

</template>

<script setup>
import { computed, ref, reactive, inject } from 'vue'

const emit = defineEmits(["input"])

/* data */
const noteModel = reactive({
  text: "",
  isImportant: false,
  hasFile: false,
})

const isDesktop = inject("isDesktop")
const isFocused = ref(false)

/* computed */
const importantIconColor = computed(() => {
  if (isFocused.value) {
    return noteModel.isImportant ? "warning" : "grey"
  }

  return noteModel.isImportant ? "warning lighten-2" : "grey"
})

/* methods */
const toggleImportant = () => (noteModel.isImportant = !noteModel.isImportant)
const toggleFocused = () => (isFocused.value = !isFocused.value)
const onClickAttachment = () => {
  alert("Выберите файл")
  noteModel.hasFile = true
}
const reset = () => {
  noteModel.text = ""
  noteModel.hasFile = false
  noteModel.isImportant = false
}

const onSend = () => {
  emit("input", { text: noteModel.text, isImportant: noteModel.isImportant, file: noteModel.hasFile })
  reset()
}
</script>
