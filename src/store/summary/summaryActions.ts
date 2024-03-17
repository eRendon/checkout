import { ISummary } from '@/interfaces/ISummary'
import { IProduct } from '@/interfaces/IProduct'
import { defineStore } from 'pinia'
import { useSummaryStore } from '@/store/summary/summaryStore'

export const summaryActions = defineStore('summary.actions', () => {

  const summaryStore = useSummaryStore()

  const setProduct = (product: IProduct): void => {
    summaryStore.product = product
  }

  const setSummary = (summary: ISummary): void => {
    summaryStore.status = summary.status
    summaryStore.amount = summary.amount
    summaryStore.description = summary.description
    summaryStore.id = summary.id!
    summaryStore.creationDate = summary.creationDate
    summaryStore.transactionStatus = summary.transactionStatus
    summaryStore.paymentType = summary.paymentType
  }

  const setPaymentType = (paymentType: string): void => {
    summaryStore.paymentType = paymentType
  }

  return {
    setProduct,
    setSummary,
    setPaymentType
  }
})
