import { Hono } from 'hono'
export const gameRouter = new Hono()

// ============================================================
// 定数・マスタデータ
// ============================================================

export const COMPANIES = [
  {
    id: 'restaurant', name: '飲食店', emoji: '🍜', cost: 500,
    desc: '人気のレストラン。サイコロの目で収益が変わる',
    rolls: [
      { range: [1,2], effect: -500,  label: 'マイナス500円' },
      { range: [3,4], effect:  500,  label: 'プラス500円' },
      { range: [5,6], effect: 1500,  label: 'プラス1500円' },
    ],
    upgradeCost: 5000, upgradeTo: 'restaurant3',
  },
  {
    id: 'restaurant3', name: '三ツ星レストラン', emoji: '⭐', cost: 500,
    desc: 'ミシュラン三ツ星！1以外はプラス2000円',
    rolls: [
      { range: [1,1], effect: -500,  label: 'マイナス500円' },
      { range: [2,6], effect: 2000,  label: 'プラス2000円' },
    ],
    upgradeCost: null, upgradeTo: null,
  },
  {
    id: 'bank', name: '金融機関', emoji: '🏦', cost: 2500,
    desc: '他プレイヤーに融資できる。最終ターンに全額回収',
    rolls: [], // サイコロなし・特殊
    upgradeCost: null, upgradeTo: null,
  },
  {
    id: 'bus', name: 'バス会社', emoji: '🚌', cost: 1000,
    desc: '5・6が出たら追加行動が可能になる',
    rolls: [
      { range: [1,4], effect: 0,     label: '何もなし' },
      { range: [5,6], effect: 0,     label: '追加行動ボーナス！', bonus: 'extra_action' },
    ],
    upgradeCost: 5000, upgradeTo: 'railway',
  },
  {
    id: 'railway', name: '鉄道会社', emoji: '🚄', cost: 1000,
    desc: '5・6が出たらもう一度ターンが回ってくる',
    rolls: [
      { range: [1,4], effect: 0,     label: '何もなし' },
      { range: [5,6], effect: 0,     label: '再ターン！', bonus: 'extra_turn' },
    ],
    upgradeCost: null, upgradeTo: null,
  },
  {
    id: 'media', name: 'メディア', emoji: '📺', cost: 2500,
    desc: '注目度でお金が集まる！他プレイヤーから広告費をもらえる',
    rolls: [
      { range: [1,2], effect: 0,     label: '好きな人から2500円の広告費！', bonus: 'take_2500' },
      { range: [3,4], effect: 0,     label: '好きな人から1250円の広告費！', bonus: 'take_1250' },
      { range: [5,6], effect: 0,     label: '視聴率低迷…何も起こらない' },
    ],
    upgradeCost: null, upgradeTo: null,
  },
]

export const STOCKS = [
  {
    id: 'japan', name: '日本株', emoji: '🇯🇵', buyPrice: 500,
    desc: '偶数で1500円、奇数でマイナス1000円',
    rolls: [
      { parity: 'even', effect: 1500, label: 'プラス1500円！' },
      { parity: 'odd',  effect: -1000, label: 'マイナス1000円…' },
    ],
  },
  {
    id: 'foreign', name: '外国株', emoji: '🌍', buyPrice: 1000,
    desc: '偶数で2500円、奇数でマイナス1500円',
    rolls: [
      { parity: 'even', effect: 2500, label: 'プラス2500円！' },
      { parity: 'odd',  effect: -1500, label: 'マイナス1500円…' },
    ],
  },
]

