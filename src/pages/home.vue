<template>
  <Spinner v-if="isLoading"></Spinner>
  <Modal @onHideModal="hideModal" :show="modalData.show" :title="modalData.title">
    <CardValidation></CardValidation>
  </Modal>
  <div v-if="!isLoading" class=" ml-auto mr-auto mt-20">
    <section class="text-gray-700 body-font overflow-hidden">
      <div class="mx-auto bg-white box-detail shadow-xl">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <img loading="lazy" alt="ecommerce" class="lg:w-1/2 w-full ml-auto mr-auto object-cover object-center rounded " :src="product.image">
              <h1 id="product-title" class="text-gray-900 text-3xl text-center mt-4 title-font font-medium">{{ product.title }}</h1>
              <h1 class="text-gray-900 text-3xl text-center mt-4 title-font font-medium">{{ product.category }}</h1>
            </div>
            <div>
              <div class="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <div class="mt-2">
                 <Select v-model="selectedPaymentMethod" :options="paymentOptions"></Select>
                </div>
                <div class="flex mt-11">
                  <span class="title-font font-medium text-2xl text-gray-900">${{product.price}}</span>
                  <button @click="handlePay" class="flex ml-auto text-white bg-rose-500 border-0 py-2 px-6 focus:outline-none hover:bg-rose-600 rounded-lg">Continuar con el pago</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getProductById } from '@/services/product'
import { IProduct } from '@/interfaces/IProduct'
import Spinner from '../components/Spinner.vue'
import Select from '../components/atoms/Select.vue'
import { IPaymentMethods } from '@/interfaces/IPaymentMethods'
import { PaymentMethods } from '@/constants/PaymentMethods'
import Modal from '../components/atoms/Modal.vue'
import CardValidation from '../components/CardValidation/CardValidation.vue'
import { IModal } from '@/interfaces/IModal'

const initialState: IProduct = {
  description: '',
  category: '',
  title: '',
  image: '',
  price: 0,
  rating: {
    rate: 0,
    count: 0
  },
  id: 0
}

const paymentOptions: IPaymentMethods[] = [
  {
    value: PaymentMethods.creditCard, label: 'Tarjeta de crédito', disabled: false
  },
  {
    value: PaymentMethods.cash, label: 'Efectivo', disabled: true
  }
]

const modalData = ref<IModal>({
  show: false,
  title: ''
})

const hideModal = (): void => {
  modalData.value.show = false
}

const selectedPaymentMethod = ref<string>('')
const product = ref<IProduct>(initialState)
const isLoading = ref<Boolean>(true)

onMounted(() => {
  getProductById('2').then((response) => {
    product.value = response
    isLoading.value = false
  }).catch((error) => {
    isLoading.value = false
  })
})

const handlePay = (): void => {
  if (selectedPaymentMethod.value === PaymentMethods.creditCard) {
    modalData.value.title = 'Tarjeta de crédito'
    modalData.value.show = true
  }
}

</script>

<style scoped>
.box-detail {
  padding: 2.5rem 0;
  max-width: 1112px;
  width: 100%;

  border-radius: 1.25rem;
  border: 1px solid #eee;
}

section {
  min-height: 80vh;
}
</style>
