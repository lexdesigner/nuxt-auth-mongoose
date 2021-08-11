<template>
  <div class="admin-setting">
    <h1>{{ title }}</h1>
    <div class="settings">
      <div class="settings-row" v-for="item in settings" :key="item.id">
        <template v-if="item.type === 'time'">
          <label :for="item.id">{{ item.name }}</label>
          <el-time-picker is-range v-model="item.model" range-separator="-" start-placeholder="с" end-placeholder="до">
          </el-time-picker>
          <el-button class="time-picker-btn" icon="el-icon-check" @click.prevent="updateSetting(item)"></el-button>
        </template>
        <template v-else-if="item.type === 'file'">
          <label :for="item.id">{{ item.name }}</label>
          <el-upload action="/api/addFile/" :on-success="updateLogo" :file-list="fileList" :on-remove="removeLogo">
            <el-button size="small" type="primary">Загрузить файл</el-button>
          </el-upload>
        </template>
        <template v-else>
          <label :for="item.id">{{ item.name }}</label>
          <div class="setting-input">
            <el-input v-model="item.model">
              <el-button slot="append" icon="el-icon-check" @click.prevent="updateSetting(item)"></el-button>
            </el-input>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Получаем список настроек из API.
  async asyncData({ $axios, error }) {
    try {
      const settings = await $axios.$get(`/api/settings/`);
      const fileList = await $axios.$get(`/api/settings/logo`);
      return { settings, fileList: fileList.model };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },
  data() {
    return {
      title: "Настройки сайта",
      description: "Настройки сайта",
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
    updateSetting({ name, id, model, type }) {
      this.$axios
        .patch(`/api/settings/${id}`, { name, id, model, type })
        .then(() => {
          this.$message({
            message: "Настройки сохранены",
            type: "success",
          });
        })
        .catch((err) => this.$message.error(err.response.data.message));
    },
    updateLogo(response, file) {
      this.fileList = [{ name: file.name, url: `${location.origin}/${response}` }];
      this.updateSetting({
        name: "Логотип",
        id: "logo",
        model: [{ name: file.name, url: `${location.origin}/${response}` }],
        type: "file",
      });
    },
    removeLogo() {
      this.fileList = [];
      this.updateSetting({
        name: "Логотип",
        id: "logo",
        model: [],
        type: "file",
      });
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
.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner
	width: 294px
	border-top-right-radius: 0
	border-bottom-right-radius: 0

.settings-row
	margin-bottom: 20px
	display: flex
	align-items: center
	label
		max-width: 200px
		width: 100%
.setting-input
	width: 350px
.settings
	margin-top: 40px
	.el-date-editor .el-range-separator
		width: 10%!important
.time-picker-btn
	border-top-left-radius: 0
	border-bottom-left-radius: 0
	height: 40px
	border-left: 0
	background-color: #F5F7FA
	color: #909399
	padding: 0 21px
	vertical-align: middle
	border-color: #DCDFE6
	&:active, &:hover
		border-color: #DCDFE6
</style>
