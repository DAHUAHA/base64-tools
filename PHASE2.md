# 阶段 2 实施计划

**目标：** 给 base64 工具站加后端功能，理解环境变量、API、CORS、数据库

---

## 步骤 1：建 API（Vercel Serverless Functions）

```
在项目根目录建 api/ 文件夹，写第一个后端接口
```

### 操作明细

1. 创建 `api/` 目录
2. 新建 `api/health.js` — 健康检查接口，返回 `{ status: "ok", timestamp: ... }`
3. 部署后访问 `https://www.zisaac.com/api/health` 验证返回 JSON
4. 新建 `api/encode.js` — 接收 POST 请求：`{ text: "hello" }` → `{ result: "aGVsbG8=" }`
5. 测试：`curl -X POST https://www.zisaac.com/api/encode -H "Content-Type: application/json" -d '{"text":"hello"}'`

### 学习要点
- 后端是什么、请求/响应模型
- JSON 格式、`req.method`、`req.body`
- Vercel Serverless Functions 的工作原理

---

## 步骤 2：前端调 API（理解 CORS）

```
在页面加一个"API 测试"功能，从浏览器调自己的后端
```

### 操作明细

1. 在 `index.html` 加一个区域：输入文本 → 点按钮 → 调 `/api/encode` → 显示结果
2. 第一次运行会遇到 **CORS 错误**
3. 在 API 代码里加 CORS 头：`Access-Control-Allow-Origin: *`
4. 验证前端能成功调用后端

### 学习要点
- 同源策略（Same-Origin Policy）
- CORS（跨域资源共享）
- `fetch()` API 调用后端
- 前后端分离的概念

---

## 步骤 3：环境变量

```
把配置信息从代码中分离出来
```

### 操作明细

1. 创建 `.env` 文件：`SITE_NAME="Base64 Tools"`
2. 在 API 里读取 `process.env.SITE_NAME`
3. 创建 `.env.example`（不含真实值，提交到 Git）
4. 修改 `.gitignore`，加上 `.env`
5. Vercel → 项目 Settings → Environment Variables → 添加 `SITE_NAME`
6. 重新部署，验证 API 能读到环境变量
7. 本地用 `vercel dev` 测试

### 学习要点
- 环境变量的作用
- 敏感信息（API key）不写进代码
- `.gitignore` 的用法

---

## 步骤 4：数据库存储

```
加一个轻量数据库，存转换历史
```

### 操作明细

**选方案：**
- Vercel KV（Redis）— 免费版够用，直接集成
- Turso（SQLite edge）— 免费版 9GB

**数据结构：**
```json
conversion_logs:
  - id: 自增
  - input_text: 原文（摘录前 50 字）
  - result: 转换结果（摘录前 50 字）
  - mode: "encode" 或 "decode"
  - ip: 访客 IP（仅存前 3 段）
  - created_at: 时间戳
```

**写 API：** `api/logs.js`
- `GET /api/logs` — 最近 20 条记录
- `POST /api/logs` — 新增一条记录

**前端集成：**
- 每次编码/解码后自动调 `POST /api/logs` 记录
- 页面底部加"最近转换"列表，调 `GET /api/logs` 显示

### 学习要点
- 数据库 CRUD（增删查改）
- ORM vs 原生 SQL
- API 路由设计

---

## 步骤 5：权限/安全（可选进阶）

```
防止滥用，加基础防护
```

### 操作明细

1. **速率限制：** 同一 IP 每分钟最多 30 次请求
2. **输入校验：** API 端验证 text 不为空、长度不超过 1MB
3. **日志脱敏：** 数据库不存完整原文，只存前 50 个字符
4. **请求日志：** 每次 API 调用记日志

---

## 时间预估

| 步骤 | 内容 | 预计时间 |
|------|------|----------|
| 步骤 1 | 建 API | 30 分钟 |
| 步骤 2 | 前端调 API + CORS | 30 分钟 |
| 步骤 3 | 环境变量 | 20 分钟 |
| 步骤 4 | 数据库存储 | 1-2 小时 |
| 步骤 5 | 安全加固 | 30 分钟 |

**全程约 3-4 小时，建议分 2-3 天完成。**
