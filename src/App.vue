<script setup lang="ts">
import Alert from './components/atoms/Alert.vue'
import { useAlertStore } from './store/alert/alertStore'

const alertStore = useAlertStore()

</script>

<template>
  <RouterView/>
  <Alert :icon="alertStore.icon" :show="alertStore.show" :message="alertStore.message"/>
</template>

<style scoped>
</style>
