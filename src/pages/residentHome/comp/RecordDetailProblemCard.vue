<!--
 * @Description: 个人档案记录详情页现存主要健康问题卡片
-->
<template>
  <view class="record-detail-card">
    <view class="record-detail-card-header" @click="toggleExpand">
      <view class="record-detail-card-title-wrap">
        <image src="/static/health/ic-dot@2x.png" mode="aspectFit" class="card-dot-icon"></image>
        <text class="record-detail-card-title u-fs32 u-fw500">{{ localSection.title }}</text>
        <text class="record-detail-card-title u-fs32 u-fw500 u-ml5">-</text>
        <text class="problem-count u-fs32 u-fw600 u-ml5">{{ localSection.count }}项</text>
      </view>
      <u-icon :name="localSection.expanded ? 'arrow-up' : 'arrow-down'" color="#BDBDBD" size="28"></u-icon>
    </view>
    <view v-if="localSection.expanded" class="record-detail-card-body">
      <view v-for="(item, index) in localSection.items" :key="index" class="problem-item">
        <text class="problem-title u-fs32 u-fw600">{{ item.title }}</text>
        <text class="problem-desc u-fs28 u-fw400">{{ item.description }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import {RecordDetailProblemSection} from '../modelData/recordDetailModel'

@Component({
  name: 'RecordDetailProblemCard'
})
export default class RecordDetailProblemCard extends Vue {
  @Prop({required: true}) data!: RecordDetailProblemSection

  localSection: RecordDetailProblemSection = {
    key: '',
    title: '',
    expanded: false,
    count: 0,
    items: []
  }

  @Watch('data', {immediate: true, deep: true})
  onDataChange(data: RecordDetailProblemSection): void {
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

.problem-count {
  color: #FC4838;
  line-height: 44rpx;
}

.record-detail-card-body {
  padding: 0 28rpx 24rpx;
  background: #FFFFFF;
  border-radius: 0 0 24rpx 24rpx;
}

.problem-item {
  padding-top: 24rpx;
}

.problem-title {
  display: block;
  color: #202020;
  line-height: 44rpx;
}

.problem-desc {
  display: block;
  margin-top: 12rpx;
  color: #666666;
  line-height: 40rpx;
}
</style>
