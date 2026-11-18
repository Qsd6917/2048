# 2048 简体中文版

这是一个以简体中文为主的 2048 网页项目，在本仓库的 `master` 分支持续维护。游戏保留原版的棋盘、动画和玩法，电脑和手机都能玩。

## 怎么玩

- 用方向键或在棋盘上滑动，让所有方块朝同一个方向移动。
- 两个数字相同的方块相碰时会合并，合并后的数值计入得分。凑出 2048 即获胜，选择「继续游戏」可以挑战更大的数字。
- 当棋盘上没有可以移动或合并的方块时，本局结束。点击「新游戏」或「再试一次」可以重开，最高分会保留。

页面会根据浏览器的首选语言选择界面。也可以用顶部的语言按钮手动切换，选择会跨刷新保存。切换时会保留当前棋盘和分数。

## 本地运行

直接用浏览器打开 [index.html](index.html) 即可游玩。也可以在仓库根目录启动静态服务器，再访问 `http://127.0.0.1:8000/`。

```sh
python -m http.server 8000 --bind 127.0.0.1
```

## 开发与部署

- 页面结构在 `index.html`，界面文案集中在 `js/localization.js`。
- 样式修改请编辑 `style/main.scss`，再用 Ruby Sass 3.2.19 生成 `style/main.css`。运行游戏直接使用已生成的 CSS。
- 部署到 GitHub Pages 时，可将发布源设为本仓库 `master` 分支的根目录，入口是 `index.html`。[GitHub Pages 配置说明](https://docs.github.com/zh/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

```sh
gem install sass -v 3.2.19
sass _3.2.19_ --no-cache --unix-newlines style/main.scss style/main.css
```

## 来源与许可

项目基于 Gabriele Cirulli 的 [2048 原仓库](https://github.com/gabrielecirulli/2048)。原作基于 Veewo Studio 的《1024》，玩法受到 Asher Vollmer 的《Threes》启发。版权归属与授权条款见 [MIT 许可证](LICENSE.txt)。
