<template>
  <!---检验检查记录卡片-->
  <view class="inspection-record-card">
    <view class="inspection-record-header">
      <view class="inspection-record-tabs">
        <view
            v-for="tab in cardData.tabs"
            :key="tab.key"
            class="inspection-record-tab u-fs32"
            :class="activeTab.key === tab.key ? 'inspection-record-tab-active u-fw500' : 'u-fw400'"
            @click="handleTabClick(tab.key)"
        >
          <text>{{ tab.title }}</text>
          <view class="inspection-record-tab-count">
            <text class="inspection-record-tab-count-text">{{ tab.count }}</text>
          </view>
          <view v-if="activeTab.key === tab.key" class="inspection-record-tab-line"></view>
        </view>
      </view>
      <view class="inspection-record-view-all" @click="handleViewAllClick">
        <text class="inspection-record-view-all-text u-fs28 u-fw400">全部</text>
        <u-icon name="arrow-right" color="#666666" size="28" class="inspection-record-view-all-icon"></u-icon>
      </view>
    </view>

    <view class="inspection-record-list">
      <view
          v-for="(record, index) in activeTab.records"
          :key="index"
          class="inspection-record-row"
      >
        <text class="inspection-record-name u-fs28 u-fw400">{{ record.name }}</text>
        <view v-if="record.isAbnormal" class="inspection-record-abnormal">
          <text class="inspection-record-abnormal-text u-fs24 u-fw400">异</text>
        </view>
        <text class="inspection-record-date u-fs28 u-fw400">{{ record.dateTime }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {InspectionRecordCardData, InspectionTab, RecordType} from '../modelData/inspectionRecordModel'

@Component({
  name: 'InspectionRecordCard'
})
export default class InspectionRecordCardComp extends Vue {
  @Prop({required: true}) cardData!: InspectionRecordCardData

  get activeTab(): InspectionTab {
    const tab = this.cardData.tabs.find(t => t.key === this.cardData.activeTab)
    return tab || this.cardData.tabs[0]
  }

  handleTabClick(tabKey: RecordType): void {
    this.$emit('tab-change', tabKey)
  }

  handleViewAllClick(): void {
    this.$emit('view-all-click')
  }
}
</script>

<style lang="scss" scoped>
.inspection-record-card {
  margin: 24rpx 16rpx;
  padding: 24rpx 28rpx 28rpx;
  border-radius: 24rpx;
  background: linear-gradient(180deg, #EBF2FF 0%, #FFFFFF 100rpx);
  box-sizing: border-box;
}

.inspection-record-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.inspection-record-tabs {
  display: flex;
  align-items: center;
}

.inspection-record-tab {
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 48rpx;
  color: #666666;
  line-height: 44rpx;
}

.inspection-record-tab-active {
  color: #202020;
}

.inspection-record-tab-count {
  margin-left: 12rpx;
  padding: 4rpx 16rpx;
  background: #4D94FF;
  border-radius: 18rpx 18rpx 18rpx 0rpx;
}

.inspection-record-tab-count-text {
  font-weight: 400;
  font-size: 24rpx;
  color: #FFFFFF;
}

.inspection-record-tab-line {
  position: absolute;
  left: 0;
  bottom: -6rpx;
  width: 120rpx;
  height: 12rpx;
  background: linear-gradient(90deg, rgba(30, 116, 254, 0.5) 0%, rgba(30, 116, 254, 0) 100%);
}

.inspection-record-view-all {
  display: flex;
  align-items: center;
}

.inspection-record-view-all-text {
  color: #666666;
}

.inspection-record-view-all-icon {
  margin-left: 5rpx;
}

.inspection-record-list {
  margin-top: 32rpx;
}

.inspection-record-row {
  display: flex;
  align-items: center;
  min-height: 60rpx;
  margin-top: 24rpx;
}

.inspection-record-row:first-child {
  margin-top: 0;
}

.inspection-record-name {
  color: #202020;
}

.inspection-record-abnormal {
  margin-left: 12rpx;
  margin-right: 16rpx;
  padding: 4rpx 12rpx;
  background: #FFEEED;
  border-radius: 8rpx;
  flex-shrink: 0;
}

.inspection-record-abnormal-text {
  color: #FC4838;
}

.inspection-record-date {
  margin-left: auto;
  color: #999999;
  flex-shrink: 0;
}
</style>
