/*
 * @Descripttion: 
 * @version: 
 * @Author: 
 * @Date: 2025-08-19 21:31:13
 * @LastEditors: 
 * @LastEditTime: 2025-08-26 23:33:59
 */
import type { LastWordsParams } from '@ai-werewolf/types';
import { formatPlayerList } from '../utils';


export function getLastWords(params: LastWordsParams): string {
  const playerList = formatPlayerList(params.alivePlayers);
  const killedByInfo = params.killedBy === 'werewolf' ? '狼人击杀' : 
                      params.killedBy === 'vote' ? '投票放逐' : '女巫毒杀';
  const importantInfo = params.importantInfo || '暂无特殊信息';
  
  return `🎭 你是${params.playerId}号玩家，在这场狼人杀游戏中扮演【${params.role}】角色。
很遗憾，你已被${killedByInfo}，即将离开游戏。

📊 当前游戏状态：
- 存活玩家：[${playerList}]
- 淘汰方式：${killedByInfo}
- 关键信息：${importantInfo}

💬 现在是你发表遗言的时刻，请根据你的角色特点和游戏局势，发表一段有价值的遗言：

🎯 遗言策略指导：
【如果你是好人阵营】
- 分析你认为的狼人嫌疑人，提供具体的推理依据
- 回顾关键发言和行为，帮助好人识别狼人
- 如果你是神职，可以适当暗示身份来增加可信度
- 给剩余好人提供后续策略建议

【如果你是狼人】
- 继续伪装好人身份，不要暴露队友
- 可以误导好人方向，但要合理自然
- 表现出对"真狼人"的愤怒，增加可信度

【通用技巧】
- 语言要有感情色彩，体现出你的不甘或遗憾
- 逻辑要清晰，避免混乱的表述
- 重点突出1-2个核心观点，不要贪多
- 考虑时间紧迫性，表达要简洁有力

请发表你的遗言（建议100-200字）：`;
}



