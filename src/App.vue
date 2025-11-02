<script setup lang="ts">
import { ref } from 'vue'
import SculptureOverlay from './detail/SculptureOverlay.vue'
import { useScrollPosition } from './useScrollPosition'
import { useSculptureData, type Sculpture } from './useSculptureData'
import { viewTransitionName } from './utils'
import { useVirtualList } from '@vueuse/core'

const selectedSculpture = ref<Sculpture>()

const { sculptures } = useSculptureData('CURRENT_INVENTORY')

const {
  list: sculptureList,
  containerProps,
  wrapperProps,
  scrollTo,
} = useVirtualList(sculptures, {
  itemHeight: 382,
  overscan: 2,
})

const { saveScrollPosition, restoreScrollPosition } = useScrollPosition(scrollTo)

const go = (data: Sculpture | undefined) => {
  document.startViewTransition(() => {
    selectedSculpture.value = data
    if (data) saveScrollPosition(+data.id)
    else restoreScrollPosition()
  })
}
</script>

<template>
  <div v-if="!selectedSculpture">
    <div v-bind="containerProps" class="p-4" style="height: 100svh">
      <div v-bind="wrapperProps" class="flex flex-col gap-4">
        <div v-for="{ data: sculpture } in sculptureList" :key="sculpture.id"
          class="relative rounded-md overflow-hidden w-full">
          <img @click="go(sculpture)" :src="sculpture.thumbnail"
            :style="{ viewTransitionName: viewTransitionName(sculpture) }" class="object-cover w-full aspect-square" />
          <div class="absolute bottom-0 bg-white/65 font-bold w-full py-6 px-4 text-2xl">
            {{ sculpture.title }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <SculptureOverlay v-else :sculpture="selectedSculpture" @back-out="() => go(undefined)" />
</template>

<style>
html,
body {
  background-color: var(--color-gray-700);
  touch-action: none;
  overscroll-behavior: none;
}
</style>
