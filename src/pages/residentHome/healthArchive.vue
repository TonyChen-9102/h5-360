<!--
 * @Description: 健康档案页面，组合个人信息、个人档案和个人基本信息三块内容
-->
<template>
  <view class="health-archive-page">
    <HealthArchivePersonCard :data="pageData.personalInfo"></HealthArchivePersonCard>
    <HealthArchiveRecordCard
      :personal-info="pageData.personalInfo"
    ></HealthArchiveRecordCard>
    <HealthArchiveBasicInfoCard
      :groups="visibleBasicGroups"
    ></HealthArchiveBasicInfoCard>
  </view>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {HealthArchiveBasicGroup, HealthArchivePageData, HealthArchiveRecordItem} from './modelData/healthArchiveModel'
import {mockHealthArchivePage} from './modelData/mockData'
import HealthArchivePersonCard from './comp/HealthArchivePersonCard.vue'
import HealthArchiveRecordCard from './comp/HealthArchiveRecordCard.vue'
import HealthArchiveBasicInfoCard from './comp/HealthArchiveBasicInfoCard.vue'

@Component({
  name: 'HealthArchiveIndex',
  components: {
    HealthArchivePersonCard,
    HealthArchiveRecordCard,
    HealthArchiveBasicInfoCard
  }
})
export default class HealthArchiveIndex extends Vue {
  pageData: HealthArchivePageData = JSON.parse(JSON.stringify(mockHealthArchivePage))

  archiveItems: HealthArchiveRecordItem[] = [
    {key: 'childHealth', title: '儿童健康', icon: 'ic-etjk@2x.png'},
    {key: 'physicalExam', title: '健康体检', icon: 'ic-jktj@2x.png'},
    {key: 'maternalHealth', title: '孕产妇健康', icon: 'ic-yfjk@2x.png'},
    {key: 'elderHealth', title: '老年健康', icon: 'ic-lnjk@2x.png'},
    {key: 'slowDisease', title: '慢管管理', icon: 'ic-mbgl@2x.png'},
    {key: 'mentalHealth', title: '精神管理', icon: 'ic-jsbgl@2x.png'}
  ]

  get visibleBasicGroups(): HealthArchiveBasicGroup[] {
    return this.pageData.basicInfoSection.groups.filter(group => group.fields && group.fields.length > 0)
  }
}
</script>

<style lang="scss" scoped>
.health-archive-page {
  min-height: 100vh;
  width: 100%;
  padding-top: 20rpx;
  padding-bottom: 30rpx;
  box-sizing: border-box;
  background: linear-gradient(180deg, #1E74FE 0%, #4587F0 400rpx, rgba(69, 135, 240, 0) 600rpx);
}
</style>
