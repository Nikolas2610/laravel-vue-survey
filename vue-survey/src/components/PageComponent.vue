<template>
    <div class="bg-gray-50">
        <header class="shadow-sm">
            <div class="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
                <h1 class="text-lg font-semibold leading-6 text-gray-900">
                    {{ title }}
                </h1>
                <slot name="header"></slot>
            </div>
        </header>
        <main>
            <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <!-- Replace with your content -->
                <div class="px-4 py-4 sm:px-0">
                    <slot></slot>
                </div>
                <!-- /End replace -->
            </div>
        </main>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
})
</script>

<style lang="scss" scoped>

</style>