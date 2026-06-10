<!--
 * @Description: 个人档案记录详情页非免疫规划预防接种史卡片
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
      <view v-for="(item, index) in localSection.items" :key="index" class="event-item">
        <text class="event-title u-fs32 u-fw600">{{ item.title }}</text>
        <view class="event-meta u-mt12">
          <view class="event-date-wrap">
            <image src="/static/health/ic-calendar-o@2x.png" mode="aspectFit" class="calendar-icon"></image>
            <text class="event-date u-fs28 u-fw400 u-ml16">{{ item.date }}</text>
          </view>
          <text class="event-org u-fs28 u-fw400 u-ml16">{{ item.orgName }}</text>
        </view>
        <view v-for="(field, fieldIndex) in item.fields" :key="fieldIndex" class="event-field">
          <text class="event-label u-fs28 u-fw400">{{ field.label }}</text>
          <text class="event-value u-fs28 u-fw400">{{ field.value }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import {RecordDetailEventSection} from '../modelData/recordDetailModel'

@Component({
  name: 'RecordDetailVaccinationCard'
})
export default class RecordDetailVaccinationCard extends Vue {
  @Prop({required: true}) data!: RecordDetailEventSection

  localSection: RecordDetailEventSection = {
    key: '',
    title: '',
    expanded: false,
    items: []
  }

  @Watch('data', {immediate: true, deep: true})
  onDataChange(data: RecordDetailEventSection): void {
    this.localSection = {
      ...data,
      items: data.items.map(item => ({
        ...item,
        fields: [...item.fields]
      }))
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

.record-detail-card-title-wrap,
.event-meta,
.event-date-wrap {
  display: flex;
  align-items: center;
}

.card-dot-icon {
  width: 24rpx;
  height: 24rpx;
  margin-right: 12rpx;
}

.calendar-icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 8rpx;
}

.record-detail-card-title,
.event-title,
.event-date,
.event-org,
.event-value {
  color: #202020;
}

.record-detail-card-title,
.event-title {
  line-height: 44rpx;
}

.record-detail-card-body {
  padding: 0 28rpx 1rpx;
  background: #FFFFFF;
  border-radius: 0 0 24rpx 24rpx;
}

.event-item {
  margin-bottom: 24rpx;
  padding: 24rpx;
  background: #FAFAFA;
  border-radius: 16rpx;
  box-sizing: border-box;
}

.event-title {
  display: block;
}

.event-date,
.event-org,
.event-label,
.event-value {
  line-height: 40rpx;
}

.event-field {
  display: flex;
  margin-top: 12rpx;
}

.event-label {
  flex-shrink: 0;
  color: #666666;
}

.event-value {
  margin-left: 16rpx;
}
</style>
