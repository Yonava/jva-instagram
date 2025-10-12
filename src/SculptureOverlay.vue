<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation, Pagination, Scrollbar, A11y, Virtual, Zoom } from 'swiper/modules'
import { ref } from 'vue'
import type { Swiper as SwiperEvent } from 'swiper/types'
// @ts-expect-error vue imports
import ArrowBack from 'vue-material-design-icons/ChevronLeft.vue'
import type { Sculpture } from './useSculptureData'
import { viewTransitionName } from './utils'

const props = defineProps<{
  sculpture: Sculpture
}>()

const emits = defineEmits<{
  (e: 'back-out'): void
}>()

const modules = [Navigation, Pagination, Scrollbar, A11y, Virtual, Zoom]

const videoRefs = ref<HTMLVideoElement[]>([])

const slideChanging = (ev: SwiperEvent) => {
  videoRefs.value.forEach((video) => {
    if (!video) return
    video.pause()
    video.currentTime = 0
  })
  const activeVideo = videoRefs.value.find(
    // @ts-expect-error wrong lib in config
    (ref) => ref.src.split('/').at(-1) === props.sculpture.media[ev.activeIndex]?.slice(1),
  )
  if (!activeVideo) return
  activeVideo.play()
}

const VIDEO_MIME_TYPES = ['mov', 'mp4']
const isVideo = (src: string) => VIDEO_MIME_TYPES.some((mimeType) => src.endsWith(mimeType))

const handleTouchEnd = (swiper: SwiperEvent) => {
  const atFirstSlide = swiper.activeIndex === 0
  const swipeRight = swiper.touches.diff > 50
  if (atFirstSlide && swipeRight) emits('back-out')
}
</script>

<template>
  <div class="absolute w-full h-full flex flex-col items-center">
    <div class="h-full w-full" :style="{ viewTransitionName: viewTransitionName(sculpture) }">
      <button @click="emits('back-out')" class="absolute top-0 left-0 p-4 z-10">
        <ArrowBack class="text-white"></ArrowBack>
      </button>
      <swiper
        @slide-change="slideChanging"
        @touch-end="handleTouchEnd"
        :modules="modules"
        :slides-per-view="1"
        :on-zoom-change="(s, scale) => (s.allowTouchMove = scale <= 1)"
        :pagination="{ clickable: true }"
        :zoom="true"
        virtual
        ref="swiperRef"
      >
        <swiper-slide v-for="src in sculpture.media" :key="src">
          <div :class="['w-full h-screen', !isVideo(src) && 'swiper-zoom-container']">
            <video
              v-if="isVideo(src)"
              :src="src"
              ref="videoRefs"
              class="object-contain w-full h-full"
              webkit-playsinline
              playsinline
              loop
            />
            <img v-else :src="src" class="object-contain w-full h-full" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
