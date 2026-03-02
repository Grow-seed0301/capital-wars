import { Hono } from 'hono'

export const gameRouter = new Hono()

// ============================================================
// 定数・マスタデータ
// ============================================================

export const COMPANY_DEFS: Record<string, any> = {
  restaurant: {
    id: 'restaurant', name: '飲食店', emoji: '🍜', cost: 10,
    desc: '1〜2: -10円 / 3〜4: +10円 / 5〜6: +30円',
    roll: (d: number) => d <= 2 ? -10 : d <= 4 ? 10 : 30,
    upgradeTo: 'restaurant3', upgradeCost: 100,
  },
  restaurant3: {
    id: 'restaurant3', name: '三ツ星レストラン', emoji: '⭐', cost: 100, isUpgrade: true,
    desc: '1: -10円 / 2〜6: +40円',
    roll: (d: number) => d === 1 ? -10 : 40,
    upgradeTo: null, upgradeCost: null,
  },
  bank: {
    id: 'bank', name: '金融機関', emoji: '🏦', cost: 50,
    desc: '他プレイヤーに融資できる。最終ターンに全額回収',
    roll: (_d: number) => 0, // 特殊：融資で稼ぐ
    upgradeTo: null, upgradeCost: null,
  },
  bus: {
    id: 'bus', name: 'バス会社', emoji: '🚌', cost: 20,
    desc: '1〜4: なし / 5〜6: サイコロ以外の行動が可能',
    roll: (d: number) => d >= 5 ? 0 : 0, // 効果はフラグで管理
    upgradeTo: 'train', upgradeCost: 100,
    extraAction: (d: number) => d >= 5, // 追加行動フラグ
  },
  train: {
    id: 'train', name: '鉄道会社', emoji: '🚃', cost: 100, isUpgrade: true,
    desc: '1〜4: なし / 5〜6: もう一度ターンが回ってくる',
    roll: (_d: number) => 0,
    upgradeTo: null, upgradeCost: null,
    extraTurn: (d: number) => d >= 5,
  },
  shrine: {
    id: 'shrine', name: '神社', emoji: '⛩️', cost: 50,
    desc: '1〜2: 好きな人から50円 / 3〜4: 好きな人から25円 / 5〜6: なし',
    roll: (d: number) => d <= 2 ? 50 : d <= 4 ? 25 : 0,
    upgradeTo: null, upgradeCost: null,
  },
}

export const STOCK_DEFS: Record<string, any> = {
  japan: {
    id: 'japan', name: '日本株', emoji: '🗾', buyPrice: 10,
    desc: '偶数: +30円 / 奇数: -20円',
    dividend: (d: number) => d % 2 === 0 ? 30 : -20,
  },
  foreign: {
    id: 'foreign', name: '外国株', emoji: '🌍', buyPrice: 20,
    desc: '偶数: +50円 / 奇数: -30円',
    dividend: (d: number) => d % 2 === 0 ? 50 : -30,
  },
}

export const EVENT_CARDS = [
  { id: 1,  title: '📈 インフレーション',  desc: '所有している会社の利益が2倍になる（今ターンのみ）',     type: 'inflation' },
  { id: 2,  title: '📉 デフレーション',    desc: '所有している会社の損害が2倍になる（今ターンのみ）',   type: 'deflation' },
  { id: 3,  title: '💼 就労支援',          desc: '今ターン、働くと15円もらえる（通常の3倍）',           type: 'work_bonus' },
  { id: 4,  title: '🚀 株価高騰',          desc: '株の購入価格・配当が2倍になる（今ターンのみ）',       type: 'stock_up' },
  { id: 5,  title: '💥 株価暴落',          desc: '株の購入価格・配当が半分になる（今ターンのみ）',      type: 'stock_down' },
  { id: 6,  title: '🏚️ 倒産',             desc: 'カードを引いた人は所有している会社を売却しなければならない', type: 'bankrupt' },
  { id: 7,  title: '💰 利息UP',            desc: '今ターンのATM利息が2倍になる',                       type: 'interest_up' },
  { id: 8,  title: '🎲 偶数確定',          desc: '今ターン、全員のサイコロの目が必ず偶数になる',        type: 'force_even' },
  { id: 9,  title: '🎲 奇数確定',          desc: '今ターン、全員のサイコロの目が必ず奇数になる',        type: 'force_odd' },
  { id: 10, title: '🤝 投資家イベント',    desc: '資産が一番少ないプレイヤーに他の全員が30円ずつ渡す', type: 'investor' },
]

