# 2048 简体中文版

[English README](README.md) · [原版仓库](https://github.com/gabrielecirulli/2048) · [原版游戏](https://gabrielecirulli.github.io/2048/)

2048 是由 Gabriele Cirulli 创作的数字合并游戏。本项目基于原仓库的 `master` 分支，提供简体中文和英文界面，沿用原版的游戏规则、棋盘样式和动画。

## 玩法

- 用方向键移动方块，手机上可在棋盘内向任意方向滑动。
- 两个数字相同的方块相碰时会合并，合并后的数字计入得分。凑出 2048 即获胜，可选择「继续游戏」挑战更大的数字。
- 棋盘上没有可移动或可合并的方块时，本局结束。点击「新游戏」或「再试一次」可重开，最高分会保留。

## 本地运行

用浏览器打开仓库根目录的 `index.html` 即可游玩。也可以在仓库根目录启动本地静态服务器，然后访问 `http://127.0.0.1:8000/`。建议用同一个 HTTP 地址测试刷新后的语言和游戏存档。

```sh
python -m http.server 8000 --bind 127.0.0.1
```

## 汉化说明

- 首次打开时，浏览器首选语言为中文（`zh` 或 `zh-*`）则显示简体中文，其他语言默认显示英文。
- 点击页面顶部的「中文 / English」即可切换。手动选择会通过 `localStorage` 保存。切换时会更新页面语言和当前的胜负提示，棋盘、当前分数和最高分都会保留。
- 两套文案集中在 `js/localization.js`，包含按钮、得分标签、玩法、胜负提示和页脚。HTML 通过 `data-i18n*` 属性关联文案，得分标签经 `data-label` 和 CSS 伪元素显示。
- 样式源文件为 `style/main.scss`，生成的 `style/main.css` 已随源码提供。若要重新生成，使用 Ruby Sass 3.2.19，与上游样式的编译方式一致。编译器仅用于维护 SCSS，游玩和静态部署直接使用生成的 CSS。

```sh
gem install sass -v 3.2.19
sass _3.2.19_ --no-cache --unix-newlines style/main.scss style/main.css
```

## GitHub Pages

将含有本地化代码的分支用作发布源，在仓库的 **Settings → Pages** 中选择 **Deploy from a branch**，再选择该分支和 **/(root)**。根目录的 `index.html` 使用相对路径加载样式、脚本与静态资源，可部署在项目站点的子路径下。[GitHub Pages 发布源配置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 版权与许可

原作者为 Gabriele Cirulli，版权归属与授权条款见 [MIT 许可证](LICENSE.txt)。游戏基于 Veewo Studio 的《1024》，玩法与 Asher Vollmer 的《Threes》相近。
