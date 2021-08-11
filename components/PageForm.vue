<template>
  <div class="form">
    <div class="form-element">
      <label for="url">url авто</label>
      <input type="text" v-model="car.url" id="url" />
    </div>
    <div class="form-element">
      <label for="name">Название авто</label>
      <input type="text" v-model="car.name" id="name" />
    </div>
    <div class="form-element">
      <label for="price">Цена авто</label>
      <input type="text" v-model="car.price" id="price" />
    </div>
    <button v-if="this.action === 'create'" @click="createPage">Создать страницу</button>
    <button v-if="this.action === 'update'" @click="updatePage">Обновить страницу</button>
    <button v-if="this.action === 'update'" @click="deletePage">Удалить страницу</button>
  </div>
</template>

<script>
export default {
  // Это переиспользуемый компонент с формой для создания/редактирования/удаления страницы.
  // В зависимости от поступаемых пропсов меняется отображение кнопок.
  // Если компонент используется для редактирования текущей страницы, то в него передаются её данные.
  props: { car: { type: Object, default: () => ({}) }, action: { type: String } },

  // Нам потребуется текущий URL страницы, которые не будет связан с input формы.
  data() {
    return {
      currentUrl: "",
    };
  },
  methods: {
    createPage() {
      console.log(this.car);
      // Создаём новую страницу.
      this.$axios
        .post(`/api/cars/`, this.car)
        .then(() => {
          // После успешного создания новой страницы происходит перенаправление на неё.
          this.$router.push(`/page/${this.car.url}`);
        })
        .catch((err) => {
          // Если страница не создана, то в консоль выводим ошибку из бэкенда.
          console.log(err.response.data.message);
        });
    },
    updatePage() {
      // При обновлении текущей страницы нужен исходный URL для запроса в API.
      this.$axios
        .patch(`/api/cars/${this.currentUrl}`, this.car)
        .then(() => {
          // После обновления контента происходит перенаправление на страницу со списком страниц.
          this.$router.push(`/page/`);
        })
        .catch((err) => console.log(err.response.data.message));
    },
    deletePage() {
      // При удалении страницы также используем текущий URL, а не изменяемый URL в форме.
      this.$axios
        .delete(`/api/cars/${this.currentUrl}`)
        .then(() => {
          this.$router.push(`/page/`);
        })
        .catch((err) => console.log(err.response.data.message));
    },
  },
  mounted() {
    // Сохраняем текущий URL на стадии mount компонента.
    this.currentUrl = this.car.url;
  },
};
</script>
