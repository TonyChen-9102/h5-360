<template>
  <!---用药记录卡片-->
  <view class="medication-record-card">
    <view class="medication-record-header">
      <view class="medication-record-title">
        <text class="medication-record-title-text u-fs32 u-fw500">用药记录</text>
        <view class="medication-record-count">
          <text class="medication-record-count-text">{{ cardData.count }}</text>
        </view>
      </view>
      <view class="medication-record-view-all" @click="handleViewAllClick">
        <text class="medication-record-view-all-text u-fs28 u-fw400">全部</text>
        <u-icon name="arrow-right" color="#666666" size="28" class="medication-record-view-all-icon"></u-icon>
      </view>
    </view>

    <view class="medication-record-list">
      <view
          v-for="(record, index) in cardData.records"
          :key="index"
          class="medication-record-row"
      >
        <text class="medication-record-name u-fs28 u-fw400">{{ record.name }}{{ record.dosage ? ' ' + record.dosage : '' }}</text>
        <text class="medication-record-date u-fs28 u-fw400">{{ record.dateTime }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {MedicationRecordCardData} from '../modelData/medicationRecordModel'

@Component({
  name: 'MedicationRecordCard'
})
export default class MedicationRecordCardComp extends Vue {
  @Prop({required: true}) cardData!: MedicationRecordCardData

  handleViewAllClick(): void {
    this.$emit('view-all-click')
  }
}
</script>

<style lang="scss" scoped>
.medication-record-card {
  margin: 24rpx 16rpx;
  padding: 24rpx 28rpx 28rpx;
  border-radius: 24rpx;
  background: linear-gradient(180deg, #EBF2FF 0%, #FFFFFF 100rpx);
  box-sizing: border-box;
}

.medication-record-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.medication-record-title {
  display: flex;
  align-items: center;
}

.medication-record-title-text {
  color: #202020;
  line-height: 44rpx;
}

.medication-record-count {
  margin-left: 12rpx;
  padding: 4rpx 16rpx;
  background: #4D94FF;
  border-radius: 18rpx 18rpx 18rpx 0rpx;
}

.medication-record-count-text {
  font-weight: 400;
  font-size: 24rpx;
  color: #FFFFFF;
}

.medication-record-view-all {
  display: flex;
  align-items: center;
}

.medication-record-view-all-text {
  color: #666666;
}

.medication-record-view-all-icon {
  margin-left: 5rpx;
}

.medication-record-list {
  margin-top: 32rpx;
}

.medication-record-row {
  display: flex;
  align-items: center;
  min-height: 60rpx;
  margin-top: 24rpx;
}

.medication-record-row:first-child {
  margin-top: 0;
}

.medication-record-name {
  color: #202020;
}

.medication-record-date {
  margin-left: auto;
  color: #999999;
  flex-shrink: 0;
}
</style>
