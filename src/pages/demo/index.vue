<template>
  <view class="container">
    <button type="primary" @click="handleLogin">登录</button>
    <view class="toast-section">
      <view class="section-title">Toast 示例</view>
      <u-button type="primary" @click="showDefaultToast">默认 Toast</u-button>
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
