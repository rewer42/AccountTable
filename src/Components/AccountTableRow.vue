<script setup lang="ts">
import { type Account, RecordType, RecordTypeLabels, RecordTypeLabelsKeys } from "@/types/index.ts";
import { useAccountsStore } from "@/stores/accounts.ts";
import { onMounted, ref } from "vue";

interface Props {
  account: Account;
  onDeleteAccount: (id: Account) => void;
}

const props = defineProps<Props>();
const { account, onDeleteAccount } = props;
const store = useAccountsStore();

const wrongLogin = ref(false);
const wrongPass = ref(false);
const tagsInput = ref("");

const validateAccount = (account: Account): boolean => {
  wrongLogin.value = account.login.trim().length < 1;
  const hasPassword = account.password != null && account.password.trim().length > 0;
  const isLocal = account.recordType === RecordType.Local;

  wrongPass.value = isLocal ? !hasPassword : false;

  if (!isLocal) {
    account.password = null;
  }

  return !(wrongLogin.value || wrongPass.value);
};

const handleAccountUpdate = () => {
  if (validateAccount(account)) {
    store.addOrUpdate(account);
  }
};

const handleTagsUpdate = () => {
  account.tags = tagsInput.value
    .split(";")
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
    .map(text => ({ text }));

  handleAccountUpdate();
};

const handleTypeChange = () => {
  account.password = account.recordType === RecordType.Local ? '' : null;
  handleAccountUpdate();
};

onMounted(() => {
  tagsInput.value = (account.tags ?? []).map(tag => tag.text).join("; ");
});
</script>

<template>
  <tr class="table-row">
    <td class="table-cell">
      <input
        class="table-content"
        type="text"
        maxlength="50"
        v-model="tagsInput"
        @focusout="handleTagsUpdate"
      />
    </td>
    <td class="table-cell">
      <select
        class="table-content"
        v-model="account.recordType"
        @change="handleTypeChange"
      >
        <option
          v-for="option in RecordTypeLabelsKeys"
          :key="option"
          :value="option"
        >
          {{ RecordTypeLabels[option] }}
        </option>
      </select>
    </td>
    <td class="table-cell">
      <input
        class="table-content"
        :class="{
          'two-column': account.recordType !== RecordType.Local,
          'wrong': wrongLogin
        }"
        type="text"
        maxlength="100"
        v-model="account.login"
        @focusout="handleAccountUpdate"
      />
    </td>
    <td class="table-cell">
      <input
        class="table-content"
        :class="{
          'invisible': account.recordType !== RecordType.Local,
          'wrong': wrongPass
        }"
        type="password"
        maxlength="100"
        v-model="account.password"
        @focusout="handleAccountUpdate"
      />
    </td>
    <td>
      <button class="delete-button" @click="onDeleteAccount(account)">
        ×
      </button>
    </td>
  </tr>
</template>

<style scoped>
.wrong {
  border: 2px solid red !important;
}

.two-column {
  width: 192% !important;
}

.invisible {
  visibility: hidden;
}

.table-cell {
  width: 200px;
  height: 30px;
}

.table-content {
  border: 1px solid lightsteelblue;
  display: block;
  width: 90%;
  height: 30px;
  box-sizing: border-box;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 6px;
  margin-left: 5%;
}

.delete-button {
  height: 28px;
  aspect-ratio: 1;
  border-radius: 25%;
  color: red;
  background: white;
  font-size: 1.2em;
  border: 2px solid lightsteelblue;
}
</style>
