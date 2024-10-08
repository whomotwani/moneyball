<template>
    <q-slide-item @right="onEntrySlideRight" @left="onEntrySlideLeft" left-color="positive" right-color="negative"
        :class="[entry.paid ? useLightOrDark('bg-grey-2', 'bg-grey-9') : '']"
        :id="`id-${entry.id}`">
        <template v-slot:left>
            <q-icon name="done" />
        </template>
        <template v-slot:right>
            <q-icon name="delete" />
        </template>
        <q-item class="text-weight-bold">
            <q-item-section :class="[useAmountColor(entry.amount), { 'text-strike': entry.paid }]">
                <q-item-label>
                    {{ entry.name }}
                    <q-popup-edit :model-value="entry.name" auto-save v-slot="scope" anchor="top left"
                        :offset="[15, 16]" cover="false" buttons label-set="ok" @save="onNameUpdate">
                        <q-input v-select-all input-class="text-weight-bold" v-model="scope.value" dense autofocus
                            @keyup.enter="scope.set" />
                    </q-popup-edit>
                </q-item-label>
            </q-item-section>
            <q-item-section side :class="[useAmountColor(entry.amount)]">
                <span :class="{ 'text-strike': entry.paid }">{{ useCurrencify(entry.amount) }}</span>
                <q-popup-edit :model-value="entry.amount" auto-save v-slot="scope" anchor="top left" :offset="[24, 16]"
                    cover="false" buttons label-set="ok" @save="onAmountUpdate">
                    <q-input v-select-all type="number" step="0.01" input-class="text-weight-bold text-right"
                        v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
                </q-popup-edit>
                <q-chip v-if="storeSettings.settings.showRunningBalance" outline dense
                    :class="useAmountColor(storeEntries.runningBalances[index])">
                    {{ useCurrencify(storeEntries.runningBalances[index]) }}
                </q-chip>
            </q-item-section>

            <q-item-section side v-if="storeEntries.options.sort">
                <q-icon name="reorder" color="primary" class="sort-handle" />
            </q-item-section>
        </q-item>
    </q-slide-item>
</template>

<script setup>
import { useQuasar } from 'quasar'

// import stores
import { useStoreEntries } from 'src/stores/storeEntries'
import { useStoreSettings } from 'src/stores/storeSettings';

// composibles
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColor } from 'src/use/useAmountColor'
import { useLightOrDark } from 'src/use/useLightOrDark'

import vSelectAll from 'src/directives/directiveSelectAll'

const $q = useQuasar()

// stores
const storeEntries = useStoreEntries();
const storeSettings = useStoreSettings();

// props
const props = defineProps({
    entry: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
});

// slide items
const onEntrySlideRight = ({ reset }) => {
    if (storeSettings.settings.promptToDelete) promptToDelete(reset);
    else storeEntries.deleteEntry(props.entry.id);
}

const promptToDelete = (reset) => {
    $q.dialog({
        title: 'Delete entry',
        message: `
      Would you like to delete this entry?
      <div class='text-weight-bold ${useAmountColor(props.entry.amount)}'>
        ${props.entry.name}: ${useCurrencify(props.entry.amount)}
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
        storeEntries.deleteEntry(props.entry.id);
    }).onCancel(() => {
        reset()
    })
}

const onEntrySlideLeft = ({ reset }) => {
    storeEntries.updateEntry(props.entry.id, { paid: !props.entry.paid })
    reset()
}

const onNameUpdate = value => {
    storeEntries.updateEntry(props.entry.id, { name: value })
}

const onAmountUpdate = value => {
    storeEntries.updateEntry(props.entry.id, { amount: value })
}

</script>

<style lang="scss" scoped></style>