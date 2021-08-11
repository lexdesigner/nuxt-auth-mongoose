<template>
  <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
    <el-menu>
      <el-menu-item index="1">
        <i class="el-icon-folder"></i>
        <span><nuxt-link to="/admin/catalog/">Каталог авто</nuxt-link></span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-picture-outline"></i>
        <span><nuxt-link to="/admin/main/">Главный блок</nuxt-link></span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-discount"></i>
        <span><nuxt-link to="/admin/actions/">Блок Акции</nuxt-link></span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-s-finance"></i>
        <span><nuxt-link to="/admin/credit/">Блок Кредит</nuxt-link></span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-map-location"></i>
        <span><nuxt-link to="/admin/contacts/">Блок Контакты</nuxt-link></span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span><nuxt-link to="/admin/setting/">Настройки</nuxt-link></span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-info"></i>
        <span><nuxt-link to="/admin/disclaimers/">Дисклеймеры</nuxt-link></span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
.el-menu-item a
	color: #303133
	text-decoration: none
	&::before
		content: ''
		position: absolute
		left: 0
		top: 0
		bottom: 0
		right: 0
.el-menu-item
	position: relative
</style>
