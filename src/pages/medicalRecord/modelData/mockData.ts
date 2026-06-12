/**
 * 就诊视图 mock 数据
 * 提供 5 种就诊类型（门诊/住院/急诊/互联网诊疗/体检）的示例数据
 * 后续对接真实接口时，可替换为接口返回数据
 */
import {VisitViewPageData, VisitType} from './visitViewModel'

/** 就诊视图 mock 数据 */
export const mockVisitViewData: VisitViewPageData = {
  records: [
    {
      id: 'v001',
      visitType: VisitType.Outpatient,
      hospital: '创业智慧医院(总院区)',
      dateMonthDay: '10-19',
      dateYear: '2025',
      department: '消化内科',
      doctorName: '张大华',
      diagnosisTags: [
        {name: '消化不良'},
        {name: '阑尾炎'}
      ]
    },
    {
      id: 'v002',
      visitType: VisitType.Inpatient,
      hospital: '创业智慧医院(总院区)',
      dateMonthDay: '10-19',
      dateYear: '2025',
      department: '消化内科',
      doctorName: '张大华',
      diagnosisTags: [
        {name: '消化不良'},
        {name: '阑尾炎'}
      ]
    },
    {
      id: 'v003',
      visitType: VisitType.Emergency,
      hospital: '创业智慧医院(总院区)',
      dateMonthDay: '10-19',
      dateYear: '2025',
      department: '消化内科',
      doctorName: '张大华',
      diagnosisTags: [
        {name: '消化不良'},
        {name: '阑尾炎'}
      ]
    },
    {
      id: 'v004',
      visitType: VisitType.OnlineDiagnosis,
      hospital: '创业智慧医院(总院区)',
      dateMonthDay: '10-19',
      dateYear: '2025',
      department: '消化内科',
      doctorName: '张大华',
      diagnosisTags: [
        {name: '消化不良'},
        {name: '阑尾炎'}
      ]
    },
    {
      id: 'v005',
      visitType: VisitType.PhysicalExam,
      hospital: '创业智慧医院(总院区)',
      dateMonthDay: '10-19',
      dateYear: '2025',
      department: '消化内科',
      doctorName: '张大华',
      diagnosisTags: []
    }
  ]
}
