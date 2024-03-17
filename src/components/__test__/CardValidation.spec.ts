import { mount } from '@vue/test-utils'
import CardValidation from '@/components/CardValidation/CardValidation.vue'
import { it, describe, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAlertStore } from '@/store/alert'

describe('CardValidation.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

  })


  it('renders correctly', async () => {
    const wrapper = mount(CardValidation)
    expect(wrapper.text()).toMatchSnapshot();


  })

  it('render inputs card data', async () => {
    const wrapper = mount(CardValidation)

    const cardNameInput = await wrapper.find('input#name')
    await cardNameInput.setValue('Edwin Rendon')
    expect(wrapper.find('input#name').element.value).equal('Edwin Rendon')

    const cardDateInput = await wrapper.find('input#date')
    await cardDateInput.setValue('05/15')
    expect(wrapper.find('input#date').element.value).equal('05/15')

    const cvcInput = await wrapper.find('input#cvc')
    await cvcInput.setValue('415')
    expect(wrapper.find('input#cvc').element.value).equal('415')
  })

  it('detects card type correctly', async () => {
    const wrapper = mount(CardValidation, {
      propsData: {
        cardType: 'visa'
      }
    })
    // Simulate typing a Visa card number
    const cardNumberInput = await wrapper.find('input#number')
    await cardNumberInput.setValue('4111')
    expect(wrapper.find('input#number').element.value).equal('4111')
    expect(wrapper.vm.cardType).equal('visa')

    // Simulate typing a Mastercard card number
    await cardNumberInput.setValue('5555')
    expect(wrapper.find('input#number').element.value).toBe('5555')
    expect(wrapper.vm.cardType).equal('mastercard')

    // Test for empty input
    await cardNumberInput.setValue(null)
    expect(wrapper.find('input#number').element.value).toBe('')
    expect(wrapper.vm.cardType).equal(null)
  })

  it('handles payment when clicked with valid credit card data', async () => {
    const alertStore = useAlertStore()
    // const wrapper = await mount(CardValidation)
    const wrapper = mount(CardValidation)

    // Espiamos la función setAlert del store de alertas
    const setAlertSpy = vi.spyOn(alertStore, 'setAlert')

    const cardNumberInput = await wrapper.find('input#number')
    await cardNumberInput.setValue('4111111111111111')
    const cardNameInput = await wrapper.find('input#name')
    await cardNameInput.setValue('Edwin Rendon')
    const cardDateInput = await wrapper.find('input#date')
    await cardDateInput.setValue('05/15')
    const cvcInput = await wrapper.find('input#cvc')
    await cvcInput.setValue('415')
    // Simulamos el clic en el botón de pago
    await wrapper.find('button#button-payment').trigger('click')

    // Comprobamos que no se haya mostrado ninguna alerta
    expect(setAlertSpy).not.toHaveBeenCalled()
  })

  it('validates credit card number and displays alert if invalid', async () => {
    const wrapper = mount(CardValidation)
    const alertStore = useAlertStore()
    const setAlertSpy = vi.spyOn(alertStore, 'setAlert')

    const cardNumberInput = await wrapper.find('input#number')
    await cardNumberInput.setValue('41111111111')
    const cardNameInput = await wrapper.find('input#name')
    await cardNameInput.setValue('Edwin Rendon')
    const cardDateInput = await wrapper.find('input#date')
    await cardDateInput.setValue('05/15')
    const cvcInput = await wrapper.find('input#cvc')
    await cvcInput.setValue('415')

    // Simulamos el clic en el botón "Pagar"
    await wrapper.find('#button-payment').trigger('click');

    // Verificamos que la función setAlert del store de alertas haya sido llamada
    expect(setAlertSpy).toHaveBeenCalledWith({
      icon: 'warningIcon',
      message: 'El número de tarjeta no es válido',
      show: true,
    });
  });

  it('should all input is null', async () => {
    const wrapper = mount(CardValidation)
    const alertStore = useAlertStore()
    const setAlertSpy = vi.spyOn(alertStore, 'setAlert')

    await wrapper.find('#button-payment').trigger('click');

    expect(setAlertSpy).toHaveBeenCalledWith({
      icon: 'warningIcon',
      message: 'Por favor ingrese todos los campos',
      show: true,
    });
  })
})
