import { describe, it, expect } from 'vitest'
import { routes } from '@/router/routes'
import { RouteRecordRaw } from 'vue-router'

describe('Router Configuration', () => {
  routes.forEach((route: RouteRecordRaw) => {
    it(`should define route ${route.name}`, () => {
      expect(route.name).toBeDefined()
      expect(route.path).toBeDefined()
      expect(route.component).toBeDefined()
    })

    it(`should load component for route ${route.name}`, async () => {
      const component = await route.component()
      expect(component.default).toBeDefined()
    })
  })

  it('should not have duplicate route names', () => {
    const routeNames = routes.map(route => route.name)
    const duplicateNames = routeNames.filter((name, index) => routeNames.indexOf(name) !== index)
    expect(duplicateNames).toHaveLength(0)
  })
})
