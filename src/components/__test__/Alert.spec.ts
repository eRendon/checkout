import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import Alert from '@/components/atoms/Alert.vue'
import { createPinia, setActivePinia } from 'pinia'

describe('CardValidation.vue', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly when show is true', async () => {
    const props = { show: true, icon: 'successIcon', message: 'Test message' }
    const wrapper = mount(Alert,{
      props
    })
    expect(wrapper.html()).toContain('Test message')
  })

  // it('renders nothing when show is false', async () => {
  //   const props = { show: false, icon: 'successIcon', message: 'Test message' }
  //   const wrapper = await mount(Alert, {
  //     propsData: props,
  //     props
  //   })
  //
  //   expect(wrapper.html()).toBe('')
  // })
  //
  // it('calls hideAlert method when close button is clicked', async () => {
  //   const props = { show: true, icon: 'successIcon', message: 'Test message' }
  //   const wrapper = await mount(Alert, {
  //     propsData: props,
  //     props
  //   })
  //
  //   await wrapper.find('button').trigger('click')
  //   expect(wrapper.emitted().hideAlert).toBeTruthy()
  // })
  //
  // it('correctly displays different icons based on props.icon', async () => {
  //   const icons = {
  //     errorIcon: '<div>error icon</div>',
  //     successIcon: '<div>success icon</div>',
  //     warningIcon: '<div>warning icon</div>'
  //   }
  //
  //   const props = { show: true, icon: 'successIcon', message: 'Test message' }
  //   const wrapper = await mount(Alert, {
  //     propsData: props,
  //     props
  //   })
  //
  //   const iconDiv = wrapper.find('div[role="alert"] div')
  //   expect(iconDiv.html()).toContain(icons[props.icon])
  // })
  //
  // it('displays the message correctly', async () => {
  //   const props = { show: true, icon: 'successIcon', message: 'Test message' }
  //   const wrapper = await mount(Alert, {
  //     propsData: props,
  //     props
  //   })
  //
  //   expect(wrapper.text()).toContain(props.message)
  // })
})
