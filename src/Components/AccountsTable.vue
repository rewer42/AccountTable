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
    accounts.value.splice(index, 1);
    store.deleteAccount(account.id);
  }
}

onMounted(() => {
  accounts.value = store.accounts.map(acc => ({
    ...acc,
    tags: acc.tags.map((tag) => { return  { ...tag }})
  }));
});

</script>

<template>
  <div class="table-container">
    <label class="table-lable">Учетные записи</label>
    <label class="tip">Для заполнения нескольких меток для одной пары логин/пароль используйте разделитель ";"</label>
    <div class="table-wrapper">
      <table class="table">
        <thead class="table__header">
          <tr>
            <th class="table-cell-head">Метки</th>
            <th class="table-cell-head">Тип записи</th>
            <th class="table-cell-head">Логин</th>
            <th class="table-cell-head">Пароль</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="tbody_wrapper">
          <tbody class="table-body">
            <AccountTableRow v-for="(account, index) in accounts" :key="account.id" :account="account" :on-delete-account="onDeleteAccount"></AccountTableRow>
            <tr class="costyl"></tr>
          </tbody>
        </tbody>
      </table>
      <button class="create-button" @click="onCreateRow()">+</button>
    </div>
  </div>
</template>

<style scoped>
.table__header
{
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e5e5;
}
.table-container
{
  border: 1px solid lightgray;
  padding: 20px;
  font-family: Arial;
  width: 920px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  border-radius: 10px;
}
.table-body
{
  padding: 10px 0;
  height: 500px;
  overflow-y: auto;
}
.tbody_wrapper{
  position: relative;
}
.tbody_wrapper::before,
.tbody_wrapper::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 30px;
  z-index: 10;
}
.tbody_wrapper::before {
  top: 0;
  background: linear-gradient(to bottom, white, transparent);
}
.tbody_wrapper::after {
  bottom: 0;
  background: linear-gradient(to top, white, transparent);
}
.table-cell-head
{
  width: 200px;
}
.table-wrapper
{
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border-spacing: 5px 5px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}
.table{
  padding: 10px;
}
.create-button
{
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
.table-lable
{
  margin-left: 50px;
  font-size: 1.8em;
  margin-bottom: 20px;
}
tr{
  vertical-align: top;
}
thead, tbody {
  display: block;
}
.costyl{
  height: auto;
}
.tip
{
  border-radius: 6px;
  padding: 14px 30px;
  background: lightsteelblue;
  color: #777;
  margin-bottom: 20px;
}
</style>
