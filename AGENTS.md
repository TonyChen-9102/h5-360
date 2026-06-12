# h5-360 (uni-app-demo) — AI 助手指南

## 我是谁

AI 作为本项目的开发助手，遵循仓库现有架构与约定，参与 uni-app 跨端（H5 + 微信小程序）居民健康管理前端页面的实现与维护。

## 项目概览

- **目的：** 居民健康管理跨端应用，提供健康视图概览、健康档案、就诊记录、检验检查、用药记录、手术记录等居民健康信息展示与交互。

- **骨架方案：** 自定义（无 Spring 后端，纯前端 uni-app 工程）
- **前端技术栈分类：** 其他（非公司标准）— 独立 uni-app 2.x 工程，非 SSDEV4 或 Greenpath
- **后端技术栈：** N/A（本仓库无后端代码）

| 前端（实现细节） | 后端（实现细节） |
|:-----|:-----|
| Vue 2.6.14 + TypeScript 4.5.4 + Vuex 3.6.2；uView UI 1.8.5；Webpack 4（Vue CLI 4.5）；SCSS；uni-app 2.x 跨端（H5 + 微信小程序） | N/A |

- **补充：** 包管理使用 yarn；Node >= 14.15.0（`.nvmrc`）；HTTP 请求基于 `uni.request` 自定义封装，支持 SM3 签名与 SM4 加解密；多环境通过 `UNI_ENV_PREFIX` 切换（dev / zk / gsysgol）。

- **用户确认 · 仓库前后端形态：** 纯前端仓库（uni-app 跨端项目，无后端代码）。

- **用户确认 · 默认交付边界：** 仅前端。

- **入口与运行：**
  - 安装依赖：`yarn install`
  - H5 开发：`yarn dev:h5`（或指定环境 `yarn dev:h5:dev` / `yarn dev:h5:zk`）
  - 微信小程序开发：`yarn dev:mp-weixin:dev`
  - 构建 H5：`yarn build:h5`
  - 构建微信小程序：`yarn build:mp-weixin:dev`
  - 主入口：`src/main.ts`；页面配置：`src/pages.json`

- **用户确认与仓库差异（待落实）：** 无

## 架构与关键决策

- **页面驱动架构：** 以 `src/pages/` 为核心，每个页面目录包含主 `.vue` 页面、`comp/` 子组件目录、`modelData/` 数据模型目录，按业务域内聚组织。
- **ModelData 数据层：** 采用 `BaseModel` 基类 + 静态 `create()` / `getDefault()` 模式管理数据结构，每个业务域独立 model 文件（如 `residentHomeModel.ts`、`medicalHistoryModel.ts`），页面与组件通过 model 实例获取默认值与类型约束。
- **API 层：** `src/api/api.ts` 统一封装 `commonAjax`（RPC 风格 POST）和 `commonGet`（REST 风格 GET），通过 `X-Service-Id` / `X-Service-Method` 头路由后端服务方法；字典查询 `dicAjax`、系统参数查询 `queryPropertyConfig` / `queryPropertyConfigList` 均为业务公共方法。
- **拦截器体系：** 请求拦截器（SM4 加密、cookie 注入）+ 路由拦截器（登录白名单机制），通过 `uni.addInterceptor` 全局注册。
- **路由封装：** `src/api/router.ts` 封装 `navigateTo` / `redirectTo` / `reLaunch` / `navigateBack` / `navigateBackToTarget`，支持参数序列化与回调，挂载到 `Vue.prototype.$Router`。
- **多环境配置：** `src/config/env.config.js` 定义 dev / zk / gsysgol 三套环境（域名、路径后缀、租户 ID），`src/config/index.js` 根据 `UNI_ENV_PREFIX` 选择并拼接服务地址。
- **组件库：** uView UI 通过 easycom 自动注册（`^u-(.*)` 模式），无需手动 import。
- **Class Component 范式：** 页面使用 `vue-property-decorator` 的 `@Component` + class 语法，配合 `vuex-class` 的 `@State` / `@Action` 装饰器。

## 修订记录

| 日期 | 来源 | 变更级别 | 变更摘要 | 用户确认 | 影响范围 |
|------|------|----------|----------|----------|----------|
| 2026-06-11 | bc-setup | 初始化 | 初始落档项目级事实源 | 已确认 | 全项目 |

> 当技术栈、仓库前后端形态、默认交付边界、架构定位或"用户确认与仓库差异（待落实）"发生变化时，必须通过 `bc-change-control` 或 `bc-setup` 修订模式追加记录。普通单任务设计变化不要写入本表。

## 项目解读：如何快速读懂本仓库

### 模块/包关系

