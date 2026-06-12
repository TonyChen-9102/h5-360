/**
 * 就诊视图数据模型
 * 定义就诊类型枚举、诊断标签、就诊记录卡片数据等接口
 */

/** 就诊类型枚举 */
export enum VisitType {
  /** 门诊 */
  Outpatient = 'outpatient',
  /** 住院 */
  Inpatient = 'inpatient',
  /** 急诊 */
  Emergency = 'emergency',
  /** 互联网诊疗 */
  OnlineDiagnosis = 'onlineDiagnosis',
  /** 体检 */
  PhysicalExam = 'physicalExam'
}

/** 就诊类型 Tab 筛选枚举 */
export enum VisitTabKey {
  /** 门急诊（含门诊+急诊） */
  OutpatientEmergency = 'outpatientEmergency',
  /** 住院 */
  Inpatient = 'inpatient',
  /** 体检 */
  PhysicalExam = 'physicalExam'
}

/** 诊断标签 */
export interface DiagnosisTag {
  /** 标签文字 */
  name: string
}

/** 单条就诊记录 */
export interface VisitRecordCardItem {
  /** 记录唯一标识 */
  id: string
  /** 就诊类型 */
  visitType: VisitType
  /** 医院名称 */
  hospital: string
  /** 月-日（如 "10-19"） */
  dateMonthDay: string
  /** 年份（如 "2025"） */
  dateYear: string
  /** 科室名称 */
  department: string
  /** 医生姓名 */
  doctorName: string
  /** 诊断标签列表（体检类型可为空） */
  diagnosisTags: DiagnosisTag[]
}

/** 就诊视图页面数据 */
export interface VisitViewPageData {
  /** 就诊记录列表 */
  records: VisitRecordCardItem[]
}

/** 就诊类型色彩主题 */
export interface VisitTypeTheme {
  /** 标签文字（如"门诊""住院"） */
  label: string
  /** 渐变起始色 */
  gradientFrom: string
  /** 渐变结束色 */
  gradientTo: string
  /** 标签背景色（备用） */
  tagBg: string
  /** 标签文字色 */
  tagColor: string
  /** 标签背景图片 */
  tagBgImage: string
}

/** 就诊类型与色彩主题映射 */
export const VISIT_TYPE_THEME: Record<VisitType, VisitTypeTheme> = {
  [VisitType.Outpatient]: {
    label: '门诊',
    gradientFrom: '#F4FDF9',
    gradientTo: '#FFFFFF',
    tagBg: '#E6FAF1',
    tagColor: '#15AB64',
    tagBgImage: '/static/medicalRecord/bg_hytj_1@4x.png'
  },
  [VisitType.Inpatient]: {
    label: '住院',
    gradientFrom: '#EBF2FF',
    gradientTo: '#FFFFFF',
    tagBg: '#E8F1FF',
    tagColor: '#1E74FE',
    tagBgImage: '/static/medicalRecord/bg_hytj_2@4x.png'
  },
  [VisitType.Emergency]: {
    label: '急诊',
    gradientFrom: '#FFF6F6',
    gradientTo: '#FFFFFF',
    tagBg: '#FFEEED',
    tagColor: '#FC4838',
    tagBgImage: '/static/medicalRecord/bg_hytj_3@4x.png'
  },
  [VisitType.OnlineDiagnosis]: {
    label: '互联网诊疗',
    gradientFrom: '#FDF8F2',
    gradientTo: '#FFFFFF',
    tagBg: '#FEF3E7',
    tagColor: '#F58300',
    tagBgImage: '/static/medicalRecord/bg_hytj_4@4x.png'
  },
  [VisitType.PhysicalExam]: {
    label: '体检',
    gradientFrom: '#F8F6FF',
    gradientTo: '#FFFFFF',
    tagBg: '#F3EFFE',
    tagColor: '#8763FA',
    tagBgImage: '/static/medicalRecord/bg_hytj_5@4x.png'
  }
}

/** Tab 筛选与就诊类型的映射关系 */
export const TAB_VISIT_TYPE_MAP: Record<VisitTabKey, VisitType[]> = {
  [VisitTabKey.OutpatientEmergency]: [VisitType.Outpatient, VisitType.Emergency],
  [VisitTabKey.Inpatient]: [VisitType.Inpatient],
  [VisitTabKey.PhysicalExam]: [VisitType.PhysicalExam]
}
