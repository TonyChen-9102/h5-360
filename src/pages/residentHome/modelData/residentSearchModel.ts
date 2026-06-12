/**
 * 居民检索页面数据模型
 * 定义检索表单字段、查询结果结构及默认值
 */

/** 居民检索表单字段 */
export interface ResidentSearchForm {
  /** 居民姓名 */
  name: string
  /** 身份证号 */
  idNumber: string
  /** 患者电话 */
  phone: string
  /** 医保卡号 */
  medicalCardNo: string
  /** 档案编号 */
  archiveNo: string
}

/** 居民检索查询结果 */
export interface ResidentSearchResult {
  /** 居民标识 */
  residentId: string
  /** 身份证号 */
  idNumber: string
  /** 居民姓名 */
  name: string
}

/** 居民检索页面数据模型，提供表单默认值 */
export class ResidentSearchModel {
  /** 获取默认表单值 */
  static getDefault(): ResidentSearchForm {
    return {
      name: '',
      idNumber: '',
      phone: '',
      medicalCardNo: '',
      archiveNo: ''
    }
  }
}
