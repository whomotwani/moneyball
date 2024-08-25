<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';

defineOptions({
  name: 'App'
});

// window.addEventListener('contextmenu', e => e.preventDefault())

import { useStoreSettings } from './stores/storeSettings';
import { useStoreEntries } from './stores/storeEntries';

const storeSettings = useStoreSettings();
const storeEntries = useStoreEntries();

onMounted(() => {
  storeSettings.loadSettings();
  storeEntries.loadEntries();
})
</script>