export const EVENT_CARDS = [
  { id: 1,  name: 'インフレーション',   emoji: '📈', desc: '会社の利益が2倍になる（今ターンのみ）',            type: 'company_profit_x2' },
  { id: 2,  name: 'デフレーション',     emoji: '📉', desc: '会社の損害が2倍になる（今ターンのみ）',            type: 'company_loss_x2'   },
  { id: 3,  name: '就労支援',           emoji: '👷', desc: '働く金額が3倍になる（今ターンのみ）',              type: 'work_x3'           },
  { id: 4,  name: '株価高騰',           emoji: '🚀', desc: '株の購入額2倍・売値/配当も2倍（今ターンのみ）',    type: 'stock_x2'          },
  { id: 5,  name: '株価暴落',           emoji: '💥', desc: '株の購入額½・売値/配当も½（今ターンのみ）',        type: 'stock_half'        },
  { id: 6,  name: '倒産',              emoji: '🏚️', desc: '引いた人が持つ会社を全て売却しなければならない',    type: 'bankruptcy'        },
  { id: 7,  name: '利息UP',            emoji: '💰', desc: 'ATMの利息が2倍になる（今ターンのみ）',             type: 'interest_x2'       },
  { id: 8,  name: 'サイコロ偶数固定',   emoji: '🎲', desc: 'このターンのサイコロが必ず偶数になる',             type: 'dice_even'         },
  { id: 9,  name: 'サイコロ奇数固定',   emoji: '🎲', desc: 'このターンのサイコロが必ず奇数になる',             type: 'dice_odd'          },
  { id: 10, name: '投資家イベント',     emoji: '🤝', desc: '資産最少のプレイヤーに全員が1000円ずつ渡す',       type: 'charity'           },
]

// ATM利息テーブル
function calcInterest(atm: number): number {
  if (atm >= 3500) return 600
  if (atm >= 2600) return 300
  if (atm >= 1500) return 200
  if (atm >= 200)  return 100
  return 0
}

// 会社のロール結果計算
function calcCompanyRoll(companyId: string, dice: number, eventTypes: string[]): { effect: number, label: string, bonus?: string } {
  const comp = COMPANIES.find(c => c.id === companyId)
  if (!comp || comp.rolls.length === 0) return { effect: 0, label: '' }
  const roll = comp.rolls.find(r => dice >= r.range[0] && dice <= r.range[1])
  if (!roll) return { effect: 0, label: '' }

  let effect = roll.effect
  if (effect > 0 && eventTypes.includes('company_profit_x2')) effect *= 2
  if (effect < 0 && eventTypes.includes('company_loss_x2'))   effect *= 2

  return { effect, label: roll.label, bonus: (roll as any).bonus }
}

// ============================================================
// ゲームスタート
// ============================================================
gameRouter.post('/start', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const playerDefs: { name: string, isAI: boolean }[] = body.players || [{ name: 'プレイヤー1', isAI: false }]
  const maxYears: number = body.maxYears || 10

  const players = playerDefs.map((pd, i) => ({
    id: i,
    name: pd.name || `プレイヤー${i+1}`,
    isAI: !!pd.isAI,
    cash: 600,          // 初期資金600円
    atm: 0,             // ATM残高
    stocks: [] as { id: string, qty: number, buyPrice: number }[],
    companies: [] as string[],   // 保有会社ID
    loans: [] as { toPlayerId: number, amount: number, yearlyInterest: number }[], // 貸付（金融機関持ちのみ）
    debts: [] as { fromPlayerId: number, amount: number, yearlyInterest: number }[], // 借入
    totalAssets: 600,
    actionUsed: 0,       // 今ターンに使った行動数（0 or 1、特殊で2まで）
    extraAction: false,  // バス/鉄道で追加行動付与済み
    extraTurn: false,    // 鉄道で再ターン付与済み
    skipTurn: false,
  }))

  const state = {
    players,
    year: 1,
    maxYears,
    // フェーズ: setup_order | action | company_roll | event | interest | pass | result
    phase: 'action',
    turnOrder: players.map((_,i) => i), // ATM順（初年度は登録順）
    currentTurnIdx: 0,  // turnOrder の何番目か
    currentPlayer: 0,
    eventCard: null as typeof EVENT_CARDS[0] | null,
    activeEventTypes: [] as string[],  // このターン有効なイベント効果
    log: [`⚔️ Capital Wars スタート！${players.length}人で資本戦争開始！初期資金600円。`],
    companies: COMPANIES,
    stocks: STOCKS,
    eventCards: EVENT_CARDS,
    needsHandoff: false,
    handoffTo: null as number | null,
    // 融資関係
    pendingBankAction: null as any,
    // メディア効果の対象選択
    pendingShrineBonus: null as null | { amount: number, ownerId: number },
    // チャリティ（投資家イベント）
    charityProcessed: false,
    diceFixed: null as null | 'even' | 'odd',
  }

  // 初回ターン順をセット（全員ATM=0なのでそのまま）
  state.turnOrder = buildTurnOrder(state.players)
  state.currentPlayer = state.turnOrder[0]

  return c.json({ success: true, state })
})

