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
    <div class="flex flex-col justify-center items-center gap-4 p-4">
      <div
        v-for="sculpture in data"
        :key="sculpture.id"
        class="rounded-2xl overflow-hidden transition duration-700"
      >
        <img
          @click="go(sculpture)"
          :src="sculpture.src"
          class="object-cover aspect-square"
          :style="{ viewTransitionName: sculpture.id }"
        />
      </div>
    </div>
  </div>

  <SculptureOverlay v-else :sculpture="selectedSculpture" @back-out="() => go(undefined)" />
</template>

<style>
body {
  background-color: var(--color-gray-700);
}
</style>