// ATM利息テーブル
function calcInterest(atm: number): number {
  if (atm >= 75) return 30
  if (atm >= 55) return 15
  if (atm >= 35) return 10
  if (atm >= 15) return 5
  return 0
}

// サイコロ（偶数/奇数強制対応）
function rollDice(forceEven: boolean, forceOdd: boolean): number {
  if (forceEven) {
    const evens = [2, 4, 6]
    return evens[Math.floor(Math.random() * 3)]
  }
  if (forceOdd) {
    const odds = [1, 3, 5]
    return odds[Math.floor(Math.random() * 3)]
  }
  return Math.floor(Math.random() * 6) + 1
}

// 総資産計算（会社は含まない）
function calcTotalAssets(p: any): number {
  return p.cash + p.atm + p.stocks.japan * p.stockPrices.japan + p.stocks.foreign * p.stockPrices.foreign
}

// ATM残高降順でターン順を返す
function calcTurnOrder(players: any[]): number[] {
  return [...players]
    .map((p, i) => ({ i, atm: p.atm }))
    .sort((a, b) => b.atm - a.atm)
    .map(x => x.i)
}

// ============================================================
// ゲームスタート
// ============================================================
gameRouter.post('/start', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const playerDefs: Array<{ name: string; isAI: boolean }> = body.players || [{ name: 'プレイヤー1', isAI: false }]
  const maxYears: number = body.maxYears || 10

  const initialStockPrices = { japan: 10, foreign: 20 }

  const players = playerDefs.map((pd, i) => ({
    id: i,
    name: pd.name || `プレイヤー${i + 1}`,
    isAI: !!pd.isAI,
    cash: 15,           // 初期支給15円
    atm: 0,
    stocks: { japan: 0, foreign: 0 },
    stockPrices: { ...initialStockPrices },
    companies: [] as string[],  // 所有会社ID
    loans: [] as Array<{ to: number; amount: number; perTurn: number }>, // 融資リスト（金融機関オーナー用）
    debt: 0,            // 借金残高
    debtPerTurn: 0,     // 毎ターン返済額
    totalAssets: 15,
    actionsLeft: 1,     // このターンの残り行動数
    extraTurnPending: false, // 鉄道会社ボーナスターン
  }))

  const turnOrder = players.map((_, i) => i) // 初ターンは登録順

  const state = {
    players,
    year: 1,
    maxYears,
    turnOrder,             // このターンのプレイ順（ATM降順）
    turnIndex: 0,          // turnOrder内の現在インデックス
    currentPlayer: turnOrder[0],
    phase: 'action',       // action | event | pass | result
    eventCard: null as typeof EVENT_CARDS[0] | null,
    eventEffects: {        // アクティブなイベント効果
      inflation: false,
      deflation: false,
      workBonus: false,
      stockUp: false,
      stockDown: false,
      interestUp: false,
      forceEven: false,
      forceOdd: false,
    },
    log: [`🎮 ゲームスタート！${players.length}人 / ${maxYears}ターン`, '💴 全員に15円が配られました！'],
    needsHandoff: false,
    handoffTo: null as number | null,
    shrineTarget: null as number | null,  // 神社発動時：対象プレイヤー選択待ち
    shrineDice: 0,
    bankruptPending: false,  // 倒産イベント処理中
    lastDice: 0,
    pendingLoanRequest: null as any,  // 融資申請中
    stockEventMult: 1.0,   // 株価高騰/暴落倍率
  }

  return c.json({ success: true, state })
})

// ============================================================
// サイコロを振る
// ============================================================
gameRouter.post('/roll', async (c) => {
  const { state } = await c.req.json()
  const s = { ...state }
  const p = { ...s.players[s.currentPlayer] }
  const { forceEven, forceOdd } = s.eventEffects
  const dice = rollDice(forceEven, forceOdd)
  s.lastDice = dice
  s.log = [`🎲 ${p.name}がサイコロを振った → ${dice}`, ...s.log.slice(0, 29)]
  return c.json({ success: true, state: s, dice })
})

