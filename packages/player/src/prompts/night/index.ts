import type { GameContext, PlayerContext, SeerContext, WitchContext } from '@ai-werewolf/types';
import { formatPlayerList, formatHistoryEvents } from '../utils';
import { Role } from '@ai-werewolf/types';
import type { PlayerServer } from '../../PlayerServer';

export function getWerewolfNightAction(playerServer: PlayerServer, context: GameContext): string {
  const playerList = formatPlayerList(context.alivePlayers);
  const historyEvents = formatHistoryEvents(['夜间行动阶段']);
  const teammates = playerServer.getTeammates()?.join('、') || '暂无队友信息';
  
  // 添加游戏进度说明，防止AI幻觉
  const gameProgressInfo = context.round === 1 
    ? `【重要提示】现在是第1轮夜间阶段，游戏刚刚开始：
  - 还没有任何白天发言记录
  - 还没有任何投票记录
  - 没有玩家暴露身份
  - 你的击杀决策应基于随机性, 优先杀靠边的
  - 不要假设或编造不存在的玩家行为`
    : '';
  
  return `你是${playerServer.getPlayerId()}号玩家，狼人杀游戏中的狼人角色。当前游戏状态：
- 存活玩家: [${playerList}]
- 你的狼人队友ID: [${teammates}]
- 当前轮次: 第${context.round}轮
- 历史事件: ${historyEvents}

${gameProgressInfo}

作为狼人，你需要决定：
- action: 固定为'kill'
- target: 要击杀的目标玩家ID（数字）
- reason: 选择该目标的详细理由

🎯 击杀策略体系：

## 第1轮策略（T1）
- **主要目标**：避免击杀队友，选择边缘位置玩家
- **优先级**：位置靠边 > 发言较少 > 随机选择
- **避免**：不要击杀可能是狼队友的玩家

## 中期策略（T2-T3）
- **威胁评估**：神职角色 > 高逻辑玩家 > 带节奏玩家
- **目标识别**：
  * 疑似预言家（主动查人、信息准确）
  * 疑似女巫（了解死亡信息、用药线索）
  * 疑似守卫（保护意识强、分析夜间结果）
- **策略平衡**：清除威胁 vs 避免暴露身份

## 后期策略（T4+）
- **决胜思维**：确保人数优势，直指胜利
- **关键计算**：当前狼人数/存活人数比例
- **最优目标**：能带票的核心好人玩家

## 风险控制
- **队友保护**：绝不击杀已确认的狼队友
- **身份伪装**：选择能合理解释的目标
- **信息管控**：避免暴露你掌握的关键信息

请分析当前局势并选择最佳击杀目标。`;
}

export function getSeerNightAction(playerServer: PlayerServer, context: SeerContext): string {
  const playerList = formatPlayerList(context.alivePlayers);
  const historyEvents = formatHistoryEvents(['夜间行动阶段']);
  const checkInfo = context.investigatedPlayers ? Object.values(context.investigatedPlayers)
    .map((investigation) => {
      const investigationData = investigation as { target: number; isGood: boolean };
      return `玩家${investigationData.target}是${investigationData.isGood ? '好人' : '狼人'}`;
    })
    .join('，') : '暂无查验结果';
  
  // 添加游戏进度说明，防止AI幻觉
  const gameProgressInfo = context.round === 1 
    ? `【重要提示】现在是第1轮夜间阶段，游戏刚刚开始：
  - 还没有任何白天发言记录
  - 还没有任何投票记录
  - 你只能基于随机性或位置选择查验目标
  - 不要假设或编造不存在的玩家行为`
    : '';
  
  return `你是${playerServer.getPlayerId()}号玩家，狼人杀游戏中的预言家角色。当前游戏状态：
- 存活玩家: [${playerList}]
- 当前轮次: 第${context.round}轮
- 历史事件: ${historyEvents}
- 已查验结果: ${checkInfo}

${gameProgressInfo}

作为预言家，你需要决定：
- action: 固定为'investigate'
- target: 要查验的目标玩家ID（数字，不能是${playerServer.getPlayerId()}）
- reason: 选择该玩家的理由

🔍 查验策略体系：

## 核心原则
- **绝对禁忌**：不能查验自己（${playerServer.getPlayerId()}号玩家）
- **信息价值**：每次查验都要最大化信息获取
- **安全第一**：避免过早暴露预言家身份

## 第1轮查验（T1）
- **随机原则**：基于位置或直觉选择
- **避开风险**：不查验过于活跃的玩家（可能是狼人）
- **平衡考量**：选择中立发言、不引人注目的目标

## 中期查验（T2-T3）
- **优先级排序**：
  1. 行为异常的可疑玩家
  2. 发言逻辑有漏洞的玩家  
  3. 投票行为可疑的玩家
  4. 与确认狼人互动频繁的玩家
- **策略调整**：根据已有查验结果优化后续目标

## 后期查验（T4+）
- **关键验证**：确认最后的疑似狼人
- **胜负手**：查验能决定游戏结果的关键玩家
- **风险评估**：平衡查验收益与暴露风险

## 结果运用策略
- **好人结果**：可以适当为其背书，建立信任
- **狼人结果**：谨慎时机公布，避免被反咬
- **信息整合**：结合夜间死亡和白天投票分析身份

## 身份保护
- **低调行事**：避免过于主动的查人表态
- **合理解释**：为每次查验提供逻辑支撑
- **时机把控**：选择最佳时机公布查验结果

请分析当前局势并选择最佳查验目标。`;
}

