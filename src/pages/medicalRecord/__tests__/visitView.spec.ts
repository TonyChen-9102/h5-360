/**
 * @Description: 就诊视图页面单元测试
 * 测试 Tab 筛选逻辑（filteredRecords 计算属性）
 *
 * 测试框架接入建议：
 * 1. 安装 vitest: yarn add -D vitest @vue/test-utils
 * 2. 创建 vitest.config.ts
 * 3. 在 package.json 中添加 "test": "vitest"
 *
 * 当前状态：待补前置条件（测试框架缺失）
 */

import {describe, it, expect} from 'vitest'
import {VisitTabKey, VisitType, TAB_VISIT_TYPE_MAP, VisitRecordCardItem} from '../modelData/visitViewModel'

/**
 * 提取的筛选逻辑（建议从 visitView.vue 中提取为独立函数）
 * 当前作为测试辅助函数，待生产代码重构后可直接引用
 */
function filterRecordsByTabs(
  tabs: Array<{key: VisitTabKey; selected: boolean}>,
  records: VisitRecordCardItem[]
): VisitRecordCardItem[] {
  const selectedTypes = new Set<VisitType>()

  // 收集所有选中 Tab 对应的就诊类型
  tabs.forEach(tab => {
    if (tab.selected) {
      const types = TAB_VISIT_TYPE_MAP[tab.key]
      types.forEach(type => selectedTypes.add(type))
    }
  })

  // 如果没有选中任何 Tab，返回空列表
  if (selectedTypes.size === 0) {
    return []
  }

  // 过滤记录：匹配选中类型 + 互联网诊疗始终显示
  return records.filter(record =>
    selectedTypes.has(record.visitType) || record.visitType === VisitType.OnlineDiagnosis
  )
}

/** 测试数据工厂 */
function createMockRecord(overrides: Partial<VisitRecordCardItem> = {}): VisitRecordCardItem {
  return {
    id: 'test-001',
    visitType: VisitType.Outpatient,
    hospital: '测试医院',
    dateMonthDay: '01-01',
    dateYear: '2025',
    department: '测试科室',
    doctorName: '测试医生',
    diagnosisTags: [],
    ...overrides
  }
}

describe('就诊视图 Tab 筛选逻辑', () => {
  describe('filterRecordsByTabs', () => {
    it('全部 Tab 选中时，返回所有记录', () => {
      const tabs = [
        {key: VisitTabKey.OutpatientEmergency, selected: true},
        {key: VisitTabKey.Inpatient, selected: true},
        {key: VisitTabKey.PhysicalExam, selected: true}
      ]
      const records = [
        createMockRecord({id: '1', visitType: VisitType.Outpatient}),
        createMockRecord({id: '2', visitType: VisitType.Inpatient}),
        createMockRecord({id: '3', visitType: VisitType.Emergency}),
        createMockRecord({id: '4', visitType: VisitType.OnlineDiagnosis}),
        createMockRecord({id: '5', visitType: VisitType.PhysicalExam})
      ]

      const result = filterRecordsByTabs(tabs, records)

      expect(result).toHaveLength(5)
      expect(result.map(r => r.id)).toEqual(['1', '2', '3', '4', '5'])
    })

    it('只选中"门急诊"Tab，返回门诊+急诊+互联网诊疗记录', () => {
      const tabs = [
        {key: VisitTabKey.OutpatientEmergency, selected: true},
        {key: VisitTabKey.Inpatient, selected: false},
        {key: VisitTabKey.PhysicalExam, selected: false}
      ]
      const records = [
        createMockRecord({id: '1', visitType: VisitType.Outpatient}),
        createMockRecord({id: '2', visitType: VisitType.Inpatient}),
        createMockRecord({id: '3', visitType: VisitType.Emergency}),
        createMockRecord({id: '4', visitType: VisitType.OnlineDiagnosis}),
        createMockRecord({id: '5', visitType: VisitType.PhysicalExam})
      ]

      const result = filterRecordsByTabs(tabs, records)

      expect(result).toHaveLength(3)
      expect(result.map(r => r.id)).toEqual(['1', '3', '4'])
    })

    it('只选中"住院"Tab，返回住院+互联网诊疗记录', () => {
      const tabs = [
        {key: VisitTabKey.OutpatientEmergency, selected: false},
        {key: VisitTabKey.Inpatient, selected: true},
        {key: VisitTabKey.PhysicalExam, selected: false}
      ]
      const records = [
        createMockRecord({id: '1', visitType: VisitType.Outpatient}),
        createMockRecord({id: '2', visitType: VisitType.Inpatient}),
        createMockRecord({id: '3', visitType: VisitType.Emergency}),
        createMockRecord({id: '4', visitType: VisitType.OnlineDiagnosis}),
        createMockRecord({id: '5', visitType: VisitType.PhysicalExam})
      ]

      const result = filterRecordsByTabs(tabs, records)

      expect(result).toHaveLength(2)
      expect(result.map(r => r.id)).toEqual(['2', '4'])
    })

    it('只选中"体检"Tab，返回体检+互联网诊疗记录', () => {
      const tabs = [
        {key: VisitTabKey.OutpatientEmergency, selected: false},
        {key: VisitTabKey.Inpatient, selected: false},
        {key: VisitTabKey.PhysicalExam, selected: true}
      ]
      const records = [
        createMockRecord({id: '1', visitType: VisitType.Outpatient}),
        createMockRecord({id: '2', visitType: VisitType.Inpatient}),
        createMockRecord({id: '3', visitType: VisitType.Emergency}),
        createMockRecord({id: '4', visitType: VisitType.OnlineDiagnosis}),
        createMockRecord({id: '5', visitType: VisitType.PhysicalExam})
      ]

      const result = filterRecordsByTabs(tabs, records)

      expect(result).toHaveLength(2)
      expect(result.map(r => r.id)).toEqual(['4', '5'])
    })

    it('全部 Tab 取消选中时，返回空列表', () => {
      const tabs = [
        {key: VisitTabKey.OutpatientEmergency, selected: false},
        {key: VisitTabKey.Inpatient, selected: false},
        {key: VisitTabKey.PhysicalExam, selected: false}
      ]
      const records = [
        createMockRecord({id: '1', visitType: VisitType.Outpatient}),
        createMockRecord({id: '2', visitType: VisitType.Inpatient})
      ]

      const result = filterRecordsByTabs(tabs, records)

      expect(result).toHaveLength(0)
    })

    it('互联网诊疗记录始终显示（即使没有对应 Tab）', () => {
      const tabs = [
        {key: VisitTabKey.OutpatientEmergency, selected: true},
        {key: VisitTabKey.Inpatient, selected: false},
        {key: VisitTabKey.PhysicalExam, selected: false}
      ]
      const records = [
        createMockRecord({id: '1', visitType: VisitType.OnlineDiagnosis})
      ]

      const result = filterRecordsByTabs(tabs, records)

      expect(result).toHaveLength(1)
      expect(result[0].visitType).toBe(VisitType.OnlineDiagnosis)
    })

    it('空记录列表时，返回空数组', () => {
      const tabs = [
        {key: VisitTabKey.OutpatientEmergency, selected: true},
        {key: VisitTabKey.Inpatient, selected: true},
        {key: VisitTabKey.PhysicalExam, selected: true}
      ]

      const result = filterRecordsByTabs(tabs, [])

      expect(result).toHaveLength(0)
      expect(result).toEqual([])
    })
  })
})
