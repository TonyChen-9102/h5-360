<!--
 * @Description: 个人档案记录详情页健康管理卡片
-->
<template>
  <view class="record-detail-card">
    <view class="record-detail-card-header" @click="toggleExpand">
      <view class="record-detail-card-title-wrap">
        <image src="/static/health/ic-dot@2x.png" mode="aspectFit" class="card-dot-icon"></image>
        <text class="record-detail-card-title u-fs32 u-fw500">{{ localSection.title }}</text>
      </view>
      <u-icon :name="localSection.expanded ? 'arrow-up' : 'arrow-down'" color="#BDBDBD" size="28"></u-icon>
    </view>
    <view v-if="localSection.expanded" class="record-detail-card-body">
      <view
        v-for="item in localSection.items"
        :key="item.key"
        class="manage-item"
        :class="item.theme === 'orange' ? 'manage-item-orange' : 'manage-item-red'"
      >
        <view class="manage-head">
          <view class="manage-dot" :class="item.theme === 'orange' ? 'manage-dot-orange' : 'manage-dot-red'">
            <view class="manage-dot-inner"></view>
          </view>
          <text class="manage-title u-fs32 u-fw600">{{ item.title }}</text>
          <template v-if="item.status">
            <text class="manage-separator u-fs32 u-fw600 u-ml5 u-mr5">-</text>
            <text class="manage-status u-fs32 u-fw600" :class="item.theme === 'orange' ? 'manage-status-orange' : 'manage-status-red'">{{ item.status }}</text>
          </template>
        </view>
        <view class="manage-content-wrap">
          <u-icon name="info-circle" color="#999999" size="28"></u-icon>
          <text class="manage-content u-fs28 u-fw400">{{ item.content }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import {RecordDetailManageSection} from '../modelData/recordDetailModel'

@Component({
  name: 'RecordDetailManageCard'
})
export default class RecordDetailManageCard extends Vue {
  @Prop({required: true}) data!: RecordDetailManageSection

  localSection: RecordDetailManageSection = {
    key: '',
    title: '',
    expanded: false,
    items: []
  }

  @Watch('data', {immediate: true, deep: true})
  onDataChange(data: RecordDetailManageSection): void {
    this.localSection = {
      ...data,
      items: [...data.items]
    }
  }

  toggleExpand(): void {
    this.localSection.expanded = !this.localSection.expanded
  }
}
</script>

<style lang="scss" scoped>
.record-detail-card {
  margin: 0 16rpx 20rpx;
  overflow: hidden;
  border-radius: 24rpx;
}

.record-detail-card-header {
  height: 88rpx;
  padding: 0 28rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, #EBF2FF 0%, #FFFFFF 99.29%);
  border: 3rpx solid #FFFFFF;
  border-radius: 24rpx 24rpx 0 0;
  box-sizing: border-box;
}

.record-detail-card-title-wrap {
  display: flex;
  align-items: center;
}

.card-dot-icon {
  width: 24rpx;
  height: 24rpx;
  margin-right: 12rpx;
}

.record-detail-card-title {
  color: #202020;
  line-height: 44rpx;
}

.record-detail-card-body {
  padding: 0 28rpx 1rpx;
  background: #FFFFFF;
  border-radius: 0 0 24rpx 24rpx;
}

.manage-item {
  margin-bottom: 24rpx;
  padding: 24rpx;
  border-radius: 16rpx;
  box-sizing: border-box;
}

.manage-item-red {
  background: linear-gradient(180deg, #FFEEED 0%, rgba(255, 238, 237, 0) 100%);
}

.manage-item-orange {
  background: linear-gradient(180deg, #FEF3E7 0%, rgba(254, 243, 231, 0) 100%);
}

.manage-head {
  display: flex;
  align-items: center;
}

.manage-dot {
  width: 24rpx;
  height: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.manage-dot-red {
  background: rgba(252, 72, 56, 0.15);
}

.manage-dot-red .manage-dot-inner {
  background: #FC4838;
}

.manage-dot-orange {
  background: rgba(245, 131, 0, 0.15);
}

.manage-dot-orange .manage-dot-inner {
  background: #F58300;
}

.manage-dot-inner {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
}

.manage-title {
  margin-left: 12rpx;
  color: #202020;
  line-height: 44rpx;
}

.manage-status {
  line-height: 44rpx;
}

.manage-separator {
  color: #202020;
  line-height: 44rpx;
}

.manage-status-red {
  color: #FC4838;
}

.manage-status-orange {
  color: #F58300;
}

.manage-content-wrap {
  display: flex;
  margin-top: 12rpx;
  margin-left: 36rpx;
}

.manage-content {
  flex: 1;
  min-width: 0;
  margin-left: 8rpx;
  color: #666666;
  line-height: 40rpx;
}
</style>
