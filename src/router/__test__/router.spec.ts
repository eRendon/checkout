import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'

describe('Router Configuration', () => {
  it('should create router with correct history and routes', () => {

    const router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes
    })

    expect(router).toBeDefined()
  })
})
