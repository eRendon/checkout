<template>
  <form class="max-w-sm">
    <label for="countries" class="block mb-2 text-xl sm:text-3xl font-medium text-gray-900 dark:text-white">{{ label }}</label>
    <select @change="handleChange" v-model="selectedValue" id="countries" class="bg-gray-50 text-xl sm:text-3xl border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option v-for="option in options"
              :disabled="option.disabled"
              :value="option.value"
              :key="option.value">
        {{ option.label }}
      </option>
    </select>
  </form>
</template>

<script lang="ts" setup>


import { ref, watch } from 'vue'
import { ISelectOptions } from '@/interfaces/components/ISelectOptions'

const props = defineProps<{
  modelValue: string
  options: ISelectOptions[]
  label: string
}>()

const emit = defineEmits(['update:modelValue', 'change'])

const selectedValue = ref<string>(props.modelValue)
const handleChange = (event: Event) => {
  const { value } = event.target as HTMLSelectElement
  selectedValue.value = value
  emit('update:modelValue', selectedValue.value)
  emit('change', selectedValue.value)
}

watch(() => props.modelValue, (newValue) => {
  selectedValue.value = newValue
})

watch(() => props.modelValue, (newValue) => {
  selectedValue.value = newValue
})

</script>
