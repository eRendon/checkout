<script setup lang="ts">
import Home from './pages/home.vue'
import Alert from './components/atoms/Alert.vue'
import { useAlertStore } from './store/alert'

const alertStore = useAlertStore()

</script>

<template>
  <Home/>
  <Alert :icon="alertStore.icon" :show="alertStore.show" :message="alertStore.message"/>
</template>

<style scoped>
</style>
