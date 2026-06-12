<!--
 * @Description: 就诊视图页面
 * 展示居民的就诊记录列表，支持按就诊类型（门急诊/住院/体检）Tab 筛选
 * 设计稿：MasterGo https://mastergo.com/file/195908529140340 layer 6:00301
-->
<template>
  <view class="visit-view">
    <!-- Tab 筛选栏 -->
    <view class="visit-view-tabs">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        class="visit-view-tab"
        :class="{ 'visit-view-tab--active': tab.selected }"
        @click="handleTabClick(tab.key)"
      >
        <text
          class="visit-view-tab-text"
          :class="{ 'visit-view-tab-text--active': tab.selected }"
        >{{ tab.label }}</text>
        <!-- 选中态勾选标记 -->
        <view v-if="tab.selected" class="visit-view-tab-check">
          <image src="/static/medicalRecord/ico-item-sel.png" mode="aspectFit" style="width: 28rpx; height: 24rpx;" />
        </view>
      </view>
    </view>

    <!-- 卡片列表区域 -->
    <scroll-view
      v-if="filteredRecords.length > 0"
      class="visit-view-list"
      scroll-y
    >
      <view
        v-for="record in filteredRecords"
        :key="record.id"
        class="visit-view-list-item"
      >
        <!-- 就诊记录卡片 -->
        <view class="visit-card">
          <!-- 顶部渐变区域 -->
          <view
            class="visit-card-header"
            :style="getHeaderStyle(record.visitType)"
          >
            <view class="visit-card-hospital">
              <!-- 医院图标 -->
              <view class="visit-card-hospital-icon">
                <image src="/static/medicalRecord/ic-hos.png" mode="aspectFit" style="width: 32rpx; height: 32rpx;" />
              </view>
              <text class="visit-card-hospital-name u-fs28 u-fw400">{{ record.hospital }}</text>
            </view>
            <!-- 就诊类型标签 -->
            <view class="visit-card-type-badge">
              <image
                class="visit-card-type-badge-bg"
                :src="getTheme(record.visitType).tagBgImage"
                mode="scaleToFill"
              />
              <view
                class="visit-card-type-text"
                :style="{ color: getTheme(record.visitType).tagColor }"
              >{{ getTheme(record.visitType).label }}</view>
            </view>
          </view>

          <!-- 底部内容区域 -->
          <view class="visit-card-body">
            <!-- 左侧日期 -->
            <view class="visit-card-date">
              <text class="visit-card-date-md u-fs32 u-fw600">{{ record.dateMonthDay }}</text>
              <text class="visit-card-date-year u-fs28 u-fw400">{{ record.dateYear }}</text>
            </view>
            <!-- 中间分隔线 -->
            <view class="visit-card-divider"></view>
            <!-- 右侧就诊详情 -->
            <view class="visit-card-detail">
              <view class="visit-card-dept-row">
                <text class="visit-card-department u-fs32 u-fw600">{{ record.department }}</text>
                <text class="visit-card-doctor u-fs28 u-fw400">{{ record.doctorName }}</text>
              </view>
              <!-- 诊断标签（体检类型不显示） -->
              <view
                v-if="record.diagnosisTags && record.diagnosisTags.length > 0"
                class="visit-card-tags"
              >
                <view
                  v-for="(tag, index) in record.diagnosisTags"
                  :key="index"
                  class="visit-card-tag"
                >
                  <text class="visit-card-tag-text u-fs24 u-fw400">{{ tag.name }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 空态提示 -->
    <view v-else class="visit-view-empty">
      <text class="visit-view-empty-text u-fs28 u-fw400">暂无就诊记录</text>
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {VisitTabKey, VisitType, TAB_VISIT_TYPE_MAP, VISIT_TYPE_THEME, VisitRecordCardItem, VisitViewPageData, VisitTypeTheme} from './modelData/visitViewModel'
import {mockVisitViewData} from './modelData/mockData'

/** Tab 项数据 */
interface TabItem {
  /** Tab 标识 */
  key: VisitTabKey
  /** Tab 显示文字 */
  label: string
  /** 是否选中 */
  selected: boolean
}

@Component({
  name: 'VisitView'
})
export default class VisitView extends Vue {
  /** 页面数据 */
  pageData: VisitViewPageData = {records: []}

  /** Tab 列表 */
  tabs: TabItem[] = [
    {key: VisitTabKey.OutpatientEmergency, label: '门急诊', selected: true},
    {key: VisitTabKey.Inpatient, label: '住院', selected: true},
    {key: VisitTabKey.PhysicalExam, label: '体检', selected: true}
  ]

  onLoad(): void {
    this.pageData = mockVisitViewData
  }

  /** 根据就诊类型获取色彩主题 */
  getTheme(visitType: VisitType): VisitTypeTheme {
    return VISIT_TYPE_THEME[visitType]
  }

  /** 获取卡片顶部渐变样式 */
  getHeaderStyle(visitType: VisitType): Record<string, string> {
    const theme = this.getTheme(visitType)
    return {
      background: `linear-gradient(180deg, ${theme.gradientFrom} 0%, ${theme.gradientTo} 100%)`
    }
  }

  /** 根据 Tab 选中状态过滤后的就诊记录 */
  get filteredRecords(): VisitRecordCardItem[] {
    const selectedTypes = new Set<VisitType>()

    // 收集所有选中 Tab 对应的就诊类型
    this.tabs.forEach(tab => {
      if (tab.selected) {
        const types = TAB_VISIT_TYPE_MAP[tab.key]
        types.forEach(type => selectedTypes.add(type))
      }
    })

    // 如果没有选中任何 Tab，返回空列表
    if (selectedTypes.size === 0) {
      return []
    }

    // 过滤记录：匹配选中类型 + 互联网诊疗始终显示
    return this.pageData.records.filter(record =>
      selectedTypes.has(record.visitType) || record.visitType === VisitType.OnlineDiagnosis
    )
  }

  /** 点击 Tab 切换选中/取消选中 */
  handleTabClick(key: VisitTabKey): void {
    const tab = this.tabs.find(t => t.key === key)
    if (tab) {
      tab.selected = !tab.selected
    }
  }
}
</script>

<style lang="scss" scoped>
.visit-view {
  min-height: 100vh;
  background: #F3F4F5;
}

.visit-view-tabs {
  display: flex;
  align-items: center;
  padding: 16rpx 32rpx;
  margin-top: 16rpx;
  background: #F3F4F5;
  gap: 16rpx;
}

.visit-view-tab {
  display: flex;
  align-items: center;
  padding: 10rpx 24rpx;
  border-radius: 8rpx;
  border: 2rpx solid #EDEDED;
  background: #FFFFFF;
  position: relative;
  overflow: hidden;
}

.visit-view-tab--active {
  background: #E8F1FF;
  border-color: #1E74FE;
}

.visit-view-tab-text {
  font-size: 28rpx;
  line-height: 44rpx;
  color: #666666;
}

.visit-view-tab-text--active {
  color: #1E74FE;
}

.visit-view-tab-check {
  position: absolute;
  right: -1rpx;
  bottom: -1rpx;
  width: 28rpx;
  height: 24rpx;
  background: #1E74FE;
  border-radius: 8rpx 0 8rpx 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visit-view-list {
  padding: 16rpx 0;
}

.visit-view-list-item {
  margin-bottom: 24rpx;
}

.visit-view-list-item:last-child {
  margin-bottom: 0;
}

.visit-view-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
}

.visit-view-empty-text {
  color: #999999;
}

/* 就诊记录卡片样式 */
.visit-card {
  margin: 0 16rpx;
  border-radius: 16rpx;
  background: #FFFFFF;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.visit-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx;
  position: relative;
  min-height: 84rpx;
}

.visit-card-hospital {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.visit-card-hospital-icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 8rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visit-card-hospital-name {
  color: #666666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.visit-card-type-badge {
  position: absolute;
  right: 0;
  top: 0;
  width: 200rpx;
  height: 84rpx;
  overflow: hidden;
}

.visit-card-type-badge-bg {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.visit-card-type-text {
  position: absolute;
  right: 50%;
  top: 10rpx;
  transform: translateX(65%);
  font-size: 28rpx;
  white-space: nowrap;
  z-index: 1;
}

.visit-card-body {
  display: flex;
  align-items: flex-start;
  padding: 10rpx 24rpx 24rpx;
}

.visit-card-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  min-width: 84rpx;
}

.visit-card-date-md {
  color: #202020;
  line-height: 48rpx;
}

.visit-card-date-year {
  color: #202020;
  line-height: 44rpx;
}

.visit-card-divider {
  width: 2rpx;
  height: 80rpx;
  background: #D8D8D8;
  margin: 0 24rpx;
  flex-shrink: 0;
}

.visit-card-detail {
  flex: 1;
  min-width: 0;
}

.visit-card-dept-row {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.visit-card-department {
  color: #1E74FE;
  margin-right: 16rpx;
}

.visit-card-doctor {
  color: #202020;
}

.visit-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.visit-card-tag {
  background: #E6FAF1;
  border-radius: 8rpx;
  padding: 4rpx 16rpx;
}

.visit-card-tag-text {
  color: #15AB64;
  line-height: 32rpx;
}
</style>
