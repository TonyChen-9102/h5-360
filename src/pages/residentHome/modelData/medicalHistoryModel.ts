/**
 * 既往病史卡片数据模型
 */
export interface MedicalHistoryTag {
  name: string // 病史标签名称
}

export interface MedicalHistoryItem {
  label: string // 病史字段名称
  value?: string // 病史字段内容
  tags?: MedicalHistoryTag[] // 病史标签列表
}

export interface MedicalHistoryTab {
  key: string // Tab 唯一标识
  title: string // Tab 标题
  rows: MedicalHistoryItem[] // 当前 Tab 的病史条目列表
}

export interface MedicalHistoryCardData {
  activeTab: string // 当前激活的 Tab 标识
  tabs: MedicalHistoryTab[] // 病史 Tab 列表
}
