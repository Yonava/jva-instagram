<script setup lang="ts">
// @ts-expect-error vue imports
import ArrowBack from 'vue-material-design-icons/ChevronLeft.vue'
import type { Sculpture } from '../useSculptureData'
import { viewTransitionName } from '../utils'
import SculptureSwiper from './SculptureSwiper.vue'
import SculptureInfo from './SculptureInfo.vue'

defineProps<{
  sculpture: Sculpture
}>()

const emits = defineEmits<{
  (e: 'back-out'): void
}>()
</script>

<template>
  <div class="absolute w-full h-full flex flex-col items-center">
    <div class="h-full w-full" :style="{ viewTransitionName: viewTransitionName(sculpture) }">
      <div class="absolute top-0 p-6 flex justify-between items-start w-full z-10">
        <button @click="emits('back-out')">
          <ArrowBack :size="48" class="text-white"></ArrowBack>
        </button>
        <SculptureInfo :sculpture="sculpture" />
      </div>
      <SculptureSwiper @back-out="emits('back-out')" :sculpture="sculpture" />
    </div>
  </div>
</template>
