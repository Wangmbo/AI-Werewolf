# DeepSeek 集成指南

本项目现已支持 DeepSeek AI 模型！DeepSeek 是一个高性能的中文 AI 模型，特别适合需要深度分析和推理的任务。

## 🚀 快速开始

### 1. 获取 DeepSeek API 密钥

1. 访问 [DeepSeek 开放平台](https://platform.deepseek.com/)
2. 注册账号并登录
3. 在 API 管理页面创建新的 API 密钥
4. 复制你的 API 密钥

### 2. 配置环境变量

```bash
# 设置 DeepSeek API 密钥
export DEEPSEEK_API_KEY="your_deepseek_api_key_here"

# 可选：设置其他 AI 配置
export AI_MODEL="deepseek-chat"
export AI_MAX_TOKENS=150
export AI_TEMPERATURE=0.8
```

### 3. 启动 DeepSeek 玩家

```bash
# 使用快捷命令启动
bun run dev:player:deepseek

# 或者使用配置文件启动
bun run dev:player --config=configs/deepseek.json
```

## 🎯 支持的 DeepSeek 模型

| 模型名称 | 描述 | 适用场景 |
|---------|------|---------|
| `deepseek-chat` | 通用对话模型 | 狼人杀游戏对话、分析推理 |
| `deepseek-coder` | 代码专用模型 | 如果需要更强的逻辑分析能力 |

## ⚙️ 配置说明

DeepSeek 配置文件位于 `configs/deepseek.json`：

```json
{
  "server": {
    "port": 3006,
    "host": "0.0.0.0"
  },
  "ai": {
    "model": "deepseek-chat",
    "maxTokens": 150,
    "temperature": 0.8,
    "provider": "deepseek"
  },
  "game": {
    "name": "深度思考者",
    "personality": "深度分析型玩家，善于多层次思考，能从细微线索中发现重要信息",
    "strategy": "balanced",
    "speakingStyle": "casual"
  }
}
```

### 关键配置项

- **provider**: 必须设置为 `"deepseek"`
- **model**: 推荐使用 `"deepseek-chat"` 或 `"deepseek-coder"`
- **maxTokens**: 建议 100-300，DeepSeek 生成速度较快
- **temperature**: 建议 0.7-0.9，平衡创造性和一致性

## 🎮 游戏特色

DeepSeek 玩家的特点：

### 🧠 分析能力
- **深度推理**: 能从多个维度分析游戏局势
- **细节观察**: 善于发现其他玩家言行中的细微破绽
- **逻辑链条**: 构建完整的推理链，而不是简单的直觉判断

### 🎭 游戏风格
- **策略**: 平衡型，既不过分保守也不盲目激进
- **表达**: 清晰有条理，善于用逻辑说服其他玩家
- **适应**: 能根据游戏进程调整策略

## 🔧 故障排除

### 常见问题

**Q: DeepSeek API 密钥无效**
```bash
# 检查环境变量是否设置正确
echo $DEEPSEEK_API_KEY

# 确保密钥格式正确，通常以 "sk-" 开头
```

**Q: 连接超时或失败**
```bash
# 检查网络连接到 DeepSeek API
curl -H "Authorization: Bearer $DEEPSEEK_API_KEY" https://api.deepseek.com/v1/models

# 如果连接有问题，可能需要配置代理
```

**Q: 模型响应慢**
```bash
# 尝试调整 maxTokens 参数
export AI_MAX_TOKENS=100

# 或在配置文件中设置更小的值
```

### 日志调试

启用详细日志来调试问题：

```json
{
  "logging": {
    "level": "debug",
    "enabled": true
  }
}
```

## 💡 优化建议

### 性能优化
- **Token 限制**: DeepSeek 对中文处理效率高，可以适当减少 maxTokens
- **温度设置**: 狼人杀需要逻辑性，建议 temperature 不超过 0.9
- **批量请求**: 游戏中可能有多个玩家同时请求，注意 API 限流

### 成本控制
- **模型选择**: `deepseek-chat` 比 GPT-4 更具成本效益
- **提示词优化**: 简洁明确的提示词能减少不必要的 token 消耗
- **缓存策略**: 相似的游戏状态可以考虑复用分析结果

## 🤝 与其他 AI 的对比

| 特性 | DeepSeek | Claude | GPT-4 |
|------|----------|--------|-------|
| 中文理解 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 逻辑推理 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 成本效益 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| 响应速度 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

## 🌟 最佳实践

1. **个性设计**: 充分利用 DeepSeek 的分析能力，设计理性型角色
2. **提示词优化**: 使用中文提示词可能获得更好的效果
3. **参数调试**: 先用小规模测试找到最佳的 temperature 和 maxTokens 组合
4. **监控日志**: 观察 AI 的决策过程，持续优化游戏体验

---

🎉 现在你可以体验 DeepSeek 驱动的 AI 狼人杀玩家了！如果遇到问题，请检查上述故障排除部分或提交 Issue。 