// ターン順を ATM 残高の多い順でソート（同値はIDで安定ソート）
function buildTurnOrder(players: any[]): number[] {
  return [...players]
    .sort((a, b) => b.atm !== a.atm ? b.atm - a.atm : a.id - b.id)
    .map(p => p.id)
}

// ============================================================
// サイコロ
// ============================================================
gameRouter.post('/roll-dice', async (c) => {
  const { state } = await c.req.json()
  let dice = Math.floor(Math.random() * 6) + 1

  // イベント固定
  if (state.diceFixed === 'even' && dice % 2 !== 0) dice = dice === 6 ? 2 : dice + 1
  if (state.diceFixed === 'odd'  && dice % 2 === 0) dice = dice === 1 ? 3 : dice - 1

  return c.json({ success: true, dice })
})

// ============================================================
// アクション：働く
// ============================================================
gameRouter.post('/action/work', async (c) => {
  const { state } = await c.req.json()
  const ns = deepCopy(state)
  const p = ns.players[ns.currentPlayer]
  if (!canAct(p)) return c.json({ success: false, error: 'これ以上行動できません' })

  let earn = 100
  if (ns.activeEventTypes.includes('work_x3')) earn = 300

  p.cash += earn
  p.actionUsed++
  recalcAssets(p, ns)
  ns.log = [`💼 ${p.name}が働いて${earn}円もらった！`, ...ns.log.slice(0,29)]

  return c.json({ success: true, state: ns })
})

// ============================================================
// アクション：ATM 預金
// ============================================================
gameRouter.post('/action/deposit', async (c) => {
  const { state, amount } = await c.req.json()
  const ns = deepCopy(state)
  const p = ns.players[ns.currentPlayer]
  if (!canAct(p)) return c.json({ success: false, error: 'これ以上行動できません' })
  if (amount <= 0 || p.cash < amount) return c.json({ success: false, error: '現金が足りません' })

  p.cash -= amount
  p.atm  += amount
  p.actionUsed++
  recalcAssets(p, ns)
  ns.log = [`🏧 ${p.name}がATMに${amount}円を預けた（残高: ${p.atm}円）`, ...ns.log.slice(0,29)]

  return c.json({ success: true, state: ns })
})

// ============================================================
// アクション：ATM 引き落とし
// ============================================================
gameRouter.post('/action/withdraw', async (c) => {
  const { state, amount } = await c.req.json()
  const ns = deepCopy(state)
  const p = ns.players[ns.currentPlayer]
  if (!canAct(p)) return c.json({ success: false, error: 'これ以上行動できません' })
  if (amount <= 0 || p.atm < amount) return c.json({ success: false, error: 'ATM残高が足りません' })

  p.atm  -= amount
  p.cash += amount
  p.actionUsed++
  recalcAssets(p, ns)
  ns.log = [`🏧 ${p.name}がATMから${amount}円を引き出した`, ...ns.log.slice(0,29)]

  return c.json({ success: true, state: ns })
})

// ============================================================
// アクション：会社を買う
// ============================================================
gameRouter.post('/action/buy-company', async (c) => {
  const { state, companyId } = await c.req.json()
  const ns = deepCopy(state)
  const p = ns.players[ns.currentPlayer]
  if (!canAct(p)) return c.json({ success: false, error: 'これ以上行動できません' })

  const comp = COMPANIES.find(c => c.id === companyId)
  if (!comp) return c.json({ success: false, error: '会社が見つかりません' })
  if (p.cash < comp.cost) return c.json({ success: false, error: '現金が足りません' })
  if (p.companies.includes(companyId)) return c.json({ success: false, error: 'すでに所有しています' })

  p.cash -= comp.cost
  p.companies.push(companyId)
  p.actionUsed++
  recalcAssets(p, ns)
  ns.log = [`🏢 ${p.name}が「${comp.emoji}${comp.name}」を${comp.cost}円で購入！`, ...ns.log.slice(0,29)]

  return c.json({ success: true, state: ns })
})