// ============================================================
// アクション実行
// ============================================================
gameRouter.post('/action', async (c) => {
  const { state, action } = await c.req.json()
  let s = JSON.parse(JSON.stringify(state)) // deep copy
  const pidx = s.currentPlayer
  const p = s.players[pidx]

  // 行動可能かチェック
  if (p.actionsLeft <= 0) {
    return c.json({ success: false, error: 'もう行動できません！ターンを終了してください' })
  }

  let useAction = true
  let logMsg = ''

  switch (action.type) {

    // ── 会社を買う ──────────────────────────────
    case 'buy_company': {
      const def = COMPANY_DEFS[action.companyId]
      if (!def) return c.json({ success: false, error: '存在しない会社です' })
      if (p.companies.includes(action.companyId))
        return c.json({ success: false, error: 'すでに持っています' })
      // アップグレードの場合は元の会社を保有しているか確認
      if (def.isUpgrade) {
        const baseId = Object.keys(COMPANY_DEFS).find(k =>
          COMPANY_DEFS[k].upgradeTo === action.companyId
        )
        if (!baseId || !p.companies.includes(baseId))
          return c.json({ success: false, error: 'アップグレード元の会社が必要です' })
        // 元の会社を削除してアップグレード
        p.companies = p.companies.filter((c: string) => c !== baseId)
      }
      const cost = def.cost
      if (p.cash < cost) return c.json({ success: false, error: `お金が足りません（必要:${cost}円）` })
      p.cash -= cost
      p.companies.push(action.companyId)
      logMsg = `🏢 ${p.name}が${def.emoji}${def.name}を購入（${cost}円）`
      break
    }

    // ── 会社を売る ──────────────────────────────
    case 'sell_company': {
      const def = COMPANY_DEFS[action.companyId]
      if (!def || !p.companies.includes(action.companyId))
        return c.json({ success: false, error: '持っていない会社です' })
      // 売値は購入価格の半額
      const sellPrice = Math.floor(def.cost / 2)
      p.cash += sellPrice
      p.companies = p.companies.filter((c: string) => c !== action.companyId)
      logMsg = `💸 ${p.name}が${def.emoji}${def.name}を売却（${sellPrice}円）`
      useAction = false // 売却は行動消費なし（倒産イベント時など）
      break
    }

    // ── 会社の収益サイコロ ──────────────────────────
    case 'company_roll': {
      const def = COMPANY_DEFS[action.companyId]
      if (!def || !p.companies.includes(action.companyId))
        return c.json({ success: false, error: '持っていない会社です' })

      const dice = s.lastDice || rollDice(s.eventEffects.forceEven, s.eventEffects.forceOdd)
      s.lastDice = dice
      let gain = def.roll(dice)

      // インフレ/デフレ適用
      if (gain > 0 && s.eventEffects.inflation) gain *= 2
      if (gain < 0 && s.eventEffects.deflation) gain *= 2

      // バス会社：追加行動フラグ
      if (action.companyId === 'bus' && COMPANY_DEFS.bus.extraAction(dice)) {
        p.actionsLeft = Math.min(p.actionsLeft + 1, 2)
        s.log = [`🚌 バス会社ボーナス！追加行動が1回増えた`, ...s.log.slice(0, 29)]
      }
      // 鉄道会社：追加ターンフラグ
      if (action.companyId === 'train' && COMPANY_DEFS.train.extraTurn(dice)) {
        p.extraTurnPending = true
        s.log = [`🚃 鉄道会社ボーナス！次のターンも行動できる`, ...s.log.slice(0, 29)]
      }
      // 神社：対象選択が必要
      if (action.companyId === 'shrine' && gain > 0) {
        s.shrineTarget = null
        s.shrineDice = dice
        s.log = [`⛩️ ${p.name}の神社：${dice}の目 → ${gain > 0 ? `${gain}円もらえる！対象を選んでください` : 'なし'}`, ...s.log.slice(0, 29)]
        s.players[pidx] = p
        return c.json({ success: true, state: s, needShrineTarget: gain > 0, shrineAmount: gain })
      }

      if (gain >= 0) {
        p.cash += gain
        logMsg = `🎲 ${p.name}の${def.emoji}${def.name}：${dice}の目 → +${gain}円`
      } else {
        p.cash = Math.max(0, p.cash + gain)
        logMsg = `🎲 ${p.name}の${def.emoji}${def.name}：${dice}の目 → ${gain}円`
      }
      break
    }

    // ── 神社：対象プレイヤー確定 ────────────────────
    case 'shrine_collect': {
      const amount = action.amount
      const targets: number[] = action.targets // [{playerId, amount}] の配列
      let collected = 0
      for (const t of targets) {
        const tp = s.players[t.playerId]
        const actual = Math.min(tp.cash, t.amount)
        tp.cash -= actual
        collected += actual
      }
      p.cash += collected
      logMsg = `⛩️ ${p.name}が神社で${collected}円を受け取った`
      useAction = false
      break
    }

    // ── 株を買う ────────────────────────────────
    case 'buy_stock': {
      const sdef = STOCK_DEFS[action.stockId]
      if (!sdef) return c.json({ success: false, error: '存在しない株です' })
      const qty = action.qty || 1
      let price = sdef.buyPrice
      if (s.eventEffects.stockUp)   price = Math.ceil(price * 2)
      if (s.eventEffects.stockDown) price = Math.ceil(price * 0.5)
      const total = price * qty
      if (p.cash < total) return c.json({ success: false, error: `お金が足りません（必要:${total}円）` })
      p.cash -= total
      p.stocks[action.stockId] = (p.stocks[action.stockId] || 0) + qty
      logMsg = `📈 ${p.name}が${sdef.emoji}${sdef.name}を${qty}株購入（${total}円）`
      break
    }

    // ── 株の配当を受け取る ───────────────────────
    case 'stock_dividend': {
      const sdef = STOCK_DEFS[action.stockId]
      const qty = p.stocks[action.stockId] || 0
      if (qty === 0) return c.json({ success: false, error: '株を持っていません' })
      const dice = s.lastDice || rollDice(s.eventEffects.forceEven, s.eventEffects.forceOdd)
      s.lastDice = dice
      let div = sdef.dividend(dice) * qty
      if (s.eventEffects.stockUp)   div = div > 0 ? div * 2 : div * 2  // 高騰：損も2倍
      if (s.eventEffects.stockDown) div = Math.round(div * 0.5)
      if (div >= 0) {
        p.cash += div
        logMsg = `📊 ${p.name}の${sdef.emoji}${sdef.name}：${dice}の目 → +${div}円`
      } else {
        p.cash = Math.max(0, p.cash + div)
        logMsg = `📊 ${p.name}の${sdef.emoji}${sdef.name}：${dice}の目 → ${div}円`
      }
      break
    }

    // ── 働く ────────────────────────────────────
    case 'work': {
      const earn = s.eventEffects.workBonus ? 15 : 5
      p.cash += earn
      logMsg = `💼 ${p.name}が働いた → +${earn}円${s.eventEffects.workBonus ? '（就労支援3倍！）' : ''}`
      break
    }

    // ── 貯金（ATMに預ける）─────────────────────
    case 'deposit': {
      const amount = action.amount
      if (amount <= 0) return c.json({ success: false, error: '金額を入力してください' })
      if (p.cash < amount) return c.json({ success: false, error: 'お金が足りません' })
      p.cash -= amount
      p.atm += amount
      logMsg = `🏧 ${p.name}がATMに${amount}円を預けた（残高:${p.atm}円）`
      break
    }

    // ── 引き落とし（ATMから出す）────────────────
    case 'withdraw': {
      const amount = action.amount
      if (amount <= 0) return c.json({ success: false, error: '金額を入力してください' })
      if (p.atm < amount) return c.json({ success: false, error: 'ATM残高が足りません' })
      p.atm -= amount
      p.cash += amount
      logMsg = `🏧 ${p.name}がATMから${amount}円を引き落とした`
      break
    }

    // ── 融資する（金融機関オーナー専用）─────────────
    case 'loan': {
      if (!p.companies.includes('bank'))
        return c.json({ success: false, error: '金融機関を持っていません' })
      const { toPlayer, amount } = action
      if (amount <= 0) return c.json({ success: false, error: '金額が不正です' })
      if (p.cash + p.atm < amount)
        return c.json({ success: false, error: 'お金が足りません' })
      // 融資額をATMから出す（なければ現金から）
      let fromAtm = Math.min(p.atm, amount)
      p.atm -= fromAtm
      let fromCash = amount - fromAtm
      if (fromCash > 0) p.cash -= fromCash

      const perTurn = amount <= 50 ? 10 : 20
      p.loans.push({ to: toPlayer, amount, perTurn })
      s.players[toPlayer].cash += amount
      s.players[toPlayer].debt += amount
      s.players[toPlayer].debtPerTurn += perTurn
      logMsg = `🏦 ${p.name}が${s.players[toPlayer].name}に${amount}円を融資（年${perTurn}円の利息）`
      useAction = false // 融資は行動消費なし（特殊行動）
      break
    }

    // ── 借金を返済する ──────────────────────────
    case 'repay': {
      const amount = action.amount
      if (p.cash < amount) return c.json({ success: false, error: 'お金が足りません' })
      if (p.debt <= 0) return c.json({ success: false, error: '借金はありません' })
      const repay = Math.min(p.debt, amount)
      p.cash -= repay
      p.debt -= repay
      // 銀行オーナーのloansを減らす
      for (const pl of s.players) {
        for (const loan of pl.loans) {
          if (loan.to === pidx) {
            loan.amount = Math.max(0, loan.amount - repay)
          }
        }
      }
      logMsg = `💳 ${p.name}が${repay}円を返済（残債:${p.debt}円）`
      useAction = false
      break
    }

    default:
      return c.json({ success: false, error: '不明なアクションです' })
  }

  if (useAction) p.actionsLeft -= 1
  p.totalAssets = calcTotalAssets(p)
  s.players[pidx] = p
  if (logMsg) s.log = [logMsg, ...s.log.slice(0, 29)]

  return c.json({ success: true, state: s })
})

