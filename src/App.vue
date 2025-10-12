<script setup lang="ts">
import { ref } from 'vue'
import SculptureOverlay from './SculptureOverlay.vue'
import { useScrollPosition } from './useScrollPosition'
import { useSculptureData, type Sculpture } from './useSculptureData'
import { viewTransitionName } from './utils'

const selectedSculpture = ref<Sculpture>()
const { saveScrollPosition, restoreScrollPosition } = useScrollPosition()

const go = (data: Sculpture | undefined) => {
  document.startViewTransition(() => {
    selectedSculpture.value = data
    const scrollFn = data ? saveScrollPosition : restoreScrollPosition
    scrollFn()
  })
}

const { sculptures } = useSculptureData('CURRENT_INVENTORY')
</script>

<template>
  <div v-if="!selectedSculpture">
    <div class="flex flex-col justify-center items-center gap-4 p-4">
      <div
        v-for="sculpture in sculptures"
        :key="sculpture.id"
        class="relative rounded-md overflow-hidden transition duration-700 w-full"
      >
        <img
          @click="go(sculpture)"
          :src="sculpture.thumbnail"
          :style="{ viewTransitionName: viewTransitionName(sculpture) }"
          class="object-cover w-full aspect-square"
        />
        <div class="absolute bottom-0 bg-white/65 font-bold w-full py-6 px-4 text-2xl">
          {{ sculpture.title }}
        </div>
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
