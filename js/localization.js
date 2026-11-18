var Localization = (function () {
  var messages = {
    en: {
      language: "Game language",
      score: "Score",
      best: "Best",
      intro: "Join the numbers and get to the <strong>2048 tile!</strong>",
      newGame: "New Game",
      keepPlaying: "Keep going",
      retry: "Try again",
      won: "You win!",
      lost: "Game over!",
      instructions: '<strong class="important">How to play:</strong> Use your ' +
        '<strong>arrow keys</strong> or <strong>swipe</strong> to move the ' +
        'tiles. When two tiles with the same number touch, they ' +
        '<strong>merge into one!</strong>',
      edition: '<strong class="important">About this edition:</strong> ' +
        'This is a bilingual edition of 2048. See the ' +
        '<a href="https://github.com/gabrielecirulli/2048">original ' +
        'repository</a> or <a href="https://gabrielecirulli.github.io/2048/">' +
        'play the original game</a>.',
      credits: 'Created by <a href="https://gabrielecirulli.com">' +
        'Gabriele Cirulli</a>. Based on <a href="https://itunes.apple.com/us/' +
        'app/1024!/id823499224">1024 by Veewo Studio</a> and conceptually ' +
        'similar to <a href="https://asherv.com/threes/">Threes by ' +
        'Asher Vollmer</a>.'
    },
    "zh-CN": {
      language: "游戏语言",
      score: "得分",
      best: "最高分",
      intro: "合并数字，凑出 <strong>2048</strong>！",
      newGame: "新游戏",
      keepPlaying: "继续游戏",
      retry: "再试一次",
      won: "你赢了！",
      lost: "游戏结束！",
      instructions: '<strong class="important">玩法：</strong>按<strong>方向键' +
        '</strong>或在棋盘上<strong>滑动</strong>来移动方块。两个数字相同的方块' +
        '相碰时，会<strong>合并成一个数值翻倍的方块</strong>。',
      edition: '<strong class="important">版本说明：</strong>这是 2048 的双语版。' +
        '你可以查看<a href="https://github.com/gabrielecirulli/2048">原版仓库' +
        '</a>，也可以<a href="https://gabrielecirulli.github.io/2048/">玩原版游戏' +
        '</a>。',
      credits: '由 <a href="https://gabrielecirulli.com">Gabriele Cirulli</a> ' +
        '创作，基于 <a href="https://itunes.apple.com/us/app/1024!/id823499224">' +
        'Veewo Studio 的 1024</a>，玩法与 <a href="https://asherv.com/threes/">' +
        'Asher Vollmer 的 Threes</a> 相近。'
    }
  };

  var storageKey = "2048-language";
  var language = "en";

  function initialLanguage() {
    try {
      var saved = window.localStorage.getItem(storageKey);
      if (saved === "zh-CN" || saved === "en") return saved;
    } catch (error) {
      // The browser may block access to localStorage.
    }

    var browserLanguage = navigator.language || navigator.userLanguage || "";
    return /^zh(?:-|$)/i.test(browserLanguage) ? "zh-CN" : "en";
  }

  function translate(element) {
    var strings = messages[language];
    var textKey = element.getAttribute("data-i18n");
    var htmlKey = element.getAttribute("data-i18n-html");
    var labelKey = element.getAttribute("data-i18n-label");

    if (textKey) element.textContent = strings[textKey];
    // Markup comes only from the static translations above.
    if (htmlKey) element.innerHTML = strings[htmlKey];
    if (labelKey) element.setAttribute("data-label", strings[labelKey]);
  }

  function applyLanguage(nextLanguage) {
    language = nextLanguage;
    document.documentElement.lang = language;

    var selector = "[data-i18n], [data-i18n-html], [data-i18n-label]";
    var elements = document.querySelectorAll(selector);
    var buttons = document.querySelectorAll("[data-language]");
    var group = document.querySelector(".language-switch");
    var i;

    for (i = 0; i < elements.length; i++) translate(elements[i]);

    group.setAttribute("aria-label", messages[language].language);
    for (i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed",
        buttons[i].getAttribute("data-language") === language);
    }
  }

  function selectLanguage(event) {
    var selected = event.currentTarget.getAttribute("data-language");
    applyLanguage(selected);

    try {
      window.localStorage.setItem(storageKey, selected);
    } catch (error) {
      // Switching still works for the current page.
    }
  }

  function init() {
    applyLanguage(initialLanguage());

    var buttons = document.querySelectorAll("[data-language]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", selectLanguage);
    }
  }

  return { init: init, translate: translate };
}());
