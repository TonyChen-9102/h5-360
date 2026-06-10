import {ResidentInfo} from './residentHomeModel'
import {MedicalHistoryCardData} from './medicalHistoryModel'
import {VisitRecordCardData, VisitType} from './visitRecordModel'
import {InspectionRecordCardData, RecordType} from './inspectionRecordModel'
import {MedicationRecordCardData} from './medicationRecordModel'
import {SurgeryRecordCardData} from './surgeryRecordModel'
import {VitalSignCardData} from './vitalSignsModel'
import {AllergyInfoPageData, AllergyLevel} from './allergyInfoModel'
import {HealthArchivePageData} from './healthArchiveModel'
import {RecordListPageData} from './recordListModel'

/**
 * 居民健康页 mock 数据集合
 * 后续对接真实接口时，可在此处替换或扩展多套数据用于调试
 */

/** 居民基本信息 mock */
export const mockResidentInfo: ResidentInfo = {
  name: '谢元华',
  sex: 2,
  age: 64,
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

/** 过敏信息页 mock */
export const mockAllergyInfoPage: AllergyInfoPageData = {
  list: [
    {
      name: '青霉素(青霉素类)',
      level: AllergyLevel.Low,
      details: [
        {label: '分类', value: '药物'},
        {label: '来源', value: '药物'},
        {label: '症状', value: '皮试阳性、发热'}
      ]
    },
    {
      name: '花粉',
      level: AllergyLevel.Medium,
      details: [
        {label: '分类', value: '周围环境'},
        {label: '来源', value: '悬浮物'},
        {label: '症状', value: '鼻子堵塞'}
      ]
    },
    {
      name: '海鲜',
      level: AllergyLevel.High,
      details: [
        {label: '分类', value: '食物'},
        {label: '来源', value: '食物'},
        {label: '症状', value: '皮肤红疹'}
      ]
    }
  ]
}

/** 健康档案页 mock */
export const mockHealthArchivePage: HealthArchivePageData = {
  personalInfo: {
    avatar: '',
    name: '谢元华',
    sex: 2,
    age: 64,
    archiveNo: 'CNHZJMJKDA0001',
    phoneLabel: '联系电话',
    phone: '18364950778',
    idCardLabel: '身份证号',
    idCardNo: '203840197506231234',
    tags: [
      {name: '高血压'},
      {name: '超重'}
    ],
    creatorLabel: '建档人',
    creatorName: '方洪全',
    createdAtLabel: '建档日期',
    createdAt: '2026-05-10'
  },
  basicInfoSection: {
    groups: [
      {
        key: 'basicInfo',
        title: '基本信息',
        expanded: false,
        fields: [
          {label: '姓名', value: '谢*华'},
          {label: '身份证号', value: '**************1293'},
          {label: '出生日期', value: '1******3'},
          {label: '性别', value: '女'},
          {label: '民族', value: '汉族'},
          {label: '工作单位', value: '创业智慧医院'},
          {label: '本人电话', value: '132****2938'},
          {label: '现住址', value: '浙江省杭州市滨江区彩普路'},
          {label: '户籍地址', value: '浙江省杭州市滨江区坚塔路'},
          {label: '常住类型', value: '常住'},
          {label: '血型', value: 'O型'},
          {label: 'RH', value: '阳性'},
          {label: '文化程度', value: '本科'},
          {label: '职业', value: '不详'},
          {label: '婚姻状况', value: '不详'},
          {label: '医疗费用支付方式', value: '医保'}
        ]
      },
      {
        key: 'drugAllergy',
        title: '药物过敏史',
        expanded: false,
        fields: [
          {label: '过敏药物', value: '青霉素(青霉素类)'},
          {label: '症状', value: '皮试阳性、发热'}
        ]
      },
      {
        key: 'exposureHistory',
        title: '暴露史',
        expanded: false,
        fields: [
          {label: '暴露情况', value: '无'}
        ]
      },
      {
        key: 'pastHistory',
        title: '既往史',
        expanded: false,
        fields: [
          {label: '疾病史', value: '高血压'},
          {label: '手术史', value: '阑尾切除'}
        ]
      },
      {
        key: 'familyHistory',
        title: '家族史',
        expanded: false,
        fields: [
          {label: '家族疾病', value: '父亲高血压'}
        ]
      },
      {
        key: 'geneticHistory',
        title: '遗传病史',
        expanded: false,
        fields: [
          {label: '遗传病', value: '无'}
        ]
      },
      {
        key: 'disability',
        title: '残疾情况',
        expanded: false,
        fields: [
          {label: '残疾情况', value: '无残疾史'}
        ]
      },
      {
        key: 'livingEnvironment',
        title: '生活环境',
        expanded: false,
        fields: [
          {label: '厨房排风设施', value: '有'},
          {label: '饮水', value: '自来水'}
        ]
      }
    ]
  }
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

/** 儿童健康-记录列表页 mock */
export const mockChildHealthRecordList: RecordListPageData = {
  title: '儿童健康管理',
  items: [
    {
      key: 'childCheck3to6',
      title: '3-6岁儿童健康检查记录表',
      expanded: false,
      children: [
        {id: 'c1', date: '2022-01-11'},
        {id: 'c2', date: '2021-12-11'},
        {id: 'c3', date: '2021-11-11'}
      ]
    },
    {
      key: 'childCheck1to8',
      title: '1-8月龄儿童健康检查记录',
      expanded: false,
      children: [
        {id: 'c4', date: '2021-08-11'},
        {id: 'c5', date: '2021-06-11'}
      ]
    },
    {
      key: 'newbornVisit',
      title: '新生儿家庭访视记录',
      expanded: false,
      children: [
        {id: 'c6', date: '2021-03-11'}
      ]
    }
  ]
}

/** 健康体检-记录列表页 mock */
export const mockPhysicalExamRecordList: RecordListPageData = {
  title: '健康体检管理',
  items: [
    {
      key: 'physicalExam',
      title: '健康体检表',
      expanded: false,
      children: [
        {id: 'p1', date: '2026-04-10'},
        {id: 'p2', date: '2025-04-10'},
        {id: 'p3', date: '2024-04-10'}
      ]
    }
  ]
}

/** 孕产妇健康-记录列表页 mock */
export const mockMaternalHealthRecordList: RecordListPageData = {
  title: '孕产妇健康管理',
  items: [
    {
      key: 'maternalVisit',
      title: '孕产妇健康管理记录',
      expanded: false,
      children: [
        {id: 'm1', date: '2026-03-12'},
        {id: 'm2', date: '2026-01-18'}
      ]
    }
  ]
}

/** 老年健康-记录列表页 mock */
export const mockElderHealthRecordList: RecordListPageData = {
  title: '老年健康管理',
  items: [
    {
      key: 'elderAssess',
      title: '老年人健康管理记录',
      expanded: false,
      children: [
        {id: 'e1', date: '2026-05-10'},
        {id: 'e2', date: '2025-05-10'}
      ]
    }
  ]
}

/**慢病管理-记录列表页 mock */
export const mockSlowDiseaseRecordList: RecordListPageData = {
  title: '慢病管理',
  items: [
    {
      key: 'hypertensionVisit',
      title: '高血压随访记录',
      expanded: false,
      children: [
        {id: 's1', date: '2026-04-15'},
        {id: 's2', date: '2026-01-15'}
      ]
    },
    {
      key: 'diabetesVisit',
      title: '糖尿病随访记录',
      expanded: false,
      children: [
        {id: 's3', date: '2026-03-20'}
      ]
    }
  ]
}

/** 精神管理-记录列表页 mock */
export const mockMentalHealthRecordList: RecordListPageData = {
  title: '精神管理',
  items: [
    {
      key: 'mentalFollowup',
      title: '严重精神障碍随访记录',
      expanded: false,
      children: [
        {id: 'j1', date: '2026-02-09'},
        {id: 'j2', date: '2025-11-09'}
      ]
    }
  ]
}

/**
 * 记录列表页 mock 数据映射
 * 个人档案各功能（儿童健康、健康体检等）通过 key 跳转到统一列表页时取对应数据
 */
export const mockRecordListMap: {[key: string]: RecordListPageData} = {
  childHealth: mockChildHealthRecordList,
  physicalExam: mockPhysicalExamRecordList,
  maternalHealth: mockMaternalHealthRecordList,
  elderHealth: mockElderHealthRecordList,
  slowDisease: mockSlowDiseaseRecordList,
  mentalHealth: mockMentalHealthRecordList
}

