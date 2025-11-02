<script setup lang="ts">
import type { Sculpture } from '@/useSculptureData';
import { ref } from 'vue';

const infoActive = ref(false)
const nonActiveClasses = 'bg-white w-32 h-12'
const activeClasses = 'bg-white/60 backdrop-blur-lg w-68 h-48'
defineProps<{ sculpture: Sculpture }>()
</script>

<template>
  <button @click="infoActive = !infoActive" :class="[
    'px-4 py-2 font-bold transition-all duration-300 rounded-xl',
    infoActive ? activeClasses : nonActiveClasses,
  ]">
    <span v-if="!infoActive">Learn More</span>
    <div v-else>
      <h1 class="text-xl">
        {{ sculpture.title }}
      </h1>
      <div class="font-normal flex flex-col gap-1">
        <div>
          {{ sculpture.year }}
        </div>
        <div>
          {{ sculpture.weight }}
        </div>
        <div>
          {{ sculpture.dimensions }}
        </div>
        <div>
          {{ sculpture.medium }}
        </div>
        <div>
          {{ sculpture.location }}
        </div>
        <div>
          {{ sculpture.explanation }}
        </div>
      </div>
    </div>
  </button>
</template>