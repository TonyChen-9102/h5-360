<script>
import Vue from "vue";

export default Vue.extend({
  mpType: "app",
  name: "app",

  async onLaunch(options) {
    console.log("App Launch", options);
  },
  async onShow(options) {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  },

});
</script>

<style lang="scss">

page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  color: #333;
}


</style>
