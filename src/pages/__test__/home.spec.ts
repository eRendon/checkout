import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Home from '@/pages/home.vue'
import { getProductById } from '@/services/product'
import { IProduct } from '@/interfaces/IProduct'
import Spinner from '@/components/Spinner.vue'
import Modal from '@/components/atoms/Modal.vue'
import CardValidation from '@/components/CardValidation/CardValidation.vue'
import { createPinia, setActivePinia } from 'pinia'
describe('Home Component', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly when not loading', () => {
    const wrapper = mount(Home, {
      data() {
        return {
          isLoading: false
        }
      }
    });

    expect(wrapper.text()).toMatchSnapshot();
  });

  it('renders spinner when isLoading is true', async () => {
    const wrapper = mount(Home, {
      data() {
        return {
          isLoading: true,
          product: {} as IProduct, // Mocked product data
          modalData: { show: false, title: '' },
          selectedPaymentMethod: '',
          paymentOptions: []
        }
      }
    })

    expect(wrapper.findComponent(Spinner).exists()).equals(true)
    expect(wrapper.findComponent(Modal).exists()).equals(true)
  })

  it('render CardValidation.vue', async () => {
    const wrapper = mount(Home, {
      data() {
        return {
          modalData: { show: true, title: 'Hola mundo' },
        }
      }
    })
    expect(wrapper.findComponent(CardValidation).exists()).equals(false)
  })

  it('loads product successfully', async () => {
    const wrapper = mount(Home, {
      data() {
        return {
          isLoading: false
        }
      }
    });

    const productData: IProduct = {
      description: 'description',
      id: 1,
      title: 'Product Title',
      category: 'Product Category',
      image: 'product-image.jpg',
      price: 100,
      rating: {
        rate: 5,
        count: 10
      }
    }
    const getProductByIdSpy = vi.fn(getProductById)
    getProductByIdSpy.mockImplementation(async (): Promise<IProduct> => {
      return Promise.resolve(productData)
    })

    await getProductByIdSpy('1')

    await wrapper.vm.$nextTick();

    console.log('html', wrapper.html())

    // expect(wrapper.find('#product-title').text()).toBe(productData.title);
    // expect(wrapper.find('[data-testid="product-category"]').text()).toBe(mockProduct.category);
    // expect(wrapper.find('[data-testid="product-price"]').text()).toBe('$' + mockProduct.price);
  });

  it('sets modal title and shows modal when selectedPaymentMethod is credit card', async () => {
    const wrapper = mount(Home, {
      data() {
        return {
          selectedPaymentMethod: 'creditCard',
          modalData: {
            title: 'Tarjeta de crédito',
            show: true
          }
        }
      },
    })

    // Simulamos la selección del método de pago como tarjeta de crédito
    await wrapper.setData({ selectedPaymentMethod: 'creditCard', modalData: {
        title: 'Tarjeta de crédito',
        show: true
      } })

    console.log('el wraper', await wrapper.vm.$data)
    // Invocamos la función handlePay
    await wrapper.vm.handlePay()

    // Verificamos que el título del modal se haya establecido correctamente
    expect(wrapper.vm.$data.modalData.title).toBe('Tarjeta de crédito')

    // Verificamos que el modal se haya mostrado
    expect(wrapper.vm.$data.modalData.show).toBe(true)
  })

});
