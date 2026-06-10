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
import {RecordDetailPageData} from './recordDetailModel'

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

/** 个人档案记录详情页 mock */
export const mockRecordDetail: RecordDetailPageData = {
  title: '健康体检表详情',
  personInfo: {
    name: '谢元华',
    date: '2025-05-10',
    doctorName: '张大大',
    orgName: '创业慧康智慧医院'
  },
  fieldSections: [
    {
      key: 'symptom',
      title: '症状',
      expanded: false,
      fields: [
        {label: '症状', value: '无症状'}
      ]
    },
    {
      key: 'general',
      title: '一般状况',
      expanded: false,
      fields: [
        {label: '体温', value: '37.6 ℃'},
        {label: '脉率', value: '23 次/分钟'},
        {label: '呼吸频率', value: '37 次/分钟'},
        {label: '左侧血压', value: '130/110mmHg'},
        {label: '右侧血压', value: '130/110mmHg'},
        {label: '身高', value: '166cm'},
        {label: '体重', value: '77kg'},
        {label: '腰围', value: '102cm'},
        {label: '体质指数', value: '27.94'},
        {label: '健康状态评估', value: '满意'},
        {label: '自理评估', value: '可自理(0-3分)'},
        {label: '认知功能', value: '初筛阴性'},
        {label: '智力检查总分', value: '10'},
        {label: '情感状态', value: '初筛阴性'},
        {label: '抑郁检查总分', value: '8'}
      ]
    },
    {
      key: 'lifestyle',
      title: '生活方式',
      expanded: false,
      fields: [
        {label: '锻炼频率', value: '每周一次以上'},
        {label: '次运动时长', value: '20分钟'},
        {label: '坚持锻炼时间', value: '1年'},
        {label: '锻炼方式', value: '跑步'},
        {label: '饮食习惯', value: '荤素均衡；嗜盐；嗜糖；'},
        {label: '吸烟状况', value: '已戒烟'},
        {label: '日吸烟量', value: '0支'},
        {label: '开始吸烟', value: '18岁'},
        {label: '戒烟年龄', value: '20岁'},
        {label: '饮酒频率', value: '偶尔'},
        {label: '日饮酒量', value: '2两'},
        {label: '是否戒酒', value: '否'},
        {label: '近一年内醉酒否', value: '否'},
        {label: '职业病危害', value: '有'},
        {label: '工种', value: '无'},
        {label: '从业时间(年)', value: '12'},
        {label: '粉尘', value: '无'},
        {label: '有无防护措施', value: '无'}
      ]
    },
    {
      key: 'organ',
      title: '脏器功能',
      expanded: false,
      fields: [
        {label: '口唇', value: '苍白'},
        {label: '齿列', value: '缺齿'},
        {label: '咽部', value: '充血'},
        {label: '左眼视力', value: '无'},
        {label: '右眼视力', value: '无'},
        {label: '矫正左眼视力', value: '无'},
        {label: '矫正右眼视力', value: '无'},
        {label: '听力', value: '听见'},
        {label: '运动功能', value: '可顺利完成'}
      ]
    }
  ],
  problemSection: {
    key: 'healthProblem',
    title: '现存主要健康问题',
    expanded: false,
    count: 7,
    items: [
      {
        title: '1.双眼视力减退原因待查',
        description: '您目前的视力低于正常标准，引起视力减低的原因较多，常见于屈光不正、也可见于斜视、弱视、角膜病变、白内障、眼底病变等。建议您到医院眼科进一步检诊。'
      },
      {
        title: '2.双侧甲状腺结节医学处置',
        description: '检查发现甲状腺结节，建议结合甲状腺功能、超声分级及医生建议定期复查。'
      }
    ]
  },
  medicineSection: {
    key: 'medicine',
    title: '主要用药情况',
    expanded: false,
    items: [
      {
        name: '糖尿病专科复诊提醒',
        fields: [
          {label: '用法', value: '口服'},
          {label: '用量', value: '常规'},
          {label: '单位', value: '次/日'}
        ]
      },
      {
        name: '糖尿病专科复诊提醒',
        fields: [
          {label: '用法', value: '口服'},
          {label: '用量', value: '常规'},
          {label: '单位', value: '次/日'}
        ]
      }
    ]
  },
  hospitalSection: {
    key: 'hospital',
    title: '住院治疗情况',
    expanded: false,
    items: [
      {
        title: '住院史',
        date: '2026-05-01',
        orgName: '创业智慧医院',
        fields: [
          {label: '原因', value: '咳嗽数周，经CT检查需入院治疗'}
        ]
      },
      {
        title: '住院史',
        date: '2024-08-12',
        orgName: '创业智慧医院',
        fields: [
          {label: '原因', value: '发热、胸闷，住院观察治疗'}
        ]
      }
    ]
  },
  vaccinationSection: {
    key: 'vaccination',
    title: '非免疫规划预防接种史',
    expanded: false,
    items: [
      {
        title: '乙肝疫苗',
        date: '2026-05-01',
        orgName: '创业智慧医院',
        fields: [
          {label: '接种部位', value: '左上臂'}
        ]
      }
    ]
  },
  manageSection: {
    key: 'healthManage',
    title: '健康管理',
    expanded: false,
    items: [
      {
        key: 'evaluation',
        title: '健康评价',
        status: '有异常',
        content: '缺血性卒中',
        theme: 'red'
      },
      {
        key: 'guidance',
        title: '健康指导',
        status: '建议复查',
        content: '目标体重：65kg；建议接种疫苗：无；危险因素控制：健康饮酒；其他需控制：无；',
        theme: 'orange'
      },
      {
        key: 'riskControl',
        title: '危险因素控制',
        status: '',
        content: '合理膳食；规律运动；定期监测血压血糖。',
        theme: 'red'
      }
    ]
  }
}

/** 个人档案记录详情页 mock 数据映射 */
export const mockRecordDetailMap: {[key: string]: RecordDetailPageData} = {
  c1: mockRecordDetail,
  c2: mockRecordDetail,
  c3: mockRecordDetail,
  c4: mockRecordDetail,
  c5: mockRecordDetail,
  c6: mockRecordDetail,
  p1: mockRecordDetail,
  p2: mockRecordDetail,
  p3: mockRecordDetail,
  m1: mockRecordDetail,
  m2: mockRecordDetail,
  e1: mockRecordDetail,
  e2: mockRecordDetail,
  s1: mockRecordDetail,
  s2: mockRecordDetail,
  s3: mockRecordDetail,
  j1: mockRecordDetail,
  j2: mockRecordDetail
}
