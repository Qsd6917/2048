
(function () {
  "use strict";

  var language = navigator.language || "";
  var chinese = /^zh(?:-|$)/i.test(language);
  document.documentElement.lang = chinese ? "zh-CN" : "en";
  if (!chinese) return;

  // IDs are FNV-1a hashes of the normalized text from the supplied APK.
  var strings = {
    "48917342": "开始新游戏会清除当前对局。",
    "63593160": "不太满意",
    "71395504": "继续",
    "aad4ae31": "新游戏",
    "2f2333af": "撤销",
    "403c06cf": "分享到 Facebook",
    "324a198a": "分享到 X",
    "35afca3b": "取消",
    "ab43d664": "继续游戏",
    "b044344b": "再玩一局",
    "71fd4acf": "撤销",
    "2751cbf": "经典模式",
    "4591ff6b": "创意模式",
    "72aaba20": "限时挑战",
    "2bbc11ff": "玩家账户",
    "9e6fb02a": "游戏统计",
    "f0b2d57a": "音效：开启",
    "f571da2c": "音效：关闭",
    "55d70728": "撤销：开启",
    "5f6cdee2": "撤销：关闭",
    "4975ea3b": "步数和计时：显示",
    "f18c4f7f": "步数和计时：隐藏",
    "18a0cb21": "背景：浅色",
    "7e1064": "背景：自动",
    "e3b170bf": "背景：深色",
    "6d15087f": "全屏滑动：开启",
    "a1308e83": "全屏滑动：关闭",
    "ce10356f": "滑动模式：普通",
    "af0b0c24": "滑动模式：专家",
    "639038db": "默认主题",
    "95d69000": "主题：新版",
    "46431bca": "主题：经典",
    "1950786a": "主题：夜间（测试）",
    "c3f102d8": "玩法说明",
    "b80132b4": "关于 2048",
    "3055fe22": "意见反馈",
    "fb40705": "说明",
    "f48dd623": "移除广告",
    "2526541f": "隐私政策",
    "ea2e0dda": "管理隐私",
    "df46a5ab": "使用情况分析：开启",
    "392360cf": "使用情况分析：关闭",
    "4141e4ec": "在棋盘上滑动即可移动方块。两个数字相同的方块相碰时会合并。凑出 2048 即获胜！",
    "399271e2": "移动方块",
    "fbf13ea0": "上下左右滑动，方块就会朝对应方向移动。数字相同的方块会合并，其余方块会滑过空格。每次移动后，棋盘上会出现一个数字为 2 或 4 的新方块。",
    "22c45c8b": "如何获胜",
    "f6581e5b": "凑出 2048 即获胜。你还可以继续挑战更大的数字。棋盘填满且无法再移动时，本局结束。离开棋盘或退出应用时，游戏会暂停并保存。",
    "99e1d64d": "点菜单里的「游戏统计」，或点棋盘上方的得分、最高分，即可查看详细记录。",
    "98c617ed": "游戏设置",
    "c3aa3027": "在菜单中可调整音效、撤销和滑动设置。「全屏滑动」允许在屏幕任意位置滑动。「专家」滑动模式适合更快、更精确的操作。也可以选择显示或隐藏步数和计时。",
    "13bbe00d": "经典模式与限时挑战",
    "a2d2f954": "限时挑战中，方块会自行出现。尽可能坚持更久，棋盘填满时游戏结束！",
    "474d56": "所有对局",
    "bb201f35": "最高分",
    "44ad023b": "累计得分",
    "5c8e8920": "最大方块",
    "3a69c0a3": "从此开始",
    "5df19bfe": "达成局数",
    "f5fbd9d8": "达成局数",
    "f018c6d4": "最快用时",
    "f6234771": "最少步数",
    "2cd01f31": "统计不包含进行中的对局。",
    "5f7082d3": "重置统计",
    "60d555ec": "统计与方块挑战",
    "5e32e8bc": "方块挑战：点「从此开始」，即可从最近一次达成 128 或更高数字的进度继续挑战。仅支持在 2048 5.0 或以上版本中达成的方块。",
    "ca67ac3a": "游戏统计：查看此设备上所有对局的详细记录。累计统计包括：",
    "54e0fd05": "最高分：单局达到的最高得分。",
    "b280b61a": "累计得分：所有已完成对局的得分总和。",
    "7f41fe83": "最大方块：曾经达成的最高数字。",
    "bde302fd": "从 128 开始，解锁更高数字方块后可查看以下统计：",
    "abad5f43": "达成局数：曾达成该方块的对局数。同一局里多次达成只算一次。",
    "465e2de4": "最快用时：达成该方块的最短时间。",
    "baa5ec82": "最少步数：达成该方块的最少步数。",
    "aa2a7360": "可通过应用内购买移除广告，价格为",
    "7a3c16": "如果你已购买，可恢复购买：",
    "ff87f71": "恢复购买",
    "2bf7f183": "感谢升级！",
    "7e1857a0": "游戏中的广告已移除。",
    "b87c6317": "祝你玩得开心！",
    "8d74123b": "设备重新连接应用商店后，即可购买去广告。",
    "88916b57": "正在加载",
    "33dcd2b4": "功能，请稍候……",
    "4d8abd92": "这是由 Gabriele Cirulli 创作的 2048 官方移动版，由 Solebon 团队维护并持续更新。提交建议或了解更多，请点",
    "213b65cb": "这里",
    "5c5e3cc": "在游戏中锻炼思维",
    "7db95d6e": "Solebon 于 2008 年随 App Store 上线，在 iOS 和 Android 上推出了多款纸牌游戏。旗下原创游戏还包括 Loren Brichter 的《Letterpress》和 Gabriele Cirulli 的《2048》。体验其他游戏，请点",
    "f17a0c63": "欢迎游玩",
    "441f5fd2": "原版 2048。",
    "1362b685": "滑动即可移动所有方块。",
    "7b094f44": "两个数字相同的方块相碰时会合并！",
    "be85375a": "凑出 2048 即获胜！",
    "ac85eb63": "开始游戏",
    "1f56c2fd": "2048 新功能",
    "a39ad3a2": "在屏幕任意位置滑动即可移动方块。",
    "ce5901f1": "适配较新的设备。",
    "7e8c8d10": "音效可开启或关闭。",
    "83a94f59": "更多更新即将推出。",
    "e48c5f48": "你觉得新版 2048 怎么样？",
    "6e8e9167": "挺不错",
    "76cef63b": "我有建议",
    "cd86acc3": "关闭",
    "499fc689": "点上方的「2048」打开菜单。",
    "d08944b3": "恭喜你达成最大方块！",
    "4c7d04c8": "经典模式统计",
    "9d062a33": "限时挑战统计",
    "d70e83a0": "创意模式统计",
    "469e98a1": "你赢了！",
    "3421492a": "游戏结束！",
    "717cc306": "已解锁",
    "bb013e0a": "请稍候……",
    "2215345d": "深色模式默认跟随系统。点「2048」打开菜单，再点「背景」即可切换自动、深色或浅色。",
    "1f580c9d": "现已支持深色模式",
    "b6a20af5": "2048 当前无法联网，请恢复网络后重试。",
    "66d85957": "暂时无法开始方块挑战",
    "bb496fb1": "确定重置游戏统计吗？",
    "eb57ccdc": "确定重置限时挑战的统计吗？",
    "ce548555": "确定重置创意模式的统计吗？",
    "9aad9c31": "新游戏",
    "78bd10b5": "点「是」启用撤销按钮，撤回上一次滑动。可在菜单中开启或关闭撤销功能。",
    "8097680f": "新功能：撤销",
    "9ab7c33c": "点上方的「得分」或「最高分」，即可从已解锁的更高数字方块开始挑战。",
    "ce7673e1": "已解锁方块挑战！",
    "e9cbe3a": "查看",
    "d63ed865": "稍后再说",
    "a1e6199d": "确定开始新游戏吗？",
    "3f08eaa2": "点上方的「得分」或「最高分」，或点「2048」进入菜单后选择「游戏统计」，即可查看最高分、最大方块等记录。",
    "d38291cc": "游戏统计",
    "fdf00877": "每次滑动后可以撤回一步。除此之外，撤销次数不限。",
    "3d3844c9": "撤销说明",
    "b3a43630": "是",
    "61e6be1a": "否",
    "85e4b82f": "确定",
    "5d7eca99": "提示",
    "a183c9ef": "确认",
    "a826ad22": "购买失败，请稍后重试。",
    "c9aa2c9c": "此功能目前无法在你的设备上使用。",
    "47f452c4": "购买出现问题，请重试。",
    "d5f5007": "购买失败",
    "ccab99a": "处理升级时出现问题，请稍后重试。",
    "c4e156be": "恢复升级时出现问题，请稍后重试。",
    "3a2f3910": "请先购买此升级。",
    "184185de": "恢复失败",
    "274443bf": "恢复购买时出现问题，请重试。"
  };

  function textId(text) {
    var hash = 0x811c9dc5;
    for (var i = 0; i < text.length; i++) {
      hash = Math.imul(hash ^ text.charCodeAt(i), 0x01000193);
    }
    return (hash >>> 0).toString(16);
  }

  function translate(text) {
    if (typeof text !== "string") return text;
    var key = text.replace(/\s+/g, " ").trim();
    var id = textId(key);
    if (Object.prototype.hasOwnProperty.call(strings, id)) return strings[id];

    var translated = key
      .replace(/^([\d,]+) moves?$/, "$1 步")
      .replace(/^Play for ([\d,]+)!$/, "挑战 $1！")
      .replace(/^Join the numbers and get to the ([\d,]+) tile!$/, "合并数字，凑出 $1 方块！")
      .replace(/^New Game at Tile ([\d,]+)$/, "从 $1 开始新游戏")
      .replace(/^Version:\s+([\d.]+)$/, "版本：$1")
      .replace(/^You earned ([\d,]+) points with ([\d,]+) moves in ([\d:]+)\.$/,
        "得分 $1，共用 $2 步，耗时 $3。")
      .replace(/^tile with ([\d,]+) moves in ([\d:]+)\.$/, "方块，共用 $1 步，耗时 $2。");
    return translated === key ? text : translated;
  }

  function translateNode(node) {
    var original = node.nodeValue;
    var key = original.replace(/\s+/g, " ").trim();
    if (!key || !/[A-Za-z]/.test(key)) return;
    var translated = translate(original);
    if (translated === original || translated === key) return;
    node.nodeValue = original.match(/^\s*/)[0] + translated + original.match(/\s*$/)[0];
  }

  function translateTree(root) {
    if (root.nodeType === 3) {
      if (root.parentNode && !/^(SCRIPT|STYLE)$/.test(root.parentNode.nodeName)) {
        translateNode(root);
      }
      return;
    }
    if (root.nodeType !== 1 || /^(SCRIPT|STYLE)$/.test(root.nodeName)) return;

    var walker = document.createTreeWalker(root, 4, null);
    var node;
    while ((node = walker.nextNode())) {
      if (!/^(SCRIPT|STYLE)$/.test(node.parentNode.nodeName)) translateNode(node);
    }
  }

  var scoreLabels = document.createElement("style");
  scoreLabels.textContent =
    'html[lang="zh-CN"] .game-score.current-score:after{content:"得分"}' +
    'html[lang="zh-CN"] .game-score.best-score:after{content:"最高分"}';
  document.head.appendChild(scoreLabels);

  translateTree(document.body);
  new MutationObserver(function (records) {
    records.forEach(function (record) {
      if (record.type === "characterData") {
        translateTree(record.target);
      } else {
        Array.prototype.forEach.call(record.addedNodes, translateTree);
      }
    });
  }).observe(document.body, {subtree: true, childList: true, characterData: true});

  document.addEventListener("deviceready", function () {
    var dialogs = navigator.notification;
    if (!dialogs) return;
    var originalAlert = dialogs.alert;
    var originalConfirm = dialogs.confirm;
    dialogs.alert = function (message, callback, title, label) {
      return originalAlert.call(this, translate(message), callback,
        translate(title || "Alert"), translate(label || "OK"));
    };
    dialogs.confirm = function (message, callback, title, labels) {
      return originalConfirm.call(this, translate(message), callback,
        translate(title || "Confirm"),
        Array.isArray(labels) ? labels.map(translate) : labels || ["确定", "取消"]);
    };
  }, false);
}());
