<template>
  <q-page>
    <div class="q-pa-md">
      <transition appear enter-active-class="animated jackInTheBox slower">
        <NothingHere v-if="!storeEntries.entries.length" />
      </transition>

      <q-list v-if="storeEntries.entries.length" class="entries">
        <Sortable :list="storeEntries.entries" item-key="id" tag="div" :options="{ handle: '.sort-handle' }"
          @end="storeEntries.sortEnd">
          <template #item="{ element, index }">
            <Entry :key="element.id" :entry="element" :index="index" />
          </template>
        </Sortable>
      </q-list>
    </div>

    <q-footer class="bg-transparent">
      <transition appear enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <Balance v-if="storeEntries.entries.length" />
      </transition>

      <AddEntry />
    </q-footer>
  </q-page>
</template>

<script setup>
import { Sortable } from "sortablejs-vue3";

// components
import Balance from 'src/components/Entries/Balance.vue'
import AddEntry from 'src/components/Entries/AddEntry.vue'
import Entry from 'src/components/Entries/Entry.vue'
import NothingHere from 'src/components/Entries/NothingHere.vue'
import { useStoreEntries } from 'src/stores/storeEntries'

// stores
const storeEntries = useStoreEntries();

</script>
