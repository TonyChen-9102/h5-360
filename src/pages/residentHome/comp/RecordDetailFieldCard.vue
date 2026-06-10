<!--
 * @Description: 个人档案记录详情页通用字段卡片，支持症状、一般状况、生活方式、脏器功能等动态分组
-->
<template>
  <view class="record-detail-card">
    <view class="record-detail-card-header" @click="toggleExpand">
      <view class="record-detail-card-title-wrap">
        <image src="/static/health/ic-dot@2x.png" mode="aspectFit" class="card-dot-icon"></image>
        <view class="record-detail-card-title u-fs32 u-fw500">{{ localSection.title }}</view>
      </view>
      <u-icon :name="localSection.expanded ? 'arrow-up' : 'arrow-down'" color="#BDBDBD" size="28"></u-icon>
    </view>
    <view v-if="localSection.expanded" class="record-detail-card-body">
      <view
        v-for="(field, index) in localSection.fields"
        :key="index"
        class="field-item"
        :class="index === localSection.fields.length - 1 ? 'field-item-last' : ''"
      >
        <text class="field-label u-fs28 u-fw400">{{ field.label }}</text>
        <text class="field-value u-fs28 u-fw400">{{ field.value }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import {RecordDetailFieldSection} from '../modelData/recordDetailModel'

@Component({
  name: 'RecordDetailFieldCard'
})
export default class RecordDetailFieldCard extends Vue {
  @Prop({required: true}) data!: RecordDetailFieldSection

  localSection: RecordDetailFieldSection = {
    key: '',
    title: '',
    expanded: false,
    fields: []
  }

  @Watch('data', {immediate: true, deep: true})
  onDataChange(data: RecordDetailFieldSection): void {
    this.localSection = {
      ...data,
      fields: [...data.fields]
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
}

.record-detail-card-title-wrap {
  display: flex;
  align-items: center;
}

.record-detail-card-title {
  color: #202020;
}

.record-detail-card-body {
  padding: 0 28rpx 24rpx;
  background: #FFFFFF;
  border-radius: 0 0 24rpx 24rpx;
}

.field-item {
  min-height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1rpx dashed #EDEDED;
}

.field-item-last {
  border-bottom: none;
}

.field-label {
  flex-shrink: 0;
  padding-right: 24rpx;
  color: #666666;
  line-height: 40rpx;
}

.field-value {
  flex: 1;
  min-width: 0;
  text-align: right;
  color: #202020;
  line-height: 40rpx;
}

.card-dot-icon {
  width: 24rpx;
  height: 24rpx;
  margin-right: 12rpx;
}
</style>
