import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { uid, Notify } from "quasar";

export const useStoreEntries = defineStore("entries", () => {
  //- States
  const entries = ref([
    {
      id: "id0",
      name: "Salary",
      amount: 8000000,
      paid: false,
    },
    {
      id: "id1",
      name: "EMI",
      amount: -5000000,
      paid: false,
    },
    {
      id: "id2",
      name: "iPhone",
      amount: -200000,
      paid: false,
    },
    {
      id: "id3",
      name: "Unknown",
      amount: 299,
      paid: false,
    },
  ]);

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

  //- helpers
  const getEntryIndexId = (entryId) => {
    return entries.value.findIndex((entry) => entry.id === entryId);
  };

  return {
    // state
    entries,

    // getters
    balance,
    paidBalance,

    // actions
    addEntry,
    deleteEntry,
    updateEntry,
  };
});
