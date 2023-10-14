# FPlayer.js

## 介绍
这是一款针对现代化浏览器设计的音乐播放器，具有界面美观，设置方便的优点（净能瞎吹-_-#）

您既可以直接以默认设置直接使用，也可以对FPlayer做出自定义的设置

这是本项目的2.0版本，使用Vue3重构，遵循Web Components规范，可以在其他框架中使用。

## 快速开始

### 使用包管理安装（以pnpm为例）

````shell
pnpm i fplayer.js
````

### 直接使用（参见index.html）

```html
<script type="module">
  import { FPlayer, Music } from "https://cdn.jsdelivr.net/npm/fplayer.js@latest/dist/fplayer.mjs"
  
  FPlayer.init();
</script>
```