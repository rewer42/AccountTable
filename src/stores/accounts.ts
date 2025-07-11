import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account } from '@/types/index.ts'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  const findAccountIndex = (id: string) =>
    accounts.value.findIndex((account: Account) => account.id === id)

  const deleteAccount = (id: string) => {
    const accountIndex = findAccountIndex(id)
    if (accountIndex !== -1) {
      accounts.value.splice(accountIndex, 1)
    }
  }

  const addOrUpdate = (account: Account) => {
    const accountIndex = findAccountIndex(account.id)

    if (accountIndex === -1) {
      accounts.value.push(account)
    } else {
      accounts.value[accountIndex] = account
    }
  }

  return {
    accounts,
    deleteAccount,
    addOrUpdate
  }
}, {
  persist: true,
})
