# 食谱

一个公开的食谱集，用 Markdown 在 GitHub 上编写，通过 GitHub Pages 发布。

## 快速开始

1. Fork 或克隆这个仓库
2. 安装依赖：`bundle install`
3. 启动本地服务：`bundle exec jekyll serve`
4. 访问 `http://localhost:4000/public-recipe/`

## 添加食谱

在 `_recipes/` 目录下创建一个新的 Markdown 文件，文件名即为食谱的 slug。

文件开头需要包含：

```yaml
---
layout: recipe
title: 你的食谱名称
---
```

然后在下方用 Markdown 写食谱内容。

你也可以直接在 GitHub 网页编辑器中创建新文件：点击网站上的「写一道菜」按钮。

## 技术栈

- **Jekyll**（通过 github-pages gem）
- **GitHub Pages** 托管
- 纯 HTML + CSS + JavaScript，无框架
- Google Fonts：DM Sans + Newsreader
-  vendored JS：Linkify（裸 URL 自动链接）+ Pangu（中英文排版间距）

## 许可证

MIT
