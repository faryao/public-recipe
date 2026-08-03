# ADR-0001: 使用 Jekyll Collections 管理食谱

## 状态

已接受

## 背景

需要一个简单的方式来组织和发布食谱条目。食谱不像日记那样以日期为核心，而是以菜名（slug）为标识。

## 决定

使用 Jekyll 的 Collections 功能，将食谱文件放在 `_recipes/` 目录下，每个文件以 slug 命名（如 `mapo-tofu.md`）。

配置如下：

```yaml
collections:
  recipes:
    output: true
    permalink: /recipes/:slug/
```

## 理由

1. **Slug-only 标识**：食谱不以日期为核心，用 slug 更自然。`_recipes/mapo-tofu.md` 对应 `/recipes/mapo-tofu/`。
2. **GitHub 友好**：文件结构简单，适合在 GitHub 网页编辑器中直接创建和编辑。
3. **Jekyll 原生支持**：Collections 是 Jekyll 内置功能，无需额外插件，与 GitHub Pages 完全兼容。
4. **与 diary 的区别**：diary 使用 `_posts/` 和日期格式，食谱使用 `_recipes/` 和 slug 格式，各自适合其内容特点。

## 影响

- 食谱文件必须放在 `_recipes/` 目录下
- 文件名即为 URL slug，需要有意义且唯一
- 不需要日期字段，frontmatter 只需 `layout: recipe` 和 `title`
