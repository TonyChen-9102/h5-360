<!--
 * @Description: 健康档案个人基本信息卡片，支持动态分组展开收起
-->
<template>
  <view class="archive-basic-card">
    <view class="archive-section-header">
      <text class="archive-section-title u-fs32 u-fw500">个人基本信息</text>
    </view>
    <view class="archive-basic-body">
      <view
        v-for="group in localGroups"
        :key="group.key"
        class="archive-basic-group"
      >
        <view class="archive-basic-group-header" @click="handleToggle(group.key)">
          <view class="archive-basic-group-left">
            <u-image
              :src="getIcon(group.key)"
              mode="aspectFit"
              width="56rpx"
              height="56rpx"
            ></u-image>
            <text class="archive-basic-group-title u-fs28 u-fw400">{{ group.title }}</text>
          </view>
          <u-icon :name="group.expanded ? 'arrow-up' : 'arrow-down'" color="#999999" size="28"></u-icon>
        </view>

        <view v-if="group.expanded" class="archive-basic-group-content">
          <view
            v-for="(field, index) in group.fields"
            :key="index"
            class="archive-basic-field"
            :class="index === group.fields.length - 1 ? 'archive-basic-field-last' : ''"
          >
            <text class="archive-basic-field-label u-fs28 u-fw400">{{ field.label }}</text>
            <text class="archive-basic-field-value u-fs28 u-fw400">{{ field.value }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import {HealthArchiveBasicGroup} from '../modelData/healthArchiveModel'

const basicGroupIconMap: Record<string, string> = {
  basicInfo: 'ic-jcxx@2x.png',
  drugAllergy: 'ic-ywgms@2x.png',
  exposureHistory: 'ic-bls@2x.png',
  pastHistory: 'ic-jws@2x.png',
  familyHistory: 'ic-jzs@2x.png',
  geneticHistory: 'ic-ycbs@2x.png',
  disability: 'ic-cjqk@2x.png',
  livingEnvironment: 'ic-shhj@2x.png'
}

@Component({
  name: 'HealthArchiveBasicInfoCard'
})
export default class HealthArchiveBasicInfoCard extends Vue {
  @Prop({required: true}) groups!: HealthArchiveBasicGroup[]

  localGroups: HealthArchiveBasicGroup[] = []

  @Watch('groups', {immediate: true, deep: true})
  onGroupsChange(groups: HealthArchiveBasicGroup[]): void {
    this.localGroups = groups.map(group => ({
      ...group,
      fields: [...group.fields]
    }))
  }

  handleToggle(groupKey: string): void {
    const target = this.localGroups.find(group => group.key === groupKey)
    if (!target) {
      return
    }
    target.expanded = !target.expanded
  }

  getIcon(groupKey: string): string {
    return require(`@/static/health/${basicGroupIconMap[groupKey] || 'ic-jcxx@2x.png'}`)
  }
}
</script>

<style lang="scss" scoped>
.archive-basic-card {
  margin: 24rpx 16rpx 24rpx;
  overflow: hidden;
  border-radius: 24rpx;
}

.archive-section-header {
  height: 88rpx;
  padding: 0 28rpx;
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #EBF2FF 0%, #FFFFFF 99.29%);
  border: 3rpx solid #FFFFFF;
  border-radius: 24rpx 24rpx 0 0;
  box-sizing: border-box;
}

.archive-section-title {
  color: #202020;
  line-height: 44rpx;
}

.archive-basic-body {
  padding: 0 24rpx;
  background: #FFFFFF;
  border-radius: 0 0 24rpx 24rpx;
}

.archive-basic-group {
  border-bottom: 1rpx solid #F0F0F0;
}

.archive-basic-group:last-child {
  border-bottom: none;
}

.archive-basic-group-header {
  height: 104rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.archive-basic-group-left {
  display: flex;
  align-items: center;
}

.archive-basic-group-title {
  margin-left: 16rpx;
  color: #202020;
  line-height: 40rpx;
}

.archive-basic-group-content {
  margin-bottom: 24rpx;
  padding: 0 24rpx;
  background: #FAFAFA;
  border-radius: 16rpx;
}

.archive-basic-field {
  min-height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1rpx dashed #EDEDED;
}

.archive-basic-field-last {
  border-bottom: none;
}

.archive-basic-field-label {
  flex-shrink: 0;
  padding-right: 24rpx;
  color: #666666;
  line-height: 40rpx;
}

.archive-basic-field-value {
  flex: 1;
  min-width: 0;
  text-align: right;
  color: #202020;
  line-height: 40rpx;
}
</style>
