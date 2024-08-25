<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered padding>
        <q-item-label header>Entries</q-item-label>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Prompt to delete</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="storeSettings.settings.promptToDelete" />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Show running balance</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="storeSettings.settings.showRunningBalance" />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-input v-select-all outlined v-model="storeSettings.settings.currencySymbol" label="Currency symbol" />
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item-label header>Appearance</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-radio v-model="storeSettings.settings.darkMode" :val="false" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Light</q-item-label>
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-radio v-model="storeSettings.settings.darkMode" :val="true" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dark</q-item-label>
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section avatar top>
            <q-radio v-model="storeSettings.settings.darkMode" :val="'auto'" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Auto</q-item-label>
            <q-item-label caption>Follows device preference</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </div>
  </q-page>
</template>

<script setup>
// imports
import { useStoreSettings } from 'src/stores/storeSettings';
import vSelectAll from 'src/directives/directiveSelectAll'

defineOptions({
  name: 'IndexPage'
});

const storeSettings = useStoreSettings();

</script>
