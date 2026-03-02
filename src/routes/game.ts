import { Hono } from 'hono'

export const gameRouter = new Hono()

// ゲームデータ定義
const eventCards = [
  { id: 1,  type: 'luck',   title: '🍀 大当たり！',     desc: '宝くじが当たった！',           effect: 5000,  emoji: '🎉' },
  { id: 2,  type: 'luck',   title: '💼 昇給！',          desc: '給料が上がりました！',          effect: 3000,  emoji: '📈' },
  { id: 3,  type: 'luck',   title: '🎁 プレゼント！',    desc: 'おじいちゃんからお小遣い！',    effect: 2000,  emoji: '🎁' },
  { id: 4,  type: 'luck',   title: '📦 フリマ成功！',    desc: '不用品を高く売れた！',          effect: 1500,  emoji: '💰' },
  { id: 5,  type: 'luck',   title: '🏆 表彰！',          desc: '発明コンテストで入賞！',        effect: 4000,  emoji: '🥇' },
  { id: 6,  type: 'luck',   title: '💹 株価上昇！',      desc: 'テクノロジー株が急上昇！',      effect: 2500,  emoji: '🚀' },
  { id: 7,  type: 'bad',    title: '🏥 病院代',          desc: '病気になってしまった…',         effect: -2000, emoji: '😷' },
  { id: 8,  type: 'bad',    title: '📉 株価下落',        desc: '市場が暴落…',                  effect: -3000, emoji: '😱' },
  { id: 9,  type: 'bad',    title: '🔧 修理代',          desc: '車が壊れた！修理費が…',         effect: -1500, emoji: '🔧' },
  { id: 10, type: 'bad',    title: '💸 罰金',            desc: '駐車違反の罰金…',              effect: -1000, emoji: '🚔' },
  { id: 11, type: 'bad',    title: '🌧 天災',            desc: '洪水で家が被害を受けた',        effect: -2500, emoji: '🌊' },
  { id: 12, type: 'chance', title: '🎲 チャンス！',      desc: '投資の好機！株を安く買える',    effect: 0,     emoji: '🎯' },
  { id: 13, type: 'chance', title: '🤝 ビジネス提案',   desc: '新事業への投資チャンス！',      effect: 0,     emoji: '💡' },
  { id: 14, type: 'chance', title: '📚 学習ボーナス',   desc: '勉強したので投資センスUP！',    effect: 1000,  emoji: '📚' },
]

const stockItems = [
  { id: 'tech',   name: '🖥️ テクノロジー', emoji: '🖥️', basePrice: 10000, volatility: 0.3,  desc: 'パソコンやスマホの会社' },
  { id: 'food',   name: '🍔 フード',       emoji: '🍔', basePrice: 5000,  volatility: 0.15, desc: '食品・レストランの会社' },
  { id: 'energy', name: '⚡ エネルギー',   emoji: '⚡', basePrice: 8000,  volatility: 0.2,  desc: '電気・ガスの会社' },
  { id: 'game',   name: '🎮 ゲーム',       emoji: '🎮', basePrice: 12000, volatility: 0.35, desc: 'ゲームを作る会社' },
  { id: 'health', name: '💊 ヘルス',       emoji: '💊', basePrice: 7000,  volatility: 0.18, desc: 'お薬・病院の会社' },
  { id: 'eco',    name: '🌱 エコ',         emoji: '🌱', basePrice: 6000,  volatility: 0.22, desc: '環境に優しい会社' },
]

const realEstates = [
  { id: 're1', name: '🏠 小さな家',  emoji: '🏠', price: 30000, rentPerTurn: 1500, desc: '住宅街の一軒家' },
  { id: 're2', name: '🏢 マンション',emoji: '🏢', price: 60000, rentPerTurn: 3000, desc: 'シティの高級マンション' },
  { id: 're3', name: '🏪 お店',      emoji: '🏪', price: 25000, rentPerTurn: 2000, desc: '商店街のお店' },
  { id: 're4', name: '🏨 ホテル',    emoji: '🏨', price: 80000, rentPerTurn: 5000, desc: '人気観光地のホテル' },
  { id: 're5', name: '🌾 農場',      emoji: '🌾', price: 20000, rentPerTurn: 1200, desc: '広い農業用の土地' },
]

// 株価更新
function updateStockPrices(stocks: Record<string, number>): Record<string, number> {
  const updated: Record<string, number> = {}
  for (const stock of stockItems) {
    const current = stocks[stock.id] || stock.basePrice
    const change = (Math.random() - 0.48) * stock.volatility * current
    updated[stock.id] = Math.max(100, Math.round(current + change))
  }
  return updated
}