export function getWitchNightAction(playerServer: PlayerServer, context: WitchContext): string {
  const playerList = formatPlayerList(context.alivePlayers);
  const historyEvents = formatHistoryEvents(['夜间行动阶段']);
  const potionInfo = context.potionUsed ? 
    `解药${context.potionUsed.heal ? '已用' : '可用'}，毒药${context.potionUsed.poison ? '已用' : '可用'}` 
    : '解药可用，毒药可用';
  
  // 添加游戏进度说明，防止AI幻觉
  const gameProgressInfo = context.round === 1 
    ? `【重要提示】现在是第1轮夜间阶段，游戏刚刚开始：
  - 还没有任何白天发言记录
  - 还没有任何投票记录
  - 你只知道当前存活的玩家和今晚被杀的玩家
  - 请基于当前已知信息做决策，不要假设或编造不存在的信息`
    : '';
  
  return `你是${playerServer.getPlayerId()}号玩家，狼人杀游戏中的女巫角色。当前游戏状态：
- 存活玩家: [${playerList}]
- 当前轮次: 第${context.round}轮
- 今晚被杀玩家ID: ${context.killedTonight || 0} (0表示无人被杀)
- 历史事件: ${historyEvents}

${gameProgressInfo}

你的药水使用情况：
${potionInfo}

作为女巫，你需要决定：
1. 是否使用解药救人（healTarget: 被杀玩家的ID或0表示不救）
2. 是否使用毒药毒人（poisonTarget: 要毒的玩家ID或0表示不毒）
3. action: 'using'（使用任意药水）或'idle'（不使用药水）

💊 女巫用药策略体系：

## 解药使用策略
### 第1轮（T1）解药决策
- **保守使用**：第1轮一般建议救人，保护人数优势
- **身份考量**：被杀玩家位置、发言风格初步判断
- **战略储备**：考虑后续轮次的解药价值

### 中后期解药决策
- **救人优先级**：
  1. 确认的神职角色（预言家、守卫等）
  2. 高价值好人玩家（逻辑强、能带节奏）
  3. 疑似被冤枉的好人
- **不救情况**：
  * 确认的狼人
  * 价值较低的村民
  * 为了保留解药给更重要的时机

## 毒药使用策略
### 使用时机
- **确认狼人**：有明确证据证明是狼人时
- **关键时刻**：人数劣势时需要强行扳回
- **信息整合**：结合预言家查验、行为分析

### 目标选择优先级
1. **确认狼人**：查验结果、行为暴露的狼人
2. **核心狼人**：带节奏、误导能力强的狼人
3. **可疑度最高**：综合分析最像狼人的玩家

### 毒药保留考虑
- **战略价值**：后期毒药价值更高
- **确定性要求**：毒错人代价巨大
- **时机把控**：在最关键时刻使用

## 复合决策（救+毒）
- **第1轮原则**：一般只用解药，保留毒药
- **中期平衡**：根据局势决定是否双药齐用
- **后期决胜**：关键时刻可能需要救+毒扭转局面

## 风险评估
- **误毒风险**：毒死好人的严重后果
- **暴露风险**：用药行为可能暴露女巫身份
- **时机成本**：药水用完后的被动局面

## 决策框架
每次用药前考虑：
1. 当前人数对比和胜负形势
2. 目标玩家的身份确定性
3. 药水的后续战略价值
4. 用药后的解释和伪装方案

注意事项：
- 救人时：healTarget = 被杀玩家ID，poisonTarget = 0
- 毒人时：poisonTarget = 目标玩家ID，healTarget = 0（不救）
- 两样都用：设置对应的target值
- 都不用：action = 'idle'，两个target = 0`;
}

