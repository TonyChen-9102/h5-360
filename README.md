# uni-app Demo 项目

基于 Vue 2 + TypeScript 的 uni-app 项目模板，参考 gol-pub-uniapp 项目架构。

## 项目特性

- ✅ Vue 2 + TypeScript 支持
- ✅ 请求封装与拦截器（请求拦截、响应拦截、路由拦截）
- ✅ 多环境配置支持（开发环境/生产环境）
- ✅ 路由登录拦截
- ✅ ModelData 数据管理层
- ✅ Vuex 状态管理
- ✅ 支持命令行编译（微信小程序、H5等）

## 快速开始

### 安装依赖

```bash
npm install --legacy-peer-deps
```

### 开发环境

```bash
# H5开发
npm run dev:h5

# 微信小程序开发（开发环境）
npm run dev:mp-weixin:dev

# 微信小程序开发（生产环境）
npm run dev:mp-weixin:prod
```

### 编译构建

```bash
# 编译H5
npm run build:h5

# 编译微信小程序（开发环境）
npm run build:mp-weixin:dev

# 编译微信小程序（生产环境）
npm run build:mp-weixin:prod
```

## 项目结构

```
├── src/
│   ├── api/                    # API相关
│   │   ├── interceptors/      # 拦截器
│   │   │   ├── index.ts       # 拦截器入口
│   │   │   ├── requestInterceptor.ts  # 请求/响应拦截
│   │   │   └── routeInterceptor.ts    # 路由拦截
│   │   ├── http.ts            # HTTP请求封装
│   │   ├── interface.ts       # API接口定义
│   │   ├── pages.ts           # 页面路由定义
│   │   └── router.ts          # 路由跳转封装
│   ├── config/                # 配置文件
│   │   ├── env.config.js      # 多环境配置
│   │   └── index.js           # 配置入口
│   ├── modelData/             # 数据模型层
│   │   ├── baseModel.ts       # 基础模型
│   │   ├── userModel.ts       # 用户模型
│   │   └── index.ts
│   ├── store/                 # Vuex状态管理
│   │   └── index.ts
│   ├── pages/                 # 页面
│   │   ├── demo/              # Demo示例页面
│   │   ├── login/             # 登录页面
│   │   └── home/              # 首页
│   ├── App.vue                # 应用入口
│   ├── main.ts                # 主入口文件
│   ├── pages.json             # 页面配置
│   ├── manifest.json          # 应用配置
│   └── globals.d.ts           # TypeScript全局声明
├── package.json
├── tsconfig.json
├── babel.config.js
├── vue.config.js
└── postcss.config.js
```

## 多环境配置

在 `src/config/env.config.js` 中配置不同环境的参数：

```javascript
module.exports = {
  dev: {
    ENV_NAME: 'dev',
    BASE_URL: 'http://localhost:8080',
    API_BASE_URL: 'https://dev-api.example.com',
    // ...其他配置
  },
  prod: {
    ENV_NAME: 'prod',
    BASE_URL: 'https://api.example.com',
    API_BASE_URL: 'https://api.example.com',
    // ...其他配置
  }
}
```

通过 `UNI_ENV_PREFIX` 环境变量切换环境：
- `UNI_ENV_PREFIX=dev` - 开发环境
- `UNI_ENV_PREFIX=prod` - 生产环境

## 请求封装

项目使用 flyio 进行HTTP请求封装，位于 `src/api/http.ts`：

```typescript
import http from '@API/http'
import API from '@API/interface'

// 使用示例
const res = await http.get(API.getUserInfo)
const res = await http.post(API.login, { phone, password })
```

## 拦截器

### 请求拦截器
- 自动添加 Token
- 添加租户ID

### 响应拦截器
- 统一错误处理
- 401自动跳转登录

### 路由拦截器
- 登录拦截（未登录跳转登录页）
- 白名单机制（登录页、Demo页无需登录）

## ModelData 数据管理

使用 Model 模式管理数据结构：

```typescript
import { UserModel } from '@MODEL/userModel'

// 创建用户实例
const user = UserModel.create({
  id: '1',
  name: '测试用户',
  phone: '13800138000'
})
```

## 路由跳转

使用封装的 Router 进行页面跳转：

```typescript
// 普通跳转
this.$Router.navigateTo({
  url: '/pages/home/index',
  params: { id: '123' }
})

// 重定向
this.$Router.redirectTo({
  url: '/pages/demo/index'
})

// 返回
this.$Router.navigateBack()
```

## Vuex 状态管理

```typescript
import { State, Action } from 'vuex-class'

@State((state: any) => state.userInfo) userInfo
@State((state: any) => state.isLogin) isLogin

// 登录
this.$store.dispatch('login', { token, userInfo })

// 退出
this.$store.dispatch('logout')
```

## 编译输出

编译后的文件位于 `dist/build/` 目录：
- `dist/build/mp-weixin` - 微信小程序
- `dist/build/h5` - H5

微信小程序可使用微信开发者工具导入 `dist/build/mp-weixin` 运行。

## 注意事项

1. 使用 `npm install --legacy-peer-deps` 安装依赖（解决peer dependency冲突）
2. 路由白名单需在 `src/api/interceptors/routeInterceptor.ts` 中配置
3. API接口在 `src/api/interface.ts` 中统一定义
4. 环境配置在 `src/config/env.config.js` 中管理

## 技术栈

- Vue 2.6.14
- TypeScript 4.5.4
- Vuex 3.6.2
- flyio 0.6.14
- uni-app 2.x
- Vue Property Decorator 8.5.1

## License

MIT
