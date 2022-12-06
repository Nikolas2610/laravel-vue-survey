<template>
    <fieldset class="mb-4">
        <div>
            <legend class="text-base font-medium text-gray-900">
                {{ index + 1 }}. {{ question.question }}
            </legend>
            <p class="text-gray-500 text-sm">
                {{ question.description }}
            </p>
        </div>
        <div class="mt-3">
            <div v-if="question.type === 'select'">
                <select :value="modelValue" @change="emits('update:modelValue', $event.target.value)"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm docus:outline-none docus:ring-indigo-500 focus:border-indigo-500 sm:te">
                    <option value="">Please Select</option>
                    <option v-for="option in question.data.options" :value="option.text" :key="option.uuid">
                        {{ option.text }}
                    </option>

                </select>
            </div>
            <div v-if="question.type === 'radio'">
                <div v-for="(option, index) in quiestion.data.options" :key="option.uuid" class="flex items-center">
                    <input type="radio" :id="option.uuid" :name="'question' + question.id" :value="option.text"
                        @change="emits('update:modelValue', $event.target.value)"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                    <label :for="option.uuid" class="ml-3 block text-sm font-medium text-gray-700">
                        {{ option.text }}
                    </label>
                </div>
            </div>
            <div v-if="question.type === 'checkbox'">

            </div>
            <div v-if="question.type === 'text'">

            </div>
            <div v-if="question.type === 'textarea'">

            </div>
        </div>
    </fieldset>
    <hr class="mb-4" />
</template>

<script setup>
const { question, index, modelValue } = defineProps({
    question: Object,
    index: Number,
    modelValue: [String, Array]
})

const emits = defineEmits(["update:modelValue"]);

let model;
if (question.type === "checkbox") {
    model = ref({})
}
</script>

<style lang="scss" scoped>

</style>