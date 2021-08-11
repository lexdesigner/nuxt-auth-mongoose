<template>
  <div class="admin-cards">
    <loading-info-card />
    <loading-cars-card />
  </div>
</template>

<script>
import loadingInfoCard from "@/components/admin/loadingInfoCard";
import loadingCarsCard from "@/components/admin/loadingCarsCard";
export default {
  components: {
    loadingInfoCard,
    loadingCarsCard,
  },
};
</script>

<style lang="sass" scoped>
.admin-cards
	display: flex
</style>
