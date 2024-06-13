<template>
  <v-data-table
      :headers="headers"
      :items="filteredCharacters"
      :items-per-page="itemsPerPage"
  >
    <template v-slot:item.image="{ item }">
      <v-card class="my-2" elevation="0">
        <v-img :src="item.image" height="70" width="70"></v-img>
      </v-card>
    </template>

    <template v-slot:item.status="{ item }">
      <v-chip :color="getStatusClass(item.status)" class="text-uppercase" size="small" label>
        {{ item.status }}
      </v-chip>
    </template>

    <template v-slot:item.created="{ item }">
      {{ formatDate(item.created) }}
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { format } from 'date-fns';

defineProps({
  headers: Array,
  filteredCharacters: Array,
  itemsPerPage: Number,
});

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Alive':
      return 'green';
    case 'Dead':
      return 'red';
    default:
      return '';
  }
};

const formatDate = (dateString: string) => format(new Date(dateString), 'dd MMM yyyy');
</script>

<style scoped>
</style>
