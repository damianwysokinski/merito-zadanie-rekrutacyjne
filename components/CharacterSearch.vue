<template>
  <v-card-title class="d-flex flex-column flex-sm-row align-sm-center pe-2 ga-4">
    Characters

    <v-spacer></v-spacer>

    <v-text-field
        v-model="search"
        density="compact"
        label="Search by name"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
        max-width="400"
    ></v-text-field>

    <v-select
        v-model="selectedStatus"
        :items="statusOptions"
        density="compact"
        label="Filter by Status"
        variant="solo-filled"
        flat
        hide-details
        max-width="200"
    ></v-select>

    <v-date-input
        v-model="startDate"
        prepend-icon=""
        prepend-inner-icon="$calendar"
        density="compact"
        label="Start date"
        variant="solo-filled"
        flat
        hide-details
        max-width="300"
    ></v-date-input>

    <v-date-input
        v-model="endDate"
        prepend-icon=""
        prepend-inner-icon="$calendar"
        density="compact"
        label="End date"
        variant="solo-filled"
        flat
        hide-details
        max-width="300"
    ></v-date-input>
  </v-card-title>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import { VDateInput } from "vuetify/lib/labs/VDateInput";

const props = defineProps({
  search: String,
  selectedStatus: String,
  statusOptions: Array,
  startDate: String,
  endDate: String,
});

const emit = defineEmits(['update:search', 'update:selectedStatus', 'update:startDate', 'update:endDate']);

const search = ref(props.search);
const selectedStatus = ref(props.selectedStatus);
const startDate = ref(props.startDate);
const endDate = ref(props.endDate);

watch(search, (newValue) => {
  emit('update:search', newValue);
});

watch(selectedStatus, (newValue) => {
  emit('update:selectedStatus', newValue);
});

watch(startDate, (newValue) => {
  emit('update:startDate', newValue);
});

watch(endDate, (newValue) => {
  emit('update:endDate', newValue);
});
</script>

<style scoped>
</style>