// 資産再計算
function recalcAssets(player: any, stockPrices: Record<string, number>): number {
  let stockValue = 0
  for (const [sid, qty] of Object.entries(player.stocks)) {
    stockValue += (stockPrices[sid] || 0) * (qty as number)
  }
  let reValue = 0
  for (const reId of player.realEstate) {
    const re = realEstates.find(r => r.id === reId)
    if (re) reValue += re.price * 0.8
  }
  return player.cash + stockValue + reValue
}

// ===== ゲームスタート =====
gameRouter.post('/start', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  // players: [{name, isAI}] の配列を受け取る
  const playerDefs: Array<{name: string, isAI: boolean}> = body.players || [
    { name: 'プレイヤー1', isAI: false }
  ]
  const maxTurns = body.maxTurns || 10

  const initialStocks: Record<string, number> = {}
  for (const s of stockItems) initialStocks[s.id] = s.basePrice

  const players = playerDefs.map((pd, i) => ({
    id: i,
    name: pd.name || `プレイヤー${i + 1}`,
    isAI: !!pd.isAI,
    cash: 50000,
    stocks: {} as Record<string, number>,
    realEstate: [] as string[],
    totalAssets: 50000,
    roundIncome: 0,
  }))

  const gameState = {
    players,
    currentPlayer: 0,
    turn: 1,
    maxTurns,
    phase: 'action',
    stockPrices: initialStocks,
    lastEvent: null as typeof eventCards[0] | null,
    gameOver: false,
    winner: null as number | null,
    log: [`🎮 ゲームスタート！${players.length}人でプレイします！`],
    stockItems,
    realEstates,
    // ホットシート専用フラグ
    needsHandoff: false,   // 次プレイヤーへの引き継ぎ待ち
    handoffTo: null as number | null,
  }

  return c.json({ success: true, state: gameState })
})

// ===== アクション処理 =====
gameRouter.post('/action', async (c) => {
  const { state, action } = await c.req.json()
  const newState = { ...state }
  const player = { ...newState.players[newState.currentPlayer] }
  let logMsg = ''

  switch (action.type) {
    case 'buy_stock': {
      const stock = stockItems.find(s => s.id === action.stockId)
      if (!stock) break
      const price = newState.stockPrices[action.stockId]
      const qty = action.qty || 1
      const total = price * qty
      if (player.cash >= total) {
        player.cash -= total
        player.stocks[action.stockId] = (player.stocks[action.stockId] || 0) + qty
        logMsg = `📈 ${player.name}が${stock.name}を${qty}株 ¥${total.toLocaleString()}で購入！`
      } else {
        return c.json({ success: false, error: 'お金が足りません！' })
      }
      break
    }
    case 'sell_stock': {
      const stock = stockItems.find(s => s.id === action.stockId)
      if (!stock) break
      const qty = action.qty || 1
      const held = player.stocks[action.stockId] || 0
      if (held < qty) return c.json({ success: false, error: '株が足りません！' })
      const price = newState.stockPrices[action.stockId]
      const total = price * qty
      player.cash += total
      player.stocks[action.stockId] = held - qty
      logMsg = `📉 ${player.name}が${stock.name}を${qty}株 ¥${total.toLocaleString()}で売却！`
      break
    }
    case 'buy_realestate': {
      const re = realEstates.find(r => r.id === action.reId)
      if (!re) break
      if (player.realEstate.includes(re.id)) return c.json({ success: false, error: 'すでに持っています！' })
      if (player.cash < re.price) return c.json({ success: false, error: 'お金が足りません！' })
      player.cash -= re.price
      player.realEstate.push(re.id)
      logMsg = `🏠 ${player.name}が${re.name}を ¥${re.price.toLocaleString()}で購入！`
      break
    }
  }

  player.totalAssets = recalcAssets(player, newState.stockPrices)
  newState.players[newState.currentPlayer] = player
  if (logMsg) newState.log = [logMsg, ...newState.log.slice(0, 19)]

  return c.json({ success: true, state: newState })
})