// ============================================================
// アクション：会社をアップグレード
// ============================================================
gameRouter.post('/action/upgrade-company', async (c) => {
  const { state, companyId } = await c.req.json()
  const ns = deepCopy(state)
  const p = ns.players[ns.currentPlayer]
  if (!canAct(p)) return c.json({ success: false, error: 'これ以上行動できません' })

  const comp = COMPANIES.find(c => c.id === companyId)
  if (!comp || !comp.upgradeTo) return c.json({ success: false, error: 'アップグレード不可' })
  if (!p.companies.includes(companyId)) return c.json({ success: false, error: '所有していません' })
  if (comp.upgradeCost === null || p.cash < comp.upgradeCost)
    return c.json({ success: false, error: '現金が足りません' })

  p.cash -= comp.upgradeCost
  p.companies = p.companies.filter((id: string) => id !== companyId)
  p.companies.push(comp.upgradeTo)
  p.actionUsed++
  recalcAssets(p, ns)
  const newComp = COMPANIES.find(c => c.id === comp.upgradeTo)
  ns.log = [`⬆️ ${p.name}が「${comp.emoji}${comp.name}」を「${newComp?.emoji}${newComp?.name}」にアップグレード！`, ...ns.log.slice(0,29)]

  return c.json({ success: true, state: ns })
})

// ============================================================
// アクション：会社を売却
// ============================================================
gameRouter.post('/action/sell-company', async (c) => {
  const { state, companyId } = await c.req.json()
  const ns = deepCopy(state)
  const p = ns.players[ns.currentPlayer]

  const comp = COMPANIES.find(c => c.id === companyId)
  if (!comp) return c.json({ success: false, error: '会社が見つかりません' })
  if (!p.companies.includes(companyId)) return c.json({ success: false, error: '所有していません' })

  const sellPrice = Math.floor(comp.cost * 0.5) // 半額で売却
  p.cash += sellPrice
  p.companies = p.companies.filter((id: string) => id !== companyId)
  recalcAssets(p, ns)
  ns.log = [`💸 ${p.name}が「${comp.emoji}${comp.name}」を${sellPrice}円で売却`, ...ns.log.slice(0,29)]

  return c.json({ success: true, state: ns })
})

// ============================================================
// アクション：サイコロを振って会社収益を得る
// ============================================================
gameRouter.post('/action/company-roll', async (c) => {
  const { state, companyId, dice } = await c.req.json()
  const ns = deepCopy(state)
  const p = ns.players[ns.currentPlayer]
  if (!canAct(p)) return c.json({ success: false, error: 'これ以上行動できません' })
  if (!p.companies.includes(companyId)) return c.json({ success: false, error: '所有していません' })

  const { effect, label, bonus } = calcCompanyRoll(companyId, dice, ns.activeEventTypes)
  const comp = COMPANIES.find(c => c.id === companyId)!

  let bonusResult = null
  if (bonus === 'extra_action') {
    p.extraAction = true
    ns.log = [`🎲 ${p.name}の「${comp.emoji}${comp.name}」: サイコロ${dice} → ${label}`, ...ns.log.slice(0,29)]
  } else if (bonus === 'extra_turn') {
    p.extraTurn = true
    ns.log = [`🎲 ${p.name}の「${comp.emoji}${comp.name}」: サイコロ${dice} → ${label}`, ...ns.log.slice(0,29)]
  } else if (bonus === 'take_2500' || bonus === 'take_1250') {
    const amt = bonus === 'take_2500' ? 2500 : 1250
    ns.pendingShrineBonus = { amount: amt, ownerId: ns.currentPlayer }
    bonusResult = bonus
    ns.log = [`🎲 ${p.name}の「${comp.emoji}${comp.name}」: サイコロ${dice} → ${label}`, ...ns.log.slice(0,29)]
  } else {
    p.cash += effect
    if (effect !== 0) {
      ns.log = [`🎲 ${p.name}の「${comp.emoji}${comp.name}」: サイコロ${dice} → ${label}（${effect > 0 ? '+' : ''}${effect}円）`, ...ns.log.slice(0,29)]
    } else {
      ns.log = [`🎲 ${p.name}の「${comp.emoji}${comp.name}」: サイコロ${dice} → ${label}`, ...ns.log.slice(0,29)]
    }
  }

  p.actionUsed++
  recalcAssets(p, ns)

  return c.json({ success: true, state: ns, effect, label, bonus: bonusResult })
})

