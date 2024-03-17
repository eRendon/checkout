import { IAlert } from '@/interfaces/IAlert'
import { defineStore } from 'pinia'

export const alertState = defineStore('alert.state',{
  state: (): IAlert => ({
    show: false,
    message: '',
    icon: 'successIcon'
  })
})
