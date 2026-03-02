export function mainPage(): string {
  const ST = '<' + '/script>'
  return /* html */`<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>⚔️ Capital Wars</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<script src="https://cdn.tailwindcss.com">SCRIPT_END
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
<style>
:root{
  --c1:#6C63FF;--c2:#FF6584;--c3:#FFD700;--c4:#4CAF50;--c5:#FF9800;
}
*{box-sizing:border-box;}
body{
  font-family:'Segoe UI',sans-serif;
  background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);
  min-height:100vh;color:#fff;
}
.screen{display:none;}
.screen.active{display:block;}

/* ===== Stars ===== */
#stars-bg{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;}
.star{position:absolute;width:3px;height:3px;background:#fff;border-radius:50%;animation:twinkle var(--dur,3s) infinite;}
@keyframes twinkle{0%,100%{opacity:.2;}50%{opacity:1;}}

/* ===== Cards ===== */
.card{background:rgba(255,255,255,.12);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.2);border-radius:20px;}
.card-white{background:#fff;color:#333;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,.15);}

/* ===== Buttons ===== */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 20px;border-radius:50px;font-weight:700;font-size:1rem;cursor:pointer;border:none;transition:all .2s;user-select:none;}
.btn:active{transform:scale(.95);}
.btn:disabled{opacity:.4;cursor:not-allowed;transform:none;}
.btn-primary{background:linear-gradient(135deg,var(--c1),#9c65ff);color:#fff;box-shadow:0 4px 15px rgba(108,99,255,.5);}
.btn-primary:hover:not(:disabled){filter:brightness(1.1);}
.btn-success{background:linear-gradient(135deg,var(--c4),#66bb6a);color:#fff;box-shadow:0 4px 15px rgba(76,175,80,.4);}
.btn-success:hover:not(:disabled){filter:brightness(1.1);}
.btn-danger{background:linear-gradient(135deg,#f44336,#e91e63);color:#fff;box-shadow:0 4px 15px rgba(244,67,54,.4);}
.btn-danger:hover:not(:disabled){filter:brightness(1.1);}
.btn-warning{background:linear-gradient(135deg,var(--c5),#fdd835);color:#fff;box-shadow:0 4px 15px rgba(255,152,0,.4);}
.btn-warning:hover:not(:disabled){filter:brightness(1.1);}
.btn-info{background:linear-gradient(135deg,#00bcd4,#03a9f4);color:#fff;box-shadow:0 4px 15px rgba(0,188,212,.4);}
.btn-info:hover:not(:disabled){filter:brightness(1.1);}
.btn-gray{background:rgba(255,255,255,.2);color:#fff;}
.btn-gray:hover:not(:disabled){background:rgba(255,255,255,.3);}
.btn-sm{padding:6px 14px;font-size:.85rem;}
.btn-lg{padding:14px 32px;font-size:1.2rem;}

/* ===== Tab ===== */
.tab{padding:8px 18px;border-radius:25px;font-weight:600;cursor:pointer;transition:all .2s;color:rgba(255,255,255,.6);border:2px solid transparent;}
.tab.active{background:var(--c1);color:#fff;border-color:var(--c1);}

/* ===== Player card ===== */
.player-panel{border-radius:16px;padding:12px;border:2px solid transparent;transition:all .3s;}
.player-panel.current{border-color:var(--c3);box-shadow:0 0 20px rgba(255,215,0,.4);}

/* ===== Dice ===== */
.dice-face{width:70px;height:70px;background:#fff;border-radius:14px;display:grid;place-items:center;font-size:2.5rem;color:#333;box-shadow:0 6px 20px rgba(0,0,0,.3);transition:transform .4s;}
.dice-face.rolling{animation:rollDice .5s ease-out;}
@keyframes rollDice{0%{transform:rotate(0);} 25%{transform:rotate(90deg);} 50%{transform:rotate(180deg);} 75%{transform:rotate(270deg);} 100%{transform:rotate(360deg);}}

/* ===== Coin animation ===== */
.coin{position:fixed;font-size:1.8rem;pointer-events:none;animation:coinFly 1.2s ease-out forwards;z-index:9999;}
@keyframes coinFly{0%{transform:translateY(0) scale(1);opacity:1;}100%{transform:translateY(-120px) scale(0);opacity:0;}}

/* ===== Toast ===== */
.toast{position:fixed;bottom:30px;left:50%;transform:translateX(-50%);padding:12px 28px;border-radius:50px;font-weight:700;font-size:1rem;z-index:9999;animation:toastIn .3s ease-out;}
@keyframes toastIn{from{transform:translateX(-50%) translateY(20px);opacity:0;}to{transform:translateX(-50%) translateY(0);opacity:1;}}

/* ===== Modal ===== */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:8888;}
.modal-box{max-width:480px;width:90%;border-radius:24px;overflow:hidden;}

/* ===== Handoff ===== */
#screen-handoff{position:fixed;inset:0;background:#0a0a1a;display:none;align-items:center;justify-content:center;flex-direction:column;z-index:7777;}
#screen-handoff.show{display:flex;}

/* ===== Event card ===== */
#event-overlay{position:fixed;inset:0;background:rgba(0,0,0,.85);display:none;align-items:center;justify-content:center;z-index:7000;}
#event-overlay.show{display:flex;}
.event-card-big{width:260px;border-radius:24px;padding:30px 20px;text-align:center;background:linear-gradient(135deg,#1a1a2e,#16213e);border:3px solid var(--c3);box-shadow:0 0 40px rgba(255,215,0,.4);}

/* ===== Shrine target modal ===== */
#media-overlay{position:fixed;inset:0;background:rgba(0,0,0,.8);display:none;align-items:center;justify-content:center;z-index:7500;}
#media-overlay.show{display:flex;}

/* ===== Result screen ===== */
.rank-row{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:14px;margin-bottom:8px;}
.rank-row.rank-1{background:linear-gradient(135deg,#ffd700,#ffb300);color:#333;}
.rank-row.rank-2{background:linear-gradient(135deg,#ccc,#9e9e9e);color:#333;}
.rank-row.rank-3{background:linear-gradient(135deg,#cd7f32,#8d4e0c);color:#fff;}
.rank-row.rank-other{background:rgba(255,255,255,.15);}

/* ===== Setup screen ===== */
.player-setup-row{display:flex;align-items:center;gap:8px;padding:10px;background:rgba(255,255,255,.08);border-radius:12px;margin-bottom:8px;}

/* ===== Responsive ===== */
@media(max-width:640px){
  .btn-lg{font-size:1rem;padding:12px 24px;}
  .dice-face{width:56px;height:56px;font-size:2rem;}
}

/* ===== Scrollbar ===== */
::-webkit-scrollbar{width:6px;}
::-webkit-scrollbar-track{background:rgba(255,255,255,.05);}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,.2);border-radius:3px;}

/* ===== Number badge ===== */
.badge{display:inline-block;background:var(--c2);color:#fff;border-radius:50%;width:22px;height:22px;text-align:center;line-height:22px;font-size:.75rem;font-weight:700;}

/* ===== Action highlight ===== */
.action-item{background:rgba(255,255,255,.08);border:2px solid transparent;border-radius:14px;padding:12px;cursor:pointer;transition:all .2s;}
.action-item:hover:not(.disabled){background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.3);}
.action-item.disabled{opacity:.4;cursor:not-allowed;}

/* ===== Company/Stock cards ===== */
.item-card{background:rgba(255,255,255,.1);border-radius:12px;padding:10px;border:2px solid transparent;transition:all .2s;cursor:pointer;}
.item-card:hover:not(.disabled){border-color:var(--c3);background:rgba(255,215,0,.1);}
.item-card.disabled{opacity:.4;cursor:not-allowed;}
.item-card.owned{border-color:var(--c4);background:rgba(76,175,80,.15);}
</style>
</head>
<body>
<div id="stars-bg"></div>

<!-- ================================================================
  TITLE SCREEN
================================================================ -->
<div id="screen-title" class="screen active" style="position:relative;z-index:1;">
  <div class="min-h-screen flex flex-col items-center justify-center p-6 text-center">
    <div class="text-8xl mb-4" style="animation:pulse 1.5s infinite;">⚔️</div>
    <h1 class="text-6xl font-black mb-1" style="letter-spacing:.08em;text-shadow:0 0 40px rgba(255,215,0,.9);">CAPITAL</h1>
    <h1 class="text-6xl font-black mb-6" style="color:var(--c3);letter-spacing:.08em;text-shadow:0 0 40px rgba(255,215,0,.9);">WARS</h1>
    <p class="text-base opacity-70 mb-10 tracking-widest">— 資本をめぐる頭脳戦 —</p>
    <button class="btn btn-primary btn-lg mb-4" onclick="showScreen('title2')">
      <i class="fas fa-play"></i> ゲームをはじめる
    </button>
    <button class="btn btn-info btn-lg mb-4" onclick="showTutorial()">
      <i class="fas fa-book"></i> あそびかた
    </button>
  </div>
</div>

<!-- ================================================================
  SETUP SCREEN 1: Player count
================================================================ -->
<div id="screen-title2" class="screen" style="position:relative;z-index:1;">
  <div class="min-h-screen flex flex-col items-center justify-center p-6">
    <div class="card p-8 max-w-lg w-full text-center">
      <div class="text-5xl mb-3">👥</div>
      <h2 class="text-3xl font-black mb-6">なんにんで あそぶ？</h2>
      <div class="grid grid-cols-5 gap-3 mb-6">
        ${[2,3,4,5,6,7,8,9,10].map(n=>`
        <button class="btn btn-gray" id="pcbtn-${n}" onclick="selectPlayerCount(${n})"
          style="border-radius:14px;padding:14px 0;font-size:1.4rem;font-weight:900;">
          ${n}
        </button>`).join('')}
        <!-- dummy for grid alignment -->
        <div></div>
      </div>
      <div class="flex gap-3 justify-center">
        <button class="btn btn-gray" onclick="showScreen('title')">
          <i class="fas fa-arrow-left"></i> もどる
        </button>
        <button class="btn btn-primary" id="toSetupBtn" disabled onclick="showScreen('setup')">
          <i class="fas fa-arrow-right"></i> つぎへ
        </button>
      </div>
    </div>
  </div>
</div>

<!-- ================================================================
  SETUP SCREEN 2: Player names & game length
================================================================ -->
<div id="screen-setup" class="screen" style="position:relative;z-index:1;">
  <div class="min-h-screen flex flex-col items-center justify-center p-6">
    <div class="card p-6 max-w-xl w-full">
      <h2 class="text-2xl font-black text-center mb-4">⚙️ せっていをしよう</h2>

      <!-- Player names -->
      <div id="player-setup-list" class="mb-6"></div>

      <!-- Game length -->
      <h3 class="text-lg font-bold mb-3 text-center">📅 ゲームのながさ</h3>
      <div class="flex gap-3 justify-center mb-6">
        ${[6,10,15].map(y=>`
        <button class="btn btn-gray" id="ylbtn-${y}" onclick="selectGameLength(${y})">
          <i class="fas fa-calendar"></i> ${y}年
        </button>`).join('')}
      </div>

      <!-- Action buttons -->
      <div class="flex gap-3 justify-center">
        <button class="btn btn-gray" onclick="showScreen('title2')">
          <i class="fas fa-arrow-left"></i> もどる
        </button>
        <button class="btn btn-success btn-lg" id="startGameBtn" onclick="startGame()">
          <i class="fas fa-rocket"></i> ゲームスタート！
        </button>
      </div>
    </div>
  </div>
</div>

<!-- ================================================================
  GAME SCREEN
================================================================ -->
<div id="screen-game" class="screen" style="position:relative;z-index:1;">
  <div class="min-h-screen p-3">

    <!-- Header -->
    <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
      <div class="flex items-center gap-3">
        <span class="text-2xl">⚔️</span>
        <div>
          <div class="font-black text-xl" id="yearLabel">1年目</div>
          <div class="text-sm opacity-70" id="turnOrderLabel"></div>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-info btn-sm" onclick="showTutorial()"><i class="fas fa-book"></i></button>
        <button class="btn btn-danger btn-sm" onclick="confirmQuit()"><i class="fas fa-door-open"></i> やめる</button>
      </div>
    </div>

    <!-- Event badge -->
    <div id="activeEventBadge" class="hidden mb-2 p-2 rounded-xl text-center font-bold text-sm"
      style="background:rgba(255,215,0,.2);border:1px solid var(--c3);"></div>

    <!-- Players overview -->
    <div id="players-overview" class="grid gap-2 mb-3"></div>

    <!-- Current player action area -->
    <div class="card p-4 mb-3" id="action-area">
      <div class="flex items-center gap-2 mb-3">
        <div class="text-2xl" id="cpEmoji">🧑</div>
        <div>
          <div class="font-black text-lg" id="cpName">プレイヤー</div>
          <div class="text-sm opacity-70" id="cpStatus">アクション: 0/1</div>
        </div>
        <div class="ml-auto text-right">
          <div class="text-xs opacity-60">手持ち</div>
          <div class="font-black text-xl" id="cpCash" style="color:var(--c3);">0円</div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 mb-3 flex-wrap">
        <button class="tab active" data-tab="actions" onclick="switchTab('actions')">🎯 アクション</button>
        <button class="tab" data-tab="portfolio" onclick="switchTab('portfolio')">📊 じぶんの資産</button>
        <button class="tab" data-tab="market" onclick="switchTab('market')">🏪 マーケット</button>
        <button class="tab" data-tab="ranking" onclick="switchTab('ranking')">🏆 ランキング</button>
        <button class="tab" data-tab="log" onclick="switchTab('log')">📋 ログ</button>
      </div>

      <!-- Tab: Actions -->
      <div id="tab-actions" class="tab-content">
        <div id="actionMsg" class="text-sm text-center opacity-70 mb-3"></div>
        <div class="grid grid-cols-2 gap-3 mb-4" id="action-buttons">
          <!-- generated by renderActions() -->
        </div>
        <!-- End turn -->
        <button class="btn btn-warning w-full" id="endTurnBtn" onclick="doEndTurn()">
          <i class="fas fa-forward"></i> ターンを終わらせる
        </button>
      </div>

      <!-- Tab: Portfolio -->
      <div id="tab-portfolio" class="tab-content hidden">
        <div id="portfolio-content"></div>
      </div>

      <!-- Tab: Market -->
      <div id="tab-market" class="tab-content hidden">
        <div id="market-content"></div>
      </div>

      <!-- Tab: Ranking -->
      <div id="tab-ranking" class="tab-content hidden">
        <div id="ranking-content"></div>
      </div>

      <!-- Tab: Log -->
      <div id="tab-log" class="tab-content hidden">
        <div id="log-content" class="text-sm space-y-1 max-h-64 overflow-y-auto"></div>
      </div>
    </div>

    <!-- ATM detail (shown in actions) -->
    <div id="atm-panel" class="card p-4 mb-3 hidden">
      <h3 class="font-bold mb-3">🏧 ATM</h3>
      <div class="flex items-center justify-between mb-3">
        <div>
          <div class="text-xs opacity-60">現在のATM残高</div>
          <div class="text-2xl font-black" id="atmBalance" style="color:#00bcd4;">0円</div>
          <div class="text-xs opacity-60 mt-1" id="atmInterestInfo">利息: 0円/年</div>
        </div>
        <div class="text-3xl">💳</div>
      </div>
      <div class="flex gap-2 mb-2">
        <input type="number" id="atmAmount" placeholder="金額" min="100" step="100"
          class="flex-1 rounded-xl px-3 py-2 text-black font-bold">
        <button class="btn btn-success btn-sm" onclick="doDeposit()">💰 預ける</button>
        <button class="btn btn-warning btn-sm" onclick="doWithdraw()">💸 引き出す</button>
      </div>
    </div>

    <!-- Dice panel (shown for company/stock actions) -->
    <div id="dice-panel" class="card p-4 mb-3 hidden text-center">
      <h3 class="font-bold mb-3" id="dicePanelTitle">🎲 サイコロをふろう！</h3>
      <div class="flex justify-center mb-4">
        <div class="dice-face" id="diceDisplay">🎲</div>
      </div>
      <div id="diceResult" class="text-lg font-bold mb-3 min-h-8"></div>
      <button class="btn btn-primary btn-lg" id="rollBtn" onclick="rollDice()">
        <i class="fas fa-dice"></i> ふる！
      </button>
      <button class="btn btn-gray mt-2" onclick="cancelDice()">キャンセル</button>
    </div>

    <!-- Lend panel -->
    <div id="lend-panel" class="card p-4 mb-3 hidden">
      <h3 class="font-bold mb-3">🏦 融資する</h3>
      <select id="lendTarget" class="w-full rounded-xl px-3 py-2 text-black font-bold mb-2">
        <option value="">-- プレイヤーを選ぶ --</option>
      </select>
      <input type="number" id="lendAmount" placeholder="金額" min="500" step="500"
        class="w-full rounded-xl px-3 py-2 text-black font-bold mb-2">
      <div class="text-xs opacity-60 mb-2">貸付金額2500円未満→年利500円、2500円以上→年利1000円</div>
      <div class="flex gap-2">
        <button class="btn btn-success flex-1" onclick="doLend()">💰 融資する</button>
        <button class="btn btn-gray" onclick="hideLendPanel()">キャンセル</button>
      </div>
    </div>

    <!-- Repay panel -->
    <div id="repay-panel" class="card p-4 mb-3 hidden">
      <h3 class="font-bold mb-3">💳 返済する</h3>
      <div id="repay-list"></div>
      <button class="btn btn-gray mt-2" onclick="hideRepayPanel()">とじる</button>
    </div>

  </div>
</div>

<!-- ================================================================
  HANDOFF SCREEN (pass to next player)
================================================================ -->
<div id="screen-handoff">
  <div class="text-center p-8">
    <div class="text-8xl mb-6 animate-pulse">🔒</div>
    <h2 class="text-3xl font-black mb-3" id="handoffTitle">端末を渡してください</h2>
    <p class="text-lg opacity-80 mb-2" id="handoffSub">次のプレイヤー：<span id="handoffPlayerName" class="font-black" style="color:var(--c3);"></span></p>
    <p class="text-sm opacity-50 mb-10">（画面を見えないようにして渡してください）</p>
    <button class="btn btn-success btn-lg" onclick="readyHandoff()">
      <i class="fas fa-check-circle"></i> <span id="handoffReadyLabel">準備できた！</span>
    </button>
  </div>
</div>

<!-- ================================================================
  EVENT CARD OVERLAY
================================================================ -->
<div id="event-overlay">
  <div class="event-card-big">
    <div class="text-6xl mb-3" id="eventEmoji">🎴</div>
    <div class="text-xl font-black mb-2" id="eventName">イベント</div>
    <div class="text-sm opacity-80 mb-6" id="eventDesc"></div>
    <button class="btn btn-warning w-full" onclick="dismissEvent()">
      <i class="fas fa-check"></i> わかった！
    </button>
  </div>
</div>

<!-- ================================================================
  SHRINE TARGET OVERLAY
================================================================ -->
<div id="media-overlay">
  <div class="card p-6 max-w-sm w-full text-center">
    <div class="text-5xl mb-3">📺</div>
    <h3 class="text-xl font-black mb-2">広告費をもらう相手を選ぼう！</h3>
    <p class="text-sm opacity-70 mb-1" id="shrineAmountLabel"></p>
    <div id="shrine-targets" class="space-y-2 mb-4"></div>
  </div>
</div>

<!-- ================================================================
  CONFIRM MODAL
================================================================ -->
<div id="confirm-modal" class="modal-overlay hidden">
  <div class="modal-box card-white p-6">
    <h3 class="text-xl font-black mb-2 text-center" id="confirmTitle">確認</h3>
    <div class="mb-4 text-center" id="confirmBody"></div>
    <div class="flex gap-3">
      <button class="btn btn-gray flex-1" onclick="closeConfirm()">❌ キャンセル</button>
      <button class="btn btn-primary flex-1" id="confirmOkBtn" onclick="onConfirmOk()">✅ 決定！</button>
    </div>
  </div>
</div>

<!-- ================================================================
  TUTORIAL MODAL
================================================================ -->
<div id="tutorial-modal" class="modal-overlay hidden">
  <div class="modal-box card p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-black">📖 あそびかた</h2>
      <button class="btn btn-gray btn-sm" onclick="closeTutorial()">✕</button>
    </div>
    <div id="tutorial-content" class="text-sm space-y-3"></div>
  </div>
</div>

<!-- ================================================================
  RESULT SCREEN
================================================================ -->
<div id="screen-result" class="screen" style="position:relative;z-index:1;">
  <div class="min-h-screen flex flex-col items-center justify-center p-6">
    <div class="card p-6 max-w-lg w-full">
      <div class="text-center mb-6">
        <div class="text-6xl mb-2">🏆</div>
        <h2 class="text-3xl font-black mb-1">ゲーム終了！</h2>
        <p class="opacity-70" id="resultYears"></p>
      </div>
      <div id="result-ranks" class="mb-6"></div>
      <div class="text-center space-y-3">
        <h3 class="font-bold text-lg">📚 きょう学んだこと</h3>
        <div id="result-lesson" class="text-sm opacity-80 leading-relaxed"></div>
      </div>
      <div class="flex gap-3 mt-6">
        <button class="btn btn-primary flex-1" onclick="backToTitle()">
          <i class="fas fa-home"></i> タイトルへ
        </button>
        <button class="btn btn-success flex-1" onclick="replayGame()">
          <i class="fas fa-redo"></i> もう一度！
        </button>
      </div>
    </div>
  </div>
</div>

<!-- ================================================================
  JAVASCRIPT
================================================================ -->
<script>
// ============================================================
// State
// ============================================================
let G = null          // game state from server
let selectedPlayerCount = 0
let selectedGameLength = 10
let playerConfigs = []
let confirmCallback = null
let diceContext = null   // {type:'company'|'stock', id:string}
let processingAction = false

const PLAYER_EMOJIS = ['🧑','👧','🧒','👦','🙋','🧑‍🦱','🧑‍🦰','👱','🧑‍🦳','🧑‍🦲']
const PLAYER_COLORS = ['#6C63FF','#FF6584','#4CAF50','#FF9800','#00BCD4','#9C27B0','#F44336','#2196F3','#8BC34A','#FF5722']

// ============================================================
// Utilities
// ============================================================
function fmt(n){ return (n||0).toLocaleString()+'円' }
function yen(n){ return (n||0).toLocaleString() }

function showScreen(name){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'))
  const el = document.getElementById('screen-'+name)
  if(el) el.classList.add('active')
}

function generateStars(){
  const bg = document.getElementById('stars-bg')
  for(let i=0;i<100;i++){
    const s = document.createElement('div')
    s.className='star'
    s.style.left = Math.random()*100+'%'
    s.style.top  = Math.random()*100+'%'
    s.style.setProperty('--dur',(2+Math.random()*4)+'s')
    s.style.animationDelay = Math.random()*4+'s'
    bg.appendChild(s)
  }
}
generateStars()

// ============================================================
// Setup
// ============================================================
function selectPlayerCount(n){
  selectedPlayerCount = n
  document.querySelectorAll('[id^="pcbtn-"]').forEach(b=>{
    b.classList.toggle('btn-primary', parseInt(b.id.split('-')[1])===n)
    b.classList.toggle('btn-gray',   parseInt(b.id.split('-')[1])!==n)
  })
  document.getElementById('toSetupBtn').disabled = false
  buildPlayerSetupList(n)
}

function selectGameLength(y){
  selectedGameLength = y
  document.querySelectorAll('[id^="ylbtn-"]').forEach(b=>{
    const yy = parseInt(b.id.split('-')[1])
    b.classList.toggle('btn-primary',yy===y)
    b.classList.toggle('btn-gray',yy!==y)
  })
}

function buildPlayerSetupList(n){
  playerConfigs = Array.from({length:n},(_, i)=>({
    name: 'プレイヤー'+(i+1),
    isAI: false
  }))
  renderPlayerSetupList()
}

function renderPlayerSetupList(){
  const el = document.getElementById('player-setup-list')
  el.innerHTML = playerConfigs.map((p,i)=>\`
    <div class="player-setup-row">
      <span style="font-size:1.6rem;">\${PLAYER_EMOJIS[i]}</span>
      <input
        class="flex-1 rounded-xl px-3 py-2 text-black font-bold"
        value="\${p.name}"
        placeholder="なまえ"
        oninput="playerConfigs[\${i}].name=this.value"
        style="min-width:80px;"
      >
      <button
        class="btn btn-sm \${p.isAI?'btn-warning':'btn-info'}"
        onclick="toggleAI(\${i})"
        style="min-width:60px;"
      >
        \${p.isAI?'🤖 AI':'👤 人'}
      </button>
    </div>
  \`).join('')
}

function toggleAI(i){
  playerConfigs[i].isAI = !playerConfigs[i].isAI
  renderPlayerSetupList()
}

async function startGame(){
  if(!selectedGameLength){
    showToast('ゲームのながさを選んでね！','error')
    return
  }
  const btn = document.getElementById('startGameBtn')
  btn.disabled = true
  btn.textContent = '🔄 ロード中...'

  try{
    const res = await fetch('/api/game/start',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        players: playerConfigs,
        maxYears: selectedGameLength
      })
    })
    const data = await res.json()
    if(!data.success) throw new Error(data.error)
    G = data.state
    showScreen('game')
    renderGame()
    spawnCoins(10)
    showToast('⚔️ Capital Wars — 開戦！','info')
  } catch(e){
    showToast('エラー: '+e.message,'error')
  } finally{
    btn.disabled = false
    btn.innerHTML = '<i class="fas fa-rocket"></i> ゲームスタート！'
  }
}

// ============================================================
// Render Game
// ============================================================
function renderGame(){
  if(!G) return
  const cp = G.players[G.currentPlayer]

  // Header
  document.getElementById('yearLabel').textContent = G.year+'年目 / '+G.maxYears+'年'
  document.getElementById('turnOrderLabel').textContent =
    '順番: '+G.turnOrder.map(id=>G.players[id].name).join(' → ')

  // ── 破産警告バナー（自分のターンで手持ち現金がマイナス or 500円以下） ──
  const warningBanner = document.getElementById('bankruptcy-warning') || (() => {
    const el = document.createElement('div')
    el.id = 'bankruptcy-warning'
    el.className = 'hidden'
    const gameArea = document.getElementById('game-screen')
    gameArea?.insertBefore(el, gameArea.firstChild)
    return el
  })()

  if(cp.bankrupt){
    warningBanner.className = 'mb-2 p-3 rounded-xl text-center font-bold text-white'
    warningBanner.style.background = 'rgba(200,0,0,0.85)'
    warningBanner.innerHTML = '💀 破産しました。ゲームオーバーです。ターン終了を押して観戦してください。'
  } else if(cp.cash < 0){
    warningBanner.className = 'mb-2 p-3 rounded-xl text-center font-bold'
    warningBanner.style.background = 'rgba(220,50,50,0.8)'
    warningBanner.innerHTML = \`⚠️ 手持ち現金がマイナス！ <span class="text-2xl">\${fmt(cp.cash)}</span>　このまま行動できません。会社を売却してプラスに戻してください！\`
  } else if(cp.cash <= 500 && !cp.isAI){
    warningBanner.className = 'mb-2 p-2 rounded-xl text-center text-sm font-bold'
    warningBanner.style.background = 'rgba(255,160,0,0.7)'
    warningBanner.innerHTML = \`🚨 手持ち現金が少なくなっています: <span class="font-black">\${fmt(cp.cash)}</span>　マイナスになると破産！\`
  } else {
    warningBanner.className = 'hidden'
    warningBanner.style.background = ''
    warningBanner.innerHTML = ''
  }

  // Active event badge
  const evBadge = document.getElementById('activeEventBadge')
  if(G.activeEventTypes.length>0 || G.diceFixed){
    const labels = []
    if(G.diceFixed==='even') labels.push('🎲 サイコロ偶数固定')
    if(G.diceFixed==='odd')  labels.push('🎲 サイコロ奇数固定')
    G.activeEventTypes.forEach(t=>{
      const m={'company_profit_x2':'📈 会社利益2倍','company_loss_x2':'📉 会社損害2倍',
        'work_x3':'👷 労働報酬3倍','stock_x2':'🚀 株2倍','stock_half':'💥 株半値',
        'interest_x2':'💰 利息2倍'}
      if(m[t]) labels.push(m[t])
    })
    evBadge.textContent = '✨ 今年のイベント: '+labels.join(' / ')
    evBadge.classList.remove('hidden')
  } else {
    evBadge.classList.add('hidden')
  }

  // Players overview
  renderPlayersOverview()

  // Current player header
  document.getElementById('cpEmoji').textContent = PLAYER_EMOJIS[cp.id]
  document.getElementById('cpName').textContent  = cp.name + (cp.isAI?' (AI)':'')
  const maxAct = cp.extraAction ? 2 : 1
  document.getElementById('cpStatus').textContent =
    cp.bankrupt ? '💀 破産' :
    'アクション: '+cp.actionUsed+'/'+maxAct+(cp.extraTurn?' ⚠️再ターンあり':'')
  const cashEl = document.getElementById('cpCash')
  cashEl.textContent = fmt(cp.cash)
  cashEl.style.color = cp.cash < 0 ? '#f44336' : cp.cash <= 500 ? '#FF9800' : 'var(--c3)'

  renderActions()
  renderPortfolio()
  renderMarket()
  renderRanking()
  renderLog()
}

function renderPlayersOverview(){
  const el = document.getElementById('players-overview')
  const cols = G.players.length <= 4 ? 'grid-cols-2' :
               G.players.length <= 6 ? 'grid-cols-3' : 'grid-cols-4'
  el.className = 'grid gap-2 mb-3 '+cols

  el.innerHTML = G.players.map(p=>{
    const isCurrent = p.id === G.currentPlayer
    const cashColor = p.bankrupt ? '#f44336' : p.cash < 0 ? '#f44336' : p.cash <= 500 ? '#FF9800' : ''
    const panelStyle = p.bankrupt ? 'background:rgba(200,0,0,0.2);opacity:0.65;' : 'background:rgba(255,255,255,0.08);'
    return \`
    <div class="player-panel \${isCurrent?'current':''}" style="\${panelStyle}">
      <div class="flex items-center gap-1 mb-1">
        <span>\${p.bankrupt ? '💀' : PLAYER_EMOJIS[p.id]}</span>
        <span class="font-bold text-sm truncate">\${p.name}\${p.isAI?' 🤖':''}\${p.bankrupt?' 破産':''}</span>
        \${isCurrent?'<span class="ml-auto text-xs" style="color:var(--c3);">▶ 今</span>':''}
      </div>
      <div class="text-xs space-y-0.5">
        <div>💵 手持: <span class="font-bold" \${cashColor?'style="color:'+cashColor+';"':''}>\${fmt(p.cash)}</span></div>
        <div>🏧 ATM: <span class="font-bold">\${fmt(p.atm)}</span></div>
        <div>📊 総資産: <span class="font-bold" style="color:var(--c3);">\${fmt(p.totalAssets)}</span></div>
      </div>
    </div>
    \`
  }).join('')
}

function renderActions(){
  const cp = G.players[G.currentPlayer]
  const maxAct = cp.extraAction ? 2 : 1
  const canAct = cp.actionUsed < maxAct && !cp.isAI
  const pendingRoll = G.pendingRoll  // {type:'company'|'stock', id} or null
  const el = document.getElementById('action-buttons')
  el.innerHTML = ''

  // AIターン
  if(cp.isAI){
    el.innerHTML = \`<div class="col-span-2 text-center py-4">
      <div class="text-3xl mb-2">🤖</div>
      <div class="font-bold">\${cp.name}のターン（AI）</div>
    </div>\`
    document.getElementById('endTurnBtn').disabled = true
    document.getElementById('atm-panel').classList.add('hidden')
    document.getElementById('dice-panel').classList.add('hidden')
    document.getElementById('lend-panel').classList.add('hidden')
    document.getElementById('repay-panel').classList.add('hidden')
    return
  }

  // 破産済みプレイヤー
  if(cp.bankrupt){
    el.innerHTML = \`
      <div class="col-span-2 text-center py-4 rounded-xl" style="background:rgba(200,0,0,0.2);border:2px solid #f44336;">
        <div class="text-4xl mb-2">💀</div>
        <div class="font-bold text-red-400 text-lg">破産しました</div>
        <div class="text-xs mt-1 opacity-70">ターン終了ボタンを押してください</div>
      </div>\`
    document.getElementById('endTurnBtn').disabled = false
    document.getElementById('atm-panel').classList.add('hidden')
    document.getElementById('dice-panel').classList.add('hidden')
    document.getElementById('lend-panel').classList.add('hidden')
    document.getElementById('repay-panel').classList.add('hidden')
    return
  }

  document.getElementById('endTurnBtn').disabled = false
  document.getElementById('atm-panel').classList.add('hidden')
  document.getElementById('lend-panel').classList.add('hidden')
  document.getElementById('repay-panel').classList.add('hidden')

  // ── サイコロ待ち状態 ──
  if(pendingRoll){
    document.getElementById('dice-panel').classList.remove('hidden')
    if(pendingRoll.type === 'company'){
      const comp = G.companies.find(c=>c.id===pendingRoll.id)
      startCompanyRoll(pendingRoll.id)
      el.innerHTML = \`
        <div class="col-span-2 text-center py-3 rounded-xl" style="background:rgba(255,200,0,0.15);border:2px solid #FFD700;">
          <div class="text-3xl mb-1">🎲</div>
          <div class="font-bold text-yellow-300">\${comp?.emoji}\${comp?.name} のサイコロを振ってください！</div>
          <div class="text-xs opacity-70 mt-1">サイコロを振るまで他のアクションはできません</div>
        </div>\`
    } else {
      const st = G.stocks.find(s=>s.id===pendingRoll.id)
      startStockRoll(pendingRoll.id)
      el.innerHTML = \`
        <div class="col-span-2 text-center py-3 rounded-xl" style="background:rgba(255,200,0,0.15);border:2px solid #FFD700;">
          <div class="text-3xl mb-1">🎲</div>
          <div class="font-bold text-yellow-300">\${st?.emoji}\${st?.name} の配当サイコロを振ってください！</div>
          <div class="text-xs opacity-70 mt-1">サイコロを振るまで他のアクションはできません</div>
        </div>\`
    }
    return
  }

  document.getElementById('dice-panel').classList.add('hidden')

  // ── アクション済み状態 ──
  if(!canAct){
    el.innerHTML = \`
      <div class="col-span-2 text-center py-3 rounded-xl" style="background:rgba(0,200,100,0.15);border:2px solid #4CAF50;">
        <div class="text-3xl mb-1">✅</div>
        <div class="font-bold text-green-300">アクション完了！</div>
        <div class="text-xs opacity-70 mt-1">「ターンを終了する」を押してください</div>
      </div>\`

    // 売却ボタンはアクション済みでも表示
    if(cp.companies.length > 0){
      const sellSection = document.createElement('div')
      sellSection.className = 'col-span-2 mt-2'
      sellSection.innerHTML = \`<div class="text-xs font-bold mb-1 opacity-70">💸 会社売却（ターン中何回でも可）</div>\`
      const sellGrid = document.createElement('div')
      sellGrid.className = 'flex flex-wrap gap-2'
      cp.companies.forEach(cid=>{
        const comp = G.companies.find(x=>x.id===cid)
        if(!comp) return
        const btn = document.createElement('button')
        btn.className = 'btn btn-danger btn-sm'
        btn.innerHTML = \`\${comp.emoji} \${comp.name} 売却 (+\${fmt(comp.cost)})\`
        btn.addEventListener('click', ()=> doSellCompany(cid))
        sellGrid.appendChild(btn)
      })
      sellSection.appendChild(sellGrid)
      el.appendChild(sellSection)
    }
    return
  }

  // ── 通常アクション選択 ──
  const actions = [
    { icon:'💼', label:'はたらく',   sub: G.activeEventTypes.includes('work_x3')?'報酬300円！':'報酬100円', fn: doWork,           enabled: true },
    { icon:'🏧', label:'ATM',        sub:'ちょきん・おろす',                                                fn: showATMPanel,     enabled: true },
    { icon:'🏢', label:'会社を買う', sub:'マーケットタブへ →',                                             fn: ()=>switchTab('market'), enabled: true },
    { icon:'📈', label:'株を買う',   sub:'マーケットタブへ →',                                             fn: ()=>switchTab('market'), enabled: true },
  ]
  if(cp.companies.includes('bank'))
    actions.push({ icon:'🏦', label:'融資する', sub:'他プレイヤーへ貸付', fn: showLendPanel, enabled: true })
  if(cp.debts && cp.debts.length > 0)
    actions.push({ icon:'💳', label:'返済する', sub:'借金: '+fmt(cp.debts.reduce((s,d)=>s+d.amount,0)), fn: showRepayPanel, enabled: true })

  actions.forEach(a=>{
    const div = document.createElement('div')
    div.className = 'action-item'
    div.innerHTML = \`<div class="text-2xl mb-1">\${a.icon}</div>
      <div class="font-bold">\${a.label}</div>
      <div class="text-xs opacity-70">\${a.sub}</div>\`
    div.addEventListener('click', a.fn)
    el.appendChild(div)
  })

  // 売却ボタン（ターン中いつでも可）
  if(cp.companies.length > 0){
    const sellSection = document.createElement('div')
    sellSection.className = 'col-span-2 mt-2'
    sellSection.innerHTML = \`<div class="text-xs font-bold mb-1 opacity-70">💸 会社売却（ターン中何回でも可）</div>\`
    const sellGrid = document.createElement('div')
    sellGrid.className = 'flex flex-wrap gap-2'
    cp.companies.forEach(cid=>{
      const comp = G.companies.find(x=>x.id===cid)
      if(!comp) return
      const btn = document.createElement('button')
      btn.className = 'btn btn-danger btn-sm'
      btn.innerHTML = \`\${comp.emoji} \${comp.name} 売却 (+\${fmt(comp.cost)})\`
      btn.addEventListener('click', ()=> doSellCompany(cid))
      sellGrid.appendChild(btn)
    })
    sellSection.appendChild(sellGrid)
    el.appendChild(sellSection)
  }
}

function renderPortfolio(){
  const cp = G.players[G.currentPlayer]
  const el = document.getElementById('portfolio-content')
  el.innerHTML = ''

  const wrap = document.createElement('div')
  wrap.className = 'space-y-3'

  // 手持ち現金
  wrap.innerHTML += \`
  <div class="card-white p-3 flex justify-between items-center">
    <div><div class="text-xs text-gray-500">💵 手持ち現金</div>
    <div class="text-xl font-black" style="color:var(--c1);">\${fmt(cp.cash)}</div></div>
    <div class="text-3xl">💵</div>
  </div>
  <div class="card-white p-3 flex justify-between items-center">
    <div><div class="text-xs text-gray-500">🏧 ATM残高</div>
    <div class="text-xl font-black" style="color:#00bcd4;">\${fmt(cp.atm)}</div>
    <div class="text-xs text-gray-400">利息: \${fmt(calcInterestDisplay(cp.atm))}/年</div></div>
    <div class="text-3xl">🏧</div>
  </div>\`

  // 保有株
  if(cp.stocks.length > 0){
    let sh = \`<div class="card-white p-3"><div class="font-bold mb-2">📈 保有株</div>\`
    cp.stocks.forEach(s=>{
      const st = G.stocks.find(x=>x.id===s.id)
      if(!st) return
      sh += \`<div class="flex justify-between items-center py-1 border-b border-gray-100">
        <div>\${st.emoji} \${st.name} × \${s.qty}株</div>
        <div class="font-bold">\${fmt(st.buyPrice*s.qty)}</div>
      </div>\`
    })
    sh += '</div>'
    wrap.innerHTML += sh
  }

  // 保有会社（自分のターンなら何回でも売却可能）
  if(cp.companies.length > 0){
    const isMyTurn = !cp.isAI
    const compDiv = document.createElement('div')
    compDiv.className = 'card-white p-3'
    compDiv.innerHTML = \`<div class="font-bold mb-2">🏢 保有会社
      <span class="text-xs font-normal ml-1" style="color:#4CAF50;">自分のターン中は何回でも売却可</span>
    </div>\`
    cp.companies.forEach(cid=>{
      const comp = G.companies.find(x=>x.id===cid)
      if(!comp) return
      const row = document.createElement('div')
      row.className = 'flex justify-between items-center py-1 border-b border-gray-100 gap-2 flex-wrap'
      row.innerHTML = \`
        <div class="text-sm flex-1">\${comp.emoji} <span class="font-bold">\${comp.name}</span>
          <span class="text-xs ml-1" style="color:#4CAF50;">売値: \${fmt(comp.cost)}（全額）</span>
        </div>\`
      const sellBtn = document.createElement('button')
      sellBtn.className = 'btn btn-danger btn-sm'
      sellBtn.innerHTML = '💸 売却'
      // AIターン中のみ無効化、自分のターンは回数制限なし
      if(!isMyTurn) {
        sellBtn.disabled = true
      } else {
        sellBtn.addEventListener('click', ()=> doSellCompany(cid))
      }
      row.appendChild(sellBtn)
      compDiv.appendChild(row)
      if(comp.upgradeTo){
        const upRow = document.createElement('div')
        upRow.className = 'flex justify-between items-center py-1 gap-2'
        upRow.innerHTML = \`<div class="text-xs text-gray-500">⬆️ UP可能 \${fmt(comp.upgradeCost)}</div>\`
        const upBtn = document.createElement('button')
        upBtn.className = 'btn btn-warning btn-sm'
        upBtn.textContent = '⬆️ UP!'
        upBtn.addEventListener('click', ()=> doUpgradeCompany(cid))
        upRow.appendChild(upBtn)
        compDiv.appendChild(upRow)
      }
    })
    wrap.appendChild(compDiv)
  }

  // 融資中
  if(cp.loans && cp.loans.length > 0){
    let lh = \`<div class="card-white p-3"><div class="font-bold mb-2">🏦 融資中</div>\`
    cp.loans.forEach(l=>{
      lh += \`<div class="flex justify-between py-1 border-b border-gray-100">
        <div>\${G.players[l.toPlayerId].name}へ \${fmt(l.amount)}</div>
        <div class="text-xs text-gray-500">年利\${fmt(l.yearlyInterest)}</div>
      </div>\`
    })
    lh += '</div>'
    wrap.innerHTML += lh
  }

  // 借金
  if(cp.debts && cp.debts.length > 0){
    let dh = \`<div class="card-white p-3" style="border:2px solid #f44336;"><div class="font-bold mb-2 text-red-600">⚠️ 借金</div>\`
    cp.debts.forEach(d=>{
      dh += \`<div class="flex justify-between py-1 border-b border-gray-100">
        <div>\${G.players[d.fromPlayerId].name}から \${fmt(d.amount)}</div>
        <div class="text-xs text-gray-500">年利\${fmt(d.yearlyInterest)}</div>
      </div>\`
    })
    dh += '</div>'
    wrap.innerHTML += dh
  }

  // 勝利資産
  wrap.innerHTML += \`<div class="card-white p-3 flex justify-between items-center">
    <div class="font-bold">💰 勝利資産合計</div>
    <div class="text-xl font-black" style="color:var(--c3);">\${fmt(cp.totalAssets)}</div>
  </div>\`

  el.appendChild(wrap)
}

function calcInterestDisplay(atm){
  if(atm>=3500) return 600
  if(atm>=2600) return 300
  if(atm>=1500) return 200
  if(atm>=200)  return 100
  return 0
}

function renderMarket(){
  const cp = G.players[G.currentPlayer]
  // pendingRoll中（サイコロ待ち）または actionUsed済みなら購入不可
  const canAct = cp.actionUsed < (cp.extraAction?2:1) && !cp.isAI && !G.pendingRoll
  const el = document.getElementById('market-content')
  el.innerHTML = ''

  // サイコロ待ち中はマーケット全体をロック表示
  if(G.pendingRoll){
    el.innerHTML = \`<div class="text-center py-6 opacity-60">
      <div class="text-3xl mb-2">🎲</div>
      <div class="font-bold">サイコロを振ってからマーケットを使えます</div>
      <div class="text-xs mt-1">アクションタブに戻ってサイコロを振ってください</div>
    </div>\`
    return
  }

  // ── 会社マーケット ──
  const compTitle = document.createElement('h3')
  compTitle.className = 'font-bold mb-2'
  compTitle.textContent = '🏢 会社マーケット'
  el.appendChild(compTitle)

  const compGrid = document.createElement('div')
  compGrid.className = 'grid grid-cols-2 gap-2 mb-4'

  G.companies.filter(c=>!['restaurant3','railway'].includes(c.id)).forEach(comp=>{
    const owned = cp.companies.includes(comp.id)
    const canBuy = canAct && !owned && cp.cash >= comp.cost

    // サイコロ収益テキスト生成
    const rollText = comp.rolls.map(r=>'🎲'+r.range[0]+'-'+r.range[1]+': '+r.label).join('<br>')

    const card = document.createElement('div')
    card.className = 'item-card ' + (owned ? 'owned' : canBuy ? '' : 'disabled')
    card.innerHTML = \`
      <div class="text-2xl mb-1">\${comp.emoji}</div>
      <div class="font-bold text-sm">\${comp.name}</div>
      <div class="text-xs opacity-70 mb-1">\${comp.desc}</div>
      <div class="font-black mb-1" style="color:var(--c3);">\${fmt(comp.cost)}</div>
      <div class="text-xs" style="color:#90caf9;">\${rollText}</div>
      \${owned ? '<div class="text-xs text-green-400 font-bold mt-1">✅ 所持済み</div>' : ''}
    \`
    if(canBuy){
      card.style.cursor = 'pointer'
      card.addEventListener('click', ()=> doBuyCompany(comp.id))
    } else if(owned){
      card.style.cursor = 'default'
      card.addEventListener('click', ()=> showToast('すでに持っています','error'))
    }
    compGrid.appendChild(card)
  })
  el.appendChild(compGrid)

  // ── 株マーケット ──
  const stTitle = document.createElement('h3')
  stTitle.className = 'font-bold mb-2'
  stTitle.textContent = '📈 株マーケット'
  el.appendChild(stTitle)

  const stGrid = document.createElement('div')
  stGrid.className = 'grid grid-cols-2 gap-2'

  G.stocks.forEach(st=>{
    const holding = cp.stocks.find(s=>s.id===st.id)
    const qty = holding?.qty||0
    let price = st.buyPrice
    if(G.activeEventTypes.includes('stock_x2')) price *= 2
    if(G.activeEventTypes.includes('stock_half')) price = Math.floor(price/2)
    const canBuy = canAct && cp.cash >= price

    const card = document.createElement('div')
    card.className = 'item-card ' + (canBuy ? '' : 'disabled')
    card.innerHTML = \`
      <div class="text-2xl mb-1">\${st.emoji}</div>
      <div class="font-bold text-sm">\${st.name}</div>
      <div class="text-xs opacity-70 mb-1">\${st.desc}</div>
      <div class="font-black mb-1" style="color:var(--c3);">\${fmt(price)}/株</div>
      <div class="text-xs" style="color:#90caf9;">偶数: +\${yen(st.rolls[0].effect)}円 / 奇数: \${yen(st.rolls[1].effect)}円</div>
      \${qty>0 ? '<div class="text-xs text-blue-300 font-bold mt-1">📊 '+qty+'株保有</div>' : ''}
    \`
    if(canBuy){
      card.style.cursor = 'pointer'
      card.addEventListener('click', ()=> doBuyStock(st.id))
    }
    stGrid.appendChild(card)
  })
  el.appendChild(stGrid)

  // ── サイコロアクション（保有済み会社・株のロール）──
  const diceTitle = document.createElement('h3')
  diceTitle.className = 'font-bold mt-4 mb-2'
  diceTitle.textContent = '🎲 サイコロアクション'
  el.appendChild(diceTitle)

  const diceList = document.createElement('div')
  diceList.className = 'space-y-2'

  let hasRollable = false

  cp.companies.forEach(cid=>{
    const comp = G.companies.find(x=>x.id===cid)
    if(!comp || comp.rolls.length===0 || comp.id==='bank') return
    hasRollable = true
    const card = document.createElement('div')
    card.className = 'item-card owned ' + (canAct ? '' : 'disabled')
    card.innerHTML = \`
      \${comp.emoji} <span class="font-bold">\${comp.name}</span> のサイコロ
      <div class="text-xs opacity-70">\${comp.rolls.map(r=>r.range[0]+'-'+r.range[1]+': '+r.label).join(' / ')}</div>
    \`
    if(canAct){
      card.style.cursor = 'pointer'
      card.addEventListener('click', ()=> startCompanyRoll(cid))
    }
    diceList.appendChild(card)
  })

  cp.stocks.forEach(s=>{
    if(s.qty===0) return
    const st = G.stocks.find(x=>x.id===s.id)
    if(!st) return
    hasRollable = true
    const card = document.createElement('div')
    card.className = 'item-card owned ' + (canAct ? '' : 'disabled')
    card.innerHTML = \`
      \${st.emoji} <span class="font-bold">\${st.name}</span> の配当 (\${s.qty}株)
      <div class="text-xs opacity-70">偶数: +\${yen(st.rolls[0].effect*s.qty)}円 / 奇数: \${yen(st.rolls[1].effect*s.qty)}円</div>
    \`
    if(canAct){
      card.style.cursor = 'pointer'
      card.addEventListener('click', ()=> startStockRoll(s.id))
    }
    diceList.appendChild(card)
  })

  if(!hasRollable){
    const empty = document.createElement('div')
    empty.className = 'text-sm opacity-50'
    empty.textContent = '会社・株を購入するとサイコロを振れます'
    diceList.appendChild(empty)
  }
  el.appendChild(diceList)
}

function renderRanking(){
  const el = document.getElementById('ranking-content')
  // 生存者を資産順、破産者を末尾に
  const alive = [...G.players].filter(p=>!p.bankrupt).sort((a,b)=>b.totalAssets-a.totalAssets)
  const bankrupt = [...G.players].filter(p=>p.bankrupt)
  const sorted = [...alive, ...bankrupt]
  el.innerHTML = sorted.map((p,i)=>{
    const isBankrupt = !!p.bankrupt
    const rankIcon = isBankrupt ? '💀' : (['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'][i]||i+1+'.')
    const cashColor = p.cash < 0 ? 'color:#f44336;' : p.cash <= 500 ? 'color:#FF9800;' : ''
    return \`
    <div class="rank-row \${isBankrupt?'opacity-50':'rank-'+(i<3?i+1:'other')} \${p.id===G.currentPlayer?'ring-2 ring-yellow-300':''}" \${isBankrupt?'style="background:rgba(200,0,0,0.15);"':''}>
      <div class="text-2xl font-black">\${rankIcon}</div>
      <div class="flex-1">
        <div class="font-bold">\${isBankrupt?'💀':PLAYER_EMOJIS[p.id]} \${p.name}\${isBankrupt?' <span class="text-red-400 text-xs">破産</span>':''}</div>
        <div class="text-sm" style="\${cashColor}">手持:\${fmt(p.cash)} ATM:\${fmt(p.atm)}</div>
      </div>
      <div class="text-right">
        <div class="font-black text-lg \${isBankrupt?'text-red-400':''}">\${fmt(p.totalAssets)}</div>
      </div>
    </div>
    \`
  }).join('')
}

// 破産通知オーバーレイ
function showBankruptNotice(playerName){
  const overlay = document.createElement('div')
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.75);'
  overlay.innerHTML = \`
    <div style="background:linear-gradient(135deg,#1a0000,#3d0000);border:3px solid #f44336;border-radius:20px;padding:40px;text-align:center;max-width:320px;">
      <div style="font-size:4rem;">💀</div>
      <div style="font-size:1.5rem;font-weight:900;color:#f44336;margin:12px 0;">\${playerName}</div>
      <div style="font-size:1.1rem;font-weight:bold;color:#fff;margin-bottom:8px;">破　産</div>
      <div style="font-size:0.8rem;color:#aaa;margin-bottom:20px;">手持ち現金がマイナスになりました。<br>以降のターンに参加できません。</div>
      <button onclick="this.parentElement.parentElement.remove()" style="background:#f44336;color:#fff;border:none;border-radius:10px;padding:10px 30px;font-weight:bold;cursor:pointer;font-size:1rem;">OK</button>
    </div>
  \`
  document.body.appendChild(overlay)
  // 3秒後に自動消去
  setTimeout(()=>{ overlay.remove() }, 4000)
}

function renderLog(){
  const el = document.getElementById('log-content')
  el.innerHTML = G.log.map(l=>\`<div class="text-xs p-1 rounded bg-white/5">\${l}</div>\`).join('')
}

// ============================================================
// Actions
// ============================================================
async function apiPost(endpoint, body){
  if(processingAction) return null
  processingAction = true
  try{
    const res = await fetch('/api/game'+endpoint,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(body)
    })
    return await res.json()
  } finally{
    processingAction = false
  }
}

async function doWork(){
  const data = await apiPost('/action/work',{state:G})
  if(!data) return
  if(!data.success){ showToast(data.error,'error'); return }
  G = data.state
  renderGame()
  spawnCoins(3)
  showToast('💼 はたらいた！','info')
}

// ATM panel
function showATMPanel(){
  const cp = G.players[G.currentPlayer]
  document.getElementById('atmBalance').textContent = fmt(cp.atm)
  document.getElementById('atmInterestInfo').textContent = '利息: '+fmt(calcInterestDisplay(cp.atm))+'/年'
  document.getElementById('atm-panel').classList.remove('hidden')
}

async function doDeposit(){
  const amt = parseInt(document.getElementById('atmAmount').value)
  if(!amt||amt<=0){ showToast('金額を入力してね','error'); return }
  const data = await apiPost('/action/deposit',{state:G, amount:amt})
  if(!data) return
  if(!data.success){ showToast(data.error,'error'); return }
  G = data.state
  document.getElementById('atmAmount').value=''
  document.getElementById('atm-panel').classList.add('hidden')
  renderGame()
  showToast('🏧 預けた！','info')
}

async function doWithdraw(){
  const amt = parseInt(document.getElementById('atmAmount').value)
  if(!amt||amt<=0){ showToast('金額を入力してね','error'); return }
  const data = await apiPost('/action/withdraw',{state:G, amount:amt})
  if(!data) return
  if(!data.success){ showToast(data.error,'error'); return }
  G = data.state
  document.getElementById('atmAmount').value=''
  document.getElementById('atm-panel').classList.add('hidden')
  renderGame()
  showToast('💸 引き出した！','info')
}

// Company buy
async function doBuyCompany(companyId){
  const comp = G.companies.find(c=>c.id===companyId)
  if(!comp){ showToast('会社データが見つかりません','error'); return }
  showConfirm(
    comp.emoji+' '+comp.name+'を買う？',
    \`<div class="text-2xl font-black" style="color:#f44336;">\${fmt(comp.cost)}</div>
    <div class="text-sm mt-1">\${comp.desc}</div>
    \${comp.rolls&&comp.rolls.length>0?'<div class="text-xs mt-2" style="color:#FFD700;">購入後にサイコロを振ってください</div>':''}\`,
    async ()=>{
      const data = await apiPost('/action/buy-company',{state:G, companyId})
      if(!data) return
      if(!data.success){ showToast(data.error,'error'); return }
      G = data.state
      spawnCoins(5)
      showToast('🏢 '+comp.name+'を購入！','info')
      // state.pendingRollがあればアクションタブに戻ってサイコロパネルを自動表示
      renderGame()
      if(G.pendingRoll){
        switchTab('actions')
        // renderGame()内のrenderActions()がpendingRollを検知してサイコロパネルを開く
      }
    }
  )
}

// Company upgrade
async function doUpgradeCompany(companyId){
  const comp = G.companies.find(c=>c.id===companyId)
  const newComp = G.companies.find(c=>c.id===comp.upgradeTo)
  showConfirm(
    '⬆️ アップグレード',
    \`\${comp.emoji}\${comp.name} → \${newComp.emoji}\${newComp.name}<br>費用: <span class="font-black">\${fmt(comp.upgradeCost)}</span>\`,
    async ()=>{
      const data = await apiPost('/action/upgrade-company',{state:G, companyId})
      if(!data) return
      if(!data.success){ showToast(data.error,'error'); return }
      G = data.state
      renderGame()
      spawnCoins(8)
      showToast('⬆️ アップグレード！','info')
    }
  )
}

// Company sell
async function doSellCompany(companyId){
  const comp = G.companies.find(c=>c.id===companyId)
  const sellPrice = comp.cost
  showConfirm(
    comp.emoji+' '+comp.name+'を売却する？',
    \`<div class="text-2xl font-black" style="color:#4CAF50;">+\${fmt(sellPrice)}</div>
    <div class="text-sm mt-1 text-gray-600">購入額の全額が手元に戻ります</div>\`,
    async ()=>{
      const data = await apiPost('/action/sell-company',{state:G, companyId})
      if(!data) return
      if(!data.success){ showToast(data.error,'error'); return }
      G = data.state
      renderGame()
      spawnCoins(4)
      showToast('💸 '+comp.name+'を売却！'+fmt(sellPrice)+'回収','info')
    }
  )
}

// Stock buy
async function doBuyStock(stockId){
  const st = G.stocks.find(s=>s.id===stockId)
  if(!st){ showToast('株データが見つかりません','error'); return }
  let price = st.buyPrice
  if(G.activeEventTypes.includes('stock_x2')) price*=2
  if(G.activeEventTypes.includes('stock_half')) price=Math.floor(price/2)
  showConfirm(
    st.emoji+' '+st.name+'を買う？',
    \`1株 <span class="font-black">\${fmt(price)}</span><br>\${st.desc}
    <div class="text-xs mt-2" style="color:#FFD700;">購入後にサイコロを振ってください</div>\`,
    async ()=>{
      const data = await apiPost('/action/buy-stock',{state:G, stockId, qty:1})
      if(!data) return
      if(!data.success){ showToast(data.error,'error'); return }
      G = data.state
      spawnCoins(4)
      showToast('📈 '+st.name+'を購入！','info')
      // state.pendingRollがあればアクションタブに戻ってサイコロパネルを自動表示
      renderGame()
      if(G.pendingRoll){
        switchTab('actions')
      }
    }
  )
}

// Company roll
function startCompanyRoll(companyId){
  const comp = G.companies.find(c=>c.id===companyId)
  diceContext = {type:'company', id:companyId}
  document.getElementById('dicePanelTitle').textContent = comp.emoji+' '+comp.name+' のサイコロ！'
  document.getElementById('diceDisplay').textContent = '🎲'
  document.getElementById('diceResult').textContent = ''
  document.getElementById('rollBtn').disabled = false
  document.getElementById('dice-panel').classList.remove('hidden')
  switchTab('actions')
}

// Stock roll
function startStockRoll(stockId){
  const st = G.stocks.find(s=>s.id===stockId)
  diceContext = {type:'stock', id:stockId}
  document.getElementById('dicePanelTitle').textContent = st.emoji+' '+st.name+' の配当サイコロ！'
  document.getElementById('diceDisplay').textContent = '🎲'
  document.getElementById('diceResult').textContent = ''
  document.getElementById('rollBtn').disabled = false
  document.getElementById('dice-panel').classList.remove('hidden')
  switchTab('actions')
}

const DICE_EMOJIS = ['','⚀','⚁','⚂','⚃','⚄','⚅']

async function rollDice(){
  if(processingAction) return
  document.getElementById('rollBtn').disabled = true
  const diceEl = document.getElementById('diceDisplay')
  diceEl.classList.add('rolling')
  document.getElementById('diceResult').textContent = '🎲 振っています...'

  // サーバーから乱数を先に取得（アニメーションと並行）
  let diceValue = null
  try {
    const diceData = await fetch('/api/game/roll-dice',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({state:G})
    }).then(r=>r.json())
    diceValue = diceData.dice
  } catch(e) {
    // フォールバック：クライアント乱数
    diceValue = Math.floor(Math.random()*6)+1
    const ev = G.diceFixed
    if(ev==='even' && diceValue%2!==0) diceValue = diceValue===6?2:diceValue+1
    if(ev==='odd'  && diceValue%2===0) diceValue = diceValue===1?3:diceValue-1
  }

  // アニメーション（800ms）
  let cnt = 0
  const anim = setInterval(()=>{
    diceEl.textContent = DICE_EMOJIS[Math.floor(Math.random()*6)+1]
    cnt++
  },80)
  await new Promise(r=>setTimeout(r,800))
  clearInterval(anim)
  diceEl.classList.remove('rolling')

  // 確定した目を表示
  const dice = diceValue
  diceEl.textContent = DICE_EMOJIS[dice] || String(dice)
  document.getElementById('diceResult').textContent = \`🎲 \${dice} が出た！\`

  // 結果をサーバーに送信（processingAction を直接制御）
  processingAction = true
  try {
    if(diceContext.type==='company'){
      const res = await fetch('/api/game/action/company-roll',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({state:G, companyId:diceContext.id, dice})
      }).then(r=>r.json())

      if(!res.success){
        showToast(res.error||'エラー','error')
        document.getElementById('rollBtn').disabled=false
        document.getElementById('diceResult').textContent=''
        return
      }
      G = res.state
      const resultText = \`🎲 \${dice} → \${res.label||''}  \${res.effect&&res.effect!==0?(res.effect>0?'▲+':'')+fmt(res.effect):''}\`
      document.getElementById('diceResult').textContent = resultText

      if(res.bonus==='take_2500'||res.bonus==='take_1250'){
        showShrineTargets()
      } else {
        if(res.effect>0) spawnCoins(6)
        await new Promise(r=>setTimeout(r,1500))
        document.getElementById('dice-panel').classList.add('hidden')
        // 破産チェック
        if(res.bankrupted !== null && res.bankrupted !== undefined){
          const bp = G.players[res.bankrupted]
          showBankruptNotice(bp.name)
        }
        renderGame()
      }

    } else if(diceContext.type==='stock'){
      const res = await fetch('/api/game/action/stock-roll',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({state:G, stockId:diceContext.id, dice})
      }).then(r=>r.json())

      if(!res.success){
        showToast(res.error||'エラー','error')
        document.getElementById('rollBtn').disabled=false
        document.getElementById('diceResult').textContent=''
        return
      }
      G = res.state
      const resultText2 = \`🎲 \${dice} → \${res.label}  \${res.effect?(res.effect>0?'▲+':'')+fmt(res.effect):''}\`
      document.getElementById('diceResult').textContent = resultText2
      if(res.effect>0) spawnCoins(6)
      await new Promise(r=>setTimeout(r,1500))
      document.getElementById('dice-panel').classList.add('hidden')
      // 破産チェック
      if(res.bankrupted !== null && res.bankrupted !== undefined){
        const bp = G.players[res.bankrupted]
        showBankruptNotice(bp.name)
      }
      renderGame()
    }
  } finally {
    processingAction = false
    diceContext = null
  }
}

function cancelDice(){
  diceContext = null
  document.getElementById('dice-panel').classList.add('hidden')
}

// Shrine target
function showShrineTargets(){
  const cp = G.players[G.currentPlayer]
  const bonus = G.pendingShrineBonus
  if(!bonus){ document.getElementById('dice-panel').classList.add('hidden'); renderGame(); return }

  document.getElementById('shrineAmountLabel').textContent = fmt(bonus.amount)+'もらえます！'
  const el = document.getElementById('shrine-targets')
  el.innerHTML = G.players
    .filter(p=>p.id!==cp.id)
    .map(p=>\`
    <button class="btn btn-warning w-full" onclick="doShrineCollect(\${p.id})">
      \${PLAYER_EMOJIS[p.id]} \${p.name}（手持: \${fmt(p.cash)}）
    </button>\`).join('')
  document.getElementById('media-overlay').classList.add('show')
  document.getElementById('dice-panel').classList.add('hidden')
}

async function doShrineCollect(targetPlayerId){
  const data = await apiPost('/action/shrine-collect',{state:G, targetPlayerId})
  if(!data) return
  if(!data.success){ showToast(data.error,'error'); return }
  G = data.state
  document.getElementById('media-overlay').classList.remove('show')
  renderGame()
  spawnCoins(5)
}

// Lend panel
function showLendPanel(){
  const cp = G.players[G.currentPlayer]
  const sel = document.getElementById('lendTarget')
  sel.innerHTML = '<option value="">-- 選ぶ --</option>'+
    G.players.filter(p=>p.id!==cp.id).map(p=>\`<option value="\${p.id}">\${PLAYER_EMOJIS[p.id]} \${p.name}（手持:\${fmt(p.cash)}）</option>\`).join('')
  document.getElementById('lend-panel').classList.remove('hidden')
}
function hideLendPanel(){ document.getElementById('lend-panel').classList.add('hidden') }

async function doLend(){
  const toPlayerId = parseInt(document.getElementById('lendTarget').value)
  const amount = parseInt(document.getElementById('lendAmount').value)
  if(isNaN(toPlayerId)){ showToast('相手を選んでね','error'); return }
  if(!amount||amount<=0){ showToast('金額を入力してね','error'); return }
  const data = await apiPost('/action/lend',{state:G, toPlayerId, amount})
  if(!data) return
  if(!data.success){ showToast(data.error,'error'); return }
  G = data.state
  hideLendPanel()
  renderGame()
  showToast('🏦 融資した！','info')
}

// Repay panel
function showRepayPanel(){
  const cp = G.players[G.currentPlayer]
  const el = document.getElementById('repay-list')
  el.innerHTML = cp.debts.map(d=>\`
    <div class="flex justify-between items-center py-2 border-b border-white/20">
      <div class="text-sm">\${G.players[d.fromPlayerId].name}へ \${fmt(d.amount)}</div>
      <div class="flex gap-1">
        <input type="number" id="repayAmt_\${d.fromPlayerId}" placeholder="額" min="100" step="100"
          class="w-24 rounded px-2 py-1 text-black text-sm">
        <button class="btn btn-success btn-sm" onclick="doRepay(\${d.fromPlayerId})">返済</button>
      </div>
    </div>\`).join('')
  document.getElementById('repay-panel').classList.remove('hidden')
}
function hideRepayPanel(){ document.getElementById('repay-panel').classList.add('hidden') }

async function doRepay(fromPlayerId){
  const amount = parseInt(document.getElementById('repayAmt_'+fromPlayerId).value)
  if(!amount||amount<=0){ showToast('金額を入力してね','error'); return }
  const data = await apiPost('/action/repay',{state:G, fromPlayerId, amount})
  if(!data) return
  if(!data.success){ showToast(data.error,'error'); return }
  G = data.state
  hideRepayPanel()
  renderGame()
  showToast('💳 返済した！','info')
}

// ============================================================
// End Turn
// ============================================================
async function doEndTurn(){
  if(processingAction) return
  processingAction = true
  try{
    const res = await fetch('/api/game/end-turn',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({state:G})
    })
    const data = await res.json()
    if(!data.success){ showToast(data.error||'エラー','error'); return }
    G = data.state

    // Game over?
    if(G.gameOver || G.phase==='result'){
      showResult()
      return
    }

    // Event card?
    if(G.eventCard && !G._eventShown){
      G._eventShown = true
      showEventCard(G.eventCard)
      return
    }

    // Bankruptcy?
    if(G.eventCard && G.eventCard.type==='bankruptcy'){
      handleBankruptcy()
      return
    }

    // Handoff?
    if(G.needsHandoff){
      const nextP = G.players[G.handoffTo]
      showHandoff(nextP)
    } else {
      renderGame()
      // AI auto-play
      if(G.players[G.currentPlayer].isAI){
        setTimeout(doAITurn, 800)
      }
    }
  } finally{
    processingAction = false
  }
}

// ============================================================
// Event Card
// ============================================================
function showEventCard(card){
  document.getElementById('eventEmoji').textContent = card.emoji
  document.getElementById('eventName').textContent  = card.name
  document.getElementById('eventDesc').textContent  = card.desc
  document.getElementById('event-overlay').classList.add('show')
}

function dismissEvent(){
  document.getElementById('event-overlay').classList.remove('show')
  G._eventShown = false

  if(G.eventCard && G.eventCard.type === 'bankruptcy'){
    handleBankruptcy()
    return
  }

  if(G.needsHandoff){
    const nextP = G.players[G.handoffTo]
    showHandoff(nextP)
  } else {
    renderGame()
    if(G.players[G.currentPlayer].isAI){
      setTimeout(doAITurn, 800)
    }
  }
}

async function handleBankruptcy(){
  // Force current player (who drew the card = rank 1) to sell all companies
  const leaderId = G.turnOrder[0]
  const leader = G.players[leaderId]
  if(leader.companies.length === 0){
    showToast('🏚️ 倒産！でも会社がありませんでした','error')
    afterBankruptcy()
    return
  }
  showToast('🏚️ 倒産！'+leader.name+'が会社を全て売却します','error')
  // auto-sell all
  for(const cid of [...leader.companies]){
    const res = await fetch('/api/game/action/sell-company',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({state:G, companyId:cid})
    })
    const d = await res.json()
    if(d.success) G = d.state
  }
  afterBankruptcy()
}

function afterBankruptcy(){
  if(G.needsHandoff){
    showHandoff(G.players[G.handoffTo])
  } else {
    renderGame()
  }
}

// ============================================================
// Handoff
// ============================================================
function showHandoff(nextPlayer){
  document.getElementById('handoffPlayerName').textContent = nextPlayer.name
  document.getElementById('handoffTitle').textContent = '端末を渡してください 🔒'
  document.getElementById('handoffReadyLabel').textContent = nextPlayer.name+'の番だよ！準備完了'
  document.getElementById('screen-handoff').classList.add('show')
}

function readyHandoff(){
  document.getElementById('screen-handoff').classList.remove('show')
  G.needsHandoff = false
  G.handoffTo = null
  renderGame()
  if(G.players[G.currentPlayer].isAI){
    setTimeout(doAITurn, 800)
  }
}

// ============================================================
// AI Turn
// ============================================================
async function doAITurn(){
  const cp = G.players[G.currentPlayer]
  if(!cp.isAI) return

  setActionMsg('🤖 '+cp.name+' が考え中...')

  // Simple AI: buy cheapest available, work if poor
  try{
    // Try to buy a company if we have enough cash and no action used
    if(cp.actionUsed === 0){
      const affordable = G.companies
        .filter(c=>!['restaurant3','railway'].includes(c.id) && !cp.companies.includes(c.id) && cp.cash >= c.cost)
        .sort((a,b)=>a.cost-b.cost)
      if(affordable.length>0 && Math.random()>0.4){
        const pick = affordable[0]
        const d = await apiPost('/action/buy-company',{state:G, companyId:pick.id})
        if(d?.success){ G=d.state; await delay(500) }
      } else if(cp.cash < 300 || Math.random()>0.7){
        const d = await apiPost('/action/work',{state:G})
        if(d?.success){ G=d.state; await delay(500) }
      } else {
        // deposit some
        const depositAmt = Math.floor(cp.cash * 0.3 / 100)*100
        if(depositAmt>=100){
          const d = await apiPost('/action/deposit',{state:G, amount:depositAmt})
          if(d?.success){ G=d.state; await delay(500) }
        } else {
          const d = await apiPost('/action/work',{state:G})
          if(d?.success){ G=d.state; await delay(500) }
        }
      }
    }

    // Roll for owned companies
    for(const cid of cp.companies){
      const comp = G.companies.find(x=>x.id===cid)
      if(!comp || comp.rolls.length===0) continue
      if(G.players[G.currentPlayer].actionUsed >= (G.players[G.currentPlayer].extraAction?2:1)) break
      const diceData = await fetch('/api/game/roll-dice',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:G})}).then(r=>r.json())
      const d = await apiPost('/action/company-roll',{state:G, companyId:cid, dice:diceData.dice})
      if(d?.success){ G=d.state; await delay(500) }
      if(G.pendingShrineBonus){
        // Auto pick poorest target
        const targets = G.players.filter(p=>p.id!==G.currentPlayer).sort((a,b)=>b.cash-a.cash)
        if(targets.length>0){
          const sd = await apiPost('/action/shrine-collect',{state:G, targetPlayerId:targets[0].id})
          if(sd?.success) G=sd.state
        }
      }
    }

    renderGame()
    setActionMsg('')
    await delay(600)
    doEndTurn()
  } catch(e){
    console.error('AI error',e)
    doEndTurn()
  }
}

function delay(ms){ return new Promise(r=>setTimeout(r,ms)) }

// ============================================================
// Result
// ============================================================
function showResult(){
  const sorted = [...G.players].sort((a,b)=>b.totalAssets-a.totalAssets)
  document.getElementById('resultYears').textContent = G.maxYears+'年間のゲーム終了！'

  document.getElementById('result-ranks').innerHTML = sorted.map((p,i)=>\`
    <div class="rank-row rank-\${i<3?i+1:'other'}">
      <div class="text-2xl">\${['🥇','🥈','🥉','4⃣','5⃣','6⃣','7⃣','8⃣','9⃣','🔟'][i]||i+1+'.'}</div>
      <div class="flex-1">
        <div class="font-bold">\${PLAYER_EMOJIS[p.id]} \${p.name}</div>
        <div class="text-sm">現金:\${fmt(p.cash)} ATM:\${fmt(p.atm)} 株:\${fmt(p.stocks.reduce((s,st)=>{const x=G.stocks.find(y=>y.id===st.id);return s+(x?x.buyPrice*st.qty:0)},0))}</div>
      </div>
      <div class="font-black text-xl">\${fmt(p.totalAssets)}</div>
    </div>
  \`).join('')

  document.getElementById('result-lesson').innerHTML = \`
    <p>✅ <b>現金だけじゃなく、ATMや株にも分けて持つ</b>のが大切！</p>
    <p>✅ <b>ATMにお金を預けると利息が増える</b>よ！</p>
    <p>✅ <b>株はリスクがある</b>けど大きく増えることも！</p>
    <p>✅ <b>会社を経営するとサイコロ次第で大儲け</b>できる！</p>
    <p>✅ <b>イベントに備えて余裕資金</b>を持っておこう！</p>
  \`

  showScreen('result')
  spawnCoins(20)
}

function backToTitle(){
  G = null
  showScreen('title')
}

function replayGame(){
  G = null
  showScreen('setup')
}

// ============================================================
// Confirm Modal
// ============================================================
function showConfirm(title, body, onOk){
  confirmCallback = onOk
  document.getElementById('confirmTitle').textContent = title
  document.getElementById('confirmBody').innerHTML = body
  document.getElementById('confirm-modal').classList.remove('hidden')
}
function closeConfirm(){
  confirmCallback = null
  document.getElementById('confirm-modal').classList.add('hidden')
}
function onConfirmOk(){
  const cb = confirmCallback
  closeConfirm()
  if(cb) cb()
}

// ============================================================
// Tutorial
// ============================================================
const TUTORIALS = [
  {title:'🎮 ゲームの目的',content:'ATM残高＋保有株価額＋手持ち現金が一番多い人の勝ち！<br>会社の価値は勝利条件には含まれないよ。'},
  {title:'📅 1年の流れ',content:'① ATM残高の多い人から順番に行動。<br>② 2年目以降は1位の人がイベントカードを引く。<br>③ 1年に1回だけ行動できる（バス会社・鉄道会社を所有していると2回可）。'},
  {title:'🎯 できること',content:'<b>① はたらく</b>: 100円もらえる。<br><b>② ATM</b>: お金を預ける・引き出す。利息がつくよ！<br><b>③ 会社を買う</b>: 購入後にサイコロを振って収益ゲット。<br><b>④ 株を買う</b>: サイコロの偶奇で増減。'},
  {title:'🏢 会社について',content:'飲食店・バス会社・メディア・金融機関の4種類。<br>購入したらサイコロを振れる！<br>アップグレードすると効果がパワーアップ。<br>会社は売れるけど点数には含まれないよ。'},
  {title:'📈 株について',content:'日本株(500円/株)・外国株(1000円/株)の2種類。<br>サイコロ偶数 → 大きく増える！<br>サイコロ奇数 → 損してしまう…。<br>リスクとリターンを考えて投資しよう！'},
  {title:'🏧 ATMと利息',content:'ATMにお金を預けると年末に利息がもらえる！<br>200〜1500円 → +100円/年<br>1500〜2600円 → +200円/年<br>2600〜3500円 → +300円/年<br>3500円以上 → +600円/年'},
  {title:'🎴 イベントカード',content:'2年目以降、1位のプレイヤーが毎年引く。<br>インフレ・倒産・株高騰など10種類！<br>良いカードも悪いカードもあるよ。'},
]

function showTutorial(){
  document.getElementById('tutorial-content').innerHTML = TUTORIALS.map(t=>\`
    <div class="card p-3 mb-2">
      <div class="font-bold mb-1">\${t.title}</div>
      <div class="opacity-80">\${t.content}</div>
    </div>\`).join('')
  document.getElementById('tutorial-modal').classList.remove('hidden')
}
function closeTutorial(){
  document.getElementById('tutorial-modal').classList.add('hidden')
}

// ============================================================
// Quit
// ============================================================
function confirmQuit(){
  showConfirm('🚪 やめますか？', 'ゲームの進行状況は失われます。', ()=>{
    G = null
    showScreen('title')
  })
}

// ============================================================
// Tab switching
// ============================================================
function switchTab(name){
  document.querySelectorAll('.tab').forEach(t=>{
    t.classList.toggle('active', t.dataset.tab===name)
  })
  document.querySelectorAll('.tab-content').forEach(t=>{
    t.classList.add('hidden')
  })
  const el = document.getElementById('tab-'+name)
  if(el) el.classList.remove('hidden')

  if(name==='portfolio') renderPortfolio()
  if(name==='market')    renderMarket()
  if(name==='ranking')   renderRanking()
  if(name==='log')       renderLog()
}

// ============================================================
// Coin animation
// ============================================================
function spawnCoins(n){
  for(let i=0;i<n;i++){
    setTimeout(()=>{
      const coin = document.createElement('div')
      coin.className='coin'
      coin.textContent = ['💰','💵','💴','🪙'][Math.floor(Math.random()*4)]
      coin.style.left = (20+Math.random()*60)+'%'
      coin.style.bottom = '20%'
      document.body.appendChild(coin)
      setTimeout(()=>coin.remove(),1200)
    }, i*100)
  }
}

// ============================================================
// Toast
// ============================================================
function showToast(msg, type='info'){
  const t = document.createElement('div')
  t.className = 'toast'
  t.style.background = type==='error'?'#f44336':'#4CAF50'
  t.style.color='#fff'
  t.textContent = msg
  document.body.appendChild(t)
  setTimeout(()=>t.remove(),2500)
}

// ============================================================
// setActionMsg helper
// ============================================================
function setActionMsg(msg){
  const el = document.getElementById('actionMsg')
  if(el) el.textContent = msg
}

// ============================================================
// Initial render
// ============================================================
// Pre-select defaults
selectGameLength(10)
SCRIPT_END
</body>
</html>`
}
