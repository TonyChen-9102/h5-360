import { CryptoJS } from '../sm4.js'
import key from '../word.js'
export const requestInterceptor = () => {
  uni.addInterceptor("request", {
    invoke(args) {
      // 1.添加公共参数
      // #ifdef MP-WEIXIN || APP-PLUS
      args.header && (args.header.cookie = `tk=${uni.getStorageSync("accessToken") || ""}`);
      // #endif
      // #ifdef H5
      document.cookie = `tk=${uni.getStorageSync("accessToken") || ""}`;
      // #endif
      //2.如果需要对参数进行加密，则进行加密
      if (args.header && args.header["X-Service-Encrypt"] == "2") {
        let param = typeof args.data == "object" ? JSON.stringify(args.data) : args.data;
        args.data = CryptoJS.encrypt(param, key);
      }
    },
    success(args) {
      //判断是否需要解密的操作由于当前接口不统一，bbp加密后需要解密，而之前的公共组件部分不需要解密，所以暂时放到相应的接口方法处进行处理
    },
    complete(res) {
      uni.stopPullDownRefresh();
    },
  });
};
