<!--
 * @Description: 健康档案个人信息卡片，展示头像、档案号、身份证、联系电话、标签和建档信息
-->
<template>
  <view class="archive-person-card">
    <view class="archive-person-main">
      <BsResidentAvatar
        :avatar="data.avatar"
        :sex="data.sex"
        :age="data.age"
        width="112"
        height="112"
      ></BsResidentAvatar>
      <view class="archive-person-content">
        <view class="archive-name-top-row">
          <view class="archive-name-row">
            <text class="archive-name u-fs36 u-fw600">{{ data.name }}</text>
            <text class="archive-sex-age u-fs28 u-fw400">{{ sexText }} {{ data.age }}岁</text>
          </view>
          <text class="archive-no u-fs28 u-fw400">{{ data.archiveNo }}</text>
        </view>
        <view class="archive-info-row archive-id-row">
          <text class="archive-info-label u-fs28 u-fw400">{{ data.idCardLabel }}</text>
          <text class="archive-info-value u-fs28 u-fw400">{{ data.idCardNo }}</text>
        </view>
        <view class="archive-info-row">
          <text class="archive-info-label u-fs28 u-fw400">{{ data.phoneLabel }}</text>
          <text class="archive-info-value u-fs28 u-fw400">{{ data.phone }}</text>
        </view>
      </view>
    </view>

    <view class="archive-tag-list">
      <view
        v-for="(tag, index) in data.tags"
        :key="index"
        class="archive-tag"
      >
        <text class="archive-tag-text u-fs24 u-fw400">{{ tag.name }}</text>
      </view>
    </view>

    <view class="archive-person-bottom">
      <view class="archive-meta-item">
        <text class="archive-meta-label u-fs28 u-fw400">{{ data.creatorLabel }}</text>
        <text class="archive-meta-value u-fs28 u-fw400">{{ data.creatorName }}</text>
      </view>
      <view class="archive-meta-item archive-meta-item-right">
        <text class="archive-meta-label u-fs28 u-fw400">{{ data.createdAtLabel }}</text>
        <text class="archive-meta-value u-fs28 u-fw400">{{ data.createdAt }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {HealthArchivePersonalInfo} from '../modelData/healthArchiveModel'
import BsResidentAvatar from '@/components/BsResidentAvatar/index.vue'

@Component({
  name: 'HealthArchivePersonCard',
  components: {
    BsResidentAvatar
  }
})
export default class HealthArchivePersonCard extends Vue {
  @Prop({required: true}) data!: HealthArchivePersonalInfo

  get sexText(): string {
    return Number(this.data.sex) === 2 ? '女' : '男'
  }
}
</script>

<style lang="scss" scoped>
.archive-person-card {
  margin: 0 16rpx 0;
  background: linear-gradient(180deg, #EBF2FF 0%, #FFFFFF 100%);
  box-shadow: inset 0rpx 4rpx 0rpx 0rpx rgba(255,255,255,0.3);
  border-radius: 24rpx;
  overflow: hidden;
}

.archive-person-main {
  display: flex;
  align-items: flex-start;
  padding: 28rpx 32rpx 24rpx;
}

.archive-person-content {
  flex: 1;
  min-width: 0;
  margin-left: 20rpx;
}

.archive-name-top-row {
  display: flex;
  align-items: flex-start;
}

.archive-name-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-width: 0;
}

.archive-name {
  color: #202020;
  line-height: 50rpx;
}

.archive-sex-age {
  margin-left: 16rpx;
  color: #202020;
  line-height: 40rpx;
}

.archive-no {
  flex-shrink: 0;
  margin-left: 16rpx;
  padding: 4rpx 12rpx;
  background: #E6FAF1;
  border-radius: 8rpx;
  color: #15AB64;
  line-height: 40rpx;
}

.archive-info-row {
  display: flex;
  align-items: center;
  margin-top: 6rpx;
}

.archive-id-row {
  margin-top: 10rpx;
}

.archive-info-label {
  flex-shrink: 0;
  color: #666666;
  line-height: 40rpx;
}

.archive-info-value {
  margin-left: 16rpx;
  color: #202020;
  line-height: 40rpx;
}

.archive-tag-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 32rpx 20rpx;
}

.archive-tag {
  margin-right: 16rpx;
  padding: 8rpx 16rpx;
  background: #E8F1FF;
  border-radius: 8rpx;
}

.archive-tag:last-child {
  margin-right: 0;
}

.archive-tag-text {
  color: #1E74FE;
  line-height: 32rpx;
}

.archive-person-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22rpx 32rpx 24rpx;
  background: #E8F1FF;
  border-radius: 0 0 24rpx 24rpx;
}

.archive-meta-item {
  display: flex;
  align-items: center;
}

.archive-meta-item-right {
  margin-left: 24rpx;
}

.archive-meta-label {
  color: #666666;
  line-height: 40rpx;
}

.archive-meta-value {
  margin-left: 16rpx;
  color: #202020;
  line-height: 40rpx;
}
</style>
