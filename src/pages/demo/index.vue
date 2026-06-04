<template>
  <view class="container">
    <u-button type="primary" @click="handleLogin">登录</u-button>
    <u-button type="primary" @click="handleLogin">主要按钮</u-button>

    <view class="toast-section">
      <view class="section-title">Toast 示例</view>

      <u-button type="primary" @click="showDefaultToast">默认 Toast</u-button>
      <u-button type="success" @click="showSuccessToast">成功 Toast</u-button>
      <u-button type="error" @click="showErrorToast">错误 Toast</u-button>
      <u-button type="warning" @click="showWarningToast">警告 Toast</u-button>
      <u-button type="info" @click="showInfoToast">信息 Toast</u-button>

      <view class="section-title">位置示例</view>
      <u-button @click="showTopToast">顶部 Toast</u-button>
      <u-button @click="showBottomToast">底部 Toast</u-button>

      <view class="section-title">跳转示例</view>
      <u-button type="primary" @click="showToastWithUrl">Toast 后跳转</u-button>
    </view>

    <u-toast ref="uToast" />
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { UserModel, UserInfo } from '@MODEL/userModel'

declare const uni: any

@Component({
  name: 'DemoIndex'
})
export default class DemoIndex extends Vue {
  @State((state: any) => state.userInfo) userInfo!: UserInfo | null
  @State((state: any) => state.isLogin) isLogin!: boolean

  handleLogin() {
    const mockUser = UserModel.create({
      id: '1',
      name: '测试用户',
      avatar: '',
      phone: '13800138000',
      token: 'mock_token_' + Date.now(),
      role: 'user'
    })

    this.$store.dispatch('login', {
      token: mockUser.token,
      userInfo: mockUser
    })

    console.error("ckk;登录成功")

    uni.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 2000
    })
  }

  // 默认 Toast
  showDefaultToast() {
    ;(this.$refs.uToast as any).show({
      title: '默认提示'
    })
  }

  // 成功 Toast
  showSuccessToast() {
    ;(this.$refs.uToast as any).show({
      title: '操作成功',
      type: 'success'
    })
  }

  // 错误 Toast
  showErrorToast() {
    ;(this.$refs.uToast as any).show({
      title: '操作失败',
      type: 'error'
    })
  }

  // 警告 Toast
  showWarningToast() {
    ;(this.$refs.uToast as any).show({
      title: '警告提示',
      type: 'warning'
    })
  }

  // 信息 Toast
  showInfoToast() {
    ;(this.$refs.uToast as any).show({
      title: '信息提示',
      type: 'info'
    })
  }

  // 顶部 Toast
  showTopToast() {
    ;(this.$refs.uToast as any).show({
      title: '顶部提示',
      position: 'top'
    })
  }

  // 底部 Toast
  showBottomToast() {
    ;(this.$refs.uToast as any).show({
      title: '底部提示',
      position: 'bottom'
    })
  }

  // Toast 后跳转
  showToastWithUrl() {
    (this.$refs.uToast as any).show({
      title: '即将跳转',
      type: 'success',
      url: '/pages/demo/index',
      callback: () => {
        console.log('Toast 结束回调')
      }
    })
  }
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  padding: 20rpx;
  min-height: 80vh;
}

.toast-section {
  margin-top: 40rpx;
  width: 100%;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin: 30rpx 0 20rpx;
  color: #333;
}
</style>
