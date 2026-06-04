import envConfig from './env.config'

export const ENV_PREFIX = process.env.UNI_ENV_PREFIX || 'dev'
export const config = envConfig[ENV_PREFIX] || envConfig.dev

let Domain = config.DOMAIN_NAME;
// #ifdef H5
// h5开发时,直接用本地
if (process.env.NODE_ENV != "production") {
    Domain = "";
}
// #endif
export const DOMAIN_NAME = Domain;

//网络接口请求的服务地址
export const BASE_API_SERVICE_PATH = `${DOMAIN_NAME}/hcn-bbp-dist${config.PATH}`
//图片上传及查看的接口服务 质控环境的bbp当前挂载在其他部门，需要使用这个地址
export const BASE_IMG_SERVICE_PATH = `${DOMAIN_NAME}/hcn-bbp-dist${config.PATH}/upload`;
// 这个接口服务主要用于小程序静态资源（图片）和获取图形验证码
export const BASE_WEB_SERVICE_PATH = `${DOMAIN_NAME}/hcn-web${config.PATH}`;

//是否启用入参加密(sm4)
export const ENCRY_FLAG = false;
