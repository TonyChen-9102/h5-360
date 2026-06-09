<!--
 * @Description: 过敏信息页面，展示居民过敏项目、等级和明细信息
-->
<template>
  <view class="allergy-info-page">
    <view
      v-for="(item, index) in pageData.list"
      :key="index"
      class="allergy-card u-pd32"
    >
      <view class="allergy-card-header">
        <text class="allergy-name u-fs36 u-fw600">{{ item.name }}</text>
        <view class="allergy-level" :class="`allergy-level-${item.level}`">
          <u-icon name="info-circle" color="#FFFFFF" size="24" class="allergy-level-icon"></u-icon>
          <text class="allergy-level-text u-fs26 u-fw400">{{ levelTextMap[item.level] }}</text>
        </view>
      </view>

      <view
        v-for="(detail, detailIndex) in item.details"
        :key="detailIndex"
        class="allergy-detail-row"
      >
        <view class="allergy-detail-dot"></view>
        <text class="allergy-detail-label u-fs28 u-fw400">{{ detail.label }}</text>
        <text class="allergy-detail-value u-fs28 u-fw400">{{ detail.value }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {AllergyInfoPageData, AllergyLevel} from './modelData/allergyInfoModel'
import {mockAllergyInfoPage} from './modelData/mockData'

@Component({
  name: 'AllergyInfoIndex'
})
export default class AllergyInfoIndex extends Vue {
  pageData: AllergyInfoPageData = mockAllergyInfoPage

  levelTextMap: Record<AllergyLevel, string> = {
    [AllergyLevel.Low]: '轻',
    [AllergyLevel.Medium]: '中',
    [AllergyLevel.High]: '高'
  }
}
</script>

<style lang="scss" scoped>
.allergy-info-page {
  min-height: 100vh;
  padding: 28rpx 24rpx;
  box-sizing: border-box;
  background: #F4F5F7;
}

.allergy-card {
  margin-bottom: 24rpx;
  background: #FFFFFF;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
}

.allergy-card:last-child {
  margin-bottom: 0;
}

.allergy-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.allergy-name {
  flex: 1;
  min-width: 0;
  padding-right: 24rpx;
  color: #202020;
  line-height: 50rpx;
}

.allergy-level {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 8rpx 20rpx;
  border-radius: 8rpx 8rpx 8rpx 8rpx;
}

.allergy-level-low {
  background: #15AB64;
}

.allergy-level-medium {
  background: #F58300;
}

.allergy-level-high {
  background: #FC4838;
}

.allergy-level-text {
  margin-left: 12rpx;
  color: #FFFFFF;
  line-height: 32rpx;
}

.allergy-level-icon {
  width: 20rpx;
  height: 20rpx;
}

.allergy-detail-row {
  display: flex;
  align-items: center;
  margin-top: 15rpx;
}

.allergy-detail-dot {
  width: 16rpx;
  height: 16rpx;
  margin-right: 18rpx;
  border: 4rpx solid #FFA199;
  border-radius: 50%;
  box-sizing: border-box;
}

.allergy-detail-label {
  width: 88rpx;
  margin-right: 28rpx;
  color: #666666;
  line-height: 40rpx;
}

.allergy-detail-value {
  flex: 1;
  min-width: 0;
  color: #202020;
  line-height: 40rpx;
}
</style>
