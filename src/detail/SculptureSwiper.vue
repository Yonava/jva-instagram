<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y, Virtual, Zoom } from 'swiper/modules'
import type { Swiper as SwiperEvent } from 'swiper/types'
import { computed, ref } from 'vue'
import type { Sculpture } from '@/useSculptureData'
import SculptureTitleValue from './SculptureTitleValue.vue'
import { useLocalStorage } from '@vueuse/core'

const modules = [Navigation, Pagination, Scrollbar, A11y, Virtual, Zoom]

const INFO_SLIDE = 'sculpture_info';

const props = defineProps<{
  sculpture: Sculpture
}>()

const emits = defineEmits<{
  (e: 'back-out'): void
}>()

const videoRefs = ref<HTMLVideoElement[]>([])

const sculptureSlides = computed(() => {
  if (!props.sculpture.media) return;
  const [firstSlide, ...otherSlides] = props.sculpture.media;
  if (!firstSlide) return;
  return [firstSlide, INFO_SLIDE, ...otherSlides]
})

const slideChanging = (ev: SwiperEvent) => {
  videoRefs.value.forEach((video) => {
    if (!video) return
    video.pause()
    video.currentTime = 0
  })
  const activeVideo = videoRefs.value.find(
    // @ts-expect-error wrong lib in config
    (ref) => ref.src.split('/').at(-1) === sculptureSlides.value[ev.activeIndex]?.slice(1),
  )
  if (!activeVideo) return
  activeVideo.play()
}

const VIDEO_MIME_TYPES = ['mov', 'mp4']
const isVideo = (src: string) => VIDEO_MIME_TYPES.some((mimeType) => src.endsWith(mimeType))

const data = [
  {
    title: 'Weight',
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
  },
]

const handleTouchEnd = (swiper: SwiperEvent) => {
  const atFirstSlide = swiper.activeIndex === 0
  const swipeRight = swiper.touches.diff > 100
  if (atFirstSlide && swipeRight) emits('back-out')
}

const currencyType = useLocalStorage<'USD' | 'Euro'>('currency-type', 'USD')
const toggleCurrencyType = () => {
  if (currencyType.value === 'USD') currencyType.value = 'Euro'
  else currencyType.value = 'USD'
}
</script>

<template>
  <swiper @slide-change="slideChanging" @touch-end="handleTouchEnd" :modules="modules" :slides-per-view="1"
    :pagination="{ clickable: true }" :zoom="true" virtual>
    <swiper-slide v-for="src in sculptureSlides" :key="src">
      <div :class="['w-full h-screen', !isVideo(src) && 'swiper-zoom-container']">
        <video v-if="isVideo(src)" :src="src" ref="videoRefs" class="object-contain w-full h-full" webkit-playsinline
          playsinline loop />
        <div v-else-if="src === INFO_SLIDE" class="p-4 w-full h-full grid place-items-center">
          <div class="w-full h-2/3 bg-gray-200 rounded-md p-4">
            <i class="font-bold text-2xl">{{ sculpture.title }}</i>
            <div class="font-normal flex flex-col gap-1">
              <div>
                {{ sculpture.year }}
              </div>
              <div class="mt-1">
                <div v-for="point in data" :key="point.title">
                  <SculptureTitleValue v-if="point.value" :title="point.title" :value="point.value" />
                </div>
              </div>
              <div @click="toggleCurrencyType" class="mt-1">
                <div v-if="currencyType === 'USD'">
                  {{ sculpture.retailPriceUsd }}
                </div>
                <div v-else>
                  {{ sculpture.retailPriceEuro }} (Excluding VAT)
                </div>
              </div>
            </div>
          </div>
        </div>
        <img v-else :src="src" class="object-contain w-full h-full" />
      </div>
    </swiper-slide>
  </swiper>
</template>