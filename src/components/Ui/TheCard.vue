<script setup>

import { inject } from 'vue'

defineProps(['important'])
const isDesktop = inject('isDesktop')

</script>

<template>
  <v-card :tile='!isDesktop' class='mx-auto' max-width='800' elevation='1'>
    <div class='d-flex flex-row'>
      <div class='flex py-1'>
        <slot />
      </div>

      <v-sheet v-if='important' :rounded='isDesktop' class='rounded-r-0' color='warning' height='100%'
               style='position: absolute; left: 0' width='3px' />
    </div>
  </v-card>
</template>



