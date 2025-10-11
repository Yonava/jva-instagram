<script setup lang="ts">
import { ref } from 'vue'
import SculptureOverlay from './SculptureOverlay.vue'
import { useScrollPosition } from './useScrollPosition'
import { data, type SculptureData } from './data'

const selectedSculpture = ref<SculptureData>()
const { saveScrollPosition, restoreScrollPosition } = useScrollPosition()

const go = (data: SculptureData | undefined) => {
  document.startViewTransition(() => {
    selectedSculpture.value = data
    const scrollFn = data ? saveScrollPosition : restoreScrollPosition
    scrollFn()
  })
}
</script>

<template>
  <div v-if="!selectedSculpture">
    <div class="flex flex-col justify-center items-center gap-12 p-4">
      <div v-for="sculpture in data" :key="sculpture.id">
        <img
          @click="go(sculpture)"
          :src="sculpture.src"
          class="w-12 h-12 object-contain"
          :style="{ viewTransitionName: sculpture.id }"
        />
      </div>
    </div>
  </div>

  <SculptureOverlay v-else :sculpture="selectedSculpture" />
</template>

<style>
body {
  background-color: var(--color-gray-700);
}
</style>
