<template>
    <div class="row text-grey-7 q-px-md q-py-sm shadow-up-3 q-mb-sm items-center">
        <div class="col text-h6">
            Balance
        </div>
        <div class="col text-h6 text-right" :class="useAmountColor(storeEntries.balance)">
            <div class="row">
                <div class="col">
                    {{ useCurrencify(storeEntries.balance) }}
                </div>
            </div>
            <div class="row" v-if="storeEntries.paidBalance">
                <div class="col text-caption text-grey-6">
                    Paid:
                    <span class="text-weight-bold" :class="useAmountColor(storeEntries.paidBalance)">
                        {{ useCurrencify(storeEntries.paidBalance) }}
                    </span>
                </div>
            </div>
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