// ============================================================
// ターン終了 → 利息処理 → 次プレイヤー or 次の年
// ============================================================
gameRouter.post('/end-turn', async (c) => {
  const { state } = await c.req.json()
  let s = JSON.parse(JSON.stringify(state))
  const pidx = s.currentPlayer
  const p = s.players[pidx]

  // ── ATM利息（ターン末に加算）──
  let interest = calcInterest(p.atm)
  if (s.eventEffects.interestUp) interest *= 2
  if (interest > 0) {
    p.atm += interest
    s.log = [`💹 ${p.name}のATM利息 +${interest}円（残高:${p.atm}円）`, ...s.log.slice(0, 29)]
  }

  // ── 債務：返済できない場合は残債に上乗せ ──
  if (p.debt > 0 && p.debtPerTurn > 0) {
    if (p.cash >= p.debtPerTurn) {
      p.cash -= p.debtPerTurn
      p.debt -= Math.min(p.debt, p.debtPerTurn)
      s.log = [`💳 ${p.name}が利息${p.debtPerTurn}円を返済`, ...s.log.slice(0, 29)]
    } else {
      p.debt += p.debtPerTurn
      s.log = [`⚠️ ${p.name}が利息を払えず！残債+${p.debtPerTurn}円（合計:${p.debt}円）`, ...s.log.slice(0, 29)]
    }
  }

  // ── 金融機関：融資先からの利息回収 ──
  if (p.companies.includes('bank')) {
    let totalCollected = 0
    for (const loan of p.loans) {
      if (loan.amount > 0) {
        const tp = s.players[loan.to]
        const interest2 = loan.perTurn
        if (tp.cash >= interest2) {
          tp.cash -= interest2
          totalCollected += interest2
        } else {
          loan.amount += interest2 // 払えない場合は残債に上乗せ
          s.log = [`⚠️ ${tp.name}が利息を払えず残債が増えた`, ...s.log.slice(0, 29)]
        }
      }
    }
    if (totalCollected > 0) {
      p.cash += totalCollected
      s.log = [`🏦 ${p.name}の金融機関：利息${totalCollected}円を回収`, ...s.log.slice(0, 29)]
    }
  }

  p.totalAssets = calcTotalAssets(p)
  p.actionsLeft = 1 // 次ターンのために初期化
  s.players[pidx] = p

  // ── 鉄道会社ボーナスターン ──
  if (p.extraTurnPending) {
    p.extraTurnPending = false
    s.players[pidx] = p
    s.log = [`🚃 ${p.name}の追加ターン！`, ...s.log.slice(0, 29)]
    s.needsHandoff = !p.isAI
    s.handoffTo = pidx
    return c.json({ success: true, state: s })
  }

  // ── 次のプレイヤーへ ──
  s.turnIndex += 1

  if (s.turnIndex >= s.turnOrder.length) {
    // 全員のターンが終わった → 年末処理
    s = yearEnd(s)
  } else {
    const next = s.turnOrder[s.turnIndex]
    s.currentPlayer = next
    s.log = [`👤 ${s.players[next].name}のターン`, ...s.log.slice(0, 29)]

    // AI処理
    if (s.players[next].isAI) {
      s = processAI(s)
      // AI連続ループ
      while (!s.gameOver && s.players[s.currentPlayer].isAI) {
        s.turnIndex += 1
        if (s.turnIndex >= s.turnOrder.length) {
          s = yearEnd(s)
          break
        }
        s.currentPlayer = s.turnOrder[s.turnIndex]
        s = processAI(s)
      }
    }

    if (!s.gameOver) {
      const cur = s.players[s.currentPlayer]
      s.needsHandoff = !cur.isAI
      s.handoffTo = s.currentPlayer
    }
  }

  return c.json({ success: true, state: s })
})

