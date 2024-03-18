import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { createPinia, setActivePinia } from 'pinia'

describe('App.vue component', function () {
  let appWrapper
  beforeEach(() => {
    setActivePinia(createPinia())
    appWrapper = mount(App)
  })

  it('should be render correctly', () => {
    expect(appWrapper.text()).toMatchSnapshot()
  })
})
