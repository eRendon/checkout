import { defineStore } from 'pinia'
import { alertState } from '@/store/alert/alertState'
import { alertActions } from '@/store/alert/alertActions'
import { extractStore } from '@/store/extractStore'

export const useAlertStore = defineStore('alert', () => ({
  ...extractStore(alertState()),
  ...extractStore(alertActions())
}))
