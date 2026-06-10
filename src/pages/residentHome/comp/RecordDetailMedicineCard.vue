<!--
 * @Description: 个人档案记录详情页主要用药情况卡片
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
      <view v-for="(item, index) in localSection.items" :key="index" class="medicine-item">
        <text class="medicine-name u-fs32 u-fw600">{{ item.name }}</text>
        <view class="medicine-fields">
          <view v-for="(field, fieldIndex) in item.fields" :key="fieldIndex" class="medicine-field">
            <text class="medicine-label u-fs28 u-fw400">{{ field.label }}</text>
            <text class="medicine-value u-fs28 u-fw400 u-mr40">{{ field.value }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import {RecordDetailMedicineSection} from '../modelData/recordDetailModel'

@Component({
  name: 'RecordDetailMedicineCard'
})
export default class RecordDetailMedicineCard extends Vue {
  @Prop({required: true}) data!: RecordDetailMedicineSection

  localSection: RecordDetailMedicineSection = {
    key: '',
    title: '',
    expanded: false,
    items: []
  }

  @Watch('data', {immediate: true, deep: true})
  onDataChange(data: RecordDetailMedicineSection): void {
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
  background: linear-gradient(180deg, #EBF2FF 0%, #FFFFFF 100%);
  border: 3rpx solid #FFFFFF;
  border-radius: 24rpx 24rpx 0 0;
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

.medicine-item {
  margin-bottom: 24rpx;
  padding: 24rpx;
  background: #FAFAFA;
  border-radius: 16rpx;
  box-sizing: border-box;
}

.medicine-name {
  display: block;
  color: #202020;
  line-height: 44rpx;
}

.medicine-fields {
  display: flex;
  flex-wrap: wrap;
  margin-top: 12rpx;
}

.medicine-field {
  display: flex;
  width: 50%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8rpx;
}

.medicine-label {
  color: #666666;
  line-height: 40rpx;
}

.medicine-value {
  margin-left: 12rpx;
  color: #202020;
  line-height: 40rpx;
}
</style>
