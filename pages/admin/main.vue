<template>
  <div id="admin-actions">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  // Получаем список авто из API.
  async asyncData({ $axios, error }) {
    try {
      const cars = await $axios.$get(`/api/cars/`);
      return { cars };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },
  data() {
    return {
      title: "Главный блок",
      description: "Список автомобилей",
      search: "",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.description },
        { hid: "og:title", property: "og:title", content: this.title },
        { hid: "og:description", property: "og:description", content: this.description },
      ],
    };
  },
  layout: "admin",
};
</script>

<style lang="sass" scoped>
h1
	text-transform: uppercase
	font-weight: bold
	font-size: 24px
	line-height: 1.2
.catalog-cars
	margin-top: 30px
</style>
