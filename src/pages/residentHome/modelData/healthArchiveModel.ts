/**
 * 健康档案页面数据模型
 */
export interface HealthArchiveProfileTag {
  name: string // 档案标签名称
}

export interface HealthArchivePersonalInfo {
  avatar: string // 头像地址
  name: string // 居民姓名
  sex: number // 性别标识
  age: number // 年龄
  archiveNo: string // 档案编号
  phoneLabel: string // 手机号字段标题
  phone: string // 手机号
  idCardLabel: string // 身份证字段标题
  idCardNo: string // 身份证号
  tags: HealthArchiveProfileTag[] // 个人信息标签列表
  creatorLabel: string // 建档人字段标题
  creatorName: string // 建档人姓名
  createdAtLabel: string // 建档时间字段标题
  createdAt: string // 建档时间
}

export interface HealthArchiveRecordItem {
  key: string // 记录项唯一标识
  title: string // 记录项标题
  icon: string // 记录项图标地址
}

export interface HealthArchiveRecordSection {
  title: string // 记录分区标题
  items: HealthArchiveRecordItem[] // 记录项列表
}

export interface HealthArchiveFieldItem {
  label: string // 字段名称
  value: string // 字段内容
}

export interface HealthArchiveBasicGroup {
  key: string // 分组唯一标识
  title: string // 分组标题
  expanded: boolean // 是否默认展开
  fields: HealthArchiveFieldItem[] // 分组字段列表
}

export interface HealthArchivePageData {
  personalInfo: HealthArchivePersonalInfo // 档案个人信息
  basicInfoSection: {
    groups: HealthArchiveBasicGroup[] // 基本信息分组列表
  }
}
