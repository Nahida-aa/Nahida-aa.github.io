<template>
  <div>
    <component :is="currentComponent"></component>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { defineProps } from 'vue';

// 定义 props
const props = defineProps({
  smallComponent: {
    type: Object,
    required: true
  },
  largeComponent: {
    type: Object,
    required: true
  },
  breakpoint: {
    type: Number,
    default: 768
  }
});

const windowWidth = ref(window.innerWidth);

const currentComponent = computed(() => {
  return windowWidth.value < props.breakpoint ? props.smallComponent : props.largeComponent;
});

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>