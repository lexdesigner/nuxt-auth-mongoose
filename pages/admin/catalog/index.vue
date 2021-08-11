<template>
  <div id="admin-catalog">
    <div class="catalog_header">
      <h1>{{ title }}</h1>
      <el-button size="mini" type="primary" @click="$router.push('create/')">Добавить авто</el-button>
    </div>
    <el-table :data="cars" border stripe :default-sort="{ prop: 'name', order: 'descending' }" class="catalog-cars">
      <el-table-column>
        <template slot-scope="scope">
          <img :src="scope.row.image" alt="" class="catalog-cars__image" />
        </template>
      </el-table-column>
      <el-table-column label="Модель" prop="name" sortable> </el-table-column>
      <el-table-column label="Цена" prop="price" sortable> </el-table-column>
      <el-table-column label="Выгода" prop="benefit" sortable> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Поиск авто" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push(`${scope.row.url}/`)">Править</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      title: "Каталог авто",
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
  methods: {
    handleDelete(index, row) {
      this.$axios
        .delete(`/api/cars/${row.url}`)
        .then((res) => {
          this.$message({
            message: res.data.message,
            type: "success",
          });
          this.pageReload();
        })
        .catch((err) => this.$message.error(err.response.data.message));
    },
    pageReload() {
      this.$router.go(0);
    },
  },
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
.catalog_header
	display: flex
	align-items: center
	justify-content: space-between
.catalog-cars__image
	display: block
	max-height: 70px
	max-width: 100%
</style>
