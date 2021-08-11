<template>
  <el-container id="admin-page" class="is-vertical" v-if="isAuth">
    <vHeader />
    <el-container>
      <vAside />
      <el-container>
        <el-main>
          <Nuxt />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import vHeader from "@/components/admin/vHeader";
import vAside from "@/components/admin/vAside";
export default {
  head() {
    let title = "Админ панель Mitsubishi";
    return {
      title: title,
      meta: [
        // Указываем роботам поисковых систем, что текущую страницу не нужно индексировать.
        { name: "robots", content: "noindex, nofollow" },
      ],
    };
  },
  components: {
    vHeader,
    vAside,
  },
  methods: {
    authCheck() {
      return this.$store.state.isAuth;
    },
  },
  computed: {
    // Если пользователь не авторизирован, то он не увидит контент этой страницы.
    isAuth() {
      return this.$store.state.isAuth;
    },
  },
  created() {
    this.authCheck() ? true : this.$router.replace({ path: "/admin/login/" });
  },
};
</script>
<style lang="sass" scoped>
#admin-page
	min-height: 100vh
</style>
