<!--
 * @Description: 健康档案个人档案卡片，按条件展示各类档案入口
-->
<template>
  <view class="archive-record-card">
    <view class="archive-section-header">
      <text class="archive-section-title u-fs32 u-fw500">个人档案</text>
    </view>
    <view class="archive-record-body">
      <view
        v-for="item in visibleItems"
        :key="item.key"
        class="archive-record-item"
        @click="handleItemClick(item)"
      >
        <u-image
          :src="getIcon(item.icon)"
          mode="aspectFit"
          width="96rpx"
          height="96rpx"
        ></u-image>
        <text class="archive-record-name u-fs28 u-fw400">{{ item.title }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {HealthArchivePersonalInfo} from '../modelData/healthArchiveModel'

@Component({
  name: 'HealthArchiveRecordCard'
})
export default class HealthArchiveRecordCard extends Vue {
  @Prop({required: true}) personalInfo!: HealthArchivePersonalInfo

  recordItems: any[] = [
    {key: 'childHealth', title: '儿童健康', icon: 'ic-etjk@2x.png'},
    {key: 'physicalExam', title: '健康体检', icon: 'ic-jktj@2x.png'},
    {key: 'maternalHealth', title: '孕产妇健康', icon: 'ic-yfjk@2x.png'},
    {key: 'elderHealth', title: '老年健康', icon: 'ic-lnjk@2x.png'},
    {key: 'slowDisease', title: '慢管管理', icon: 'ic-mbgl@2x.png'},
    {key: 'mentalHealth', title: '精神管理', icon: 'ic-jsbgl@2x.png'}
  ]

  get visibleItems(): any[] {
    return this.recordItems.filter(item => {
      if (item.key === 'maternalHealth') {
        return Number(this.personalInfo.sex) === 2
      }
      if (item.key === 'elderHealth') {
        return Number(this.personalInfo.age) >= 60
      }
      return true
    })
  }

  getIcon(iconName: string): string {
    return require(`@/static/health/${iconName}`)
  }

  // 点击档案入口，跳转统一记录列表页并传入功能标识
  handleItemClick(item: any): void {
    this.$Router.navigateTo({
      url: '/pages/residentHome/recordList',
      params: {key: item.key, title: item.title}
    })
  }
}
</script>

<style lang="scss" scoped>
.archive-record-card {
  margin: 24rpx 16rpx 0;
  overflow: hidden;
  border-radius: 24rpx;
}

.archive-section-header {
  height: 88rpx;
  padding: 0 28rpx;
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #EBF2FF 0%, #FFFFFF 99.29%);
  border: 3rpx solid #FFFFFF;
  border-radius: 24rpx 24rpx 0 0;
  box-sizing: border-box;
}

.archive-section-title {
  color: #202020;
  line-height: 44rpx;
}

.archive-record-body {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 12rpx 16rpx 24rpx;
  background: #FFFFFF;
  border-radius: 0 0 24rpx 24rpx;
}

.archive-record-item {
  width: 25%;
  margin-top: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.archive-record-name {
  margin-top: 12rpx;
  color: #202020;
  line-height: 40rpx;
}
</style>
