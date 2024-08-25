import { defineStore } from "pinia";
import { ref, computed, reactive, watch, nextTick } from "vue";
import { uid, Notify, LocalStorage } from "quasar";

export const useStoreEntries = defineStore("entries", () => {
  //- States
  const entries = ref([]);

  const options = reactive({
    sort: false,
  });

  //- Getters
  const balance = computed(() => {
    return entries.value.reduce((acc, cur) => {
      return (acc += cur.amount);
    }, 0);
  });

  const paidBalance = computed(() => {
    return entries.value.reduce((acc, { amount, paid }) => {
      return paid ? acc + amount : acc;
    }, 0);
  });

  const runningBalances = computed(() => {
    let runningBalancesArr = [];
    let currentRunningBalance = 0;

    if (entries.value.length) {
      entries.value.forEach((entry) => {
        let entryAmount = entry.amount ? entry.amount : 0;
        currentRunningBalance = currentRunningBalance + entryAmount;
        runningBalancesArr.push(currentRunningBalance);
      });
    }
    return runningBalancesArr;
  });

  //- Actions
  const addEntry = (addEntryForm) => {
    const newEntry = Object.assign({}, addEntryForm, {
      id: uid(),
      paid: false,
    });
    entries.value.push(newEntry);
  };

  // delete entry
  function deleteEntry(entryId) {
    const index = getEntryIndexId(entryId);
    entries.value.splice(index, 1);
    removeSlideItemIfExists(entryId);
    Notify.create({
      message: "Entry deleted",
      position: "top",
    });
  }

  // update entry
  const updateEntry = (entryId, updates) => {
    const index = getEntryIndexId(entryId);
    Object.assign(entries.value?.[index], updates);
  };

  const sortEnd = ({ oldIndex, newIndex }) => {
    const movedEntry = entries.value[oldIndex];
    entries.value.splice(oldIndex, 1);
    entries.value.splice(newIndex, 0, movedEntry);
  };

  const saveEntries = () => {
    LocalStorage.setItem("entries", entries.value);
  };

  const loadEntries = () => {
    const savedEntries = LocalStorage.getItem("entries");
    if (savedEntries) Object.assign(entries.value, savedEntries);
  };

  // watchers
  watch(entries.value, () => {
    saveEntries();
  });

  //- helpers
  const removeSlideItemIfExists = (entryId) => {
    // hacky fix
    nextTick(() => {
      const slideItem = document.querySelector(`#id-${entryId}`);
      if (slideItem) slideItem.remove();
    });
  };

  const getEntryIndexId = (entryId) => {
    return entries.value.findIndex((entry) => entry.id === entryId);
  };

  return {
    // state
    entries,
    options,

    // getters
    balance,
    paidBalance,
    runningBalances,

    // actions
    addEntry,
    deleteEntry,
    updateEntry,
    sortEnd,
    loadEntries,
  };
});
