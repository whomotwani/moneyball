<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-slide-item @right="onEntrySlideLeft($event, entry)" v-for="entry in entries" :key="entry.id"
          left-color="positive" right-color="negative">
          <template v-slot:right>
            <q-icon name="delete" />
          </template>

          <q-item class="text-weight-bold">
            <q-item-section :class="useAmountColor(entry.amount)">
              <q-item-label>{{ entry.name }}</q-item-label>
            </q-item-section>
            <q-item-section side :class="useAmountColor(entry.amount)">
              {{ useCurrencify(entry.amount) }}
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
    </div>

    <q-footer class="bg-transparent">
      <div class="row text-grey-7 q-px-md q-py-sm shadow-up-3 q-mb-sm">
        <div class="col text-h6">
          Balance
        </div>
        <div class="col text-h6 text-right" :class="useAmountColor(balance)">
          {{ useCurrencify(balance) }}
        </div>
      </div>
      <q-form @submit="addEntry" class="row q-px-sm q-pb-sm q-gutter-sm bg-primary">
        <div class="col">
          <q-input ref="nameField" v-model="addEntryForm.name" outlined placeholder="Name" bg-color="white" dense />
        </div>
        <div class="col">
          <q-input v-model.number="addEntryForm.amount" type="number" step="0.01" outlined input-class="text-right"
            placeholder="Amount" bg-color="white" dense />
        </div>
        <div class="col col-auto">
          <q-btn round color="primary" icon="add" type="submit" />
        </div>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { uid, useQuasar } from 'quasar'
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColor } from 'src/use/useAmountColor'

const $q = useQuasar()

const entries = ref([
  {
    id: 'id0',
    name: 'Salary',
    amount: 8000000,
  },
  {
    id: 'id1',
    name: 'EMI',
    amount: -5000000,
  },
  {
    id: 'id2',
    name: 'iPhone',
    amount: -200000,
  },
  {
    id: 'id3',
    name: 'Unknown',
    amount: 0,
  },
]);

const balance = computed(() => {
  return entries.value.reduce((acc, cur) => {
    return acc += cur.amount
  }, 0)
});

const defaultAddEntryForm = {
  name: '',
  amount: null
}

const nameField = ref(null);

const addEntryForm = reactive({
  ...defaultAddEntryForm
});

const resetAddEntryForm = () => {
  Object.assign(addEntryForm, defaultAddEntryForm);
}

const addEntry = () => {
  const newEntry = Object.assign({}, addEntryForm, { id: uid() })
  entries.value.push(newEntry);
  resetAddEntryForm();
  nameField.value.focus();
}

// slide items
const onEntrySlideLeft = ({ reset }, entry) => {
  $q.dialog({
    title: 'Delete entry',
    message: `
      Would you like to delete this entry?
      <div class='text-weight-bold ${ useAmountColor(entry.amount) }'>
        ${ entry.name }: ${ useCurrencify(entry.amount) }
      </div>
    `,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: 'Delete',
      color: 'negative',
      noCaps: true
    },
    cancel: {
      color: 'primary',
      noCaps: true
    }
  }).onOk(() => {
    deleteEntry(entry.id);
  }).onCancel(() => {
    reset()
  })
}
// delete entry
function deleteEntry(entryId) {
  const index = entries.value.findIndex(entry => entry.id === entryId);
  entries.value.splice(index, 1);
  $q.notify({
    message: 'Entry deleted',
    position: 'top'
  })
}
</script>
