<!--
 * @Description: 居民检索页面，支持多条件检索居民，查询成功后跳转至健康视图概览页
-->
<template>
  <view class="search-page">
    <!-- 提示区域 -->
    <view class="tip-bar u-pd24">
      <text class="tip-text u-fs28 u-fw400">请输入以下任一条件检索居民，多条件时需同时满足</text>
    </view>

    <!-- 表单区域 -->
    <view class="form-area">
      <view class="form-item">
        <text class="form-label u-fs30 u-fw400">姓名</text>
        <input
          class="form-input u-fs30"
          v-model="form.name"
          placeholder="请输入"
          placeholder-class="placeholder-color"
        />
      </view>
      <view class="form-item">
        <text class="form-label u-fs30 u-fw400">身份证号</text>
        <input
          class="form-input u-fs30"
          v-model="form.idNumber"
          placeholder="请输入"
          placeholder-class="placeholder-color"
          maxlength="18"
        />
      </view>
      <view class="form-item">
        <text class="form-label u-fs30 u-fw400">患者电话</text>
        <input
          class="form-input u-fs30"
          v-model="form.phone"
          placeholder="请输入"
          placeholder-class="placeholder-color"
          type="number"
          maxlength="11"
        />
      </view>
      <view class="form-item">
        <text class="form-label u-fs30 u-fw400">医保卡号</text>
        <input
          class="form-input u-fs30"
          v-model="form.medicalCardNo"
          placeholder="请输入"
          placeholder-class="placeholder-color"
        />
      </view>
      <view class="form-item">
        <text class="form-label u-fs30 u-fw400">档案编号</text>
        <input
          class="form-input u-fs30"
          v-model="form.archiveNo"
          placeholder="请输入"
          placeholder-class="placeholder-color"
        />
      </view>
    </view>

    <!-- 底部查询按钮 -->
    <view class="bottom-btn-area">
      <view class="search-btn" @click="handleSearch">
        <text class="search-btn-text u-fs34 u-fw500">查询</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ResidentSearchModel, ResidentSearchForm } from './modelData/residentSearchModel'
import { isValidIdNumber, isValidPhone } from '@/api/util'

@Component({
  name: 'ResidentSearch'
})
export default class ResidentSearch extends Vue {
  form: ResidentSearchForm = ResidentSearchModel.getDefault()

  /** 前端输入验证，返回错误信息，通过返回空字符串 */
  private validate(): string {
    const { name, idNumber, phone, medicalCardNo, archiveNo } = this.form

    // 至少填写一个条件
    if (!name && !idNumber && !phone && !medicalCardNo && !archiveNo) {
      return '请至少输入一个条件'
    }

    // 身份证号格式验证
    if (idNumber && !isValidIdNumber(idNumber)) {
      return '请输入正确的身份证号'
    }

    // 手机号格式验证
    if (phone && !isValidPhone(phone)) {
      return '请输入正确的手机号'
    }

    return ''
  }

  /** 点击查询按钮 */
  handleSearch(): void {
    const errorMsg = this.validate()
    if (errorMsg) {
      uni.showToast({ title: errorMsg, icon: 'none' })
      return
    }

    // TODO: 后端接口就绪后，在此处调用 commonAjax 发起检索请求，成功后携带返回的居民标识跳转
    this.$Router.navigateTo({
      url: '/pages/residentHome/residentList',
      params: {
        searchParams: JSON.stringify(this.form)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  background: #F5F5F5;
}

.tip-bar {
  background: #FFF5EB;
  border-radius: 0;
}

.tip-text {
  color: #FF730A;
  line-height: 40rpx;
}

.form-area {
  background: #FFFFFF;
  padding: 0 30rpx;
  padding-bottom: 30rpx;
}

.form-item {
  display: flex;
  align-items: center;
  padding: 28rpx 0;
  border-bottom: 1rpx solid #F0F0F0;

  &:last-child {
    border-bottom: none;
  }
}

.form-label {
  width: 160rpx;
  color: #333333;
  flex-shrink: 0;
}

.form-input {
  flex: 1;
  color: #333333;
}

.placeholder-color {
  color: #999999;
}

.bottom-btn-area {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 136rpx;
  background: #FFFFFF;
  padding: 0 30rpx;
  padding-bottom: env(safe-area-inset-bottom);
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.search-btn {
  background: #1E74FE;
  border-radius: 40rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.search-btn-text {
  color: #FFFFFF;
}
</style>
