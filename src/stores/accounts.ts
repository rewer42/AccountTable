import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account } from '@/types/Types.ts'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  function deleteAccount(id: string) {
    const index = accounts.value.findIndex((a : Account) => a.id === id);
    if (index !== -1) {
      accounts.value.splice(index, 1)
    }
  }

  function addOrUpdate(account: Account) {
    const index = accounts.value.findIndex((a : Account) => a.id === account.id)
    if (index === -1) {
      accounts.value.push(account)
    } else {
      accounts.value[index] = account
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
