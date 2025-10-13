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
  const swipeRight = swiper.touches.diff > 150
  if (atFirstSlide && swipeRight) emits('back-out')
}

const infoActive = ref(false)
const nonActiveClasses = 'bg-white w-32 h-12'
const activeClasses = 'bg-white/60 backdrop-blur-lg w-68 h-48'
</script>

<template>
  <div class="absolute w-full h-full flex flex-col items-center">
    <div class="h-full w-full" :style="{ viewTransitionName: viewTransitionName(sculpture) }">
      <div class="absolute top-0 p-6 flex justify-between items-start w-full z-10">
        <button @click="emits('back-out')">
          <ArrowBack size="48" class="text-white"></ArrowBack>
        </button>
        <button
          @click="infoActive = !infoActive"
          :class="[
            'px-4 py-2 font-bold transition-all duration-300 rounded-xl',
            infoActive ? activeClasses : nonActiveClasses,
          ]"
        >
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
      </div>
      <swiper
        @slide-change="slideChanging"
        @touch-end="handleTouchEnd"
        :modules="modules"
        :slides-per-view="1"
        :pagination="{ clickable: true }"
        :zoom="true"
        virtual
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
