/**
 * 个人档案记录详情页数据模型
 * 用于健康体检、儿童健康等记录列表子项跳转后的共用详情页
 */

export interface RecordDetailPersonInfo {
  name: string // 姓名
  date: string // 记录日期
  doctorName: string // 责任医生姓名
  orgName: string // 机构名称
}

export interface RecordDetailFieldItem {
  label: string // 字段名称
  value: string // 字段值
}

export interface RecordDetailFieldSection {
  key: string // 卡片唯一标识
  title: string // 卡片标题
  expanded: boolean // 是否展开
  fields: RecordDetailFieldItem[] // 字段列表
}

export interface RecordDetailProblemItem {
  title: string // 健康问题标题
  description: string // 健康问题说明
}

export interface RecordDetailProblemSection {
  key: string // 卡片唯一标识
  title: string // 卡片标题
  expanded: boolean // 是否展开
  count: number // 问题数量
  items: RecordDetailProblemItem[] // 健康问题列表
}

export interface RecordDetailMedicineItem {
  name: string // 用药名称
  fields: RecordDetailFieldItem[] // 用药字段列表
}

export interface RecordDetailMedicineSection {
  key: string // 卡片唯一标识
  title: string // 卡片标题
  expanded: boolean // 是否展开
  items: RecordDetailMedicineItem[] // 用药记录列表
}

export interface RecordDetailEventItem {
  title: string // 子项标题
  date: string // 发生日期
  orgName: string // 机构名称
  fields: RecordDetailFieldItem[] // 明细字段列表
}

export interface RecordDetailEventSection {
  key: string // 卡片唯一标识
  title: string // 卡片标题
  expanded: boolean // 是否展开
  items: RecordDetailEventItem[] // 事件记录列表
}

export interface RecordDetailManageItem {
  key: string // 管理项唯一标识
  title: string // 管理项标题
  status: string // 管理项状态
  content: string // 管理项内容
  theme: 'red' | 'orange' // 管理项主题色
}

export interface RecordDetailManageSection {
  key: string // 卡片唯一标识
  title: string // 卡片标题
  expanded: boolean // 是否展开
  items: RecordDetailManageItem[] // 健康管理固定三项
}

export interface RecordDetailPageData {
  title: string // 页面标题
  personInfo: RecordDetailPersonInfo // 个人信息区数据
  fieldSections: RecordDetailFieldSection[] // 通用字段卡片列表
  problemSection: RecordDetailProblemSection // 现存主要健康问题卡片
  medicineSection: RecordDetailMedicineSection // 主要用药情况卡片
  hospitalSection: RecordDetailEventSection // 住院治疗情况卡片
  vaccinationSection: RecordDetailEventSection // 非免疫规划预防接种史卡片
  manageSection: RecordDetailManageSection // 健康管理卡片
}
