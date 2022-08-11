<template>
  <TheCard :important='important' class='the-note '>

    <!-- ШАПКА -->
    <v-list-item dense>
      <v-list-item-avatar color='blue-grey lighten-3' size='48' style='padding: 2px'>
        <v-avatar color='grey lighten-3' size='100%'>
          <v-icon size='40'> mdi-account</v-icon>
        </v-avatar>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class='font-weight-medium blue-grey--text text--darken-2'>
          Лапеев Константин
        </v-list-item-title
        >
        <v-list-item-subtitle class='blue-grey--text text--darken-1'>
          <span>10.08.2022 22:30</span>
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action class='flex-row align-center align-baseline py-2 my-0'>
        <!-- ВАРИАНТ-2 Оформление Важного комментария:   -->
        <v-icon v-show='important' color='warning'>mdi-alert-circle</v-icon>

        <template v-if='editable'>
          <v-btn class='ml-2' color='blue-grey lighten-2' icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn color='blue-grey lighten-2' icon @click='onRemove'>
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </template>
      </v-list-item-action>
    </v-list-item>

    <!-- ТЕКС КОММЕНТАРИЯ -->
    <template v-if='comment'>
      <v-divider inset />

      <v-list-item dense>
        <v-list-item-content>
          <v-list-item-title class='text-body-2 text-wrap' style='line-height: 18px'>
            {{ lorem(comment) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <!--  ВЛОЖЕНИЕ     -->
    <div v-if='fileSize'>
      <v-divider inset />

      <v-list-item dense @click='onClickDownload'>
        <v-list-item-content>
          <v-list-item-title class='font-weight-regular green--text'>
            {{ lorem(fileSize) }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-action-text class='blue-grey--text'>
          <span class='text-caption'> {{ fileSize * 24 }} Кб</span>
          <v-icon color='green darken-1'>mdi-download</v-icon>
        </v-list-item-action-text>
      </v-list-item>
    </div>


  </TheCard>
</template>

<script setup>
import { inject } from 'vue'
import { TheCard } from '@/components/Ui'

const isDesktop = inject('isDesktop')

defineProps({
  comment: {
    type: Number
  },
  editable: {
    type: Boolean
  },
  important: {
    type: Boolean
  },
  fileSize: {
    type: Number
  },
  owned: {
    type: Boolean
  }
})
const emit = defineEmits(['remove'])

const loremText =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
  'Aspernatur consectetur dignissimos hic iure minus nam obcaecati temporibus unde. ' +
  'Accusamus aliquid aperiam ducimus eligendi fuga hic illo, ipsa minima molestias neque nesciunt nobis repellat soluta tenetur voluptates? ' +
  'Culpa deleniti eligendi esse explicabo fugit harum maiores necessitatibus qui quos, ratione, sit ullam.\n'

const lorem = (length) => loremText.substring(0, length)
const onClickDownload = () => alert('Скачиваем')
const onRemove = () => emit('remove')
</script>