// ============================================================
// 年末処理
// ============================================================
function yearEnd(s: any): any {
  s.year += 1
  s.turnIndex = 0
  // イベント効果リセット
  s.eventEffects = {
    inflation: false, deflation: false, workBonus: false,
    stockUp: false, stockDown: false, interestUp: false,
    forceEven: false, forceOdd: false,
  }
  s.eventCard = null
  s.lastDice = 0

  if (s.year > s.maxYears) {
    // ゲーム終了：最終回収処理
    s = finalCollection(s)
    s.gameOver = true
    const winner = [...s.players].sort((a, b) => b.totalAssets - a.totalAssets)[0]
    s.log = [`🏆 ゲーム終了！${winner.name}の勝利！総資産 ¥${winner.totalAssets}円`, ...s.log.slice(0, 29)]
    return s
  }

  // 新しい年：ATM降順でターン順を決定
  s.turnOrder = calcTurnOrder(s.players)
  s.currentPlayer = s.turnOrder[0]
  s.phase = 'event' // 1番の人がイベントカードを引く

  // 全プレイヤーの行動数リセット
  for (const p of s.players) {
    p.actionsLeft = 1
    p.extraTurnPending = false
  }

  s.log = [`🗓️ ${s.year}年目開始！ターン順が更新されました`, ...s.log.slice(0, 29)]
  s.log = [`📋 ターン順: ${s.turnOrder.map((i: number) => s.players[i].name).join(' → ')}`, ...s.log.slice(0, 29)]

  return s
}

