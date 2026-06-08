<template>
  <!---就诊记录卡片-->
  <view class="visit-record-card">
    <view class="visit-record-header">
      <view class="visit-record-title-wrapper">
        <text class="visit-record-title u-fs28 u-fw500">就诊记录</text>
        <view class="visit-record-count">
          <text class="visit-record-count-text">{{ cardData.count }}</text>
        </view>
      </view>
      <view class="visit-record-view" @click="handleViewClick">
        <text class="visit-record-view-text u-fs28 u-fw400">就诊视图</text>
        <u-icon name="arrow-right" color="#666666" size="28" class="visit-record-view-icon"></u-icon>
      </view>
    </view>

    <view class="visit-record-list">
      <view
          v-for="(record, index) in cardData.records"
          :key="index"
          class="visit-record-row"
      >
        <view
            class="visit-record-type"
            :class="'visit-record-type-' + record.type"
        >
          <text class="visit-record-type-text">{{ record.type }}</text>
        </view>
        <view class="visit-record-info">
          <text class="visit-record-department u-fs28 u-fw400">{{ record.department }}</text>
          <text class="visit-record-hospital u-fs24 u-fw400">{{ record.hospital }}</text>
        </view>
        <text class="visit-record-date u-fs28 u-fw400">{{ record.date }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {VisitRecordCardData} from '../modelData/visitRecordModel'

@Component({
  name: 'VisitRecordCard'
})
export default class VisitRecordCardComp extends Vue {
  @Prop({required: true}) cardData!: VisitRecordCardData

  handleViewClick(): void {
    this.$emit('view-click')
  }
}
</script>

<style lang="scss" scoped>
.visit-record-card {
  margin: 24rpx 16rpx;
  padding: 24rpx 28rpx 28rpx;
  border-radius: 24rpx;
  background: linear-gradient(180deg, #EBF2FF 0%, #FFFFFF 100rpx);
  box-sizing: border-box;
}

.visit-record-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.visit-record-title-wrapper {
  display: flex;
  align-items: center;
}

.visit-record-title {
  color: #202020;
}

.visit-record-count {
  margin-left: 12rpx;
  padding: 4rpx 16rpx;
  background: #4D94FF;
  border-radius: 18rpx 18rpx 18rpx 0rpx;
}

.visit-record-count-text {
  font-weight: 400;
  font-size: 24rpx;
  color: #FFFFFF;
}

.visit-record-view {
  display: flex;
  align-items: center;
}

.visit-record-view-text {
  color: #666666;
}

.visit-record-view-icon {
  margin-left: 5rpx;
}

.visit-record-list {
  margin-top: 32rpx;
}

.visit-record-row {
  display: flex;
  align-items: center;
  min-height: 60rpx;
  margin-top: 24rpx;
}

.visit-record-row:first-child {
  margin-top: 0;
}

.visit-record-type {
  margin-right: 16rpx;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
  flex-shrink: 0;
}

.visit-record-type-门 {
  background: #E6FAF1;
}

.visit-record-type-住 {
  background: #E8F1FF;
}

.visit-record-type-急 {
  background: #FFEEED;
}

.visit-record-type-体 {
  background: #F3EFFE;
}

.visit-record-type-text {
  font-weight: 400;
  font-size: 24rpx;
}

.visit-record-type-门 .visit-record-type-text {
  color: #15AB64;
}

.visit-record-type-住 .visit-record-type-text {
  color: #1E74FE;
}

.visit-record-type-急 .visit-record-type-text {
  color: #FC4838;
}

.visit-record-type-体 .visit-record-type-text {
  color: #8763FA;
}

.visit-record-info {
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 0;
}

.visit-record-department {
  color: #202020;
}

.visit-record-hospital {
  margin-left: 8rpx;
  color: #666666;
}

.visit-record-date {
  margin-left: 16rpx;
  color: #999999;
  flex-shrink: 0;
}
</style>