// ============================================================
// アクション：株を買う
// ============================================================
gameRouter.post('/action/buy-stock', async (c) => {
  const { state, stockId, qty } = await c.req.json()
  const ns = deepCopy(state)
  const p = ns.players[ns.currentPlayer]
  if (!canAct(p)) return c.json({ success: false, error: 'これ以上行動できません' })

  const st = STOCKS.find(s => s.id === stockId)
  if (!st) return c.json({ success: false, error: '株が見つかりません' })

  let price = st.buyPrice * (qty || 1)
  if (ns.activeEventTypes.includes('stock_x2'))   price *= 2
  if (ns.activeEventTypes.includes('stock_half'))  price = Math.floor(price / 2)

  if (p.cash < price) return c.json({ success: false, error: '現金が足りません' })

  p.cash -= price
  const existing = p.stocks.find((s: any) => s.id === stockId)
  if (existing) {
    existing.qty += (qty || 1)
    existing.buyPrice = st.buyPrice
  } else {
    p.stocks.push({ id: stockId, qty: qty || 1, buyPrice: st.buyPrice })
  }
  p.actionUsed++
  recalcAssets(p, ns)
  ns.log = [`📈 ${p.name}が${st.emoji}${st.name}を${qty||1}株 ${price}円で購入！`, ...ns.log.slice(0,29)]

  return c.json({ success: true, state: ns })
})

// ============================================================
// アクション：株の配当を得る（サイコロを振る）
// ============================================================
gameRouter.post('/action/stock-roll', async (c) => {
  const { state, stockId, dice } = await c.req.json()
  const ns = deepCopy(state)
  const p = ns.players[ns.currentPlayer]
  if (!canAct(p)) return c.json({ success: false, error: 'これ以上行動できません' })

  const st = STOCKS.find(s => s.id === stockId)
  if (!st) return c.json({ success: false, error: '株が見つかりません' })
  const holding = p.stocks.find((s: any) => s.id === stockId)
  if (!holding || holding.qty === 0) return c.json({ success: false, error: '株を保有していません' })

  const parity = dice % 2 === 0 ? 'even' : 'odd'
  const roll = st.rolls.find(r => r.parity === parity)!
  let effect = roll.effect * holding.qty
  if (ns.activeEventTypes.includes('stock_x2'))   effect = effect > 0 ? effect * 2 : Math.floor(effect * 2)
  if (ns.activeEventTypes.includes('stock_half'))  effect = Math.floor(effect / 2)

  p.cash = Math.max(0, p.cash + effect)
  p.actionUsed++
  recalcAssets(p, ns)
  ns.log = [`🎲 ${p.name}の${st.emoji}${st.name}: サイコロ${dice} → ${roll.label}（${effect > 0 ? '+' : ''}${effect}円）`, ...ns.log.slice(0,29)]

  return c.json({ success: true, state: ns, effect, label: roll.label })
})

// ============================================================
// アクション：融資する（金融機関オーナーのみ）
// ============================================================
gameRouter.post('/action/lend', async (c) => {
  const { state, toPlayerId, amount } = await c.req.json()
  const ns = deepCopy(state)
  const p = ns.players[ns.currentPlayer]

  if (!p.companies.includes('bank'))
    return c.json({ success: false, error: '金融機関を所有していません' })
  if (p.cash < amount)
    return c.json({ success: false, error: '現金が足りません' })

  const target = ns.players[toPlayerId]
  const yearlyInterest = amount <= 2500 ? 500 : 1000

  p.cash -= amount
  p.loans.push({ toPlayerId, amount, yearlyInterest })
  target.cash += amount
  target.debts.push({ fromPlayerId: ns.currentPlayer, amount, yearlyInterest })

  ns.log = [`🏦 ${p.name}が${target.name}に${amount}円融資（年利${yearlyInterest}円）`, ...ns.log.slice(0,29)]
  return c.json({ success: true, state: ns })
})

