import { ICreditCard } from '@/interfaces/ICreditCard'
import { ISummary } from '@/interfaces/ISummary'
import { IProduct } from '@/interfaces/IProduct'
import { defineStore } from 'pinia'
import { useSummaryStore } from '@/store/summary/summaryStore'

export const summaryActions = defineStore('summary.actions', () => {

  const summaryStore = useSummaryStore()

  const setPaymentData = (paymentData: ICreditCard ): void => {
    summaryStore.paymentData = paymentData
  }
  const setProduct = (product: IProduct): void => {
    summaryStore.product = product
  }

  const setSummary = (summary: ISummary): void => {
    summaryStore.status = summary.status
    summaryStore.amount = summary.amount
    summaryStore.description = summary.description
    summaryStore.id = summary.id
    summaryStore.creationDate = summary.creationDate
  }

  return {
    setPaymentData,
    setProduct,
    setSummary
  }
})
