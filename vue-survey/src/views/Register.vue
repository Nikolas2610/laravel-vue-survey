<template>
    <div>
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company" />
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register for free</h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Or
                {{ ' ' }}
                <router-link :to="{ name: 'Login' }" class="font-medium text-indigo-600 hover:text-indigo-500">login to
                    your account</router-link>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form class="space-y-6" @submit="register">
                    <Alert v-if="Object.keys(errors).length" class="relative flex-col items-stretch text-sm">
                        <div v-for="(field, i) in Object.keys(errors)">
                            <div v-for="(error, ind) in errors[field] || []" :key="ind">
                                *{{ error }}
                            </div>
                        </div>
                        <span @click="errors = {}"
                            class="absolute top-0 right-0 flex item roundes-center justify-centerd-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,.2)] p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </Alert>

                    <div>
                        <label for="fullname" class="block text-sm font-medium text-gray-700">Full name</label>
                        <div class="mt-1">
                            <input id="fullname" name="name" type="name" autocomplete="name" v-model="user.name"
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                        <div class="mt-1">
                            <input id="email" name="email" type="email" autocomplete="email" v-model="user.email"
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <div class="mt-1">
                            <input id="password" name="password" type="password" autocomplete="current-password"
                                v-model="user.password"
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    <div>
                        <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm
                            Password</label>
                        <div class="mt-1">
                            <input id="password_confirmation" name="password_confirmation" type="password"
                                autocomplete="current-password_confirmation" v-model="user.password_confirmation"
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            :class="{ 'cursor-not-allowed': loading, 'hover:bg-indigo-500': loading }">
                            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script setup>
import store from '../store';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Alert from '../components/Alert.vue';

const router = useRouter();
const user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
}

const errors = ref({})
const loading = ref(false);

const register = (event) => {
    event.preventDefault();
    loading.value = true;
    store
        .dispatch('register', user)
        .then(() => {
            loading.value = false;
            errors.value = {};
            router.push({ name: 'Dashboard' })
        })
        .catch(err => {
            if (err.response.status === 422) {
                loading.value = false;
                errors.value = err.response.data.errors
            }
        })
}
</script>
  