import { defineStore } from "pinia";
import { reactive } from "vue";

export const useStoreSettings = defineStore("settings", () => {
  //- States
  const settings = reactive({
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: "₹",
  });

  //- Getters

  //- Actions

  //- helpers

  return {
    // state
    settings,

    // getters
    // actions
  };
});
