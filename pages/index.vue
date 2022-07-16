<template>
  <div class="bg-yellow-50">
    <!-- Mobile filter dialog -->
    <TransitionRoot :show="mobileFiltersOpen" as="template">
      <Dialog
        as="div"
        class="relative z-40 lg:hidden"
        @close="mobileFiltersOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 flex z-40">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <DialogPanel
              class="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto"
            >
              <div class="px-4 flex items-center justify-between">
                <h2 class="text-lg font-medium text-gray-900">
                  Filters
                </h2>
                <button
                  class="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                  type="button"
                  @click="mobileFiltersOpen = false"
                >
                  <span class="sr-only">Close menu</span>
                  <XIcon aria-hidden="true" class="h-6 w-6" />
                </button>
              </div>

              <!-- Filters -->
              <form class="mt-4 border-t border-gray-200">
                <lazy-categories
                  :categories="categories"
                  :current-category="currentCategory"
                  @filter="filterByCategory"
                ></lazy-categories>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-900"
      >
        <h1
          class="text-4xl font-extrabold tracking-tight text-gray-900"
        >
          Products
        </h1>

        <div class="flex items-center">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sort
                <ChevronDownIcon
                  aria-hidden="true"
                  class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem
                    v-for="option in sortOptions"
                    :key="option.name"
                    v-slot="{ active }"
                  >
                    <a
                      :class="[
                                                option.current
                                                    ? 'font-medium text-gray-900'
                                                    : 'text-gray-500',
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm',
                                            ]"
                      :href="option.href"
                      class="flex justify-between"
                      @click="sortBy(option)"
                    >
                      {{ option.name }}
                      <CheckIcon
                        v-if="option.current"
                        aria-hidden="true"
                        class="w-5 h-5 text-green-900"
                      />
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>

          <!--                    <button-->
          <!--                        class="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"-->
          <!--                        type="button"-->
          <!--                    >-->
          <!--                        <span class="sr-only">View grid</span>-->
          <!--                        <ViewGridIcon aria-hidden="true" class="w-5 h-5" />-->
          <!--                    </button>-->
          <button
            class="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
            type="button"
            @click="mobileFiltersOpen = true"
          >
            <span class="sr-only">Filters</span>
            <FilterIcon aria-hidden="true" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <section aria-labelledby="products-heading" class="pt-6 pb-24">
        <h2 id="products-heading" class="sr-only">Products</h2>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
          <!-- Filters -->
          <form class="hidden lg:block">
            <lazy-categories
              :categories="categories"
              :current-category="currentCategory"
              @filter="filterByCategory"
            ></lazy-categories>
          </form>

          <!-- Product grid -->
          <div class="lg:col-span-3">
            <template v-if="loading">
              <div class="flex flex-wrap">
                <div
                  v-for="item in [0, 1, 2, 3, 4, 5]"
                  :key="item"
                  class="md:w-6/12 lg:w-4/12"
                >
                  <lazy-product-skeleton></lazy-product-skeleton>
                </div>
              </div>
            </template>
            <div
              v-if="products && products.length"
              class="flex flex-wrap"
            >
              <div
                v-for="product in products"
                :key="product.id"
                class="md:w-6/12 lg:w-4/12"
              >
                <lazy-product :product="product"></lazy-product>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline/index.js";
import { CheckIcon, ChevronDownIcon, FilterIcon } from "@heroicons/vue/solid/index.js";
import { useProducts } from "../stores/products";

const productsStore = useProducts();
await productsStore.getProducts();
await productsStore.getCategories();
const categories = ["all", ...productsStore.categories];

// states
const mobileFiltersOpen = ref(false);
const currentCategory = ref("all");
const products = ref([...productsStore.products]);
const loading = ref(false);
const sortOptions = ref([
  { name: "asc", href: "#", current: true },
  { name: "desc", href: "#", current: false }
]);

async function filterByCategory(category) {
  currentCategory.value = category;
  loading.value = true;
  await productsStore.getProductsByCategory(category);
  setProducts();
  loading.value = false;
}

function sortBy(sort) {
  sortOptions.value = sortOptions.value.map((option) => {
    option.current = option.name === sort.name;
    return option;
  });
  sortProducts(sort.name);
}

async function sortProducts(sort) {
  productsStore.setSort(sort);
  currentCategory.value === "all"
    ? await productsStore.getProducts()
    : await productsStore.getProductsByCategory(currentCategory.value);
  setProducts();
}

function setProducts() {
  products.value = [];
  products.value = productsStore.products;
}
</script>