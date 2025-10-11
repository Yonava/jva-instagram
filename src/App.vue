<script setup lang="ts">
import { ref } from 'vue'
import SculptureOverlay from './SculptureOverlay.vue'
import { useScrollPosition } from './useScrollPosition'

const colors = ['bg-green-500', 'bg-blue-500', 'bg-orange-500', 'bg-red-500', 'bg-yellow-500']
const selectedColor = ref<string>()
const { saveScrollPosition, restoreScrollPosition } = useScrollPosition()

const go = (color: string | undefined) => {
  document.startViewTransition(() => {
    selectedColor.value = color
    const scrollFn = color ? saveScrollPosition : restoreScrollPosition
    scrollFn()
  })
}
</script>

<template>
  <div v-if="!selectedColor">
    <div class="flex flex-col justify-center items-center gap-12 p-4">
      <div v-for="color in colors" :key="color">
        <div
          @click="go(color)"
          :class="[color, 'w-64', 'h-64']"
          :style="{ viewTransitionName: color }"
        ></div>
      </div>
    </div>
  </div>

  <SculptureOverlay v-else :color="selectedColor" />
</template>

<style>
body {
  background-color: var(--color-gray-700);
}
</style>
