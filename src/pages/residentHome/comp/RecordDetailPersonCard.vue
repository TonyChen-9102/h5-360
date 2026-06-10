<!--
 * @Description: 个人档案记录详情页个人信息卡片
-->
<template>
  <view class="record-detail-person-card">
    <view class="person-top">
      <text class="person-name u-fs36 u-fw600">{{ data.name }}</text>
      <text class="person-date u-fs24 u-fw400">{{ data.date }}</text>
    </view>
    <view class="person-info">
      <text class="person-label u-fs28 u-fw400">责任医生</text>
      <text class="person-value u-fs28 u-fw400">{{ data.doctorName }}</text>
      <text class="person-divider u-fs28 u-fw400">|</text>
      <text class="person-label u-fs28 u-fw400">体检机构</text>
      <text class="person-value u-fs28 u-fw400">{{ data.orgName }}</text>
    </view>
  </view>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {RecordDetailPersonInfo} from '../modelData/recordDetailModel'

@Component({
  name: 'RecordDetailPersonCard'
})
export default class RecordDetailPersonCard extends Vue {
  @Prop({required: true}) data!: RecordDetailPersonInfo
}
</script>

<style lang="scss" scoped>
.record-detail-person-card {
  margin: 24rpx 16rpx 20rpx;
  padding: 24rpx;
  background: linear-gradient(182deg, #EBF2FF 0%, #FFFFFF 100%);
  border: 2rpx solid #FFFFFF;
  border-radius: 24rpx;
  box-sizing: border-box;
}

.person-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.person-name {
  color: #202020;
  line-height: 50rpx;
}

.person-date {
  padding: 4rpx 12rpx;
  color: #1E74FE;
  line-height: 34rpx;
  background: #E8F1FF;
  border: 2rpx solid #1E74FE;
  border-radius: 8rpx;
}

.person-info {
  display: flex;
  align-items: center;
  margin-top: 16rpx;
}

.person-label {
  color: #666666;
  line-height: 40rpx;
}

.person-value,
.person-org {
  margin-left: 16rpx;
  color: #202020;
  line-height: 40rpx;
}

.person-divider {
  margin: 0 16rpx;
  color: #CCCCCC;
  line-height: 40rpx;
}
</style>
