import {ResidentInfo} from './residentHomeModel'
import {MedicalHistoryCardData} from './medicalHistoryModel'
import {VisitRecordCardData, VisitType} from './visitRecordModel'
import {InspectionRecordCardData, RecordType} from './inspectionRecordModel'
import {MedicationRecordCardData} from './medicationRecordModel'
import {SurgeryRecordCardData} from './surgeryRecordModel'
import {VitalSignCardData} from './vitalSignsModel'

/**
 * 居民健康页 mock 数据集合
 * 后续对接真实接口时，可在此处替换或扩展多套数据用于调试
 */

/** 居民基本信息 mock */
export const mockResidentInfo: ResidentInfo = {
  name: '谢元华',
  sex: 1,
  age: 54,
  idNumber: 'A10000234',
  healthArchive: 'CNHZJMJJKDA00001',
  diseases: [
    {name: '高血压'},
    {name: '超重'},
    {name: '脑膜良性肿瘤'}
  ],
  doctorName: '方洪全',
  teamName: '方洪全医生团队',
  orgName: '创业智慧医院',
  expireDate: '2026-05-15'
}

/** 生命体征卡片 mock */
export const mockVitalSignCard: VitalSignCardData = {
  activeMetric: 'bloodPressure',
  metrics: [
    {
      key: 'bloodPressure',
      title: '血压',
      unit: 'mmol/L'
    },
    {
      key: 'bloodSugar',
      title: '血糖',
      unit: 'mmol/L'
    },
    {
      key: 'bmi',
      title: 'BMI',
      unit: 'cm/kg'
    }
  ],
  dates: ['09.01', '09.02', '09.03', '09.04', '09.05', '09.06'],
  seriesMap: {
    bloodPressure: [
      {
        name: '收缩压',
        unit: 'mmHg',
        color: '#1E74FE',
        values: [120, 136, 116, 98, 116, 88]
      },
      {
        name: '舒张压',
        unit: 'mmHg',
        color: '#15AB64',
        values: [100, 112, 96, 82, 96, 76]
      }
    ],
    bloodSugar: [
      {
        name: '空腹血糖',
        unit: 'mmol/L',
        color: '#1E74FE',
        values: [5.2, 5.6, 5.4, 5.8, 5.5, 5.3]
      },
      {
        name: '餐后血糖',
        unit: 'mmol/L',
        color: '#15AB64',
        values: [7.1, 7.8, 7.4, 8.2, 7.6, 7.3]
      }
    ],
    bmi: [
      {
        name: '身高',
        unit: 'cm',
        color: '#15AB64',
        values: [168, 168, 168, 168, 168, 168]
      },
      {
        name: '体重',
        unit: 'kg',
        color: '#FF9F1C',
        values: [67.2, 67.6, 67.4, 68.1, 67.8, 67.1]
      },
      {
        name: 'BMI',
        unit: 'kg/m²',
        color: '#1E74FE',
        values: [23.8, 24.1, 23.9, 24.2, 24.0, 23.7]
      }
    ]
  }
}

/** 既往史/生活习惯卡片 mock */
export const mockMedicalHistoryCard: MedicalHistoryCardData = {
  activeTab: 'history',
  tabs: [
    {
      key: 'history',
      title: '既往史',
      rows: [
        {
          label: '过敏史',
          tags: [
            {name: '酒精'},
            {name: '羊肉'}
          ]
        },
        {
          label: '外伤史',
          value: '无外伤史'
        },
        {
          label: '残疾史',
          value: '无残疾史'
        },
        {
          label: '输血史',
          value: '全血'
        }
      ]
    },
    {
      key: 'habit',
      title: '生活习惯',
      rows: [
        {
          label: '吸烟情况',
          value: '偶尔',
          tags: [{name: '18年'}]
        },
        {
          label: '饮酒情况',
          value: '每周一次',
          tags: [{name: '18年'}]
        },
        {
          label: '饮酒情况',
          value: '喜甜食'
        },
        {
          label: '锻炼情况',
          value: '每周一次'
        }
      ]
    }
  ]
}

/** 就诊记录卡片 mock */
export const mockVisitRecordCard: VisitRecordCardData = {
  count: 50,
  records: [
    {
      type: VisitType.Outpatient,
      department: '呼吸内科',
      hospital: '创业智慧医院',
      date: '2026-04-10'
    },
    {
      type: VisitType.Inpatient,
      department: '消化内科',
      hospital: '创业智慧医院',
      date: '2025-12-10'
    },
    {
      type: VisitType.Emergency,
      department: '呼吸内科',
      hospital: '创业智慧医院',
      date: '2025-12-10'
    },
    {
      type: VisitType.Physical,
      department: '体检专科',
      hospital: '创业智慧医院',
      date: '2025-12-10'
    }
  ]
}

/** 检验检查记录卡片 mock */
export const mockInspectionRecordCard: InspectionRecordCardData = {
  activeTab: RecordType.Inspection,
  tabs: [
    {
      key: RecordType.Inspection,
      title: '检验记录',
      count: 20,
      records: [
        {
          name: '血常规五项+CRP',
          isAbnormal: false,
          dateTime: '10-01 12:23'
        },
        {
          name: '24小时肌酐测定',
          isAbnormal: true,
          dateTime: '10-01 12:23'
        },
        {
          name: '24小时肌酐测定',
          isAbnormal: false,
          dateTime: '10-01 12:23'
        }
      ]
    },
    {
      key: RecordType.Examination,
      title: '检查记录',
      count: 10,
      records: [
        {
          name: '胸部CT平扫',
          isAbnormal: false,
          dateTime: '10-01 12:23'
        },
        {
          name: '腹部B超',
          isAbnormal: true,
          dateTime: '10-01 12:23'
        },
        {
          name: '心电图',
          isAbnormal: false,
          dateTime: '10-01 12:23'
        }
      ]
    }
  ]
}

/** 用药记录卡片 mock */
export const mockMedicationRecordCard: MedicationRecordCardData = {
  count: 20,
  records: [
    {
      name: '多西他赛针(医限5)',
      dosage: '20mg',
      dateTime: '2026-04-10'
    },
    {
      name: '普食(流质、高蛋白)',
      dosage: '',
      dateTime: '2026-04-10'
    },
    {
      name: '罗格列明片(医限5)',
      dosage: '20mg',
      dateTime: '2026-04-10'
    }
  ]
}

/** 手术记录卡片 mock */
export const mockSurgeryRecordCard: SurgeryRecordCardData = {
  count: 5,
  records: [
    {
      name: '肠道息肉切除',
      dateTime: '2026-04-10'
    },
    {
      name: '肠道息肉切除',
      dateTime: '2025-12-10'
    },
    {
      name: '肠道息肉切除',
      dateTime: '2025-12-10'
    }
  ]
}