// ============================================================
// 最終ターン：金融機関の全額回収
// ============================================================
function finalCollection(s: any): any {
  for (const p of s.players) {
    if (p.companies.includes('bank') && p.loans.length > 0) {
      let total = 0
      for (const loan of p.loans) {
        const tp = s.players[loan.to]
        const actual = Math.min(tp.cash + tp.atm, loan.amount)
        // ATMから優先的に引く
        const fromAtm = Math.min(tp.atm, actual)
        tp.atm -= fromAtm
        const fromCash = actual - fromAtm
        tp.cash = Math.max(0, tp.cash - fromCash)
        total += actual
      }
      p.cash += total
      p.loans = []
      s.log = [`🏦 ${p.name}の金融機関：最終回収 ${total}円`, ...s.log.slice(0, 29)]
    }
    p.totalAssets = calcTotalAssets(p)
  }
  return s
}

// ============================================================
// イベントカードを引く
// ============================================================
gameRouter.post('/draw-event', async (c) => {
  const { state } = await c.req.json()
  let s = JSON.parse(JSON.stringify(state))
  const pidx = s.currentPlayer
  const p = s.players[pidx]

  const card = EVENT_CARDS[Math.floor(Math.random() * EVENT_CARDS.length)]
  s.eventCard = card
  s.phase = 'action'

  let logMsg = `🃏 ${p.name}がイベントカードを引いた：${card.title}`
  s.log = [logMsg, ...s.log.slice(0, 29)]

  // 即時効果を適用
  switch (card.type) {
    case 'inflation':    s.eventEffects.inflation = true;   break
    case 'deflation':    s.eventEffects.deflation = true;   break
    case 'work_bonus':   s.eventEffects.workBonus = true;   break
    case 'stock_up':     s.eventEffects.stockUp = true;     break
    case 'stock_down':   s.eventEffects.stockDown = true;   break
    case 'interest_up':  s.eventEffects.interestUp = true;  break
    case 'force_even':   s.eventEffects.forceEven = true;   break
    case 'force_odd':    s.eventEffects.forceOdd = true;    break

    case 'bankrupt': {
      // カードを引いた人が会社を売却しなければならない
      if (p.companies.length > 0) {
        s.bankruptPending = true
        s.log = [`🏚️ 倒産！${p.name}は会社を売却しなければなりません`, ...s.log.slice(0, 29)]
      } else {
        s.log = [`🏚️ 倒産！${p.name}は会社を持っていないので影響なし`, ...s.log.slice(0, 29)]
      }
      break
    }

    case 'investor': {
      // 資産が一番少ないプレイヤーに全員が30円ずつ渡す
      const poorest = [...s.players].sort((a, b) => a.totalAssets - b.totalAssets)[0]
      let total = 0
      for (const pp of s.players) {
        if (pp.id !== poorest.id) {
          const give = Math.min(pp.cash, 30)
          pp.cash -= give
          total += give
        }
      }
      s.players[poorest.id].cash += total
      s.players.forEach((pp: any) => { pp.totalAssets = calcTotalAssets(pp) })
      s.log = [`🤝 投資家イベント：${poorest.name}が${total}円を受け取った`, ...s.log.slice(0, 29)]
      break
    }
  }

  return c.json({ success: true, state: s, card })
})

