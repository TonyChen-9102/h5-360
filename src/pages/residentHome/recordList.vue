<!--
 * @Description: 个人档案-记录列表页，儿童健康、健康体检等功能跳转的统一列表页
 *               支持主项展开/收缩，标题随功能动态变化
-->
<template>
  <view class="record-list-page">
    <view
      v-for="(item, index) in pageData.items"
      :key="item.key"
      class="record-card"
    >
      <view class="record-item" @click="toggleItem(index)">
        <u-image
          src="/static/health/ic-etjl@2x.png"
          mode="aspectFit"
          width="56rpx"
          height="56rpx"
        ></u-image>
        <text class="record-item-title u-fs28 u-fw400">{{ item.title }}</text>
        <u-icon
          :name="item.expanded ? 'arrow-up' : 'arrow-down'"
          color="#999999"
          size="28"
        ></u-icon>
      </view>

      <view v-if="item.expanded" class="record-children">
        <view
          v-for="child in item.children"
          :key="child.id"
          class="record-child"
          @click="handleChildClick(item, child)"
        >
          <u-image
            src="/static/health/ic-wj@2x.png"
            mode="aspectFit"
            width="32rpx"
            height="32rpx"
          ></u-image>
          <text class="record-child-date u-fs28 u-fw400">{{ child.date }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {RecordListPageData, RecordListItem, RecordListChild} from './modelData/recordListModel'
import {mockRecordListMap, mockChildHealthRecordList} from './modelData/mockData'

@Component({
  name: 'RecordList'
})
export default class RecordList extends Vue {
  pageData: RecordListPageData = mockChildHealthRecordList

  onLoad(query: {key?: string; title?: string}): void {
    const key = query && query.key
    if (key && mockRecordListMap[key]) {
      this.pageData = mockRecordListMap[key]
    } else if (query && query.title) {
      this.pageData = {
        title: query.title,
        items: []
      }
    }
    uni.setNavigationBarTitle({title: this.pageData.title})
  }

  // 切换主项展开/收缩
  toggleItem(index: number): void {
    const item = this.pageData.items[index]
    this.$set(item, 'expanded', !item.expanded)
  }

  // 点击子项记录
  handleChildClick(item: RecordListItem, child: RecordListChild): void {
    void item
    void child
  }
}
</script>

<style lang="scss" scoped>
.record-list-page {
  min-height: 100vh;
  padding: 28rpx 24rpx;
  box-sizing: border-box;
  background: #F4F5F7;
}

.record-card {
  margin-bottom: 24rpx;
  padding: 0 32rpx;
  background: #FFFFFF;
  border-radius: 16rpx;
}

.record-card:last-child {
  margin-bottom: 0;
}

.record-item {
  display: flex;
  align-items: center;
  height: 112rpx;
}

.record-item-title {
  flex: 1;
  min-width: 0;
  margin-left: 16rpx;
  color: #202020;
}

.record-children {
  padding-bottom: 24rpx;
}

.record-child {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
  padding: 26rpx 24rpx;
  background: #FAFAFA;
  border-radius: 16rpx;
  box-sizing: border-box;
}

.record-child:last-child {
  margin-bottom: 0;
}

.record-child-date {
  margin-left: 16rpx;
  color: #202020;
}
</style>
