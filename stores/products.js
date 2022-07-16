import { defineStore } from "pinia";

export const useProducts = defineStore("products", {
  state: () => {
    return {
      // [
      //   {
      //       id:1,
      //       title:'...',
      //       price:'...',
      //       category:'...',
      //       description:'...',
      //       image:'...'
      //   },
      //  /*...*/
      // ]
      products: [],
      // ["electronics","jewelery","men's clothing","women's clothing"]
      categories: [],
      sort: "asc"
    };
  },
  actions: {
    async getProducts() {
      this.products = [];
      const config = useRuntimeConfig();
      const { data: products } = await useFetch(
        `${config.public.API_BASE_URL}/products?sort=${this.sort}`,
        { initialCache: false }
      );
      this.products = products;
    },
    async getCategories() {
      const config = useRuntimeConfig();
      const { data: categories } = await useFetch(
        `${config.public.API_BASE_URL}/products/categories?sort=${this.sort}`
      );
      this.categories = categories;
    },
    async getProductsByCategory(category) {
      if (category === "all") {
        await this.getProducts();
        return;
      }
      this.products = [];
      const config = useRuntimeConfig();
      const { data: products } = await useFetch(
        `${config.public.API_BASE_URL}/products/category/${category}?sort=${this.sort}`,
        { initialCache: false }
      );
      this.products = products;
    },
    setSort(sort) {
      this.sort = sort;
    }
  }
});
