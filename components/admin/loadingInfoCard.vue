<template>
  <el-card class="admin-cards--item" v-loading="loading">
    <div slot="header">
      <span
        ><a :href="showInitialContent" target="_blank">{{ showInitialContent }}</a></span
      >
    </div>
    <div class="text item" v-if="loadingStatus">
      <div class="text-wrapper">
        <p>
          Скорость загрузки: <br /><b>{{ loadingStatus }}</b>
        </p>
        <p>
          Время загрузки: <br /><b>{{ loadingTime }} сек.</b>
        </p>
      </div>
      <el-progress type="circle" :percentage="loadingPercent" :status="checkLoadingStatus"></el-progress>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      showInitialContent: null,
      loadingStatus: null,
      loadingPercent: null,
      loadingTime: null,
      googleApiKey: process.env.googleApiKey,
      loading: true,
    };
  },
  methods: {
    checkLoading() {
      if (this.loadingTime <= 1) {
        this.loadingStatus = "Очень быстро";
      } else if (2 > this.loadingTime > 1) {
        this.loadingStatus = "Быстро";
      } else if (3 > this.loadingTime > 2) {
        this.loadingStatus = "Нормально";
      } else if (4 > this.loadingTime > 3) {
        this.loadingStatus = "Медлено";
      } else if (this.loadingTime > 4) {
        this.loadingStatus = "Очень медлено";
      }
      this.loadingPercent = 100 - Math.round((this.loadingTime * 100) / 4);
    },
  },
  computed: {
    checkLoadingStatus() {
      switch (this.loadingStatus) {
        case "Очень быстро" || "Быстро":
          return "success";
        case "Нормально":
          return "warning";
        case "Медлено" || "Очень медлено":
          return "exception";

        default:
          return false;
      }
    },
  },
  mounted() {
    const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=http://start.savemytime.ru&key=${this.googleApiKey}`;
    fetch(api)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.showInitialContent = json.id;
        console.log(json.lighthouseResult.audits["speed-index"].displayValue);
        this.loadingTime = +json.lighthouseResult.audits["speed-index"].displayValue.split(" ")[0];
        console.log(this.loadingTime);
        this.checkLoading();
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
