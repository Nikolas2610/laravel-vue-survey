<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { mapState } from 'vuex';
import HelloWorld from './components/HelloWorld.vue'
export default {
  computed: {
    ...mapState(['user'])
  },
  components: {
    HelloWorld
  }
}
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>
