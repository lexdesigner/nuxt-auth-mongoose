<template>
  <header id="adminHeader">
    <nuxt-link to="/admin/" class="adminHeader-logo">ADMIN PANEL</nuxt-link>
    <div class="adminHeader-wrapper">
      <el-link type="info" to="/" target="_blank">Открыть сайт</el-link>
      <el-button
        type="primary"
        icon="el-icon-switch-button"
        @click="logout"
        class="adminHeader-logout"
        circle
      ></el-button>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    // Запускаем процесс логаута с обновлением значения в сторе и редиректом на главную страницу.
    async logout() {
      try {
        await this.$axios.delete("/api/auth/logout");
        await this.$store.dispatch("checkAuth");
        this.$router.push("/admin/login/");
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
#adminHeader
	width: 100%
	display: flex
	align-items: stretch
	justify-content: space-between
	background-color: #F2F6FC
	height: 54px
.adminHeader-logo
	font-weight: bold
	text-transform: uppercase
	font-size: 20px
	line-height: 1.2
	background-color: $accent
	padding: 15px
	color: #EBEEF5
	text-decoration: none
	width: 300px
	text-align: center
.adminHeader-wrapper
	padding: 0 15px
	display: flex
	align-items: center
	justify-content: flex-end
.adminHeader-logout
	margin-left: 40px
</style>
