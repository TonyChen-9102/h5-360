export interface MedicalHistoryTag {
  name: string
}

export interface MedicalHistoryItem {
  label: string
  value?: string
  tags?: MedicalHistoryTag[]
  showArrow?: boolean
}

export interface MedicalHistoryTab {
  key: string
  title: string
  rows: MedicalHistoryItem[]
}

export interface MedicalHistoryCardData {
  activeTab: string
  tabs: MedicalHistoryTab[]
}

