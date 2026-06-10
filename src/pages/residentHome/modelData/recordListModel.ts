/**
 * 个人档案-记录列表页数据模型
 * 用于儿童健康、健康体检等个人档案功能跳转的统一列表页
 */

/** 记录子项（展开后的单条记录，如某次检查日期） */
export interface RecordListChild {
  id: string // 子项唯一标识
  date: string // 记录日期（如 2022-01-11）
}

/** 记录主项（可展开/收缩，如"3-6岁儿童健康检查记录表"） */
export interface RecordListItem {
  key: string // 主项唯一标识
  title: string // 主项标题
  expanded: boolean // 是否展开
  children: RecordListChild[] // 子项记录列表
}

/** 记录列表页数据 */
export interface RecordListPageData {
  title: string // 页面标题（随功能动态变化，如"儿童健康管理"）
  items: RecordListItem[] // 记录主项列表
}
