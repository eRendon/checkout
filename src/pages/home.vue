<template>
  <Spinner v-if="isLoading"></Spinner>
  <div v-if="!isLoading" class=" ml-auto mr-auto mt-11">
    <section class="text-gray-700 body-font overflow-hidden">
      <div class="mx-auto bg-white box-detail shadow-xl">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <img alt="ecommerce" class="lg:w-1/2 w-full ml-auto mr-auto object-cover object-center rounded " :src="product.image">
              <h1 class="text-gray-900 text-3xl text-center mt-4 title-font font-medium">{{ product.title }}</h1>
              <h1 class="text-gray-900 text-3xl text-center mt-4 title-font font-medium">{{ product.category }}</h1>
            </div>
            <div>
              <div class="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <div class="mt-2">
                  <form class="max-w-sm">
                    <label for="countries" class="block mb-2 font-medium text-gray-900 dark:text-white">Métodos de pago</label>
                    <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected value="credit-card">Tarjeta de crédito</option>
                      <option disabled value="cash">Efectivo</option>
                    </select>
                  </form>
                </div>
                <div class="flex mt-11">
                  <span class="title-font font-medium text-2xl text-gray-900">${{product.price}}</span>
                  <button class="flex ml-auto text-white bg-rose-500 border-0 py-2 px-6 focus:outline-none hover:bg-rose-600 rounded-lg">Continuar con el pago</button>
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
import { ref } from 'vue'
import { getProductById } from '../services/product'
import { IProduct } from '../interfaces/IProduct'
import Spinner from '../components/Spinner.vue'

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

const product = ref<IProduct>(initialState)
const isLoading = ref<Boolean>(true)

getProductById('2').then((response) => {
  console.log(response)
  product.value = response
  isLoading.value = false
}).catch((error) => {
  isLoading.value = false
  console.log(error)
})
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