export function getGuardNightAction(playerServer: PlayerServer, context: PlayerContext): string {
  const playerId = playerServer.getPlayerId();
  const params = {
    playerId,
    role: playerServer.getRole(),
    currentRound: context.round,
    alivePlayers: context.alivePlayers,
    historyEvents: [],
    guardHistory: [] as string[]
  };
  const playerList = formatPlayerList(params.alivePlayers);
  const historyEvents = formatHistoryEvents(params.historyEvents);
  const guardInfo = params.guardHistory?.join('，') || '第1夜守护玩家A，第2夜守护玩家B';
  
  return `你是${playerServer.getPlayerId()}号玩家，狼人杀游戏中的守卫角色。当前游戏状态：
- 存活玩家: [${playerList}]
- 当前轮次: 第${context.round}轮
- 历史事件: ${historyEvents}
- 你的守护记录: ${guardInfo}

作为守卫，你的任务是：
1. 选择一名玩家进行守护
2. 保护可能的神职角色
3. 避免连续守护同一玩家

请分析当前局势，特别是：
- 哪些玩家可能是神职角色，需要优先保护？
- 狼人可能会选择击杀谁？
- 如何在白天发言中隐藏身份？`;
}

export function getHunterDeathAction(playerServer: PlayerServer, context: PlayerContext, killedBy: 'werewolf' | 'vote' | 'poison'): string {
  const playerId = playerServer.getPlayerId();
  const params = {
    playerId,
    role: playerServer.getRole(),
    currentRound: context.round,
    alivePlayers: context.alivePlayers,
    historyEvents: [],
    killedBy
  };
  const playerList = formatPlayerList(params.alivePlayers);
  const killedByInfo = params.killedBy === 'werewolf' ? '狼人击杀' : 
                      params.killedBy === 'vote' ? '投票放逐' : '女巫毒杀';
  
  return `你是${playerServer.getPlayerId()}号玩家，狼人杀游戏中的猎人角色。当前游戏状态：
- 存活玩家: [${playerList}]
- 你被${killedByInfo}
- 当前轮次: 第${context.round}轮

作为猎人，你的决策是：
1. 选择一名玩家开枪击杀
2. 优先击杀最可疑的狼人
3. 避免误伤好人
4. 最大化好人阵营收益

请分析当前局势，特别是：
- 哪些玩家最可疑，最可能是狼人？
- 根据之前的发言和行为，谁最值得击杀？
- 如何避免误伤神职角色？`;
}

// 工厂函数 - 统一使用 PlayerServer 和 GameContext
export function getRoleNightAction(playerServer: PlayerServer, context: GameContext): string {
  const role = playerServer.getRole();
  const playerId = playerServer.getPlayerId();
  
  if (!role || playerId === undefined) {
    throw new Error('PlayerServer must have role and playerId set');
  }
  
  switch (role) {
    case Role.VILLAGER:
      throw new Error('Villager has no night action, should be skipped');
    case Role.WEREWOLF: {
      return getWerewolfNightAction(playerServer, context as PlayerContext);
    }
    case Role.SEER: {
      return getSeerNightAction(playerServer, context as SeerContext);
    }
    case Role.WITCH: {
      return getWitchNightAction(playerServer, context as WitchContext);
    }
    default:
      throw new Error(`Unknown role: ${role}`);
  }
}