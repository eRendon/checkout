<template>
  <div>
    <label for="name" class="block mb-2  font-medium text-gray-900 dark:text-white">Nombre en la tarjeta</label>
    <input type="text" id="name"
           v-model="creditCardData.name"
           class="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="Edwin Rendon" required/>
  </div>
  <div class="input-container">
    <label for="number" class="block mb-2  font-medium text-gray-900 dark:text-white">Numero de tarjeta</label>
    <input maxlength="16" v-model="creditCardData.number" @input="detectCardType(creditCardData.number)" type="text"
           id="number"
           class="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="xxxx xxxx xxxx" required/>
    <img v-if="cardType" :src="`/public/cards/${cardType}.svg`" alt="Icono de imagen">
  </div>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <label for="date" class="block mb-2  font-medium text-gray-900 dark:text-white">Fecha expiración</label>
      <input type="text" id="date"
             v-model="creditCardData.date"
             class="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="MM/YY" required/>
    </div>
    <div>
      <label for="cvc" class="block mb-2  font-medium text-gray-900 dark:text-white">CVC</label>
      <input type="text" id="cvc"
             v-model="creditCardData.cvc"
             class="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="CVC" required/>
    </div>
  </div>
  <div class="flex items-center float float-right p-4 md:p-5  rounded-b dark:border-gray-600">
    <button type="button"
            @click="cancel"
            class="text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Cancelar
    </button>
    <button @click="handlePayment" type="button"
            id="button-payment"
            class="py-2.5 px-5 ms-3 font-medium text-white focus:outline-none bg-rose-500 rounded-lg border border-gray-200 hover:bg-rose-700 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
      Pagar
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { validateCreditCardNumber, validateCreditCardType } from './validations'
import { ICreditCard } from '@/interfaces/ICreditCard'
import { validateForms } from '@/libs/validateForms'
import { useAlertStore } from '@/store/alert/alertStore'

const alertStore = useAlertStore()

const cardType = ref<string | null>('')

const creditCardData = ref<ICreditCard>({
  number: '',
  cvc: '',
  date: '',
  name: ''
})

const emits = defineEmits(['onCancel', 'onSubmit'])

const cancel = (): void => {
  emits('onCancel', false)
}

const detectCardType = (number: string): void => {
  if (number.length === 0) {
    cardType.value = null
  }
  if (number.length > 3 && number.length < 6) {
    cardType.value = validateCreditCardType(number)
  }
}

const handlePayment = (): void => {
  if (validateForms(creditCardData.value)) {
    const validation = validateCreditCardNumber(creditCardData.value.number)
    console.log(validation)
    if (validation.valid) {
      emits('onSubmit')
    } else {
      alertStore.setAlert({
        icon: 'warningIcon',
        message: 'El número de tarjeta no es válido',
        show: true
      })
    }
  } else {
    alertStore.setAlert({
      icon: 'warningIcon',
      message: 'Por favor ingrese todos los campos',
      show: true
    })
  }
}

</script>

<style scoped>
.input-container {
  position: relative;
  display: inline-block;
}

.input-container img {
  position: absolute;
  top: 73%;
  transform: translateY(-50%);
  width: 35px;
  height: auto;
  right: 5%;
}
</style>
