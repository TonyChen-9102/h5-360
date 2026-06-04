import {
  BASE_API_SERVICE_PATH,
  BASE_WEB_SERVICE_PATH,
  BASE_IMG_SERVICE_PATH,
  config,
  ENCRY_FLAG
} from '@/config'
import { Sm3 } from './sm3.js'
import { CryptoJS } from './sm4.js'
import key from './word.js'

let requestLoadingCount = 0; //请求接口时showLoading的数量
let getExcludeSer = getExtraJson();

const getEncryFlag = async (serviceId) => {
  await getExcludeSer;
  let noEncryptServices: Array<any> = [];
  try {
    noEncryptServices = JSON.parse(uni.getStorageSync("encryptExcludeServices") || "[]");
    if (!Array.isArray(noEncryptServices) || noEncryptServices.length == 0) {
      noEncryptServices = [];
    }
  } catch (e) {
    noEncryptServices = [];
  }
  if (serviceId && noEncryptServices.includes(serviceId)) {
    return false;
  }
  return ENCRY_FLAG;
};

const preDefinedAPIError = {
  "-1": { msg: "请求参数缺失" },
  "-2": { msg: "请求参数为空" },
  "-3": { msg: "请求参数不合法" },
  "-4": { msg: "签名不正确" },
  "-98": {
    msg: "系统检测到您长时间未更改过密码，请定期更改密码",
    modal: true,
  },
  "-99": {
    msg: "系统检测到您在一段时间内未做任何操作，请重新登录",
    modal: true,
  },
  "-202": { msg: "时间异常，请核准系统时间为当前时间" },
  "-500": { msg: "您的账号在其他设备上登录，请重新登录", modal: true },
  "-501": { msg: "服务出错,请重新登录", modal: true },
  "405": { msg: "请求的方法不存在！" },
};

const handleDefinedAPIError = (definedErrorCode) => {
  if (preDefinedAPIError[definedErrorCode].modal) {
    uni.showModal({
      content: preDefinedAPIError[definedErrorCode].msg,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          onLoginout()
        }
      },
    })
  } else {
    uni.showToast({
      title: preDefinedAPIError[definedErrorCode].msg,
      icon: "none",
    });
  }
};

let timeout:any = null;

function hideLoadingWithDelay(delayLoading: number) {
  if (delayLoading != 0){
    if (timeout){
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;
      uni.hideLoading();
    }, delayLoading);
  } else {
    uni.hideLoading();
  }
}

function handleResponseError(
  err: any,
  statusCode: number,
  handleRejectBySelf: boolean,
  showMessage: boolean
) {
  if (statusCode == 403 && !handleRejectBySelf) {
    onLoginout();
  }
  console.log("api;uniRequest;err=", err);
  let httpErrMsg = err ? "http请求无响应" : "http请求返回错误";
  const data = {
    statusCode: statusCode,
    msg: httpErrMsg,
  };
  if (showMessage) {
    uni.showToast({ title: httpErrMsg, icon: "none" });
  }
  return Promise.reject(data);
}

function handleResponseSuccess(
  data: any,
  handleRejectBySelf: boolean,
  showMessage: boolean
) {
  if (data?.code == 200) {
    return data;
  } else {
    if (!handleRejectBySelf && Object.keys(preDefinedAPIError).includes(data.code)) {
      handleDefinedAPIError(data.code);
    } else {
      if (showMessage) {
        uni.showToast({
          title: data.msg || data.message || "接口返回错误",
          icon: "none",
        });
      }
    }
    return data;
  }
}

