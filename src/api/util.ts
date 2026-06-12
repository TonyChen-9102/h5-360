/**
 * @Description: 公共工具方法，提供通用的格式校验等能力
 */

/** 身份证号正则：18位，前17位数字，末位可为数字或X/x */
const ID_NUMBER_REG = /^\d{17}[\dXx]$/

/** 手机号正则：1开头，第二位3-9，共11位 */
const PHONE_REG = /^1[3-9]\d{9}$/

/**
 * 校验身份证号格式是否合法
 * @param idNumber 待校验的身份证号
 * @returns 是否合法
 */
export function isValidIdNumber(idNumber: string): boolean {
  return ID_NUMBER_REG.test(idNumber)
}

/**
 * 校验手机号格式是否合法
 * @param phone 待校验的手机号
 * @returns 是否合法
 */
export function isValidPhone(phone: string): boolean {
  return PHONE_REG.test(phone)
}
