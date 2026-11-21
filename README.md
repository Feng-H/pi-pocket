<div align="center">

# Pi Pocket · 个人版

**我的个人 Agent——在 [TannerMidd/pi-pocket](https://github.com/TannerMidd/pi-pocket) 之上的自主改造版本。**
**My personal agent — a fork of [TannerMidd/pi-pocket](https://github.com/TannerMidd/pi-pocket), extended for my own use.**

基于 [Pi Durable](https://earendil.com/posts/pi-durable/) 的持久化、多人、移动优先 Web 应用。
A durable, multiplayer, mobile-first web app for Pi agents, built on Pi Durable.

[原始 README(英文)](./README-UPSTREAM.md) · [功能全览 / Feature tour](docs/features.md) · [上游文档 / Upstream docs](https://tannermidd.github.io/pi-pocket/docs/)

[![MIT license](https://img.shields.io/badge/license-MIT-ff9e64)](LICENSE)
[![Node.js 22.19+](https://img.shields.io/badge/node-%E2%89%A5%2022.19-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Upstream](https://img.shields.io/badge/upstream-v0.29.0-7aa2f7)](https://github.com/TannerMidd/pi-pocket/releases)

</div>

> **原始 README(英文,未改动)/ The original README, untouched:** [README-UPSTREAM.md](./README-UPSTREAM.md)。
> 本文件只写这个 fork 自己的改动。This file documents only what the fork adds.

## 这个 fork 加了什么 / What this fork adds

### 频道体系 / Channels

- Discord 式长驻频道:`/channel 名字` 创建,侧栏 **CHANNELS** 分组收纳,分组头带 `+` 直接新建
- 重名校验:同名频道服务端直接拒绝(409),大小写、`#`、首尾空格归一化
- 可随时重命名(长按 → 重命名);归档的频道**仍可被 `#` 引用**,候选里带"归档"标记
- English: Discord-style long-lived conversations with a CHANNELS section and a `+` to create; unique names (the server refuses a second, whatever the case); channels rename like any session; archived ones stay mentionable, marked as archived.

### `#` 频道引用与跨频道推送 / Mentions & posts

- 对话框输入 `#` 弹出频道候选(随输入过滤),选中插入 `#名字`
- 发送后 agent 收到**隐藏上下文**:被引用频道对应哪个会话,可用 `session_read` 深读
- 工具 **`channel_post`**:agent 主动把消息推进别的频道——消息以 `[via channel #来源]` 到达,对方 Pi 在本频道读取并回答
- English: typing `#` offers the channels; a pick writes `#name` and a hidden context part names that session for `session_read`. `channel_post` lets Pi push a message into another channel, whose Pi reads it and answers in place.

### search_history · 历史档案柜 / The archive cabinet

- 长对话触发摘要(Compaction)后丢细节?工具 **`search_history`** 直接检索**原始条目**:本会话、全部会话、或指定会话
- 系统提示词立规矩:问早期细节/"昨天"/可见上下文外的内容,**必须先查再答,不许猜**;跨会话用 `scope: "all"`,配合 `session_read`
- English: search the original entries — this conversation or every session — before answering anything the visible context may not hold. Never guess what a search would tell.

### 语音消息 + Groq 听写 / Voice messages & dictation

- 麦克风按下即录、再按即发:录音**直接作为消息**进入对话,服务端 Groq Whisper 转写,转写文字显示在发送者气泡里,agent 直接读到
- 识别语言按人可选(自动 / 中文 / English / Deutsch);上传失败自动重试;iOS 的停止事件丢失也有兜底
- 未配置 Groq key 时,麦克风回退为浏览器听写(Web Speech)
- English: the mic records and sends; the server hears it with Groq's Whisper and what it says becomes the message. The hearing is pickable per person (auto / 中文 / English / Deutsch).

### 中文界面 / 中文界面优先

- **全界面中文化**:侧栏、启动器、菜单、外观设置、各弹窗、对话工具条
- 侧栏旁 **中文 / EN** 一键切换,即时生效,按浏览器记忆
- English: the whole interface speaks Chinese; a 中文/EN chip switches at once, per browser.

## 运行 / Run

与上游一致 / Same as upstream: Node.js ≥ 22.19,无构建步骤,`npm install` 后直接跑。

```bash
npm install
node bin/pi-pocket.js
```

语音转文字需在 `.env.local` 配置 `GROQ_API_KEY`(systemd 部署用 `EnvironmentFile` 加载)。无 key 时语音退化为浏览器听写。

本 fork 不跟随上游自动更新;需要时从 upstream 手动 cherry-pick。This fork does not follow upstream automatically; cherry-pick by hand when wanted.

## 许可 / License

MIT。感谢上游 [@TannerMidd](https://github.com/TannerMidd) 的出色工作 / Thanks to [@TannerMidd](https://github.com/TannerMidd) for the excellent work this stands on.
