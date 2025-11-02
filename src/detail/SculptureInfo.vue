<script setup lang="ts">
import type { Sculpture } from '@/useSculptureData';
import { ref } from 'vue';
import SculptureTitleValue from './SculptureTitleValue.vue';

const collapsed = 'w-32 h-12'
const nonCollapsed = 'w-68 h-96'

const infoActive = ref(false)
const nonActiveClasses = `bg-white ${collapsed}`
const activeClasses = `bg-white/75 backdrop-blur-lg ${nonCollapsed}`
const props = defineProps<{ sculpture: Sculpture }>()

const data = [
  {
    title: 'Weighs',
    value: props.sculpture.weight
  },
  {
    title: 'Dimensions',
    value: props.sculpture.dimensions,
  },
  {
    title: 'Medium',
    value: props.sculpture.medium
  },
  {
    title: 'Location',
    value: props.sculpture.location,
  },
  {
    title: 'Explanation',
    value: props.sculpture.explanation,
  }
]
</script>

<template>
  <button @click="infoActive = !infoActive" :class="[
    'px-4 py-2 font-bold transition-all duration-300 rounded-xl relative overflow-hidden',
    infoActive ? activeClasses : nonActiveClasses,
  ]">
    <span :class="[
      'transition-opacity duration-200',
      infoActive ? 'opacity-0' : ''
    ]">Learn More</span>
    <div :class="[
      `absolute ${nonCollapsed} text-right right-0 top-0 transition-opacity duration-200 px-4 py-2`,
      infoActive ? '' : 'opacity-0',
    ]">
      <h1 class="text-xl">
        {{ sculpture.title }}
      </h1>
      <div class="font-normal flex flex-col gap-1">
        <div>
          {{ sculpture.year }}
        </div>
        <div v-for="point in data" :key="point.title">
          <SculptureTitleValue v-if="point.value" :title="point.title" :value="point.value" />
        </div>
      </div>
    </div>
  </button>
</template>