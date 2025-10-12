<script setup lang="ts">
import { ref } from 'vue'
import SculptureOverlay from './SculptureOverlay.vue'
import { useScrollPosition } from './useScrollPosition'
import { data, type SculptureData } from './data'
import { useSculptureData } from './useSculptureData'

const selectedSculpture = ref<SculptureData>()
const { saveScrollPosition, restoreScrollPosition } = useScrollPosition()

const go = (data: SculptureData | undefined) => {
  document.startViewTransition(() => {
    selectedSculpture.value = data
    const scrollFn = data ? saveScrollPosition : restoreScrollPosition
    scrollFn()
  })
}

const sculptures = useSculptureData('CURRENT_INVENTORY')
sculptures.then((d) => console.log(d))
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
          :style="{ viewTransitionName: sculpture.id }"
          class="object-cover aspect-square"
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
