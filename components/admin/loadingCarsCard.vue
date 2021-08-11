<template>
  <el-card class="admin-cards--item" v-loading="loading">
    <div slot="header">
      <span>Автомобили</span>
    </div>
    <div class="text item" v-if="cars">
      <div class="text-wrapper">
        <p>
          Количество: <b>{{ cars.length }}</b>
        </p>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      showInitialContent: null,
      cars: null,
      loading: true,
    };
  },
  mounted() {
    fetch("/api/cars/")
      .then((response) => response.json())
      .then((json) => {
        this.cars = json;
        this.loading = false;
      });
  },
};
</script>

<style lang="sass" scoped>
.admin-cards--item
	flex: 1 1 auto
	margin-right: 20px
	max-width: 33.333%
.el-card__header span
	font-weight: bold
	text-transform: uppercase
	a
		text-decoration: none
.el-card__body
	p
		line-height: 1.4
		margin-bottom: 10px
	.item
		display: flex
		justify-content: space-between
		align-items: center
</style>
