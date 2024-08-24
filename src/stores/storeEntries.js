import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { uid, Notify } from "quasar";

export const useStoreEntries = defineStore("entries", () => {
  //- States
  const entries = ref([
    {
      id: "id0",
      name: "Salary",
      amount: 500,
      paid: false,
    },
    {
      id: "id1",
      name: "EMI",
      amount: -50,
      paid: false,
    },
    {
      id: "id2",
      name: "iPhone",
      amount: -20,
      paid: false,
    },
    {
      id: "id3",
      name: "Unknown",
      amount: 0,
      paid: false,
    },
  ]);

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

  //- helpers
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
  };
});
