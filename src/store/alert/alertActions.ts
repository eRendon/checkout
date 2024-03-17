import { defineStore } from 'pinia'
import { IAlert } from '@/interfaces/IAlert'
import { useAlertStore } from '@/store/alert/alertStore'

export const alertActions = defineStore('repo.actions', () => {

  const alertStore = useAlertStore()
  const setAlert = (alert: IAlert): void => {
    alertStore.show = alert.show
    alertStore.icon = alert.icon
    alertStore.message = alert.message

    setTimeout(() => {
      hideAlert()
    }, 2000)
  }
  const hideAlert = (): void => {
    alertStore.show = false
    alertStore.icon = 'successIcon'
    alertStore.message = ''
  }

  return {
    setAlert,
    hideAlert
  }
})
