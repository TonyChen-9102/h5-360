import qs from 'qs'

class Router {
  navigateTo(options: { url: string; params?: object; isAssemble?: boolean; successFun?: Function }) {
    this.openPage('navigateTo', options)
  }

  redirectTo(options: { url: string; params?: object; isAssemble?: boolean }) {
    this.openPage('redirectTo', options)
  }

  reLaunch(options: { url: string; params?: object; isAssemble?: boolean }) {
    this.openPage('reLaunch', options)
  }

  switchTab(options: { url: string }) {
    uni.switchTab({
      url: options.url
    })
  }

  navigateBack(delta: number = 1) {
    uni.navigateBack({ delta })
  }

  private openPage(
    openType: 'navigateTo' | 'redirectTo' | 'reLaunch',
    options: { url: string; params?: object; isAssemble?: boolean; successFun?: Function }
  ) {
    let wholeUrl = options.url
    if (!wholeUrl) {
      uni.showToast({ title: '跳转页面为空', icon: 'none' })
      return
    }
    if (options.params) {
      const arr = Object.keys(options.params)
      if (arr.length > 0) {
        wholeUrl = options.isAssemble
          ? `${wholeUrl}?sparamstr=${JSON.stringify(options.params)}`
          : `${wholeUrl}?${qs.stringify(options.params, { encode: false })}`
      }
    }
    
    uni.navigateTo({
      url: wholeUrl,
      success: () => {
        if (options.successFun && typeof options.successFun === 'function') {
          options.successFun()
        }
      }
    })
  }

  navigateBackToTarget({
    targetUrl = '',
    backOptions = undefined,
    resultFun
  }: {
    targetUrl: string
    backOptions?: boolean | object
    resultFun?: Function
  }) {
    const pages = getCurrentPages()
    if (pages.length > 1) {
      const findIndex = pages.findIndex((item: any) => {
        return item.route.includes(targetUrl) || targetUrl.includes(item.route)
      })
      const targetIndex = findIndex !== -1 ? findIndex : 0
      if (backOptions) {
        const targetPage: any = pages[targetIndex]
        targetPage.$vm.backOptions = backOptions
      }
      const backIndex = pages.length - (targetIndex + 1)
      if (backIndex > 0) {
        uni.navigateBack({
          delta: backIndex,
          success: () => {
            resultFun && resultFun(findIndex !== -1)
          }
        })
      } else {
        resultFun && resultFun(findIndex !== -1)
      }
      return findIndex !== -1
    } else {
      resultFun && resultFun(false)
      return false
    }
  }
}

export default new Router()
