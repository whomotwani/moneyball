import { defineStore } from "pinia";
import { reactive, watch } from "vue";

import { Dark, LocalStorage } from "quasar";

export const useStoreSettings = defineStore("settings", () => {
  //- States
  const settings = reactive({
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: "₹",
    darkMode: false, // can be false, true or "auto"
  });

  //- Getters

  //- Actions
  const saveSettings = () => {
    LocalStorage.setItem("settings", settings);
  };

  const loadSettings = () => {
    const savedSettings = LocalStorage.getItem("settings");
    if (savedSettings) Object.assign(settings, savedSettings);
  };

  //- watchers
  watch(
    // watch dark mode
    () => settings.darkMode,
    (value) => {
      Dark.set(value);
    },
    { immediate: true }
  );

  watch(settings, () => {
    // watch settings and update localStorage
    saveSettings();
  });

  return {
    // state
    settings,

    // getters
    // actions
    loadSettings,
  };
});
