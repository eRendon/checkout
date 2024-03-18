import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Summary from '@/pages/summary.vue'
import { createPinia, setActivePinia } from 'pinia'

describe('Summary.vue component', function () {
  let summaryWrapper
  beforeEach(() => {
    setActivePinia(createPinia())
    summaryWrapper = mount(Summary)
  })
  it('render correctly', () => {
    expect(summaryWrapper.text()).toMatchSnapshot()
  })
})
