<script lang="ts" setup>
import { useAccountsStore } from '@/stores/accounts'
import { onMounted, ref } from "vue"
import { type Account, RecordType } from "@/types/index.ts"
import AccountTableRow from "@/Components/AccountTableRow.vue"

const store = useAccountsStore()
const accounts = ref<Account[]>([])

const createNewAccount = (): Account => ({
  id: Date.now().toString(),
  login: '',
  password: null,
  recordType: RecordType.LDAP,
  tags: []
})

const onCreateRow = () => {
  accounts.value.push(createNewAccount())
}

const onDeleteAccount = (account: Account) => {
  const index = accounts.value.findIndex(a => a.id === account.id)
  if (index !== -1) {
    accounts.value.splice(index, 1)
    store.deleteAccount(account.id)
  }
}

onMounted(() => {
  accounts.value = store.accounts.map(acc => ({
    ...acc,
    tags: [...acc.tags.map(tag => ({ ...tag }))]
  }))
})
</script>

<template>
  <div class="table-container">
    <label class="table-label">Учетные записи</label>
    <label class="tip">
      Для заполнения нескольких меток для одной пары логин/пароль используйте разделитель ";"
    </label>

    <div class="table-wrapper">
      <table class="table">
        <thead class="table-header">
        <tr>
          <th class="table-cell-head">Метки</th>
          <th class="table-cell-head">Тип записи</th>
          <th class="table-cell-head">Логин</th>
          <th class="table-cell-head">Пароль</th>
          <th></th>
        </tr>
        </thead>

        <div class="tbody-container">
          <tbody class="table-body">
          <AccountTableRow
            v-for="account in accounts"
            :key="account.id"
            :account="account"
            :on-delete-account="onDeleteAccount"
          />
          <tr class="empty-row"></tr>
          </tbody>
        </div>
      </table>

      <button class="create-button" @click="onCreateRow">
        +
      </button>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  border: 1px solid lightgray;
  padding: 20px;
  font-family: Arial;
  width: 920px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  border-radius: 10px;
}

.table-header {
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e5e5;
}

.tip {
  border-radius: 6px;
  padding: 14px 30px;
  background: lightsteelblue;
  color: #777;
  margin-bottom: 20px;
}

.table-label {
  margin-left: 50px;
  font-size: 1.8em;
  margin-bottom: 20px;
}

.table-wrapper {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border-spacing: 5px 5px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}

.table {
  padding: 10px;
}

.tbody-container {
  position: relative;
}

.table-body {
  padding: 10px 0;
  height: 500px;
  overflow-y: auto;
}

.tbody-container::before,
.tbody-container::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 30px;
  z-index: 10;
}

.tbody-container::before {
  top: 0;
  background: linear-gradient(to bottom, white, transparent);
}

.tbody-container::after {
  bottom: 0;
  background: linear-gradient(to top, white, transparent);
}

.table-cell-head {
  width: 200px;
}

.create-button {
  margin-left: auto;
  margin-right: auto;
  font-size: 1.8em;
  aspect-ratio: 1;
  width: 46px;
  margin-bottom: 10px;
  border-radius: 20%;
  background-color: #fff;
  border: 3px solid #ddd;
}

tr {
  vertical-align: top;
}

thead, tbody {
  display: block;
}

.empty-row {
  height: auto;
}
</style>
