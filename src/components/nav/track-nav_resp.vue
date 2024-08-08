<template>
  <div>
    <ResponsiveComponent
      :smallComponent="SmallNav"
      :largeComponent="LargeNav"
      :breakpoint="768"
    />
  </div>
</template>

<script>
import ResponsiveComponent from './components/ResponsiveComponent.vue';
import SmallNav from './components/SmallNav.vue';
import LargeNav from './components/LargeNav.vue';

export default {
  components: {
    ResponsiveComponent,
    SmallNav,
    LargeNav
  }
};
</script>