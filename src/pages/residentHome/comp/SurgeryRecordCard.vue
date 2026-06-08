<template>
  <!---手术记录卡片-->
  <view class="surgery-record-card">
    <view class="surgery-record-header">
      <view class="surgery-record-title">
        <text class="surgery-record-title-text u-fs32 u-fw500">手术记录</text>
        <view class="surgery-record-count">
          <text class="surgery-record-count-text">{{ cardData.count }}</text>
        </view>
      </view>
      <view class="surgery-record-view-all" @click="handleViewAllClick">
        <text class="surgery-record-view-all-text u-fs28 u-fw400">全部</text>
        <u-icon name="arrow-right" color="#666666" size="28" class="surgery-record-view-all-icon"></u-icon>
      </view>
    </view>

    <view class="surgery-record-list">
      <view
          v-for="(record, index) in cardData.records"
          :key="index"
          class="surgery-record-row"
      >
        <text class="surgery-record-name u-fs28 u-fw400">{{ record.name }}</text>
        <text class="surgery-record-date u-fs28 u-fw400">{{ record.dateTime }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {SurgeryRecordCardData} from '../modelData/surgeryRecordModel'

@Component({
  name: 'SurgeryRecordCard'
})
export default class SurgeryRecordCardComp extends Vue {
  @Prop({required: true}) cardData!: SurgeryRecordCardData

  handleViewAllClick(): void {
    this.$emit('view-all-click')
  }
}
</script>

<style lang="scss" scoped>
.surgery-record-card {
  margin: 24rpx 16rpx;
  padding: 24rpx 28rpx 28rpx;
  border-radius: 24rpx;
  background: linear-gradient(180deg, #EBF2FF 0%, #FFFFFF 100rpx);
  box-sizing: border-box;
}

.surgery-record-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.surgery-record-title {
  display: flex;
  align-items: center;
}

.surgery-record-title-text {
  color: #202020;
  line-height: 44rpx;
}

.surgery-record-count {
  margin-left: 12rpx;
  padding: 4rpx 16rpx;
  background: #4D94FF;
  border-radius: 18rpx 18rpx 18rpx 0rpx;
}

.surgery-record-count-text {
  font-weight: 400;
  font-size: 24rpx;
  color: #FFFFFF;
}

.surgery-record-view-all {
  display: flex;
  align-items: center;
}

.surgery-record-view-all-text {
  color: #666666;
}

.surgery-record-view-all-icon {
  margin-left: 5rpx;
}

.surgery-record-list {
  margin-top: 32rpx;
}

.surgery-record-row {
  display: flex;
  align-items: center;
  min-height: 60rpx;
  margin-top: 24rpx;
}

.surgery-record-row:first-child {
  margin-top: 0;
}

.surgery-record-name {
  color: #202020;
}

.surgery-record-date {
  margin-left: auto;
  color: #999999;
  flex-shrink: 0;
}
</style>
