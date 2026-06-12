/**
 * 居民列表页面数据模型
 * 定义居民列表项结构与页面数据结构
 */

/** 居民列表项 */
export interface ResidentListItem {
  /** 居民唯一标识 */
  residentId: string
  /** 居民姓名 */
  name: string
  /** 年龄 */
  age: number
  /** 性别（1=男, 2=女） */
  sex: number
  /** 身份证号 */
  idNumber: string
  /** 电话号码 */
  phone: string
  /** 头像地址（为空时使用默认头像） */
  avatar: string
}

/** 居民列表页数据 */
export interface ResidentListPageData {
  /** 居民列表 */
  list: ResidentListItem[]
}
