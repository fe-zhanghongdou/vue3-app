![example workflow](https://github.com/fe-zhanghongdou/vue3-app/actions/workflows/<WORKFLOW_FILE>/badge.svg)
![CI](https://github.com/Hitotsubashi/cicd-study/actions/workflows/ci.yml/badge.svg)

![CD](https://github.com/Hitotsubashi/cicd-study/actions/workflows/cd.yml/badge.svg)

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out to [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Commit Message 规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 规范：

### 格式

```
<type>(<scope>): <subject>
```

### Type 类型

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链相关
- `revert`: 回退提交

### 示例

```bash
feat(waterfall): 添加瀑布流页面

fix(eslint): 修复 Vue 文件类型错误

docs(readme): 添加 commit message 规范说明

style(prettier): 更新格式化配置
```

### 注意事项

1. **subject 必须简短**：不超过 50 个字符
2. **使用祈使句**：如 "添加"、"修复"、"更新"
3. **首字母小写**：不要大写开头
4. **结尾不加句号**：保持简洁
5. **body 可选**：详细描述可以放在 body 部分