// ===== ターン終了処理 =====
gameRouter.post('/next-turn', async (c) => {
  const { state } = await c.req.json()
  let newState = { ...state, needsHandoff: false, handoffTo: null }

  // イベントカード
  const card = eventCards[Math.floor(Math.random() * eventCards.length)]
  newState.lastEvent = card

  // 現在プレイヤーへ効果適用
  const player = { ...newState.players[newState.currentPlayer] }
  if (card.effect !== 0) {
    player.cash = Math.max(0, player.cash + card.effect)
    player.roundIncome = card.effect
  }

  // 家賃収入
  let rentIncome = 0
  for (const reId of player.realEstate) {
    const re = realEstates.find(r => r.id === reId)
    if (re) rentIncome += re.rentPerTurn
  }
  player.cash += rentIncome
  player.totalAssets = recalcAssets(player, newState.stockPrices)
  newState.players[newState.currentPlayer] = player

  let logMsg = `${card.emoji} ${card.title}: ${card.desc}`
  if (rentIncome > 0) logMsg += ` | 🏠 家賃収入 ¥${rentIncome.toLocaleString()}`
  newState.log = [logMsg, ...newState.log.slice(0, 19)]

  // 次のプレイヤーへ
  const nextPlayer = (newState.currentPlayer + 1) % newState.players.length
  const newTurn = nextPlayer === 0 ? newState.turn + 1 : newState.turn

  // 株価更新（1周したら）
  if (nextPlayer === 0) {
    newState.stockPrices = updateStockPrices(newState.stockPrices)
    newState.log = [`📊 株価が更新されました！ターン${newTurn}開始`, ...newState.log.slice(0, 19)]
  }

  // ゲーム終了判定
  if (newTurn > newState.maxTurns && nextPlayer === 0) {
    newState.gameOver = true
    const winner = newState.players.reduce((best: any, p: any) =>
      p.totalAssets > best.totalAssets ? p : best
    )
    newState.winner = winner.id
    newState.log = [`🏆 ゲーム終了！${winner.name}の勝利！総資産 ¥${winner.totalAssets.toLocaleString()}`, ...newState.log.slice(0, 19)]
    newState.currentPlayer = nextPlayer
    newState.turn = newTurn
  } else {
    newState.currentPlayer = nextPlayer
    newState.turn = newTurn
    newState.phase = 'action'

    // AI なら自動処理、人間なら引き継ぎ待ち
    if (newState.players[nextPlayer].isAI) {
      newState = await processAITurn(newState)
      // AI の後に人間が来るかもしれないので再チェック
      // AI が連続する場合ループ
      while (newState.players[newState.currentPlayer].isAI && !newState.gameOver) {
        newState = await processAITurn(newState)
        const np2 = (newState.currentPlayer + 1) % newState.players.length
        const nt2 = np2 === 0 ? newState.turn + 1 : newState.turn
        if (nt2 > newState.maxTurns && np2 === 0) {
          newState.gameOver = true
          break
        }
        newState.currentPlayer = np2
        newState.turn = nt2
      }
    } else {
      // 人間プレイヤーへの引き継ぎが必要
      newState.needsHandoff = true
      newState.handoffTo = nextPlayer
    }
  }

  return c.json({ success: true, state: newState })
})

// AIターン処理（1ターン分の行動＋イベント適用）
async function processAITurn(state: any) {
  const ai = { ...state.players[state.currentPlayer] }
  const logs: string[] = []

  const rand = Math.random()
  if (rand < 0.4 && ai.cash > 10000) {
    const affordable = stockItems.filter(s => state.stockPrices[s.id] <= ai.cash)
    if (affordable.length > 0) {
      const stock = affordable[Math.floor(Math.random() * affordable.length)]
      ai.cash -= state.stockPrices[stock.id]
      ai.stocks[stock.id] = (ai.stocks[stock.id] || 0) + 1
      logs.push(`🤖 ${ai.name}が${stock.name}を購入`)
    }
  } else if (rand < 0.5 && ai.cash > 20000) {
    const available = realEstates.filter(r => !ai.realEstate.includes(r.id) && r.price <= ai.cash)
    if (available.length > 0) {
      const re = available[Math.floor(Math.random() * available.length)]
      ai.cash -= re.price
      ai.realEstate.push(re.id)
      logs.push(`🤖 ${ai.name}が${re.name}を購入`)
    }
  } else if (rand < 0.6) {
    const held = Object.entries(ai.stocks).filter(([_, q]) => (q as number) > 0)
    if (held.length > 0) {
      const [sid] = held[Math.floor(Math.random() * held.length)]
      const stock = stockItems.find(s => s.id === sid)
      ai.cash += state.stockPrices[sid]
      ai.stocks[sid] = (ai.stocks[sid] as number) - 1
      logs.push(`🤖 ${ai.name}が${stock?.name}を売却`)
    }
  }

  // AIのイベントカード
  const card = eventCards[Math.floor(Math.random() * eventCards.length)]
  if (card.effect !== 0) ai.cash = Math.max(0, ai.cash + card.effect)
  let rentIncome = 0
  for (const reId of ai.realEstate) {
    const re = realEstates.find(r => r.id === reId)
    if (re) rentIncome += re.rentPerTurn
  }
  ai.cash += rentIncome
  ai.totalAssets = recalcAssets(ai, state.stockPrices)
  state.players[state.currentPlayer] = ai

  logs.push(`🤖 ${ai.name}: ${card.emoji}${card.title}`)
  for (const log of logs) {
    state.log = [log, ...state.log.slice(0, 19)]
  }

  return state
}

// ゲームデータ取得
gameRouter.get('/data', (c) => {
  return c.json({ stockItems, realEstates, eventCards })
})
