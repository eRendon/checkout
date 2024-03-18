import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { createApp } from 'vue'

describe('Main entry point', () => {
  const pinia = createPinia()

  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: { template: '<div>Home Page</div>' }
      }
    ]
  })
  beforeEach(() => {
    setActivePinia(createPinia())
    const appContainer = document.createElement('div')
    appContainer.id = 'testApp'
    document.body.appendChild(appContainer)
  })

  it('should create the app with Pinia and Router', () => {
    const pinia = createPinia()
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          name: 'Home',
          component: { template: '<div>Home Page</div>' }
        }
      ]
    })

    const wrapper = mount(App, {
      global: {
        plugins: [pinia, router]
      }
    })

    expect(wrapper.exists()).toBe(true)



  })

  it('should be create app', () => {
    const AppTest = {
      template: '<div id="testApp">Hello Word</div>'
    }
    const app = createApp(AppTest)
    app.use(pinia)
    app.use(router)
    app.mount('#testApp')
    const root = document.getElementById('testApp')
    console.log(root)
    expect(root).not.toBeNull()
  })
})