// ============================================================
// アクション：借金を返済する
// ============================================================
gameRouter.post('/action/repay', async (c) => {
  const { state, fromPlayerId, amount } = await c.req.json()
  const ns = deepCopy(state)
  const p = ns.players[ns.currentPlayer]

  const debt = p.debts.find((d: any) => d.fromPlayerId === fromPlayerId)
  if (!debt) return c.json({ success: false, error: '借入が見つかりません' })
  if (p.cash < amount) return c.json({ success: false, error: '現金が足りません' })

  const repay = Math.min(amount, debt.amount)
  p.cash  -= repay
  debt.amount -= repay
  const lender = ns.players[fromPlayerId]
  lender.cash += repay
  const loan = lender.loans.find((l: any) => l.toPlayerId === ns.currentPlayer)
  if (loan) loan.amount -= repay
  if (debt.amount <= 0) p.debts = p.debts.filter((d: any) => d.fromPlayerId !== fromPlayerId)

  ns.log = [`💳 ${p.name}が${lender.name}に${repay}円返済`, ...ns.log.slice(0,29)]
  return c.json({ success: true, state: ns })
})

// ============================================================
// メディア：対象プレイヤーから広告費を徴収
// ============================================================
gameRouter.post('/action/shrine-collect', async (c) => {
  const { state, targetPlayerId } = await c.req.json()
  const ns = deepCopy(state)
  if (!ns.pendingShrineBonus) return c.json({ success: false, error: 'メディア効果がありません' })

  const { amount, ownerId } = ns.pendingShrineBonus
  const owner  = ns.players[ownerId]
  const target = ns.players[targetPlayerId]

  const actual = Math.min(amount, target.cash)
  target.cash -= actual
  owner.cash  += actual
  ns.pendingShrineBonus = null

  recalcAssets(owner, ns)
  recalcAssets(target, ns)
  ns.log = [`📺 ${owner.name}が${target.name}から広告費${actual}円を受け取った！`, ...ns.log.slice(0,29)]

  return c.json({ success: true, state: ns })
})

// ============================================================
// ターン終了 → 次プレイヤーへ / 年末処理
// ============================================================
gameRouter.post('/end-turn', async (c) => {
  const { state } = await c.req.json()
  let ns = deepCopy(state)

  // 現プレイヤーのリセット
  const cp = ns.players[ns.currentPlayer]
  cp.actionUsed  = 0
  cp.extraAction = false

  // 再ターン（鉄道会社）
  if (cp.extraTurn) {
    cp.extraTurn = false
    ns.log = [`🚄 ${cp.name}の鉄道会社効果で再ターン！`, ...ns.log.slice(0,29)]
    ns.needsHandoff = !cp.isAI
    ns.handoffTo    = cp.isAI ? null : ns.currentPlayer
    return c.json({ success: true, state: ns })
  }

  // 次プレイヤーへ
  ns.currentTurnIdx++

  if (ns.currentTurnIdx >= ns.turnOrder.length) {
    // 全員ターン終了 → 年末処理
    ns = processYearEnd(ns)
  } else {
    ns.currentPlayer = ns.turnOrder[ns.currentTurnIdx]
    const np = ns.players[ns.currentPlayer]
    ns.log = [`🔄 ${np.name}のターンです`, ...ns.log.slice(0,29)]
    ns.needsHandoff = !np.isAI
    ns.handoffTo    = np.isAI ? null : ns.currentPlayer
  }

  return c.json({ success: true, state: ns })
})

