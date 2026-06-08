<template>
  <!---既往史卡片-->
  <view class="medical-history-card">
    <view class="medical-history-header">
      <view class="medical-history-tabs">
        <view
            v-for="tab in cardData.tabs"
            :key="tab.key"
            class="medical-history-tab u-fs32"
            :class="activeTab.key === tab.key ? 'medical-history-tab-active u-fw500' : 'u-fw400'"
            @click="handleTabClick(tab.key)"
        >
          <text>{{ tab.title }}</text>
          <view v-if="activeTab.key === tab.key" class="medical-history-tab-line"></view>
        </view>
      </view>
      <view class="archive-view">
        <text class="archive-view-text u-fs28 u-fw400">档案视图</text>
        <u-icon name="arrow-right" color="#666666" size="28" class="archive-view-icon"></u-icon>
      </view>
    </view>

    <view class="medical-history-list">
      <view
          v-for="(row, rowIndex) in activeTab.rows"
          :key="rowIndex"
          class="medical-history-row"
      >
        <text class="medical-history-label u-fs28 u-fw400">{{ row.label }}</text>
        <view class="medical-history-content">
          <text v-if="row.value" class="medical-history-value u-fs28 u-fw400">{{ row.value }}</text>
          <view
              v-for="(tag, tagIndex) in row.tags || []"
              :key="tagIndex"
              class="medical-history-tag"
          >
            <text class="medical-history-tag-text u-fs24 u-fw400">{{ tag.name }}</text>
          </view>
        </view>
        <u-icon
            v-if="row.showArrow"
            name="arrow-right"
            color="#CCCCCC"
            size="36"
        ></u-icon>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {MedicalHistoryCardData, MedicalHistoryTab} from '../modelData/medicalHistoryModel'

@Component({
  name: 'MedicalHistoryCard'
})
export default class MedicalHistoryCardComp extends Vue {
  @Prop({required: true}) cardData!: MedicalHistoryCardData

  get activeTab(): MedicalHistoryTab {
    const tab = this.cardData.tabs.find(t => t.key === this.cardData.activeTab)
    return tab || this.cardData.tabs[0]
  }

  handleTabClick(tabKey: string): void {
    this.$emit('tab-change', tabKey)
  }
}
</script>

<style lang="scss" scoped>
.medical-history-card {
  margin: 24rpx 16rpx;
  padding: 24rpx 28rpx 28rpx;
  border-radius: 24rpx;
  background: linear-gradient(180deg, #EBF2FF 0%, #FFFFFF 100rpx);
  box-sizing: border-box;
}

.medical-history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.medical-history-tabs {
  display: flex;
  align-items: center;
}

.medical-history-tab {
  position: relative;
  margin-right: 48rpx;
  color: #666666;
  line-height: 44rpx;
}

.medical-history-tab-active {
  color: #202020;
}

.medical-history-tab-line {
  position: absolute;
  left: 0;
  bottom: -6rpx;
  width: 88rpx;
  height: 12rpx;
  background: linear-gradient(90deg, rgba(30, 116, 254, 0.5) 0%, rgba(30, 116, 254, 0) 100%);
}

.archive-view {
  display: flex;
  align-items: center;
}

.archive-view-text {
  color: #666666;
}

.archive-view-icon {
  margin-left: 5rpx;
}

.medical-history-list {
  margin-top: 32rpx;
}

.medical-history-row {
  display: flex;
  align-items: center;
  min-height: 54rpx;
  margin-top: 18rpx;
}

.medical-history-row:first-child {
  margin-top: 0;
}

.medical-history-label {
  width: 140rpx;
  flex-shrink: 0;
  color: #666666;
}

.medical-history-content {
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-width: 0;
}

.medical-history-value {
  margin-right: 22rpx;
  color: #202020;
}

.medical-history-tag {
  margin-right: 16rpx;
  padding: 6rpx 20rpx;
  border-radius: 24rpx;
  background: #FFEEED;
}

.medical-history-tag-text {
  color: #FC4838;
}
</style>
