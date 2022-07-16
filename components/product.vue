<template>
    <div class="p-3 w-full h-full">
        <div
            class="flex flex-col h-full bg-white border-amber-700 shadow-lg rounded-lg overflow-hidden"
        >
            <!-- Image -->
            <a
                class="block focus:outline-none focus-visible:ring-2 border-b p-5"
                href="#0"
            >
                <figure class="relative h-0 pb-[56.25%] overflow-hidden">
                    <img
                        :src="product.image"
                        alt="Course"
                        class="absolute inset-0 w-full h-full object-contain transform hover:scale-105 transition duration-700 ease-out"
                        height="180"
                        width="320"
                    />
                </figure>
            </a>
            <!-- Card Content -->
            <div class="flex-grow flex flex-col p-5">
                <!-- Card body -->
                <div class="flex-grow">
                    <!-- Header -->
                    <header class="mb-3">
                        <a
                            class="block focus:outline-none focus-visible:ring-2"
                            href="#0"
                        >
                            <h3
                                :title="product.title"
                                class="text-[22px] text-gray-900 font-extrabold leading-snug line-clamp-2"
                            >
                                {{ product.title }}
                            </h3>
                        </a>
                    </header>
                    <!-- Content -->
                    <div class="mb-8">
                        <p :title="product.description" class="line-clamp-3">
                            {{ product.description }}
                        </p>
                    </div>
                </div>
                <!-- Card footer -->
                <div class="flex align-middle justify-between space-x-2">
                    <p
                        class="font-bold text-lg inline-flex items-center justify-center rounded text-gray-900"
                    >
                        ${{ product.price }}
                    </p>
                    <a
                        class="font-semibold text-sm inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-500 focus:outline-none focus-visible:ring-2 hover:bg-indigo-600 text-white"
                        href="#0"
                        >Add Cart</a
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    product: {
        type: Object,
        default: '',
    },
})
</script>
