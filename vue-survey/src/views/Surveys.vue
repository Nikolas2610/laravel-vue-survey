<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <div class="text-3xl font-bold text-gray-900">Surveys</div>
        <router-link :to="{ name: 'SurveyCreate' }"
          class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-4 h-4 -mt-1 inline-block">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add new Survey
        </router-link>
      </div>
    </template>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <div v-for="survey in surveys" :key="survey.id"
        class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
        <img :src="survey.image" class="w-full h-48 object-cover">
        <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
        <div v-html="survey.description" class="overflow-hidden flex-1"></div>

        <div class="flex justify-between items-center mt-3">
          <router-link :to="{ name: 'SurveyView', params: { id: survey.id } }" class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit</router-link>
        </div>
      </div>
    </div>
  </PageComponent>
</template>

<script setup>
import store from '../store';
import { computed } from 'vue';
import PageComponent from '../components/PageComponent.vue';

const surveys = computed(() => store.state.surveys);
</script>