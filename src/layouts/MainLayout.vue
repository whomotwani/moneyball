<template>
  <q-layout view="hHh lpR lFf">
    <q-header :elevated="useLightOrDark(true, false)">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <div class="absolute-center">
            <q-icon name="savings" />
            Moneyballs
          </div>
        </q-toolbar-title>

        <q-btn v-if="$route.fullPath == '/'" :label="storeEntries.options.sort ? 'Done' : 'Sort'" flat no-caps dense
          @click="storeEntries.options.sort = !storeEntries.options.sort" />

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="bg-primary" show-if-above bordered :breakpoint="767" :width="250">
      <q-list>
        <q-item-label header class="text-white">
          Essential Links
        </q-item-label>

        <NavLink v-for="link in navLinks" :key="link.title" v-bind="link" />

        <q-item clickable tag="a" class="text-white absolute-bottom" v-if="$q.platform.is.electron" @click="quitApp">
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Quit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

import NavLink from 'components/nav/NavLink.vue'

// import stores
import { useStoreEntries } from 'src/stores/storeEntries'
import { useLightOrDark } from 'src/use/useLightOrDark'

defineOptions({
  name: 'MainLayout'
})

const $q = useQuasar();
// stores
const storeEntries = useStoreEntries();

const navLinks = [
  {
    title: 'Entries',
    icon: 'savings',
    link: '/'
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
function quitApp() {
  console.log('Quitting app');

  $q.dialog({
    title: 'Quit app',
    message: `Do you want to quit Moneyballs?`,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: 'Quit',
      color: 'negative',
      noCaps: true
    },
    cancel: {
      color: 'primary',
      noCaps: true
    }
  }).onOk(() => {
    if($q.platform.is.electron) {
      ipcRenderer.send('quit-app')
    }
  })

}
</script>