// ============================================================
// AI処理（シンプルな自動行動）
// ============================================================
function processAI(s: any): any {
  const pidx = s.currentPlayer
  const p = s.players[pidx]
  const logs: string[] = []

  // AIの行動：ランダムに判断
  const choice = Math.random()
  if (choice < 0.3 && p.cash >= 10) {
    // 会社を買う（飲食店が買えるなら）
    if (!p.companies.includes('restaurant') && p.cash >= 10) {
      p.cash -= 10
      p.companies.push('restaurant')
      logs.push(`🤖 ${p.name}が飲食店を購入`)
    } else if (p.companies.length > 0) {
      // サイコロを振って会社収益
      const dice = rollDice(s.eventEffects.forceEven, s.eventEffects.forceOdd)
      const def = COMPANY_DEFS[p.companies[0]]
      let gain = def.roll(dice)
      if (gain > 0 && s.eventEffects.inflation) gain *= 2
      if (gain < 0 && s.eventEffects.deflation) gain *= 2
      if (gain >= 0) p.cash += gain
      else p.cash = Math.max(0, p.cash + gain)
      logs.push(`🤖 ${p.name}の${def.name}：${dice}の目 → ${gain >= 0 ? '+' : ''}${gain}円`)
    } else {
      p.cash += 5
      logs.push(`🤖 ${p.name}が働いた → +5円`)
    }
  } else if (choice < 0.5 && p.cash >= 10) {
    // 株を買う
    const dice = rollDice(s.eventEffects.forceEven, s.eventEffects.forceOdd)
    p.stocks.japan += 1
    p.cash -= 10
    let div = STOCK_DEFS.japan.dividend(dice)
    if (s.eventEffects.stockDown) div = Math.round(div * 0.5)
    if (div >= 0) p.cash += div
    else p.cash = Math.max(0, p.cash + div)
    logs.push(`🤖 ${p.name}が日本株を購入・配当受け取り（${dice}の目 → ${div >= 0 ? '+' : ''}${div}円）`)
  } else if (choice < 0.7) {
    // 貯金
    const amount = Math.min(p.cash, 5)
    if (amount > 0) {
      p.cash -= amount
      p.atm += amount
      logs.push(`🤖 ${p.name}がATMに${amount}円を預けた`)
    } else {
      p.cash += 5
      logs.push(`🤖 ${p.name}が働いた → +5円`)
    }
  } else {
    p.cash += 5
    logs.push(`🤖 ${p.name}が働いた → +5円`)
  }

  // ATM利息
  let interest = calcInterest(p.atm)
  if (s.eventEffects.interestUp) interest *= 2
  if (interest > 0) {
    p.atm += interest
    logs.push(`💹 ${p.name}のATM利息 +${interest}円`)
  }

  p.totalAssets = calcTotalAssets(p)
  s.players[pidx] = p
  for (const log of logs.reverse()) {
    s.log = [log, ...s.log.slice(0, 29)]
  }
  return s
}

// ============================================================
// マスタデータ取得
// ============================================================
gameRouter.get('/data', (c) => {
  return c.json({
    companies: Object.values(COMPANY_DEFS),
    stocks: Object.values(STOCK_DEFS),
    events: EVENT_CARDS,
  })
})
