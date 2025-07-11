<script lang="ts" setup>
import { useAccountsStore } from '@/stores/accounts'
import { onMounted, ref } from "vue";
import {type Account, RecordType} from "@/types/Types.ts";
import AccountTableRow from "@/Components/AccountTableRow.vue";

const accounts = ref<Account[]>([]);
const store = useAccountsStore()

function onCreateRow() {
  accounts.value.push({
    id: Date.now().toString(),
    login: '',
    password: null,
    recordType: RecordType.LDAP,
    tags: []
  })
}

function onDeleteAccount(account: Account) {
  const index = accounts.value.findIndex(a => a.id === account.id);
  if (index !== -1) {
    console.log(index);
    console.log(accounts.value);
    console.log(store.accounts);
    accounts.value.splice(index, 1);
    store.deleteAccount(account.id);
  }
}

onMounted(() => {
  console.log(store.accounts);
  accounts.value = store.accounts.map(acc => ({
    ...acc,
    tags: acc.tags.map((tag) => { return  { ...tag }})
  }));
});

</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Метки</th>
        <th>Тип записи</th>
        <th>Логин</th>
        <th>Пароль</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <AccountTableRow v-for="(account, index) in accounts" :key="account.id" :account="account" :on-delete-account="onDeleteAccount"></AccountTableRow>
    </tbody>
  </table>
  <button @click="onCreateRow()">Create new rowwwww</button>
</template>

<style scoped>

</style>
