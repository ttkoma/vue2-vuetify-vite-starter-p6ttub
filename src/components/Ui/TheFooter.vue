<template>
  <v-footer v-if='isDesktop' ref='footerRef' app color='transparent'  dark>
    <v-card class='mb-3 mx-auto pa-3' width='100%' :max-width='800' color='blue-grey darken-2'>
      <slot />
    </v-card>
  </v-footer>
  <v-footer v-else ref='footerRef' app dark color='blue-grey darken-2' >
    <slot />
  </v-footer>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useVuetify } from '@/composables/useVuetify'

const emit = defineEmits(['change'])


const vuetify = useVuetify()
const isDesktop = computed(() => vuetify.breakpoint.mdAndUp)

// Ссылка на компонент Footera
const footerRef = ref()

// Следим за высотой футера
// И Обновляем application.footer - для правильного вычисления высоты v-main контейнера
// + плюс при изменении высоты, прокручиваем список до последнего элемента
function observeFooterHeight() {
  const resizeObserver = new ResizeObserver(function(entries) {
    console.log('Size changed', entries[0].target.clientHeight)

    vuetify.application.footer = entries[0].target.clientHeight
    emit('change')

    // vuetify.goTo(`#note-${state.value.length - 1}`, scrolOptions)
  })

  resizeObserver.observe(footerRef.value.$el)
}

// Запускаем отслеживание высоты
// ТОЛЬКО после монтирования, иначе footerRef.value будет = undefined
onMounted(() => observeFooterHeight())
</script>
