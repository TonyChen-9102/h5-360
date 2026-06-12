<template>
  <view class="container">
    <button type="primary" @click="handleLogin">登录</button>
    <button type="primary" @click="handleLoginByOpenId">微信 OpenId 登录</button>
    <button type="primary" @click="goToResidentHome">健康视图概览</button>
    <button type="primary" @click="goToResidentSearch">居民检索</button>
    <button type="primary" @click="goToVisitView">就诊视图</button>
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
import { commonAjax } from '@/api/api'
import { config } from '@/config'

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

  // 微信 OpenId 登录
  async handleLoginByOpenId() {
    const params = [
      {
        tenantId: config.TENANT_ID,
        roleCode: 'patient',
        outAppType: 'wx',
        outAppId: 'wxc05533898d6fd716',
        outUid: 'oUFcd6CfJ9lV0ogm-WDWWHsNejVg'
      }
    ]

    let res = await commonAjax(params, 'hcn.weChatpService', 'loginByOpenId')
    console.log('loginByOpenId 响应:', res)
  }

  goToResidentHome() {
    uni.navigateTo({
      url: '/pages/residentHome/index'
    })
  }

  goToResidentSearch() {
    uni.navigateTo({
      url: '/pages/residentHome/residentSearch'
    })
  }

  goToVisitView() {
    uni.navigateTo({
      url: '/pages/medicalRecord/visitView'
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
