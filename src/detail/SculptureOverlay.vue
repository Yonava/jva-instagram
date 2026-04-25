<script setup lang="ts">
// @ts-expect-error vue imports
import ArrowBack from 'vue-material-design-icons/ChevronLeft.vue'
import type { Sculpture } from '../useSculptureData'
import { viewTransitionName } from '../utils'
import SculptureSwiper from './SculptureSwiper.vue'

const props = defineProps<{
  sculpture: Sculpture
}>()

const emits = defineEmits<{
  (e: 'back-out'): void
}>()

const inquirySubjectLine = props.sculpture.title ? encodeURIComponent(`Inquire About ${props.sculpture.title}`) : undefined;
const inquiryEmail = 'office@julianvossandreae.com';
const inquiryUrl = `mailto:${inquiryEmail}${inquirySubjectLine ? `?subject=${inquirySubjectLine}` : ''}`
</script>

<template>
  <div class="absolute w-full h-full flex flex-col items-center">
    <div class="h-full w-full" :style="{ viewTransitionName: viewTransitionName(sculpture) }">
      <div class="absolute top-0 p-6 z-10 w-full">
        <div class="flex justify-between items-center">
          <button @click="emits('back-out')">
            <ArrowBack :size="48" class="text-white"></ArrowBack>
          </button>
          <a :href="inquiryUrl" class="bg-gray-200 text-xl text-gray-800 px-8 py-2 rounded-full">
            Inquire
          </a>
        </div>
      </div>
      <SculptureSwiper @back-out="emits('back-out')" :sculpture="sculpture" />
    </div>
  </div>
</template>

<style scoped>
.footer-container {
  position: fixed;
  bottom: env(safe-area-inset-bottom);
}
</style>
