<template>
  <div>
    <CharacterSearch
        :search="search"
        :selected-status="selectedStatus"
        :status-options="statusOptions"
        :start-date="startDate"
        :end-date="endDate"
        @update:search="search = $event"
        @update:selectedStatus="selectedStatus = $event"
        @update:startDate="startDate = $event"
        @update:endDate="endDate = $event"
    />
    <CharacterTable
        :headers="headers"
        :filteredCharacters="filteredCharacters"
        :items-per-page="itemsPerPage"
    />
  </div>
</template>

<script setup lang="ts">
import { useFetchCharacters } from '~/composables/useApiFetch';
import type { ICharacter } from '~/ts/ICharacter';
import { format } from 'date-fns';

const search = ref('');
const selectedStatus = ref<string | null>(null);
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);
const statusOptions = ['', 'Alive', 'Dead', 'unknown'];
const itemsPerPage = ref(8);

const charactersData = ref<ICharacter[]>([]);

const headers = [
  { title: 'Photo', key: 'image', sortable: false },
  { title: 'Name', key: 'name' },
  { title: 'Species', key: 'species', sortable: false },
  { title: 'Status', key: 'status', sortable: false },
  { title: 'Created', key: 'created', sortable: false },
];

const fetchCharacters = async () => {
  try {
    const res = await useFetchCharacters();
    charactersData.value = res.data?.value.results ?? [];
  } catch (err) {
    console.error(err);
  }
};

fetchCharacters();

const formatDate = (dateString: string) => format(new Date(dateString), 'yyyy-MM-dd');

const filteredCharacters = computed(() => {
  return charactersData.value.filter(character => {
    const nameMatch = character.name.toLowerCase().includes(search.value.toLowerCase());
    const statusMatch = !selectedStatus.value || character.status === selectedStatus.value;
    const startDateMatch = !startDate.value || formatDate(character.created) >= formatDate(startDate.value);
    const endDateMatch = !endDate.value || formatDate(character.created) <= formatDate(endDate.value);

    return nameMatch && statusMatch && startDateMatch && endDateMatch;
  });
});
</script>

<style scoped>
</style>
