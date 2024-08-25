<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'
import { useStoreSettings } from './stores/storeSettings';
import { useStoreEntries } from './stores/storeEntries';

defineOptions({
  name: 'App'
});

const $q = useQuasar();
const router = useRouter();

// window.addEventListener('contextmenu', e => e.preventDefault())

const storeSettings = useStoreSettings();
const storeEntries = useStoreEntries();

onMounted(() => {
  storeSettings.loadSettings();
  storeEntries.loadEntries();

  if ($q.platform.is.electron) {
    ipcRenderer.on("show-settings", () => {
      router.push("/settings")
    })
  }
})
</script>
