import { defineStore } from 'pinia'
import { summaryActions } from '@/store/summary/summaryActions'
import { summaryState } from '@/store/summary/summaryState'
import { extractStore } from '@/store/extractStore'

export const useSummaryStore = defineStore('summary', () => ({
  ...extractStore(summaryState()),
  ...extractStore(summaryActions())
}))
