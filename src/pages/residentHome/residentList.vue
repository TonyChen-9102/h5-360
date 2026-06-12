<!--
 * @Description: 居民列表页面，展示检索匹配的居民列表，选择后进入健康视图
-->
<template>
  <view class="resident-list-page">
    <view
      v-for="(item, index) in pageData.list"
      :key="index"
      class="resident-card"
      @click="handleSelectResident(item)"
    >
      <!-- 头像 -->
      <view class="avatar-wrapper">
        <BsResidentAvatar :avatar="item.avatar" :sex="item.sex" :age="item.age" :width="96" :height="96" />
      </view>
      <!-- 信息区域 -->
      <view class="resident-info">
        <!-- 姓名 + 年龄 + 性别 -->
        <view class="resident-name-row">
          <text class="resident-name u-fs32 u-fw600">{{ item.name }}</text>
          <text class="resident-age-sex u-fs28 u-fw400">{{ item.age }}岁</text>
          <text class="resident-age-sex u-fs28 u-fw400">{{ sexTextMap[item.sex] || '未知' }}</text>
        </view>
        <!-- 身份证号 -->
        <view class="resident-detail-row">
          <text class="resident-detail-label u-fs28 u-fw400">身份证号</text>
          <text class="resident-detail-value u-fs28 u-fw400">{{ item.idNumber }}</text>
        </view>
        <!-- 电话号码 -->
        <view class="resident-detail-row">
          <text class="resident-detail-label u-fs28 u-fw400">电话号码</text>
          <text class="resident-detail-value u-fs28 u-fw400">{{ item.phone }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ResidentListPageData, ResidentListItem } from './modelData/residentListModel'
import { mockResidentList } from './modelData/mockData'
import BsResidentAvatar from '@/components/BsResidentAvatar/index.vue'

@Component({
  name: 'ResidentList',
  components: {
    BsResidentAvatar
  }
})
export default class ResidentList extends Vue {
  pageData: ResidentListPageData = mockResidentList

  sexTextMap: Record<number, string> = {
    1: '男',
    2: '女'
  }

  /** 点击居民卡片，跳转至健康视图概览页 */
  handleSelectResident(item: ResidentListItem): void {
    this.$Router.navigateTo({
      url: '/pages/residentHome/index',
      params: {
        residentId: item.residentId,
        idNumber: item.idNumber
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.resident-list-page {
  background: #F5F5F5;
  min-height: 100vh;
  padding: 30rpx 0;
  box-sizing: border-box;
}

.resident-card {
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, #FFFFFF 100%);
  border-radius: 24rpx;
  border: 2rpx solid #FFFFFF;
  padding: 32rpx;
  margin: 0 30rpx 32rpx 30rpx;
}

.resident-info {
  flex: 1;
  min-width: 0;
}

.avatar-wrapper {
  flex-shrink: 0;
  margin-right: 24rpx;
}

.resident-name-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 16rpx;
}

.resident-name {
  color: #202020;
  margin-right: 12rpx;
}

.resident-age-sex {
  color: #666666;
  margin-right: 12rpx;
}

.resident-detail-row {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.resident-detail-label {
  color: #666666;
  width: 140rpx;
  flex-shrink: 0;
}

.resident-detail-value {
  color: #666666;
  flex: 1;
}
</style>
