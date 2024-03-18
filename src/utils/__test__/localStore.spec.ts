import { describe, expect, it } from 'vitest'
import { getLocalStore, setLocalStore } from '@/utils/localSotre'

describe('localStore util', function () {
  it('should store data in local store', () => {
    const testData = { name: 'Edwin Rendon', developer: 'senior'}
    setLocalStore(testData, 'testKey')
    expect(getLocalStore('testKey')).toStrictEqual(testData)
  })

  it('should get null data from local store', () => {
    expect(getLocalStore('helloWord')).toBe(null)
  })
})
