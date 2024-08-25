<template>
    <q-form @submit="addEntryFormSubmit" class="row q-px-sm q-pb-sm q-gutter-sm bg-primary">
        <div class="col">
            <q-input v-select-all ref="nameField" v-model="addEntryForm.name" outlined placeholder="Name"
                :bg-color="useLightOrDark('white', 'black')" dense />
        </div>
        <div class="col">
            <q-input v-select-all v-model.number="addEntryForm.amount" type="number" step="0.01" outlined
                input-class="text-right" placeholder="Amount" :bg-color="useLightOrDark('white', 'black')" dense />
        </div>
        <div class="col col-auto">
            <q-btn round color="primary" icon="add" type="submit" />
        </div>
    </q-form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useStoreEntries } from 'src/stores/storeEntries'
import vSelectAll from 'src/directives/directiveSelectAll'
import { useLightOrDark } from 'src/use/useLightOrDark'


const storeEntries = useStoreEntries();

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

const addEntryFormSubmit = () => {
    if (addEntryForm.name) {
        storeEntries.addEntry(addEntryForm);
        resetAddEntryForm();
    }
}
</script>
