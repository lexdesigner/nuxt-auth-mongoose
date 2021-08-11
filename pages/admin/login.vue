<template>
  <section id="login">
    <div class="login-wrapper">
      <el-form :model="loginForm" status-icon ref="loginForm" class="login-form">
        <el-form-item prop="user">
          <el-input v-model="loginForm.user" placeholder="Пользователь"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="Пароль"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login">Войти</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  head() {
    let title = "Страница авторизации";
    return {
      title: title,
      meta: [
        // Указываем роботам поисковых систем, что текущую страницу не нужно индексировать.
        { name: "robots", content: "noindex, nofollow" },
      ],
    };
  },
  data() {
    return {
      loginForm: {
        user: "",
        password: "",
      },
      loginError: "",
    };
  },
  watch: {
    loginError(newError, oldError) {
      if (this.loginError) {
        let self = this;
        this.$notify.error({
          title: "Ошибка",
          message: newError,
          showClose: false,
          onClose() {
            self.loginError = "";
          },
        });
      }
    },
  },
  methods: {
    authCheck() {
      return this.$store.state.isAuth;
    },
    async login() {
      try {
        // Берём данные из полей формы.
        let formData = {
          user: this.loginForm.user,
          password: this.loginForm.password,
        };

        // Отправляем их на проверку.
        await this.$axios.post("/api/auth/login", formData);

        // При успешной проверке записываем в стор isAuth = true.
        await this.$store.dispatch("checkAuth");

        // Редирект на главную страницу.
        this.$router.push("/admin/");
      } catch (err) {
        // В случае ошибки выводим текст под формой.
        this.loginError = err.response.data.message;
      }
    },
  },
  created() {
    this.authCheck() ? this.$router.push("/admin/") : false;
  },
};
</script>

<style lang="sass" scoped>
#login
	width: 100vw
	height: 100vh
	background-image: url('~assets/img/login-bg.jpg')
	display: flex
	justify-content: center
	align-items: center
	background-size: cover
	background-repeat: no-repeat
	background-position: center center
.login-wrapper
	padding: 50px
	border-radius: 5px
	position: relative
	overflow: hidden
	z-index: 1
	width: 400px
	&::before
		content: ""
		position: absolute
		background: inherit
		z-index: -1
		top: 0
		left: 0
		right: 0
		bottom: 0
		box-shadow: inset 0 0 0 200px rgba(3,3,3,0.95)
		filter: blur(10px)
	.el-button
		width: 100%
</style>
