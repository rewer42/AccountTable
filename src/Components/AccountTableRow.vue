<script setup lang="ts">
import {type Account, RecordType, RecordTypeLabels, RecordTypeLabelsKeys} from "@/types/Types.ts";
import {useAccountsStore} from "@/stores/accounts.ts";
import {onMounted, ref} from "vue";

const store = useAccountsStore()
const props = defineProps<{
  account: Account,
  onDeleteAccount: (id: Account) => void
}>();

const { account } = props;
const wrongLogin = ref(false);
const wrongPass = ref(false);
const tagsInput = ref("");
function validateAccount(account: Account) : boolean
{
  wrongLogin.value = account.login.trim().length < 1;
  const hasPassword = !!account.password && account.password.trim().length > 0;

  const isLocal = account.recordType === RecordType.Local;
  if (isLocal)
  {
    wrongPass.value = !hasPassword;
  }
  else if (!isLocal)
  {
    account.password = null;
    wrongPass.value = false;
  }

  return !(wrongLogin.value || wrongPass.value);
}

function onChangeAccount() {
  if (!validateAccount(account)) {
    return;
  }

  store.addOrUpdate(account);
}

function onTagsUpdated() {
  account.tags = tagsInput.value
    .split(";")
    .map(t => t.trim())
    .filter(t => t.length > 0)
    .map((t) => { return { text: t }});
  onChangeAccount();
}

function onChangeType()
{
  if (account.recordType === RecordType.Local) {
    account.password = '';
  }
  else
  {
    account.password = null;
  }

  onChangeAccount();
}

onMounted(() => {
  tagsInput.value = (account.tags ?? []).map(t => t.text).join("; ");
});
</script>

<template>
  <tr>
    <td>
      <input type="text" maxlength="50" v-model="tagsInput" v-on:focusout="onTagsUpdated()"/>
    </td>
    <td>
      <select v-model="account.recordType" v-on:change="onChangeType()">
        <option v-for="option in RecordTypeLabelsKeys" :key="option" :value="option">
          {{ RecordTypeLabels[option] }}
        </option>
      </select>
    </td>
    <td :class="{ 'two-column' : account.recordType != RecordType.Local, 'wrong' : wrongLogin }">
      <input type="text" maxlength="100" v-model="account.login" v-on:focusout="onChangeAccount()"/></td>
    <td :class="{ 'visible' : account.recordType == RecordType.Local, 'wrong' : wrongPass }">
      <input type="password" maxlength="100" v-model="account.password" v-on:focusout="onChangeAccount()"/></td>
    <td>
      <button @click="onDeleteAccount(account)">delete</button>
    </td>
  </tr>
</template>

<style scoped>
  .wrong {
    border: 1px solid red;
  }
</style>
