import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Spinner from '../Spinner.vue'

describe('Spinner.vue', () => {
  it('render properly', function () {
    const wrapper = mount(Spinner)
    expect(wrapper.text()).toContain('Loading')
  })
})
