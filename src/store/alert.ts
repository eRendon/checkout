import { defineStore } from 'pinia'
import { IAlert } from '@/interfaces/IAlert'

export const useAlertStore = defineStore('alert', {
  state: (): IAlert => ({
    show: false,
    message: '',
    icon: 'successIcon'
  }),
  actions: {
    setAlert(alert: IAlert) {
      this.$patch((state) => {
        state.icon = alert.icon
        state.message = alert.message
        state.show = alert.show
      })
    },
    hideAlert() {
      this.$patch((state) => {
        state.show = false
      })
    }
  }
})
