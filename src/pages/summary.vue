<template>
  <div class="w-10/12 md:w-4/12 mr-auto ml-auto mt-20">
    <div class="w-3/12 md:w-2/12 mr-auto ml-auto mb-5">
      <img :src="imageStatus(summaryStore.transactionStatus)">
    </div>
    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="border text-xl md:text-3xl py-3 px-4 md:px-10 flex justify-between w-full flex-row">
        <div class="font-bold tracking-tight"># Transacción: </div>
        <div class="font-normal">{{ summaryStore.id }}</div>
      </div>
      <div class="border py-3 text-xl md:text-3xl px-4 md:px-10  flex justify-between w-full flex-row">
        <div class="font-bold tracking-tight">Estado:</div>
        <div class="font-normal">{{ summaryStore.status }}</div>
      </div>
      <div class="border py-3 text-xl md:text-3xl px-4 md:px-10  flex justify-between w-full flex-row">
        <div class="font-bold tracking-tight">Método de pago: </div>
        <div class="font-normal">{{ methods[summaryStore.paymentType].text }}</div>
      </div>
      <div class="border py-3 text-xl md:text-3xl px-4 md:px-10 flex justify-between w-full flex-row">
        <div class="font-bold tracking-tight">Descripción: </div>
        <div class="font-normal">{{ summaryStore.description }}</div>
      </div>
      <div class="border py-3 text-xl md:text-3xl px-4 md:px-10  flex justify-between w-full flex-row">
        <div class="font-bold tracking-tight">Fecha: </div>
        <div class="font-normal">{{ formateDate(summaryStore.creationDate, optionsFormat) }}</div>
      </div>
      <div class="border py-3 text-xl md:text-3xl px-4 md:px-10  flex justify-between w-full flex-row">
        <div class="font-bold tracking-tight">Monto: </div>
        <div class="font-normal">$ {{ summaryStore.amount }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSummaryStore } from '@/store/summary/summaryStore'
import { methods } from '@/constants/PaymentMethods'
import formateDate from '@/utils/formateDate'

const optionsFormat: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }

const summaryStore = useSummaryStore()

const imageStatus = (transactionStatus: string): string => {
  console.log(transactionStatus)
  if (transactionStatus === 'success') {
    return '/icons/success.svg'
  }
  return '/icons/rejected.svg'
}


</script>

<style scoped>

</style>
