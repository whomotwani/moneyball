<template>
    <div class="row text-grey-7 q-px-md q-py-sm shadow-up-3 q-mb-sm">
        <div class="col text-h6">
            Balance
        </div>
        <div class="col text-h6 text-right" :class="useAmountColor(storeEntries.balance)">
            {{ useCurrencify(storeEntries.balance) }}
        </div>
    </div>
</template>

<script setup>
// composibles
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColor } from 'src/use/useAmountColor'
import { useStoreEntries } from 'src/stores/storeEntries'

const storeEntries = useStoreEntries();

</script>