// ============================================================
// 年末処理
// ============================================================
function processYearEnd(ns: any): any {
  // ATM利息
  let interestMultiplier = ns.activeEventTypes.includes('interest_x2') ? 2 : 1
  for (const p of ns.players) {
    const interest = calcInterest(p.atm) * interestMultiplier
    if (interest > 0) {
      p.atm += interest
      ns.log = [`💴 ${p.name}のATM利息: +${interest}円`, ...ns.log.slice(0,29)]
    }
  }

  // 融資の利息処理
  for (const p of ns.players) {
    for (const debt of p.debts) {
      const interest = debt.yearlyInterest
      if (p.cash >= interest) {
        p.cash -= interest
        ns.players[debt.fromPlayerId].cash += interest
        debt.amount += 0
        ns.log = [`💳 ${p.name}が${ns.players[debt.fromPlayerId].name}に利息${interest}円支払い`, ...ns.log.slice(0,29)]
      } else {
        debt.amount += interest
        ns.log = [`⚠️ ${p.name}が利息${interest}円を払えず！借金に上乗せ`, ...ns.log.slice(0,29)]
      }
    }
  }

  for (const p of ns.players) recalcAssets(p, ns)

  const nextYear = ns.year + 1
  ns.activeEventTypes = []
  ns.diceFixed = null
  ns.eventCard = null

  // ゲーム終了判定
  if (nextYear > ns.maxYears) {
    // 最終年：融資全回収
    for (const p of ns.players) {
      for (const loan of p.loans) {
        const target = ns.players[loan.toPlayerId]
        const recover = Math.min(loan.amount, target.cash + target.atm)
        if (target.cash >= loan.amount) {
          target.cash -= loan.amount
        } else {
          const fromATM = Math.min(loan.amount - target.cash, target.atm)
          target.cash = 0
          target.atm -= fromATM
        }
        p.cash += recover
        ns.log = [`🏦 最終回収: ${p.name} ← ${target.name} ${recover}円`, ...ns.log.slice(0,29)]
      }
    }
    for (const p of ns.players) recalcAssets(p, ns)
    ns.phase = 'result'
    ns.gameOver = true
    const winner = [...ns.players].sort((a: any, b: any) => b.totalAssets - a.totalAssets)[0]
    ns.log = [`🏆 ゲーム終了！優勝: ${winner.name}（総資産${winner.totalAssets}円）`, ...ns.log.slice(0,29)]
    return ns
  }

  // 次年度へ
  ns.year = nextYear
  // ターン順を ATM 残高でソート
  ns.turnOrder = buildTurnOrder(ns.players)
  ns.currentTurnIdx = 0
  ns.currentPlayer = ns.turnOrder[0]
  ns.phase = 'event'  // 2年目以降はイベントカードを引く
  if (ns.year === 1) ns.phase = 'action'

  // イベントカードを引く（順番1位のプレイヤーが引く）
  if (ns.year > 1) {
    const card = EVENT_CARDS[Math.floor(Math.random() * EVENT_CARDS.length)]
    ns.eventCard = card
    ns.log = [`🎴 ${ns.players[ns.turnOrder[0]].name}がイベントカードを引いた！「${card.emoji}${card.name}」`, ...ns.log.slice(0,29)]

    // 即時適用イベント
    if (card.type === 'bankruptcy') {
      // 倒産は別途UIで処理
    } else if (card.type === 'charity') {
      // 資産最少プレイヤーに1000円ずつ渡す
      const poorest = [...ns.players].sort((a: any, b: any) => a.totalAssets - b.totalAssets)[0]
      for (const p of ns.players) {
        if (p.id !== poorest.id) {
          const give = Math.min(1000, p.cash)
          p.cash -= give
          poorest.cash += give
        }
      }
      ns.log = [`🤝 ${poorest.name}に全員が1000円ずつ渡した！`, ...ns.log.slice(0,29)]
    } else if (['dice_even','dice_odd'].includes(card.type)) {
      ns.diceFixed = card.type === 'dice_even' ? 'even' : 'odd'
    } else {
      ns.activeEventTypes = [card.type]
    }
  }

  const firstPlayer = ns.players[ns.currentPlayer]
  ns.needsHandoff = !firstPlayer.isAI
  ns.handoffTo    = firstPlayer.isAI ? null : ns.currentPlayer
  ns.log = [`📅 ${ns.year}年目スタート！ターン順: ${ns.turnOrder.map((id: number) => ns.players[id].name).join(' → ')}`, ...ns.log.slice(0,29)]

  return ns
}

// ============================================================
// ユーティリティ
// ============================================================
function canAct(p: any): boolean {
  const maxActions = p.extraAction ? 2 : 1
  return p.actionUsed < maxActions
}

function recalcAssets(p: any, ns: any): void {
  let stockVal = 0
  for (const s of p.stocks) {
    const st = STOCKS.find(x => x.id === s.id)
    if (st) stockVal += st.buyPrice * s.qty
  }
  p.totalAssets = p.cash + p.atm + stockVal
}

function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

// マスタデータ取得
gameRouter.get('/data', (c) => {
  return c.json({ companies: COMPANIES, stocks: STOCKS, eventCards: EVENT_CARDS })
})
