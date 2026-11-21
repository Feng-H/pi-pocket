// The interface's words in the person's tongue. English is what the code says; the table holds what the interface
// shows instead. `t` reads the pick at each render, so a switch turns the page at once; a word the table lacks shows
// as it is. `setPrefs({ uiLang: "zh" })` (theme.js) makes the pick, and it stays with this browser.
import { prefs } from "./theme.js";

/** The words, by tongue. `$`s in a line take the rest `t` was given, in order. */
const WORDS = {
    zh: {
        // The list of sessions: its head, its tabs, its groups, its days.
        Sessions: "会话",
        "New session (Alt+N)": "新建会话 (Alt+N)",
        New: "新建",
        "Search sessions": "搜索会话",
        Priority: "优先",
        Recent: "最近",
        Folders: "文件夹",
        Archived: "归档",
        Matches: "搜索结果",
        Channels: "频道",
        Pinned: "置顶",
        "Needs you": "需要你",
        "Ready to read": "待你阅读",
        Working: "进行中",
        Quiet: "安静",
        Today: "今天",
        Yesterday: "昨天",
        "This week": "本周",
        "This month": "本月",
        Earlier: "更早",
        "Dismiss $ failed": "忽略 $ 个失败",
        "Mark all read": "全部标为已读",
        "Show $ more": "显示更多($)",
        "A session needs you": "有会话需要你",
        "A session failed": "有会话运行失败",
        "A session here needs you": "这里有待你处理的会话",
        "A session here failed": "这里有运行失败的会话",
        "New session": "新建会话",
        Selected: "已选择",
        Launcher: "启动器",
        "Open the launcher": "打开启动器",
        // The message box: its send modes, its buttons, its words.
        Steer: "插话",
        "Pi reads it now, between steps": "Pi 在当前步骤间隙立即读取",
        Queue: "排队",
        "Pi reads it when this run ends": "本次运行结束后 Pi 再读取",
        Interrupt: "打断",
        "Stops the run right now (also its tool call), then sends it. The queued messages stay queued":
            "立即停止当前运行(含工具调用)后发送。排队的消息保持不变",
        "Stops the run right now (also its tool call), then sends this one. The other queued messages stay queued":
            "立即停止当前运行(含工具调用)后发送这条。其余排队的消息保持不变",
        Send: "发送",
        "Send (Enter)": "发送 (Enter)",
        Stop: "停止",
        "Stop (Esc twice). Queued messages are held until someone sends them":
            "停止(连按两次 Esc)。排队的消息会保留,直到有人重新发送",
        "Listening…": "听写中…",
        "Steer the current run…": "向当前运行插话…",
        "Stop the run and send this now…": "停止当前运行并立即发送…",
        "Queue a message for after this run…": "排队一条消息,等这次运行结束…",
        "Ask Pi anything…": "问 Pi 任何事…",
        "Upload failed: $": "上传失败:$",
        "Voice message did not go out: $": "语音消息未发出:$",
        "A quote cannot go with a command. Remove the quotes to run it.":
            "命令不能与引用同时发送。请去掉引用后再运行。",
        // Voice messages and dictation.
        "Record a voice message": "录制语音消息",
        "Recording: tap to send": "录音中:再点一下发送",
        "Sending the recording…": "正在发送录音…",
        "Voice message": "语音消息",
        "Sending the voice message": "正在发送语音消息",
        "Voice message language: $": "语音消息语言:$",
        "Drop the recording": "丢弃录音",
        "the transcription's own guess": "由转写自动判断",
        Chinese: "中文",
        English: "英文",
        German: "德文",
        "This browser cannot record audio for a voice message.": "此浏览器无法录制语音。",
        "This browser cannot record audio for dictation.": "此浏览器无法录音进行听写。",
        "No microphone found, or its use is blocked for this site.": "找不到麦克风,或此网站无权使用麦克风。",
        "The recording came out empty. Tap the mic and try again.": "录到的内容是空的,请点麦克风再试一次。",
        "Dictate (Alt+V)": "听写 (Alt+V)",
        "Listening: tap to stop (Alt+V)": "听写中:点按停止 (Alt+V)",
        Dictate: "听写",
        "The microphone is blocked. Allow it for this site in the browser's settings.":
            "麦克风被拒绝。请在浏览器设置里允许此网站使用。",
        "This browser does not allow dictation here.": "此浏览器不允许在此听写。",
        "No speech heard. Tap the mic and try again.": "没听到说话。请点麦克风再试一次。",
        "No microphone found.": "找不到麦克风。",
        "Dictation needs the network: the browser recognises speech on its own servers.":
            "听写需要联网:识别由浏览器厂商的服务器完成。",
        "This browser cannot recognise your language.": "此浏览器无法识别你的语言。",
        "Dictation did not start: $": "听写启动失败:$",
        "Dictation stopped: $": "听写已停止:$",
        "Dictation failed: $": "听写失败:$",
        "Transcription failed ($).": "转写失败($)。",
        // A session's menu (held, or right-clicked).
        "Open in new tab": "在新标签页打开",
        "Copy link": "复制链接",
        "Copy folder path": "复制文件夹路径",
        Rename: "重命名",
        Fork: "分叉",
        "up to the last reply": "回到最后一条回复",
        "New session in this folder": "在此文件夹新建会话",
        Share: "分享",
        "Unpin from the top": "取消置顶",
        "Pin to the top": "置顶",
        "Move to top": "移到最上",
        "Move to bottom": "移到最下",
        "Mark read": "标为已读",
        "Mark unread": "标为未读",
        "Deselect all": "全部取消选择",
        "$ selected": "已选 $ 条",
        Select: "选择",
        "then add others": "可继续多选",
        "this browser": "仅本浏览器",
        "of the pinned": "在置顶中",
        "invite someone": "邀请他人",
        Unarchive: "取消归档",
        Archive: "归档",
    },
};

/** The tongues the interface speaks; the first is what the code itself says. */
const CODES = ["en", "zh"];

/** The tongue the interface reads now: what this browser picked, else English. */
export const uiLanguage = () => {
    const said = String(prefs()?.uiLang ?? "en")
        .trim()
        .toLowerCase();

    return CODES.includes(said) ? said : "en";
};

/** Whether the interface reads in a tongue other than the code's own. */
export const translated = () => uiLanguage() !== CODES[0];

/** The word in the tongue read now. `$`s take the rest, in order, where they stand. */
export function t(word, ...rest) {
    const said = WORDS[uiLanguage()]?.[word] ?? word;

    return rest.length === 0 ? said : rest.reduce((out, each) => out.replace("$", String(each)), said);
}
