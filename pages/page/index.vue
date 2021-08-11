<template>
  <main>
    <h1>Список страниц</h1>
    <ul>
      <li v-for="car in cars" :key="car.name">
        <nuxt-link :to="`/page/${car.url}`">{{ car.name }}</nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  // Получаем список динамических страниц сайта из API.
  async asyncData({ $axios, error }) {
    try {
      const cars = await $axios.$get(`/api/cars/`);
      return { cars };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  head() {
    let title = "Список страниц";
    let description = "Список динамических страниц сайта";

    return {
      title: title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", property: "og:title", content: title },
        { hid: "og:description", property: "og:description", content: description },
      ],
    };
  },
};
</script>
