<template>
  <Spinner v-if="isLoading"></Spinner>
  <Modal @onHideModal="hideModal" :show="modalData.show" :title="modalData.title">
    <CardValidation @onSubmit="submitPayment" @onCancel="modalData.show = false"></CardValidation>
  </Modal>
  <div v-if="!isLoading" class=" ml-auto mr-auto mt-20">
    <section class="text-gray-700 body-font overflow-hidden">
      <div class="mx-auto bg-white box-detail shadow-xl">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="xs:p-8">
              <img loading="lazy" alt="ecommerce"
                   class="lg:w-1/2 xs:w-3/12 w-full ml-auto mr-auto object-cover object-center rounded " :src="product.image">
              <h1 id="product-title" class="text-gray-900 text-xl sm:text-3xl text-center mt-4 title-font font-medium">
                {{ product.title }}</h1>
              <h1 class="text-gray-900 text-xl sm:text-3xl text-center mt-4 title-font font-medium">{{ product.category }}</h1>
            </div>
            <div>
              <div class="w-full lg:pl-10 xs:p-8 md:py-6 mt-6 lg:mt-0">
                <div class="w-6/12 mr-auto ml-auto md:w-full">
                  <div class="mt-2">
                    <Select label="Métodos de pago" v-model="selectedPaymentMethod" :options="paymentOptions"></Select>
                  </div>
                  <div class="mt-8">
                    <Select label="Tipo de respuesta" v-model="typeResponse" :options="responseOptions"></Select>
                  </div>
                </div>
                <div class="flex mt-16">
                  <span class="title-font font-medium text-2xl text-gray-900">${{ product.price }}</span>
                  <button @click="handlePay"
                          class="flex ml-auto text-xl sm:text-3xl text-white bg-rose-500 border-0 py-2 px-6 focus:outline-none hover:bg-rose-600 rounded-lg">
                    Continuar con el pago
                  </button>
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
import { PaymentMethods } from '@/constants/PaymentMethods'
import Modal from '../components/atoms/Modal.vue'
import CardValidation from '../components/CardValidation/CardValidation.vue'
import { IModal } from '@/interfaces/components/IModal'
import apiResponse from '@/api/api'
import { useAlertStore } from '@/store/alert/alertStore'
import { useSummaryStore } from '@/store/summary/summaryStore'
import { useRouter } from 'vue-router'
import { ISelectOptions } from '@/interfaces/components/ISelectOptions'
import { setLocalStore } from '@/utils/localSotre'
import { ISummary } from '@/interfaces/ISummary'

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

const paymentOptions: ISelectOptions[] = [
  {
    value: PaymentMethods.creditCard, label: 'Tarjeta de crédito', disabled: false
  },
  {
    value: PaymentMethods.cash, label: 'Efectivo', disabled: true
  }
]

const responseOptions: ISelectOptions[] = [
  { label: 'Respuesta correcta', value: '1', disabled: false },
  { label: 'Respuesta con error', value: '0', disabled: false },
  { label: 'Respuesta rechazada', value: '2', disabled: false }
]

const modalData = ref<IModal>({
  show: false,
  title: ''
})

const hideModal = (): void => {
  modalData.value.show = false
}

const alertStore = useAlertStore()
const summaryStore = useSummaryStore()
const router = useRouter()

const selectedPaymentMethod = ref<string>(PaymentMethods.creditCard)
const product = ref<IProduct>(initialState)
const isLoading = ref<Boolean>(true)
const typeResponse = ref<string>('1')

onMounted(() => {
  if (summaryStore.id) {
    router.push('/summary')
  }
  getProductById('2').then((response) => {
    product.value = response
    isLoading.value = false
  }).catch((error) => {
    console.log(error)
    isLoading.value = false
  })
})

const handlePay = (): void => {
  if (selectedPaymentMethod.value === PaymentMethods.creditCard) {
    modalData.value.title = 'Tarjeta de crédito'
    modalData.value.show = true
  }
}

const submitPayment = (): void => {
  modalData.value.show = false
  isLoading.value = true
  apiResponse(Number(typeResponse.value), selectedPaymentMethod.value).then((response) => {
    console.log(response)
    isLoading.value = false
    summaryStore.setSummary(response)
    summaryStore.setProduct(product.value)
    summaryStore.setPaymentType(selectedPaymentMethod.value)

    setLocalStore<ISummary>({ ...response, paymentType: selectedPaymentMethod.value }, 'summary')
    router.push('/summary')
  }).catch((error) => {
    console.log(error)
    modalData.value.show = true
    isLoading.value = false
    alertStore.setAlert({
      icon: 'errorIcon',
      message: 'Hubo un problema al procesar su transacción, por favor intente más tarde',
      show: true
    })
  })
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

@media screen and (max-width: 768px) {
  .box-detail {
    width: 70%;
  }
}

section {
  min-height: 80vh;
}
</style>
