<template>
    <q-slide-item @right="onEntrySlideRight" @left="onEntrySlideLeft" left-color="positive" right-color="negative"
        :class="{ 'bg-grey-2': entry.paid }">
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
                        <q-input input-class="text-weight-bold" v-model="scope.value" dense autofocus
                            @keyup.enter="scope.set" />
                    </q-popup-edit>
                </q-item-label>
            </q-item-section>
            <q-item-section side :class="[useAmountColor(entry.amount), { 'text-strike': entry.paid }]">
                {{ useCurrencify(entry.amount) }}
                <q-popup-edit :model-value="entry.amount" auto-save v-slot="scope" anchor="top left" :offset="[24, 16]"
                    cover="false" buttons label-set="ok" @save="onAmountUpdate">
                    <q-input type="number" step="0.01" input-class="text-weight-bold text-right"
                        v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
                </q-popup-edit>
            </q-item-section>
        </q-item>
    </q-slide-item>
</template>

<script setup>
import { useQuasar } from 'quasar'

// import stores
import { useStoreEntries } from 'src/stores/storeEntries'

// composibles
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColor } from 'src/use/useAmountColor'

const $q = useQuasar()

// stores
const storeEntries = useStoreEntries();

// props
const props = defineProps({
    entry: {
        type: Object,
        required: true
    }
});

// slide items
const onEntrySlideRight = ({ reset }) => {
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