function generateNonceStr() {
  let nonceStr = "";
  let possible = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789";

  for (let i = 0; i < 16; i++) {
    nonceStr += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return nonceStr;
}

function getSm3Sign(nonceStr, params: any) {
  let userId = uni.getStorageSync("userId") || null;
  let userRoleTokenId = uni.getStorageSync("userRoleTokenId") || null;
  let signStr = `uid=${userId}&urt=${userRoleTokenId}&nonceStr=${nonceStr}&body=${JSON.stringify(
      params
  )}`;
  return Sm3(signStr);
}

async function getExtraJson() {
  try {
    let res = await commonGet(
        "/resources/extras.json",
        {});
    uni.setStorageSync(
        "encryptExcludeServices",
        res.data?.encryptExcludeServices?.length > 0
            ? JSON.stringify(res.data?.encryptExcludeServices)
            : "[]"
    );
  } catch (err) {}
}

async function uniRequest(
  requestOptions: AnyObject,
  handleRejectBySelf: boolean = false,
  showLoading: boolean = true,
  delayLoading: number = 0,
  showMessage: boolean = true
) {
  if (showLoading) {
    requestLoadingCount++;
  }
  if (requestLoadingCount > 0) {
    uni.showLoading({ title: "loading" });
  }
  // @ts-ignore
  let [err, res] = await uni.request(requestOptions);
  if (showLoading) {
    requestLoadingCount--;
  }
  if (requestLoadingCount == 0) {
    hideLoadingWithDelay(delayLoading);
  }

  let serviceId = requestOptions?.header?.["X-Service-Id"];
  let { statusCode, data } = res;
  if (statusCode == 200) {
    if ((await getEncryFlag(serviceId)) && data.body) {
      let decryptStr = CryptoJS.decrypt(data.body, key) || "";
      try {
        data.body = JSON.parse(decryptStr);
      } catch (err) {
        data.boby = decryptStr;
      }
    }
    return handleResponseSuccess(data, handleRejectBySelf, showMessage);
  } else {
    return handleResponseError(err, statusCode, handleRejectBySelf, showMessage);
  }
}

function onLoginout() {
  uni.removeStorageSync("accessToken");
  uni.removeStorageSync("uinfo");
  uni.removeStorageSync("userId");
  uni.removeStorageSync("userInfoDetail");
  uni.removeStorageSync("cachedHospital");
  uni.removeStorageSync("chatMsgHistoryObj");
}

export const commonAjax = async function (
  params: any,
  ServiceId: string,
  ServiceMethod: string,
  {
    handleRejectBySelf = false,
    showLoading = true,
    showMessage = true,
    delayLoading = 0,
  }: {
    handleRejectBySelf?: boolean;
    showLoading?: boolean;
    delayLoading?: number;
    showMessage?: boolean;
  } = {}
) {
  let url: string = `${BASE_API_SERVICE_PATH}/*.jsonRequest`;
  let nonceStr = generateNonceStr();
  let header: any = {
    "X-Access-Token": uni.getStorageSync("accessToken"),
    "X-Service-Id": ServiceId,
    "X-Service-Method": ServiceMethod,
    "X-Service-Encrypt": (await getEncryFlag(ServiceId)) ? 2 : "",
    timestamp: +new Date(),
  };
  let storageToken = uni.getStorageSync("accessToken");
  if (storageToken) {
    header = {
      ...header,
      "X-Nonce-String": nonceStr,
      "X-Signature-Flag": true,
      "X-Service-Signature": getSm3Sign(nonceStr, params),
    };
    uni.setStorageSync("token_expires_timestamp", new Date().getTime());
  }
  return await uniRequest(
      { url, header, data: params, method: "POST" },
      handleRejectBySelf,
      showLoading,
      delayLoading,
      showMessage
  );
};

export const commonGet = async function(
    url: string,
    data: any,
    baseUrl?: string,
    {
      handleRejectBySelf = false,
      showLoading = true,
      showMessage = true,
      delayLoading = 0,
    }: {
      handleRejectBySelf?: boolean;
      showLoading?: boolean;
      delayLoading?: number;
      showMessage?: boolean;
    } = {}
){
  var base: string = baseUrl || BASE_API_SERVICE_PATH;
  if (url && url.indexOf("http") === -1) {
    url = base + url;
  }
  let accessToken = uni.getStorageSync("accessToken");
  let cookie = "tk=" + accessToken;
  const getHeader: any = {
    "X-Access-Token": accessToken,
    "Content-Type": "application/json;charset=UTF-8",
    cookie: cookie,
  };

  return await uniRequest(
      { url, header:getHeader, data: data, method: "GET" },
      handleRejectBySelf,
      showLoading,
      delayLoading,
      showMessage
  );
}

//文件上传
export const fileUpload = async function(
    filePath: string,
    formData: any,
    {
      handleRejectBySelf = false,
      showLoading = true,
      showMessage = true,
      delayLoading = 0,
    }: {
      handleRejectBySelf?: boolean;
      showLoading?: boolean;
      delayLoading?: number;
      showMessage?: boolean;
    } = {}
){
  if (showLoading) {
    requestLoadingCount++;
  }
  if (requestLoadingCount > 0) {
    uni.showLoading({ title: "loading" });
  }

  let storageToken = uni.getStorageSync("accessToken");
  let cookie = "tk=" + storageToken;

  // @ts-ignore
  let [err, res] = await uni.uploadFile({
    url: BASE_IMG_SERVICE_PATH,
    filePath: filePath,
    header: {
      "X-Access-Token": storageToken,
      cookie: cookie,
    },
    name: "files",
    formData: formData,
  });
  if (showLoading) {
    requestLoadingCount--;
  }
  if (requestLoadingCount == 0) {
    hideLoadingWithDelay(delayLoading);
  }

  let { statusCode, data } = res;
  if (statusCode == 200) {
    return handleResponseSuccess(data, handleRejectBySelf, showMessage);
  } else {
    return handleResponseError(err, statusCode, handleRejectBySelf, showMessage);
  }
}

// 图片请求（所有静态图片）
export const miniImageUrl = (
  str: string | number,
  isFaces: boolean = false,
  isTabbar: boolean = false,
  folderName?: string
) => {
  if (/^(http:|https:).*/.test(String(str))) {
    return str;
  }
  // 获取底部tab图标
  if (isTabbar) {
    return `/static/images/${str}`;
  }
  if (!str) {
    return "";
  }
  let path = isFaces ? "faces" : "images";
  let url = "";
  url = `${BASE_WEB_SERVICE_PATH}/mini_images/${path}/${str}`;
  if (folderName) {
    url = `${BASE_WEB_SERVICE_PATH}/mini_images/${path}/${folderName}/${str}`;
  }
  return url;
};

// 图片请求,已挂载在Vue的属性上，Vue文件中请统一使用$jktImgView
export const jktImgView = (avatarFileId: string) => {
  if (avatarFileId) {
    return `${BASE_IMG_SERVICE_PATH}/${avatarFileId}`;
  }
  return "";
};

// 字典
export const dicAjax = async (
    dictionaryName:string,
    extraParams: any = {},
    handleRejectBySelf: boolean = false
) => {
  let finalParams = { dictionaryName };
  if (extraParams) {
    finalParams = { ...finalParams, ...extraParams };
  }
  return await commonAjax([finalParams], "hbs.dictionaryRpcService", "getDictionarySlice", {
    handleRejectBySelf,
  });
};

interface PropertyConfig {
  moduleScope?: string; //模块参数所属范围（分为两种，一种是平台级别的（默认值），另一种是机构级别的，若获取机构级别的直接传入orgId即可）
  moduleId: string; //模块ID
  propertyCode?: string; //参数代码(即模块下的某个具体系统参数，传""表示获取当前模块下的所有系统参数)
}
/**
 * 获取系统参数，这个方法只能处理两种情况，查询模块下的所有系统参数、查询模块下的指定系统参数
 * @param propertyConfig （moduleScope：默认是TENANTID平台级别 propertyCode：默认"",获取传入moduleId下所有的参数）
 * @returns
 */

export const queryPropertyConfig = async (propertyConfig: PropertyConfig) => {
  let param = [
    propertyConfig.moduleScope || config.TENANTID,
    propertyConfig.moduleId,
    propertyConfig.propertyCode || "",
  ];
  try {
    let res = await commonAjax(param, "hbs.basePropertyConfig", "queryAllPropertyConfig", {
      handleRejectBySelf: true,
      showLoading: false,
    });
    if (res.code == 200) {
      return res.body || [];
    }
    return [];
  } catch (e) {
    return [];
  }
};

/**
 * 获取系统参数列表，传入参数list
 * @param orgId: 非必传，默认为租户的系统参数
 * @param propertyCodeList: 必传，需要查询的系统参数的codelist
 * @param withToken: 非必传，默认获取系统参数是在登录状态下使用
 * @returns 系统参数列表
 */
export const queryPropertyConfigList = async ({
  orgId = config.TENANTID,
  propertyCodeList = [],
  withToken = true,
}: {
  orgId?: string; //模块参数所属范围（分为两种，一种是平台级别的（默认值），另一种是机构级别的，若获取机构级别的直接传入orgId即可）
  propertyCodeList: Array<string>; //模块ID
  withToken?: boolean;
}) => {
  try {
    let method = "queryPropertyConfigList";
    let param = [orgId || config.TENANTID, propertyCodeList];
    if (!withToken) {
      param = [config.TENANTID, orgId || config.TENANTID, propertyCodeList];
      method = "queryPropertyConfigListWithoutToken";
    }
    let res = await commonAjax(param, "hbs.basePropertyConfig", method, {
      handleRejectBySelf: true,
      showLoading: false,
    });
    if (res.code == 200) {
      return res.body || [];
    }
    return [];
  } catch (e) {
    return [];
  }
};
