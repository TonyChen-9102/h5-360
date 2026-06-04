const whiteList = [
  "/pages/demo/index"
]

export const routeInterceptor = () => {
  uni.addInterceptor('navigateTo', {
    invoke(args) {
      return loginIntercept(args.url)
    }
  })

  uni.addInterceptor('redirectTo', {
    invoke(args) {
      return loginIntercept(args.url)
    }
  })

  uni.addInterceptor('reLaunch', {
    invoke(args) {
      return loginIntercept(args.url)
    }
  })
}

const loginIntercept = (url: string) => {
  const path = url.split('?')[0]

  if (whiteList.includes(path)) {
    return true
  }

  const isLogin = uni.getStorageSync('accessToken')

  if (!isLogin) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    return false
  }

  return true
}
