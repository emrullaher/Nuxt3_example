<template>
    <div>
        <h3 class="sr-only">Categories</h3>
        <ul
            class="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200 p-3 lg:p-0 lg:pb-5"
            role="list"
        >
            <li v-for="(category, i) in categories" :key="category + i">
                <a
                    :class="currentCategory === category ? 'text-blue-700' : ''"
                    class="uppercase cursor-pointer block px-2 px-lg-0"
                    @click="filter(category)"
                >
                    {{ category }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    categories: {
        type: Array,
        default: null,
    },
    currentCategory: {
        type: String,
        default: 'all',
    },
})

const emit = defineEmits(['filter'])

function filter(category) {
    emit('filter', category)
}
</script>
