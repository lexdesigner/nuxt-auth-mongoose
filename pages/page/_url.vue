<template>
  <main>
    <h1>{{ car.name }}</h1>

    <button v-if="isAuth" @click="showPageForm = true">Редактировать</button>
    <LazyPageForm v-if="showPageForm" :car="car" action="update" />
  </main>
</template>

<script>
export default {
  // Получаем конкретную страницу с URL, который берётся из params.
  async asyncData({ $axios, params, error }) {
    try {
      const car = await $axios.$get(`/api/cars/${params.url}`);
      return { car };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data() {
    return {
      car: { url: "", name: "", price: "" },

      // При нажатии на кнопку "Редактировать" показывается форма. По-умолчанию её нет в DOM.
      // На этой странице форма подключена асинхронно, то есть её нет в чанке этой страницы.
      // Код асинхронных компонентов Nuxt при сборке вырезает в отдельные js и css файлы.
      showPageForm: false,
    };
  },

  head() {
    return {
      // Title и Description конкретной страницы берутся из данных, которые приходят через asyncData.
      title: this.car.name,
    };
  },

  computed: {
    // Если пользователь не авторизирован, то он не увидит контент кнопки редактировать.
    isAuth() {
      return this.$store.state.isAuth;
    },
  },
};
</script>
