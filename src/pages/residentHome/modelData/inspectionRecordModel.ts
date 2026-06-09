/**
 * 检验检查记录卡片数据模型
 */

/** 记录类型 */
export enum RecordType {
  Inspection = 'inspection', // 检验记录
  Examination = 'examination' // 检查记录
}

/** 检验检查记录项 */
export interface InspectionRecord {
  name: string // 检验或检查项目名称
  isAbnormal: boolean // 是否为异常结果
  dateTime: string // 记录日期时间，格式如 "10-01 12:23"
}

/** Tab 数据 */
export interface InspectionTab {
  key: RecordType // Tab 对应的记录类型
  title: string // Tab 标题
  count: number // 当前类型记录数量
  records: InspectionRecord[] // 当前类型记录列表
}

/** 检验检查记录卡片数据 */
export interface InspectionRecordCardData {
  activeTab: RecordType // 当前激活的记录类型
  tabs: InspectionTab[] // Tab 列表
}