```
src/
├── api/                    # API 层（请求封装、拦截器、路由跳转）
│   ├── api.ts             # 核心：commonAjax / commonGet / dicAjax / fileUpload 等
│   ├── interceptors/      # 请求拦截（SM4 加密）+ 路由拦截（登录白名单）
│   ├── router.ts          # 路由跳转封装，挂载为 Vue.prototype.$Router
│   ├── sm3.js / sm4.js   # SM3 签名 / SM4 加解密实现
│   └── word.js            # SM4 密钥
├── common/css/            # 公共样式（fontsize / fontweight / margin / padding 预设类）
├── components/            # 全局公共组件（BsResidentAvatar 居民头像）
├── config/                # 多环境配置（dev / zk / gsysgol）
├── modelData/             # 全局数据模型（BaseModel / UserModel）
├── pages/                 # 页面（按业务域组织）
│   ├── demo/              # Demo 示例页
│   └── residentHome/      # 居民健康视图（主业务域）
│       ├── index.vue      # 健康视图概览首页
│       ├── allergyInfo.vue      # 过敏信息页
│       ├── healthArchive.vue    # 健康档案页
│       ├── recordList.vue       # 记录列表页（儿童健康管理）
│       ├── recordDetail.vue     # 记录详情页
│       ├── comp/                # 子组件（各类健康记录卡片）
│       └── modelData/           # 业务数据模型 + mock 数据
├── static/                # 静态资源（头像图标、健康图标）
├── store/                 # Vuex 状态管理（用户信息、token、登录态）
├── App.vue                # 应用入口
├── main.ts                # 主入口（注册 uView、拦截器、Router、Store）
├── pages.json             # 页面路由与导航栏配置
├── manifest.json          # uni-app 应用配置
└── uni.scss               # uni-app 全局样式变量
```

**依赖方向：** 页面 → comp 子组件 + modelData → api 层 → config；store 独立管理全局状态；拦截器在 `main.ts` 中全局注册。

### 核心业务逻辑流转

**居民健康视图主流程：**

1. 用户进入 `residentHome/index.vue`（健康视图概览）
2. 页面通过 modelData 获取居民基础信息（姓名、性别、年龄、证件号、健康档案号、慢病标签、签约医生/机构/团队/效期）
3. 页面渲染多张健康卡片组件：病史卡片（含 Tab 切换）、就诊记录卡片、体征卡片（含指标切换）、检验检查卡片（含分类 Tab）、用药记录卡片、手术记录卡片
4. 卡片交互触发页面路由跳转：过敏史 → `allergyInfo.vue`；健康档案 → `healthArchive.vue`；记录列表 → `recordList.vue`；记录详情 → `recordDetail.vue`
5. 子页面通过各自的 `comp/` 组件和 `modelData/` 模型展示详细健康信息

**请求流转：** 页面调用 `commonAjax` / `commonGet` → 自动注入 Token / 签名 / 加密头 → `uni.request` → 响应拦截（解密 / 错误码处理 / 401 登出）。

### 关键设计决策

- **uni-app 跨端选型：** 选择 uni-app 2.x 实现 H5 + 微信小程序双端复用，通过条件编译（`#ifdef`）处理平台差异。
- **Class Component 范式：** 使用 `vue-property-decorator` 装饰器语法而非 Options API，配合 TypeScript 获得更好的类型推导。
- **ModelData 模式：** 每个业务域定义独立数据模型（`BaseModel.create()` + `getDefault()`），将数据结构定义与页面逻辑解耦，便于 mock 数据与真实数据切换。
- **RPC 风格 API：** 后端采用统一入口 `/*.jsonRequest`，通过 `X-Service-Id` + `X-Service-Method` 头路由到具体服务方法，前端 `commonAjax` 封装此调用约定。
- **SM3 + SM4 国密算法：** 请求签名使用 SM3，可选 SM4 加密请求体（通过 `ENCRY_FLAG` 控制），满足安全合规要求。
- **公共样式预设：** `src/common/css/` 预定义了 font-size、font-weight、margin、padding 的常用 class，页面应优先使用这些预设类而非内联样式。

## AI 协作与规范入口（保持简短）

- **技能路由：** 开发类需求先考虑 **bc-using-bcoder**，再按任务查对应技能。
- **规范与上下文：** 团队规范见 `context/team/project-conventions.md`；项目专属说明见 `context/project/`；编辑器规则见 `.trae/rules/`。
- **编码约定：**
  - 新增文件、数据模型、假数据、公共方法，头部需增加文件说明注释，数据模型字段也需增加注释说明
  - CSS 中设置 font-size / font-weight / margin / padding 时，优先使用 `src/common/css/` 中预置的样式类
  - 包管理使用 yarn，不使用 npm
  - 未经用户特别说明，不自动触发编译

---
*由 /bc-setup 初始化，可随项目演进手动更新。*

## 数据模型上下文

- **公司数据模型资产：** `未接入`
- **确认记录：** `2026-06-11 用户确认不接入公司数据模型资产`
