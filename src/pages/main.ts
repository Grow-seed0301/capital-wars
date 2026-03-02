export function mainPage(): string {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>💴 もしもし投資ランド！</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
  <style>
    *{font-family:'Nunito',sans-serif;box-sizing:border-box}
    body{background:linear-gradient(135deg,#1e3a5f 0%,#0f2027 50%,#203a43 100%);min-height:100vh;margin:0}

    .btn{border:none;cursor:pointer;border-radius:50px;font-weight:800;transition:all .2s;font-family:'Nunito',sans-serif;display:inline-block;text-align:center;line-height:1}
    .btn:disabled{opacity:.4;cursor:not-allowed;transform:none!important}
    .btn-primary{background:linear-gradient(135deg,#6C63FF,#9B59B6);color:#fff;padding:10px 22px;font-size:.95rem;box-shadow:0 4px 14px rgba(108,99,255,.4)}
    .btn-primary:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 6px 18px rgba(108,99,255,.5)}
    .btn-green{background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;padding:8px 16px;font-size:.85rem}
    .btn-green:hover:not(:disabled){transform:translateY(-2px)}
    .btn-red{background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;padding:8px 16px;font-size:.85rem}
    .btn-red:hover:not(:disabled){transform:translateY(-2px)}
    .btn-yellow{background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;padding:8px 16px;font-size:.85rem}
    .btn-yellow:hover:not(:disabled){transform:translateY(-2px)}
    .btn-blue{background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;padding:8px 16px;font-size:.85rem}
    .btn-blue:hover:not(:disabled){transform:translateY(-2px)}
    .btn-outline{background:rgba(255,255,255,.1);color:#fff;border:2px solid rgba(255,255,255,.3);padding:8px 18px;font-size:.85rem}
    .btn-outline:hover:not(:disabled){background:rgba(255,255,255,.2)}
    .btn-sm{padding:5px 12px;font-size:.78rem}

    .card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:18px;backdrop-filter:blur(8px)}
    .card-white{background:white;border-radius:18px;box-shadow:0 8px 28px rgba(0,0,0,.15)}

    .screen{display:none}
    .screen.active{display:block}

    @keyframes fadeInUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pop{0%{transform:scale(.6);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
    @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes glow{0%,100%{box-shadow:0 0 8px rgba(108,99,255,.4)}50%{box-shadow:0 0 22px rgba(108,99,255,.8),0 0 40px rgba(108,99,255,.3)}}
    @keyframes twinkle{0%,100%{opacity:1}50%{opacity:.2}}
    @keyframes slideUp{from{opacity:0;transform:translateY(50px)}to{opacity:1;transform:translateY(0)}}
    @keyframes coinFall{0%{transform:translateY(-60px) rotate(0);opacity:1}100%{transform:translateY(100vh) rotate(540deg);opacity:0}}
    @keyframes float{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-8px) rotate(1deg)}}
    @keyframes diceRoll{0%{transform:rotateY(0deg)}100%{transform:rotateY(360deg)}}
    .fade-in-up{animation:fadeInUp .4s ease-out}
    .pop{animation:pop .4s ease-out}
    .bounce{animation:bounce 1s infinite}
    .glow{animation:glow 2s infinite}
    .float{animation:float 3s ease-in-out infinite}
    .coin-particle{position:fixed;pointer-events:none;z-index:9999;animation:coinFall 1.6s ease-in forwards}

    .title-bg{background:linear-gradient(160deg,#0a0a1a,#1a1a3e,#0d2137);min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
    .star{position:absolute;background:white;border-radius:50%;animation:twinkle 2s infinite}

    .game-wrap{min-height:100vh;padding:10px}

    .player-card{border-radius:14px;padding:10px 12px;border:2.5px solid transparent;transition:all .3s}
    .player-card.active{border-color:#FFD700;animation:glow 2s infinite}
    .player-card.human{background:rgba(99,102,241,.15)}
    .player-card.ai{background:rgba(249,115,22,.12)}

    .dice-face{width:72px;height:72px;background:white;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:2.8rem;box-shadow:0 4px 16px rgba(0,0,0,.3);transition:all .3s}
    .dice-face.rolling{animation:diceRoll .15s infinite alternate}

    .tab-btn{padding:7px 14px;border-radius:50px;font-weight:700;cursor:pointer;transition:all .2s;border:2px solid rgba(255,255,255,.2);font-size:.8rem;background:transparent;color:rgba(255,255,255,.6);font-family:'Nunito',sans-serif}
    .tab-btn.active{background:#6C63FF;color:white;border-color:#6C63FF}

    .event-overlay{position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:500;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px)}
    .event-card{border-radius:24px;padding:28px;text-align:center;max-width:380px;width:90%;animation:pop .4s ease-out}

    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:1000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(5px)}
    .modal-box{background:#1e2a3a;border:1px solid rgba(255,255,255,.15);border-radius:22px;padding:24px;max-width:480px;width:92%;animation:pop .35s ease-out;max-height:88vh;overflow-y:auto;color:white}

    .pass-bg{min-height:100vh;background:linear-gradient(160deg,#0a0a1a,#1a1a3e,#0d2137);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
    .pass-card{background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.15);border-radius:26px;padding:44px 36px;text-align:center;backdrop-filter:blur(12px);max-width:420px;width:90%;animation:slideUp .5s ease-out}

    .log-item{padding:4px 10px;border-radius:7px;font-size:.78rem;font-weight:600;background:rgba(255,255,255,.06);border-left:3px solid #6C63FF;margin-bottom:3px;color:rgba(255,255,255,.85)}

    .bar-wrap{background:rgba(255,255,255,.1);border-radius:50px;height:7px;overflow:hidden}
    .bar-fill{height:100%;border-radius:50px;background:linear-gradient(135deg,#6C63FF,#06b6d4);transition:width .7s ease}

    .result-bg{min-height:100vh;background:linear-gradient(160deg,#0a0a1a,#1a1a3e);display:flex;align-items:center;justify-content:center;padding:16px}

    .game-input{background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.25);border-radius:10px;padding:6px 10px;color:white;font-family:'Nunito',sans-serif;font-weight:700;font-size:.95rem;outline:none;width:100%}
    .game-input:focus{border-color:#6C63FF}

    /* アクション選択カード */
    .action-card{border:2px solid rgba(255,255,255,.15);border-radius:16px;padding:14px;cursor:pointer;transition:all .25s;background:rgba(255,255,255,.05)}
    .action-card:hover:not(.disabled){border-color:#6C63FF;background:rgba(108,99,255,.2);transform:translateY(-2px)}
    .action-card.selected{border-color:#FFD700;background:rgba(255,215,0,.15)}
    .action-card.disabled{opacity:.4;cursor:not-allowed}

    /* コイン色 */
    .coin-5{display:inline-flex;align-items:center;justify-content:center;background:#c84b00;color:white;border-radius:50%;width:30px;height:30px;font-size:.68rem;font-weight:900;box-shadow:inset 0 -2px 0 rgba(0,0,0,.3)}
    .coin-10{display:inline-flex;align-items:center;justify-content:center;background:#888;color:white;border-radius:50%;width:32px;height:32px;font-size:.68rem;font-weight:900;box-shadow:inset 0 -2px 0 rgba(0,0,0,.3)}
    .coin-50{display:inline-flex;align-items:center;justify-content:center;background:#d4af37;color:white;border-radius:50%;width:36px;height:36px;font-size:.7rem;font-weight:900;box-shadow:inset 0 -2px 0 rgba(0,0,0,.3)}

    .player-row{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.07);border-radius:12px;padding:9px 12px;border:2px solid rgba(255,255,255,.1);margin-bottom:8px;transition:border-color .2s}
    .player-row.human-row{border-color:rgba(108,99,255,.5)}
    .type-btn{border:2px solid rgba(255,255,255,.2);border-radius:50px;padding:4px 11px;font-weight:800;font-size:.75rem;cursor:pointer;transition:all .2s;background:transparent;color:rgba(255,255,255,.6);font-family:'Nunito',sans-serif}
    .type-btn.human{border-color:#6C63FF;background:#6C63FF;color:white}
    .type-btn.ai{border-color:#f97316;background:#f97316;color:white}

    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-track{background:rgba(255,255,255,.05)}
    ::-webkit-scrollbar-thumb{background:#6C63FF;border-radius:10px}

    @media(max-width:640px){.action-cols{grid-template-columns:1fr!important}}
  </style>
</head>
<body>
<div id="coinArea"></div>

<!-- =========================================================
  画面①：タイトル
========================================================= -->
<div id="screen-title" class="screen active">
  <div class="title-bg">
    <div id="stars"></div>
    <div class="text-center z-10 relative px-4">
      <div class="float mb-4" style="font-size:5rem;filter:drop-shadow(0 0 28px gold)">💴</div>
      <h1 style="font-size:clamp(1.8rem,8vw,3.4rem);font-weight:900;color:white;text-shadow:0 0 28px rgba(255,215,0,.8);line-height:1.2" class="mb-2">
        もしもし投資ランド！
      </h1>
      <p style="color:#93c5fd;font-size:1rem;font-weight:700" class="mb-8">
        💰 会社・株・貯金でお金持ちを目指せ！
      </p>
      <div class="flex flex-col gap-3 items-center max-w-xs mx-auto">
        <button class="btn btn-primary w-full text-xl py-4 glow" onclick="showScreen('setup')">🚀 ゲームスタート！</button>
        <button class="btn btn-yellow w-full text-base py-3" onclick="showRules()">📖 ルール説明</button>
      </div>
      <div class="mt-6 flex gap-4 justify-center flex-wrap" style="color:#93c5fd;font-size:.82rem;font-weight:700">
        <span>👶 7さいから</span><span>🏦 会社経営</span><span>📈 株投資</span><span>🏧 ATM貯金</span>
      </div>
    </div>
  </div>
</div>

<!-- =========================================================
  画面②：ゲーム設定
========================================================= -->
<div id="screen-setup" class="screen">
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="card-white p-6 max-w-lg w-full fade-in-up">
      <h2 class="text-2xl font-black text-center mb-5" style="color:#1e3a5f">🎮 ゲーム設定</h2>

      <div class="mb-4">
        <label class="block font-black text-gray-700 mb-2">👥 人数</label>
        <div class="grid grid-cols-4 gap-2" id="pcBtns">
          ${[1,2,3,4].map(n=>`
          <button onclick="selectPC(${n})" id="pc${n}"
            class="py-3 rounded-xl font-black text-lg border-3 transition-all"
            style="border:3px solid ${n===2?'#6C63FF':'#ddd'};background:${n===2?'#F3F0FF':'white'};color:${n===2?'#6C63FF':'#555'}">
            ${n}人
          </button>`).join('')}
        </div>
      </div>

      <div class="mb-5">
        <label class="block font-black text-gray-700 mb-2">✏️ プレイヤー設定</label>
        <div id="playerRowList"></div>
        <p class="text-xs text-gray-400 font-semibold mt-1">💡「人間」は順番に操作 / 「AI」は自動でプレイ</p>
      </div>

      <div class="mb-5">
        <label class="block font-black text-gray-700 mb-2">⏱️ 年数</label>
        <div class="grid grid-cols-3 gap-2">
          ${[
            {y:6,  label:'短い',   emoji:'⚡'},
            {y:10, label:'ふつう', emoji:'🎮'},
            {y:15, label:'長い',   emoji:'🏆'},
          ].map((g,i)=>`
          <button onclick="selectYears(${g.y})" id="yr${g.y}"
            class="year-btn py-3 rounded-xl font-black text-sm border-3 transition-all"
            style="border:3px solid ${i===1?'#6C63FF':'#ddd'};background:${i===1?'#F3F0FF':'white'};color:${i===1?'#6C63FF':'#555'}">
            ${g.emoji} ${g.label}<br><span style="font-size:.72rem">${g.y}年</span>
          </button>`).join('')}
        </div>
      </div>

      <div class="flex gap-3">
        <button class="btn btn-primary flex-1 py-3 text-base" onclick="startGame()">🚀 スタート！</button>
        <button style="color:#555;background:#f5f5f5;border:2px solid #ddd" class="rounded-full px-5 py-3 font-bold text-sm" onclick="showScreen('title')">← もどる</button>
      </div>
    </div>
  </div>
</div>

<!-- =========================================================
  画面③：パス（ホットシート引き継ぎ）
========================================================= -->
<div id="screen-pass" class="screen">
  <div class="pass-bg">
    <div id="passStars"></div>
    <div class="pass-card z-10 relative">
      <div style="font-size:4.5rem" class="bounce mb-3" id="passEmoji">🙈</div>
      <h2 style="font-size:1.55rem;font-weight:900;color:white" class="mb-2" id="passTitle">端末を渡してね！</h2>
      <p style="color:#93c5fd;font-weight:700;font-size:.95rem;line-height:1.6" class="mb-5" id="passDesc">次のプレイヤーが準備できたらボタンを押してね</p>
      <div style="background:rgba(255,255,255,.1);border-radius:14px;padding:14px 18px" class="mb-5">
        <div style="color:#fbbf24;font-size:.8rem;font-weight:800" class="mb-1">つぎのプレイヤー</div>
        <div style="color:white;font-size:1.9rem;font-weight:900" id="passNextName">－</div>
      </div>
      <button class="btn btn-primary w-full text-base py-3 glow" onclick="onPassReady()">✅ 準備OK！スタート</button>
    </div>
  </div>
</div>

<!-- =========================================================
  画面④：メインゲーム
========================================================= -->
<div id="screen-game" class="screen">
  <div class="game-wrap">

    <!-- ヘッダー -->
    <div class="card p-3 mb-3">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-lg font-black text-white">💴 投資ランド</span>
          <div class="rounded-full px-3 py-1" style="background:rgba(108,99,255,.3)">
            <span class="font-bold text-purple-200 text-sm" id="yearDisplay">1年目 / 10年</span>
          </div>
          <div class="rounded-full px-3 py-1" id="eventBadge" style="display:none;background:rgba(255,165,0,.3)">
            <span class="font-bold text-yellow-200 text-xs" id="eventBadgeText"></span>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-yellow btn-sm" onclick="showRules()">📖</button>
          <button class="btn btn-outline btn-sm" onclick="confirmQuit()">🚪</button>
        </div>
      </div>
      <div class="bar-wrap mt-2"><div class="bar-fill" id="yearProgress" style="width:10%"></div></div>
    </div>

    <div class="flex gap-3 flex-wrap lg:flex-nowrap">

      <!-- 左：プレイヤー一覧 + ログ -->
      <div class="w-full lg:w-52 flex-shrink-0">
        <div id="playerCards" class="space-y-2 mb-3"></div>
        <div class="card p-3">
          <div class="font-black text-xs mb-2 text-purple-300">📜 きろく</div>
          <div id="gameLog" class="space-y-1 max-h-44 overflow-y-auto"></div>
        </div>
      </div>

      <!-- 右：アクションエリア -->
      <div class="flex-1 min-w-0">

        <!-- 現在プレイヤー情報 -->
        <div class="card p-4 mb-3">
          <div class="flex items-center justify-between flex-wrap gap-3 mb-2">
            <div>
              <div class="text-xs text-gray-400 font-bold">いまのプレイヤー</div>
              <div class="text-xl font-black text-white" id="curName">－</div>
              <div class="text-xs mt-0.5" id="actionsLeftDisplay" style="color:#a78bfa;font-weight:800"></div>
            </div>
            <div class="grid grid-cols-3 gap-3 text-center">
              <div>
                <div class="text-xs text-gray-400 font-bold">💵 現金</div>
                <div class="text-xl font-black text-green-400" id="curCash">0円</div>
              </div>
              <div>
                <div class="text-xs text-gray-400 font-bold">🏧 ATM</div>
                <div class="text-xl font-black text-blue-400" id="curAtm">0円</div>
              </div>
              <div>
                <div class="text-xs text-gray-400 font-bold">💎 総資産</div>
                <div class="text-xl font-black text-yellow-400" id="curTotal">0円</div>
              </div>
            </div>
          </div>
          <!-- 所有物バッジ -->
          <div class="flex flex-wrap gap-2" id="curAssets"></div>
          <!-- 借金表示 -->
          <div id="debtWarning" style="display:none" class="mt-2 text-xs text-red-400 font-black rounded-lg px-2 py-1" style="background:rgba(239,68,68,.1)"></div>
        </div>

        <!-- タブ -->
        <div class="flex gap-2 mb-3 flex-wrap">
          <button class="tab-btn active" id="tab-action"   onclick="switchTab('action')">🎮 アクション</button>
          <button class="tab-btn"        id="tab-ranking"  onclick="switchTab('ranking')">🏆 じゅんい</button>
          <button class="tab-btn"        id="tab-all"      onclick="switchTab('all')">👥 みんな</button>
        </div>

        <!-- ── アクションタブ ── -->
        <div id="content-action">

          <!-- サイコロ表示 -->
          <div class="card p-4 mb-3 flex items-center gap-4">
            <div id="diceDisplay" class="dice-face">🎲</div>
            <div>
              <div class="text-sm font-black text-white">🎲 今回のサイコロ</div>
              <div class="text-xs text-gray-400 font-semibold mt-1" id="diceNote">アクションを選ぶと振られます</div>
            </div>
          </div>

          <!-- イベントカード（年初） -->
          <div class="card p-4 mb-3" id="eventArea" style="display:none">
            <div class="text-sm font-black text-yellow-300 mb-2">🃏 あなたが今年の1番手！イベントカードを引いてください</div>
            <button class="btn btn-yellow w-full py-3" onclick="drawEvent()">🃏 イベントカードを引く！</button>
          </div>

          <!-- 倒産処理エリア -->
          <div id="bankruptArea" style="display:none" class="card p-4 mb-3">
            <div class="text-sm font-black text-red-400 mb-3">🏚️ 倒産イベント！会社を売却しなければなりません</div>
            <div id="bankruptSellList" class="space-y-2"></div>
          </div>

          <!-- メインアクション選択 -->
          <div class="card p-4 mb-3" id="actionSelectArea">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-black text-white">⚡ アクションを選ぼう</h3>
              <span class="text-xs font-black px-3 py-1 rounded-full" style="background:rgba(255,215,0,.2);color:#fbbf24">残り <span id="actLeft">1</span>回</span>
            </div>

            <div class="grid gap-3 action-cols" style="grid-template-columns:1fr 1fr" id="actionCards">
              <!-- JS で生成 -->
            </div>
          </div>

          <!-- ターン終了ボタン -->
          <div class="card p-3">
            <button class="btn btn-primary w-full text-base py-3" id="btnEndTurn" onclick="endTurn()">
              ⏭️ ターンをおわる
            </button>
            <div class="text-xs text-center text-gray-400 font-semibold mt-1" id="actionMsg"></div>
          </div>
        </div>

        <!-- ── ランキングタブ ── -->
        <div id="content-ranking" style="display:none">
          <div class="card p-4"><div id="rankingContent"></div></div>
        </div>

        <!-- ── 全員の状況タブ ── -->
        <div id="content-all" style="display:none">
          <div class="card p-4"><div id="allContent"></div></div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- =========================================================
  画面⑤：結果発表
========================================================= -->
<div id="screen-result" class="screen">
  <div class="result-bg">
    <div class="card-white p-7 max-w-lg w-full text-center fade-in-up">
      <div style="font-size:4rem" class="bounce mb-2">🏆</div>
      <h2 class="text-2xl font-black mb-1" style="color:#1e3a5f">ゲーム終了！</h2>
      <div class="text-base font-black mb-5 text-gray-600" id="winnerAnnounce"></div>
      <div id="resultRanking" class="space-y-2 mb-5"></div>
      <div class="bg-blue-50 rounded-2xl p-4 mb-5 text-left">
        <h3 class="font-black text-blue-800 mb-2 text-sm">💡 しさんの内わけ</h3>
        <div id="resultDetail" class="space-y-1 text-xs text-blue-700 font-semibold"></div>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-primary flex-1 py-3" style="color:white" onclick="showScreen('setup')">🔄 もう一度</button>
        <button class="btn flex-1 py-3" style="background:#1e3a5f;color:white" onclick="showScreen('title')">🏠 タイトルへ</button>
      </div>
    </div>
  </div>
</div>

<!-- =========================================================
  イベントカード演出オーバーレイ
========================================================= -->
<div id="eventOverlay" class="event-overlay" style="display:none">
  <div style="max-width:400px;width:90%;text-align:center">
    <h2 class="text-2xl font-black text-white mb-4">🃏 イベントカード！</h2>
    <div id="eventCardDisplay" class="event-card mb-5"></div>
    <button class="btn btn-primary text-lg py-3 px-10" onclick="dismissEvent()">OK！つぎへ →</button>
  </div>
</div>

<!-- =========================================================
  アクション詳細モーダル（会社・株・ATM等）
========================================================= -->
<div id="actionModal" class="modal-overlay" style="display:none">
  <div class="modal-box">
    <div id="actionModalContent"></div>
  </div>
</div>

<!-- =========================================================
  神社ターゲット選択モーダル
========================================================= -->
<div id="shrineModal" class="modal-overlay" style="display:none">
  <div class="modal-box">
    <h3 class="text-lg font-black mb-3">⛩️ 神社：お金をもらう相手を選んでください</h3>
    <p class="text-sm text-gray-300 mb-3" id="shrineDesc"></p>
    <div id="shrineTargetList" class="space-y-2 mb-4"></div>
    <button class="btn btn-primary w-full py-2" onclick="confirmShrineTarget()">✅ 決定</button>
    <button class="btn btn-outline w-full py-2 mt-2" onclick="closeShrineModal()">キャンセル</button>
  </div>
</div>

<!-- =========================================================
  確認モーダル
========================================================= -->
<div id="confirmModal" class="modal-overlay" style="display:none">
  <div class="modal-box">
    <h3 class="text-lg font-black mb-3" id="confirmTitle"></h3>
    <div id="confirmBody" class="mb-5 text-gray-200 text-sm font-semibold"></div>
    <div class="flex gap-3">
      <button class="btn btn-primary flex-1 py-2" id="confirmOkBtn" onclick="onConfirmOk()">✅ 決定！</button>
      <button class="btn btn-outline flex-1 py-2" onclick="closeConfirm()">キャンセル</button>
    </div>
  </div>
</div>

<!-- =========================================================
  ルール説明モーダル
========================================================= -->
<div id="rulesModal" class="modal-overlay" style="display:none">
  <div class="modal-box" style="max-width:520px">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-black">📖 ルール説明</h2>
      <button onclick="closeRules()" class="text-gray-400 text-2xl leading-none">✕</button>
    </div>
    <div class="space-y-3 max-h-[70vh] overflow-y-auto text-sm font-semibold">

      <div class="rounded-xl p-3" style="background:rgba(108,99,255,.15)">
        <div class="font-black text-purple-300 mb-1">🎯 目標・勝利条件</div>
        <div class="text-gray-300">ゲーム終了時に「現金 ＋ ATM残高 ＋ 株の価値」の合計が一番多い人の勝ち！<br>※ 会社は資産に含まれない</div>
      </div>

      <div class="rounded-xl p-3" style="background:rgba(251,191,36,.1)">
        <div class="font-black text-yellow-300 mb-1">💴 お金・スタート</div>
        <div class="text-gray-300">全員に最初から15円。単位：5円・10円・50円コイン</div>
      </div>

      <div class="rounded-xl p-3" style="background:rgba(34,197,94,.1)">
        <div class="font-black text-green-300 mb-2">⚡ 1年の流れ</div>
        <div class="text-gray-300 space-y-1 text-xs">
          <div>① ATM残高が多い順でターンが回ってくる（2年目以降）</div>
          <div>② 1年の最初の人がイベントカードを引く（2年目以降）</div>
          <div>③ 1回のアクション（バス/鉄道で最大2回）を選ぶ</div>
          <div>④ ターン終了時にATM利息が自動加算</div>
        </div>
      </div>

      <div class="rounded-xl p-3" style="background:rgba(59,130,246,.1)">
        <div class="font-black text-blue-300 mb-2">🎮 アクションの種類（1ターン1回）</div>
        <div class="space-y-1 text-gray-300 text-xs">
          <div>🏢 <b>会社を買う / 収益を得る</b>：会社を購入するかサイコロを振る</div>
          <div>📈 <b>株を買う</b>：日本株10円 or 外国株20円を購入しサイコロ判定</div>
          <div>💼 <b>働く</b>：5円もらえる（就労支援時は15円）</div>
          <div>🏧 <b>ATMに預ける</b>：現金をATMへ（ターン末に利息がもらえる）</div>
        </div>
      </div>

      <div class="rounded-xl p-3" style="background:rgba(239,68,68,.1)">
        <div class="font-black text-red-300 mb-2">🏢 会社の種類</div>
        <div class="space-y-2 text-gray-300 text-xs">
          <div>🍜 <b>飲食店（10円）</b>：1-2→-10円 / 3-4→+10円 / 5-6→+30円<br>　100円でアップグレード可</div>
          <div>⭐ <b>三ツ星レストラン</b>：1→-10円 / 2-6→+40円</div>
          <div>🏦 <b>金融機関（50円）</b>：いつでも融資できる。〜50円→年10円利息 / 51円〜→年20円利息</div>
          <div>🚌 <b>バス会社（20円）</b>：5-6が出たら追加行動1回。100円で鉄道にアップグレード可</div>
          <div>🚃 <b>鉄道会社</b>：5-6が出たらもう一度ターンが回ってくる</div>
          <div>⛩️ <b>神社（50円）</b>：1-2→好きな人から50円 / 3-4→好きな人から25円</div>
        </div>
      </div>

      <div class="rounded-xl p-3" style="background:rgba(168,85,247,.1)">
        <div class="font-black text-purple-300 mb-2">📈 株</div>
        <div class="space-y-1 text-gray-300 text-xs">
          <div>🗾 <b>日本株（10円）</b>：偶数→+30円 / 奇数→-20円</div>
          <div>🌍 <b>外国株（20円）</b>：偶数→+50円 / 奇数→-30円</div>
          <div>株は何株でも持てる。購入と同時にサイコロ判定！</div>
        </div>
      </div>

      <div class="rounded-xl p-3" style="background:rgba(20,184,166,.1)">
        <div class="font-black text-teal-300 mb-2">🏧 ATM利息（ターン終了時に自動追加）</div>
        <div class="grid grid-cols-2 gap-1 text-gray-300 text-xs">
          <div>15〜30円: +5円</div><div>35〜50円: +10円</div>
          <div>55〜70円: +15円</div><div>75円以上: +30円</div>
        </div>
      </div>

      <div class="rounded-xl p-3" style="background:rgba(239,68,68,.08)">
        <div class="font-black text-orange-300 mb-2">🃏 イベントカード（10種）</div>
        <div class="space-y-1 text-gray-300 text-xs">
          <div>📈 インフレーション：会社の利益が2倍</div>
          <div>📉 デフレーション：会社の損失が2倍</div>
          <div>💼 就労支援：働くと15円（3倍）</div>
          <div>🚀 株価高騰：購入価格・配当が2倍</div>
          <div>💥 株価暴落：購入価格・配当が半分</div>
          <div>🏚️ 倒産：引いた人は会社を売却</div>
          <div>💰 利息UP：ATM利息が2倍</div>
          <div>🎲 偶数確定：全員のサイコロが偶数</div>
          <div>🎲 奇数確定：全員のサイコロが奇数</div>
          <div>🤝 投資家イベント：資産最少の人が全員から30円もらう</div>
        </div>
      </div>
    </div>
    <button class="btn btn-primary w-full mt-4 py-2" onclick="closeRules()">とじる</button>
  </div>
</div>

<script>
// ============================================================
// グローバル状態
// ============================================================
let G = null
let selectedPC  = 2
let selectedYrs = 10
let playerCfgs  = [{name:'プレイヤー1',isAI:false},{name:'プレイヤー2',isAI:false}]
let confirmCB   = null
let processingAction = false
let shrineSelections = {}
let pendingShrineAmount = 0

// ============================================================
// 画面切替
// ============================================================
function showScreen(name){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'))
  document.getElementById('screen-'+name).classList.add('active')
  window.scrollTo(0,0)
}

// ============================================================
// 星生成
// ============================================================
function generateStars(id='stars',n=80){
  const c=document.getElementById(id); if(!c)return; c.innerHTML=''
  for(let i=0;i<n;i++){
    const s=document.createElement('div'); s.className='star'
    const sz=Math.random()*3+1
    s.style.cssText=\`width:\${sz}px;height:\${sz}px;left:\${Math.random()*100}%;top:\${Math.random()*100}%;animation-delay:\${Math.random()*3}s;animation-duration:\${Math.random()*2+1}s;\`
    c.appendChild(s)
  }
}

// ============================================================
// 設定画面
// ============================================================
function selectPC(n){
  selectedPC=n
  document.querySelectorAll('#pcBtns button').forEach((b,i)=>{
    const sel=i+1===n
    b.style.borderColor=sel?'#6C63FF':'#ddd'
    b.style.background =sel?'#F3F0FF':'white'
    b.style.color      =sel?'#6C63FF':'#555'
  })
  buildPlayerRows()
}

function selectYears(y){
  selectedYrs=y
  document.querySelectorAll('.year-btn').forEach(b=>{
    const sel=b.id==='yr'+y
    b.style.borderColor=sel?'#6C63FF':'#ddd'
    b.style.background =sel?'#F3F0FF':'white'
    b.style.color      =sel?'#6C63FF':'#555'
  })
}

function buildPlayerRows(){
  const n=selectedPC
  while(playerCfgs.length<n) playerCfgs.push({name:'プレイヤー'+(playerCfgs.length+1),isAI:false})
  playerCfgs=playerCfgs.slice(0,n)
  const EMOJIS=['🟣','🟠','🟢','🔴']
  document.getElementById('playerRowList').innerHTML=playerCfgs.map((p,i)=>\`
    <div class="player-row \${p.isAI?'':'human-row'}" id="prow\${i}">
      <span style="font-size:1.2rem">\${EMOJIS[i]}</span>
      <input type="text" maxlength="10" value="\${esc(p.name)}"
        oninput="playerCfgs[\${i}].name=this.value"
        class="flex-1 border-2 rounded-lg px-2 py-1 text-sm font-bold outline-none"
        style="border-color:#c084fc;min-width:0;color:#1e3a5f"
        onfocus="this.style.borderColor='#6C63FF'" onblur="this.style.borderColor='#c084fc'">
      <button class="type-btn \${p.isAI?'ai':'human'}" onclick="toggleType(\${i})">\${p.isAI?'🤖 AI':'👤 人間'}</button>
    </div>
  \`).join('')
}

function toggleType(i){
  playerCfgs[i].isAI=!playerCfgs[i].isAI
  buildPlayerRows()
}

// ============================================================
// ゲームスタート
// ============================================================
async function startGame(){
  document.querySelectorAll('#playerRowList input').forEach((inp,i)=>{
    if(playerCfgs[i]) playerCfgs[i].name=inp.value.trim()||('プレイヤー'+(i+1))
  })
  showScreen('game')
  setMsg('⌛ 準備中...')
  try{
    const res=await fetch('/api/game/start',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({players:playerCfgs,maxYears:selectedYrs})})
    const d=await res.json()
    if(d.success){ G=d.state; renderGame(); setMsg(''); spawnCoins(5) }
  }catch(e){ setMsg('❌ エラー') }
}

// ============================================================
// パス画面
// ============================================================
function showPass(idx){
  if(!G)return
  const p=G.players[idx]
  document.getElementById('passNextName').textContent=(p.isAI?'🤖 ':'👤 ')+p.name
  document.getElementById('passTitle').textContent=p.isAI?'🤖 AI のターン':'📱 端末を渡してね！'
  document.getElementById('passDesc').textContent=p.isAI?'AIが自動でプレイします。':'「'+p.name+'」さん、準備OKになったらボタンを押してね！'
  document.getElementById('passEmoji').textContent=p.isAI?'🤖':'🙈'
  generateStars('passStars',50)
  showScreen('pass')
}

function onPassReady(){
  showScreen('game')
  renderGame()
}

// ============================================================
// メイン描画
// ============================================================
function renderGame(){
  if(!G)return
  const cp=G.players[G.currentPlayer]

  // ヘッダー
  document.getElementById('yearDisplay').textContent=\`\${G.year}年目 / \${G.maxYears}年\`
  document.getElementById('yearProgress').style.width=Math.min(100,Math.round(G.year/G.maxYears*100))+'%'

  // イベント効果バッジ
  const effs=Object.entries(G.eventEffects).filter(([,v])=>v).map(([k])=>({
    inflation:'📈インフレ',deflation:'📉デフレ',workBonus:'💼就労3倍',
    stockUp:'🚀株高騰',stockDown:'💥株暴落',interestUp:'💰利息2倍',
    forceEven:'🎲偶数確定',forceOdd:'🎲奇数確定'
  }[k])).filter(Boolean)
  const eb=document.getElementById('eventBadge')
  if(effs.length>0){eb.style.display='';document.getElementById('eventBadgeText').textContent=effs.join(' ')}
  else eb.style.display='none'

  // 現在プレイヤー情報
  document.getElementById('curName').textContent=(cp.isAI?'🤖 ':'👤 ')+cp.name
  document.getElementById('curCash').textContent=cp.cash+'円'
  document.getElementById('curAtm').textContent=cp.atm+'円'
  document.getElementById('curTotal').textContent=cp.totalAssets+'円'
  document.getElementById('actionsLeftDisplay').textContent=\`行動：残り\${cp.actionsLeft}回\`
  document.getElementById('actLeft').textContent=cp.actionsLeft

  // 所有物バッジ
  const badges=[]
  for(const cid of cp.companies){
    const def=COMPANY_DEF(cid); if(!def)continue
    badges.push(\`<span class="rounded-full px-2 py-0.5 text-xs font-black" style="background:rgba(255,165,0,.25);color:#fbbf24">\${def.emoji}\${def.name}</span>\`)
  }
  if(cp.stocks.japan>0)   badges.push(\`<span class="rounded-full px-2 py-0.5 text-xs font-black" style="background:rgba(59,130,246,.25);color:#93c5fd">🗾日本株×\${cp.stocks.japan}</span>\`)
  if(cp.stocks.foreign>0) badges.push(\`<span class="rounded-full px-2 py-0.5 text-xs font-black" style="background:rgba(168,85,247,.25);color:#d8b4fe">🌍外国株×\${cp.stocks.foreign}</span>\`)
  document.getElementById('curAssets').innerHTML=badges.join('')

  // 借金表示
  const dw=document.getElementById('debtWarning')
  if(cp.debt>0){ dw.style.display=''; dw.textContent=\`💳 借金: \${cp.debt}円（毎ターン\${cp.debtPerTurn}円返済）\` }
  else dw.style.display='none'

  renderPlayerCards()
  renderActionCards()
  renderLog()

  if(document.getElementById('tab-ranking').classList.contains('active')) renderRanking()
  if(document.getElementById('tab-all').classList.contains('active')) renderAll()

  if(G.gameOver){ setTimeout(showResult,800); return }
}

// ============================================================
// プレイヤーカード（左側）
// ============================================================
function renderPlayerCards(){
  const maxA=Math.max(...G.players.map(p=>p.totalAssets),1)
  document.getElementById('playerCards').innerHTML=G.players.map((p,i)=>{
    const act=i===G.currentPlayer
    return \`<div class="player-card \${act?'active':''} \${p.isAI?'ai':'human'}">
      <div class="flex items-center gap-2 mb-0.5">
        <span>\${p.isAI?'🤖':'👤'}</span>
        <span class="font-black text-xs flex-1 truncate text-white">\${esc(p.name)}</span>
        \${act?'<span class="text-xs px-2 rounded-full font-black" style="background:#FFD700;color:#1a1a1a">NOW</span>':''}
      </div>
      <div class="flex gap-2 text-xs font-bold text-gray-300">
        <span>💵\${p.cash}</span><span>🏧\${p.atm}</span>
      </div>
      <div class="text-xs font-black text-yellow-300">総資産\${p.totalAssets}円</div>
      <div class="bar-wrap mt-1"><div class="bar-fill" style="width:\${Math.round(p.totalAssets/maxA*100)}%"></div></div>
    </div>\`
  }).join('')
}

// ============================================================
// アクションカード生成
// ============================================================
const COMPANY_LIST=[
  {id:'restaurant', name:'飲食店',    emoji:'🍜', cost:10,  upgTo:'restaurant3',upgCost:100},
  {id:'restaurant3',name:'三ツ星レストラン',emoji:'⭐', cost:100, upgTo:null,isUpg:true},
  {id:'bank',       name:'金融機関',  emoji:'🏦', cost:50,  upgTo:null},
  {id:'bus',        name:'バス会社',  emoji:'🚌', cost:20,  upgTo:'train',upgCost:100},
  {id:'train',      name:'鉄道会社',  emoji:'🚃', cost:100, upgTo:null,isUpg:true},
  {id:'shrine',     name:'神社',      emoji:'⛩️', cost:50,  upgTo:null},
]
function COMPANY_DEF(id){ return COMPANY_LIST.find(c=>c.id===id)||null }

function renderActionCards(){
  if(!G)return
  const cp=G.players[G.currentPlayer]
  const isHuman=!cp.isAI
  const canAct=isHuman && cp.actionsLeft>0 && !processingAction

  // イベントカードエリア
  const eventArea=document.getElementById('eventArea')
  if(G.phase==='event' && G.turnIndex===0 && !G.gameOver && isHuman){
    eventArea.style.display=''
  } else {
    eventArea.style.display='none'
  }

  // 倒産エリア
  const bankruptArea=document.getElementById('bankruptArea')
  if(G.bankruptPending && isHuman && cp.companies.length>0){
    bankruptArea.style.display=''
    document.getElementById('bankruptSellList').innerHTML=cp.companies.map(cid=>{
      const def=COMPANY_DEF(cid); if(!def)return''
      return \`<button class="btn btn-red w-full btn-sm" onclick="sellCompany('\${cid}')">\${def.emoji}\${def.name}を売却（\${Math.floor(def.cost/2)}円）</button>\`
    }).join('')
  } else bankruptArea.style.display='none'

  // ターン終了ボタン
  document.getElementById('btnEndTurn').disabled=!isHuman||processingAction

  // ── アクションカードを生成 ──
  const mult=G.eventEffects.stockUp?2:(G.eventEffects.stockDown?.5:1)
  const japPrice=Math.ceil(10*mult)
  const forPrice=Math.ceil(20*mult)
  const workEarn=G.eventEffects.workBonus?15:5
  const atmInterest=calcInterestJS(cp.atm)*(G.eventEffects.interestUp?2:1)

  let cards=[]

  // ── 1. 会社カード（各会社ごと or 購入候補）
  // 保有会社のサイコロアクション
  for(const cid of cp.companies){
    const def=COMPANY_DEF(cid); if(!def)continue
    if(cid==='bank'){
      // 金融機関：融資アクション
      cards.push({
        icon:'🏦',title:'金融機関・融資',
        desc:'他のプレイヤーにお金を貸す。利息を毎年もらえる',
        color:'rgba(59,130,246,.15)',borderColor:'rgba(59,130,246,.4)',
        action:()=>openBankModal(),
        disabled:!canAct
      })
    } else if(cid==='restaurant3'){
      cards.push({
        icon:'⭐',title:'三ツ星レストランの収益',
        desc:'サイコロを振る: 1→-10円 / 2〜6→+40円',
        color:'rgba(255,165,0,.15)',borderColor:'rgba(255,165,0,.4)',
        action:()=>doCompanyRoll('restaurant3'),
        disabled:!canAct
      })
    } else {
      const descs={
        restaurant:'1-2→-10 / 3-4→+10 / 5-6→+30円',
        bus:'1-4→なし / 5-6→追加行動+1',
        train:'1-4→なし / 5-6→もう一度ターン',
        shrine:'1-2→選んだ人から50円 / 3-4→25円',
      }
      // アップグレードが可能か確認
      const hasUpg=def.upgTo && cp.cash>=(def.upgCost||100)
      cards.push({
        icon:def.emoji,title:\`\${def.name}の収益\`,
        desc:\`サイコロを振る: \${descs[cid]||''}\${hasUpg?' [アップグレード可]':''}\`,
        color:'rgba(255,165,0,.15)',borderColor:'rgba(255,165,0,.4)',
        action:()=>openCompanyRollModal(cid),
        disabled:!canAct
      })
    }
  }

  // 未所有の会社購入
  const unowned=COMPANY_LIST.filter(d=>!d.isUpg&&!cp.companies.includes(d.id))
  if(unowned.length>0){
    const cheapest=unowned[0]
    const affordCount=unowned.filter(d=>cp.cash>=d.cost).length
    cards.push({
      icon:'🏢',title:'会社を買う',
      desc:\`購入可: \${affordCount}/\${unowned.length}種 (\${unowned.map(d=>d.emoji+d.cost+'円').join(' ')})\`,
      color:'rgba(34,197,94,.1)',borderColor:'rgba(34,197,94,.3)',
      action:()=>openBuyCompanyModal(),
      disabled:!canAct
    })
  }

  // ── 2. 株カード
  cards.push({
    icon:'📈',title:'株を買う',
    desc:\`🗾日本株\${japPrice}円(偶数→+30/奇数→-20) 🌍外国株\${forPrice}円(偶数→+50/奇数→-30)\`,
    color:'rgba(168,85,247,.1)',borderColor:'rgba(168,85,247,.3)',
    action:()=>openStockModal(),
    disabled:!canAct
  })

  // ── 3. 働くカード
  cards.push({
    icon:'💼',title:'働く',
    desc:\`+\${workEarn}円もらえる\${G.eventEffects.workBonus?' (就労支援3倍！)':''}\`,
    color:'rgba(34,197,94,.1)',borderColor:'rgba(34,197,94,.3)',
    action:()=>doWork(),
    disabled:!canAct
  })

  // ── 4. ATMカード
  cards.push({
    icon:'🏧',title:'ATMに預ける',
    desc:\`現金からATMへ。今の利息: 毎ターン+\${atmInterest}円\`,
    color:'rgba(59,130,246,.1)',borderColor:'rgba(59,130,246,.3)',
    action:()=>openAtmModal(),
    disabled:!canAct
  })

  // ── 5. 借金返済（借金があれば）
  if(cp.debt>0){
    cards.push({
      icon:'💳',title:'借金を返済する',
      desc:\`残債 \${cp.debt}円 / 毎ターン\${cp.debtPerTurn}円返済\`,
      color:'rgba(239,68,68,.1)',borderColor:'rgba(239,68,68,.3)',
      action:()=>openRepayModal(),
      disabled:!canAct
    })
  }

  // ── HTMLレンダリング
  document.getElementById('actionCards').innerHTML=cards.map((c,i)=>\`
    <div class="action-card \${c.disabled?'disabled':''}" onclick="\${c.disabled?'':'('+c.action.toString()+')()'}" style="border-color:\${c.borderColor};background:\${c.color}">
      <div class="text-2xl mb-1">\${c.icon}</div>
      <div class="text-sm font-black text-white mb-1">\${c.title}</div>
      <div class="text-xs text-gray-400 font-semibold leading-snug">\${c.desc}</div>
    </div>
  \`).join('')

  // onclick を正しくバインドし直す
  const cardEls=document.querySelectorAll('#actionCards .action-card:not(.disabled)')
  cardEls.forEach((el,i)=>{
    const idx=parseInt(el.getAttribute('data-idx')||i)
    el.onclick=null
  })
  // data-idx付きで再生成
  document.getElementById('actionCards').innerHTML=cards.map((c,idx)=>\`
    <div class="action-card \${c.disabled?'disabled':''}" id="ac\${idx}" style="border-color:\${c.borderColor};background:\${c.color}">
      <div class="text-2xl mb-1">\${c.icon}</div>
      <div class="text-sm font-black text-white mb-1">\${c.title}</div>
      <div class="text-xs text-gray-400 font-semibold leading-snug">\${c.desc}</div>
    </div>
  \`).join('')
  cards.forEach((c,idx)=>{
    const el=document.getElementById('ac'+idx)
    if(el&&!c.disabled) el.addEventListener('click',c.action)
  })
}

// ============================================================
// ランキング
// ============================================================
function renderRanking(){
  const sorted=[...G.players].sort((a,b)=>b.totalAssets-a.totalAssets)
  const medals=['🥇','🥈','🥉','4️⃣']
  const clrs=['linear-gradient(135deg,#FFD700,#FFA000)','linear-gradient(135deg,#B0BEC5,#78909C)','linear-gradient(135deg,#CD7F32,#8D4004)','rgba(255,255,255,.05)']
  document.getElementById('rankingContent').innerHTML=sorted.map((p,i)=>\`
    <div class="flex items-center gap-3 rounded-xl p-3 mb-2" style="background:\${clrs[i]||clrs[3]}">
      <span class="text-2xl">\${medals[i]||'📌'}</span>
      <div class="flex-1 min-w-0">
        <div class="font-black text-sm \${i<3?'text-white':'text-gray-200'} truncate">\${p.isAI?'🤖':'👤'} \${esc(p.name)}</div>
        <div class="text-xs \${i<3?'text-white opacity-80':'text-gray-400'} font-semibold">現金\${p.cash} ATM\${p.atm} 株\${calcStockVal(p)}</div>
      </div>
      <div class="font-black text-sm \${i<3?'text-white':'text-gray-200'}">\${p.totalAssets}円</div>
    </div>
  \`).join('')
}

function renderAll(){
  document.getElementById('allContent').innerHTML=G.players.map(p=>\`
    <div class="rounded-xl p-3 mb-2" style="background:rgba(255,255,255,.06)">
      <div class="flex justify-between items-center mb-1">
        <span class="font-black text-sm text-white">\${p.isAI?'🤖':'👤'} \${esc(p.name)}</span>
        <span class="font-black text-sm text-yellow-300">総資産 \${p.totalAssets}円</span>
      </div>
      <div class="grid grid-cols-3 gap-2 text-xs text-gray-300 font-semibold">
        <div>💵 現金: \${p.cash}円</div>
        <div>🏧 ATM: \${p.atm}円</div>
        <div>📈 株: \${calcStockVal(p)}円相当</div>
      </div>
      \${p.companies.length>0?'<div class="mt-1 text-xs text-orange-300 font-bold">🏢 '+p.companies.map(id=>{const d=COMPANY_DEF(id);return d?d.emoji+d.name:''}).join(' / ')+'</div>':''}
      \${p.debt>0?'<div class="text-xs text-red-400 font-bold mt-0.5">💳 借金: '+p.debt+'円</div>':''}
    </div>
  \`).join('')
}

function calcStockVal(p){ return p.stocks.japan*10+p.stocks.foreign*20 }

// ============================================================
// ログ
// ============================================================
function renderLog(){
  document.getElementById('gameLog').innerHTML=(G.log||[]).slice(0,15).map(l=>\`<div class="log-item">\${esc(l)}</div>\`).join('')
}

// ============================================================
// タブ切替
// ============================================================
function switchTab(tab){
  ['action','ranking','all'].forEach(t=>{
    document.getElementById('tab-'+t).classList.toggle('active',t===tab)
    document.getElementById('content-'+t).style.display=t===tab?'block':'none'
  })
  if(tab==='ranking') renderRanking()
  if(tab==='all') renderAll()
}

// ============================================================
// ATM利息計算（JS側）
// ============================================================
function calcInterestJS(atm){
  if(atm>=75)return 30
  if(atm>=55)return 15
  if(atm>=35)return 10
  if(atm>=15)return 5
  return 0
}

// ============================================================
// モーダル：会社購入
// ============================================================
function openBuyCompanyModal(){
  if(processingAction)return
  const cp=G.players[G.currentPlayer]
  const unowned=COMPANY_LIST.filter(d=>!d.isUpg&&!cp.companies.includes(d.id))
  // アップグレード候補
  const upgrades=[]
  for(const cid of cp.companies){
    const def=COMPANY_DEF(cid)
    if(def&&def.upgTo){
      const upgDef=COMPANY_DEF(def.upgTo)
      if(upgDef) upgrades.push({from:def,to:upgDef})
    }
  }

  let html=\`<div class="flex justify-between items-center mb-4"><h3 class="text-lg font-black">🏢 会社を買う</h3><button onclick="closeActionModal()" class="text-gray-400 text-xl">✕</button></div>\`

  if(upgrades.length>0){
    html+=\`<div class="mb-3"><div class="text-xs font-black text-yellow-300 mb-2">⬆️ アップグレード</div><div class="space-y-2">\`
    for(const u of upgrades){
      const canBuy=cp.cash>=(u.to.cost)
      html+=\`<div class="rounded-xl p-3" style="background:rgba(255,165,0,.15);border:1px solid rgba(255,165,0,.4)">
        <div class="flex justify-between items-center mb-1">
          <span class="font-black text-white">\${u.from.emoji}\${u.from.name} → \${u.to.emoji}\${u.to.name}</span>
          <span class="font-black text-yellow-300">\${u.to.cost}円</span>
        </div>
        <button class="btn btn-yellow w-full btn-sm mt-2" onclick="closeActionModal();buyCompany('\${u.to.id}')" \${canBuy?'':'disabled'}>⬆️ アップグレード（\${u.to.cost}円）</button>
      </div>\`
    }
    html+=\`</div></div>\`
  }

  html+=\`<div class="text-xs font-black text-green-300 mb-2">🏢 新規購入</div><div class="space-y-2">\`
  for(const def of unowned){
    const canBuy=cp.cash>=def.cost
    const descs={
      restaurant:'1-2→-10 / 3-4→+10 / 5-6→+30円',
      bank:'他プレイヤーに融資できる',
      bus:'5-6→追加行動1回',
      shrine:'1-2→50円 / 3-4→25円もらう',
    }
    html+=\`<div class="rounded-xl p-3" style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15)">
      <div class="flex justify-between items-center mb-1">
        <span class="font-black text-white text-sm">\${def.emoji} \${def.name}</span>
        <span class="font-black text-yellow-300">\${def.cost}円</span>
      </div>
      <div class="text-xs text-gray-400 mb-2">\${descs[def.id]||''}</div>
      <button class="btn btn-green w-full btn-sm" onclick="closeActionModal();buyCompany('\${def.id}')" \${canBuy?'':'disabled'}>購入（\${def.cost}円）</button>
    </div>\`
  }
  html+=\`</div>\`

  document.getElementById('actionModalContent').innerHTML=html
  document.getElementById('actionModal').style.display='flex'
}

// ============================================================
// モーダル：会社収益（サイコロ）
// ============================================================
function openCompanyRollModal(cid){
  if(processingAction)return
  const def=COMPANY_DEF(cid); if(!def)return
  const cp=G.players[G.currentPlayer]
  const canBuy=def.upgTo && cp.cash>=(def.upgCost||100)
  const descs={
    restaurant:'1-2: -10円 / 3-4: +10円 / 5-6: +30円',
    bus:'1-4: なし（行動消費） / 5-6: +追加行動1回',
    train:'1-4: なし（行動消費） / 5-6: もう一度ターンが回ってくる',
    shrine:'1-2: 選んだ人から50円もらう / 3-4: 選んだ人から25円もらう / 5-6: なし',
  }
  let html=\`<div class="flex justify-between items-center mb-4"><h3 class="text-lg font-black">\${def.emoji} \${def.name}の収益</h3><button onclick="closeActionModal()" class="text-gray-400 text-xl">✕</button></div>\`
  html+=\`<div class="rounded-xl p-4 text-center mb-4" style="background:rgba(255,165,0,.15)">
    <div style="font-size:3rem" class="mb-2">\${def.emoji}</div>
    <div class="text-xs text-gray-300 font-semibold mb-3">\${descs[cid]||''}</div>
    \${G.eventEffects.inflation?'<div class="text-xs text-green-400 font-black">📈 インフレ中: 利益2倍！</div>':''}
    \${G.eventEffects.deflation?'<div class="text-xs text-red-400 font-black">📉 デフレ中: 損失2倍！</div>':''}
    \${G.eventEffects.forceEven?'<div class="text-xs text-purple-300 font-black">🎲 偶数確定！</div>':''}
    \${G.eventEffects.forceOdd?'<div class="text-xs text-pink-300 font-black">🎲 奇数確定！</div>':''}
  </div>\`
  if(canBuy){
    html+=\`<button class="btn btn-blue w-full btn-sm mb-2" onclick="closeActionModal();buyCompany('\${def.upgTo}')">⬆️ アップグレード（\${def.upgCost}円）</button>\`
  }
  html+=\`<button class="btn btn-yellow w-full py-3" onclick="closeActionModal();doCompanyRoll('\${cid}')">🎲 サイコロを振る！</button>\`
  document.getElementById('actionModalContent').innerHTML=html
  document.getElementById('actionModal').style.display='flex'
}

// ============================================================
// モーダル：株
// ============================================================
function openStockModal(){
  if(processingAction)return
  const cp=G.players[G.currentPlayer]
  const mult=G.eventEffects.stockUp?2:(G.eventEffects.stockDown?.5:1)
  const japPrice=Math.ceil(10*mult)
  const forPrice=Math.ceil(20*mult)

  let html=\`<div class="flex justify-between items-center mb-4"><h3 class="text-lg font-black">📈 株を買う</h3><button onclick="closeActionModal()" class="text-gray-400 text-xl">✕</button></div>
  <div class="text-xs text-gray-400 mb-3 font-semibold">※ 購入すると同時にサイコロを振って配当を受け取ります</div>\`

  const stocks=[
    {id:'japan',emoji:'🗾',name:'日本株',price:japPrice,held:cp.stocks.japan,desc:'偶数→+30円 / 奇数→-20円'},
    {id:'foreign',emoji:'🌍',name:'外国株',price:forPrice,held:cp.stocks.foreign,desc:'偶数→+50円 / 奇数→-30円'},
  ]
  for(const s of stocks){
    const canBuy=cp.cash>=s.price
    html+=\`<div class="rounded-xl p-4 mb-3" style="background:rgba(168,85,247,.1);border:1px solid rgba(168,85,247,.3)">
      <div class="flex justify-between items-center mb-1">
        <span class="text-lg font-black text-white">\${s.emoji} \${s.name}</span>
        <span class="font-black text-yellow-300">\${s.price}円/株</span>
      </div>
      <div class="text-xs text-gray-400 mb-1">\${s.desc}</div>
      <div class="text-xs text-blue-300 mb-3">保有: \${s.held}株</div>
      \${G.eventEffects.stockUp?'<div class="text-xs text-yellow-400 font-black mb-2">🚀 株価高騰中: 価格・配当2倍！</div>':''}
      \${G.eventEffects.stockDown?'<div class="text-xs text-red-400 font-black mb-2">💥 株価暴落中: 価格・配当半分！</div>':''}
      <button class="btn btn-primary w-full btn-sm" onclick="closeActionModal();doBuyStock('\${s.id}')" \${canBuy?'':'disabled'}>📈 \${s.name}を買う（\${s.price}円）</button>
    </div>\`
  }
  document.getElementById('actionModalContent').innerHTML=html
  document.getElementById('actionModal').style.display='flex'
}

// ============================================================
// モーダル：ATM
// ============================================================
function openAtmModal(){
  if(processingAction)return
  const cp=G.players[G.currentPlayer]
  const interest=calcInterestJS(cp.atm)*(G.eventEffects.interestUp?2:1)

  const html=\`<div class="flex justify-between items-center mb-4"><h3 class="text-lg font-black">🏧 ATM</h3><button onclick="closeActionModal()" class="text-gray-400 text-xl">✕</button></div>
  <div class="rounded-xl p-3 mb-3" style="background:rgba(59,130,246,.1)">
    <div class="grid grid-cols-2 gap-3 text-center">
      <div><div class="text-xs text-gray-400">現在の現金</div><div class="text-xl font-black text-green-400">\${cp.cash}円</div></div>
      <div><div class="text-xs text-gray-400">ATM残高</div><div class="text-xl font-black text-blue-400">\${cp.atm}円</div></div>
    </div>
    <div class="text-center mt-2 text-xs text-teal-300 font-black">現在の利息: 毎ターン+\${interest}円</div>
    \${G.eventEffects.interestUp?'<div class="text-center text-xs text-yellow-400 font-black">💰 利息UP中: 2倍！</div>':''}
  </div>
  <div class="mb-3">
    <div class="text-xs font-black text-white mb-2">コイン単位で選ぶ</div>
    <div class="flex gap-2 flex-wrap" id="coinBtns">
      \${[5,10,50].map(v=>\`<button class="rounded-full px-3 py-1 text-xs font-black border-2" style="background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.3);color:white" onclick="setAtmAmount(\${v})">\${v}円コイン</button>\`).join('')}
    </div>
    <input type="number" id="atmAmountIn" class="game-input mt-2" placeholder="金額を入力" min="1">
  </div>
  <div class="flex gap-2">
    <button class="btn btn-blue flex-1 py-2" onclick="doDepositFromModal()">🏧 預ける</button>
    <button class="btn btn-yellow flex-1 py-2" onclick="doWithdrawFromModal()">💸 引き出す</button>
  </div>\`

  document.getElementById('actionModalContent').innerHTML=html
  document.getElementById('actionModal').style.display='flex'
}

function setAtmAmount(v){
  const inp=document.getElementById('atmAmountIn')
  if(inp) inp.value=(parseInt(inp.value)||0)+v
}

async function doDepositFromModal(){
  const amount=parseInt(document.getElementById('atmAmountIn').value)||0
  if(amount<=0){showToast('❌ 金額を入力してください','error');return}
  closeActionModal()
  await callAction({type:'deposit',amount})
}
async function doWithdrawFromModal(){
  const amount=parseInt(document.getElementById('atmAmountIn').value)||0
  if(amount<=0){showToast('❌ 金額を入力してください','error');return}
  closeActionModal()
  await callAction({type:'withdraw',amount})
}

// ============================================================
// モーダル：金融機関（融資）
// ============================================================
function openBankModal(){
  if(processingAction)return
  const cp=G.players[G.currentPlayer]
  const others=G.players.filter((_,i)=>i!==G.currentPlayer)

  const html=\`<div class="flex justify-between items-center mb-4"><h3 class="text-lg font-black">🏦 融資する</h3><button onclick="closeActionModal()" class="text-gray-400 text-xl">✕</button></div>
  <div class="text-xs text-gray-400 mb-3 font-semibold">融資額に応じて毎年利息をもらえます<br>〜50円: 年10円利息 / 51円以上: 年20円利息</div>
  <div class="mb-3">
    <label class="text-xs font-black text-white block mb-1">融資する相手</label>
    <select id="loanTargetSel" class="game-input">
      \${others.map(p=>\`<option value="\${p.id}">\${esc(p.name)}（現金\${p.cash}円）</option>\`).join('')}
    </select>
  </div>
  <div class="mb-4">
    <label class="text-xs font-black text-white block mb-1">融資額</label>
    <div class="flex gap-2 flex-wrap mb-2">
      \${[10,20,50].map(v=>\`<button class="rounded-full px-3 py-1 text-xs font-black border-2" style="background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.3);color:white" onclick="addLoanAmount(\${v})">\${v}円</button>\`).join('')}
    </div>
    <input type="number" id="loanAmountIn" class="game-input" placeholder="融資額" min="1">
  </div>
  <button class="btn btn-blue w-full py-2" onclick="doLoanFromModal()">🏦 融資する</button>\`

  document.getElementById('actionModalContent').innerHTML=html
  document.getElementById('actionModal').style.display='flex'
}
function addLoanAmount(v){
  const inp=document.getElementById('loanAmountIn')
  if(inp) inp.value=(parseInt(inp.value)||0)+v
}
async function doLoanFromModal(){
  const toPlayer=parseInt(document.getElementById('loanTargetSel').value)
  const amount=parseInt(document.getElementById('loanAmountIn').value)||0
  if(amount<=0){showToast('❌ 金額を入力してください','error');return}
  closeActionModal()
  await callAction({type:'loan',toPlayer,amount},false)
}

// ============================================================
// モーダル：借金返済
// ============================================================
function openRepayModal(){
  if(processingAction)return
  const cp=G.players[G.currentPlayer]
  const html=\`<div class="flex justify-between items-center mb-4"><h3 class="text-lg font-black">💳 借金返済</h3><button onclick="closeActionModal()" class="text-gray-400 text-xl">✕</button></div>
  <div class="text-sm text-red-400 font-black mb-3">残債: \${cp.debt}円 / 毎ターン\${cp.debtPerTurn}円の利息</div>
  <div class="mb-4">
    <div class="flex gap-2 flex-wrap mb-2">
      \${[5,10,20].map(v=>\`<button class="rounded-full px-3 py-1 text-xs font-black border-2" style="background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.3);color:white" onclick="addRepayAmt(\${v})">\${v}円</button>\`).join('')}
    </div>
    <input type="number" id="repayAmtIn" class="game-input" placeholder="返済額" min="1">
  </div>
  <button class="btn btn-red w-full py-2" onclick="doRepayFromModal()">💳 返済する</button>\`

  document.getElementById('actionModalContent').innerHTML=html
  document.getElementById('actionModal').style.display='flex'
}
function addRepayAmt(v){
  const inp=document.getElementById('repayAmtIn')
  if(inp) inp.value=(parseInt(inp.value)||0)+v
}
async function doRepayFromModal(){
  const amount=parseInt(document.getElementById('repayAmtIn').value)||0
  if(amount<=0){showToast('❌ 金額を入力してください','error');return}
  closeActionModal()
  await callAction({type:'repay',amount},false)
}

function closeActionModal(){
  document.getElementById('actionModal').style.display='none'
  document.getElementById('actionModalContent').innerHTML=''
}

// ============================================================
// アクション実行
// ============================================================
async function buyCompany(cid){
  if(processingAction)return
  const def=COMPANY_DEF(cid); if(!def)return
  showConfirm(\`\${def.emoji}\${def.name}を購入しますか？\`,
    \`<div class="text-center"><div style="font-size:3rem">\${def.emoji}</div>
     <div class="text-xl font-black text-yellow-300 my-2">\${def.cost}円</div>
     <div class="text-sm">\${getCompanyDesc(cid)}</div></div>\`,
    ()=>callAction({type:'buy_company',companyId:cid}),'🏢 購入する！')
}

async function doCompanyRoll(cid){
  if(processingAction)return
  setMsg('⌛ サイコロを振っています...')
  processingAction=true
  try{
    const rollRes=await fetch('/api/game/roll',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:G})})
    const rollData=await rollRes.json()
    if(rollData.success){ G=rollData.state; showDice(G.lastDice) }

    const res=await fetch('/api/game/action',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:G,action:{type:'company_roll',companyId:cid}})})
    const d=await res.json()
    if(d.success){
      G=d.state
      if(d.needShrineTarget){
        pendingShrineAmount=d.shrineAmount||0
        renderGame()
        showShrineModal(pendingShrineAmount)
        return
      }
      renderGame(); spawnCoins(2)
    } else showToast('❌ '+(d.error||'エラー'),'error')
  }catch(e){showToast('❌ 通信エラー','error')}
  finally{processingAction=false;setMsg('')}
}

async function sellCompany(cid){
  const def=COMPANY_DEF(cid); if(!def)return
  await callAction({type:'sell_company',companyId:cid})
}

async function doBuyStock(stockId){
  if(processingAction)return
  const mult=G.eventEffects.stockUp?2:(G.eventEffects.stockDown?.5:1)
  const price=Math.ceil((stockId==='japan'?10:20)*mult)
  setMsg('⌛ サイコロを振っています...')
  processingAction=true
  try{
    // 購入してすぐにサイコロを振る
    const rollRes=await fetch('/api/game/roll',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:G})})
    const rollData=await rollRes.json()
    if(rollData.success){ G=rollData.state; showDice(G.lastDice) }

    // 株を買う
    const buyRes=await fetch('/api/game/action',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:G,action:{type:'buy_stock',stockId,qty:1}})})
    const buyData=await buyRes.json()
    if(!buyData.success){showToast('❌ '+(buyData.error||'エラー'),'error');return}
    G=buyData.state

    // すぐに配当受け取り
    const divRes=await fetch('/api/game/action',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:G,action:{type:'stock_dividend',stockId}})})
    const divData=await divRes.json()
    if(divData.success){ G=divData.state; renderGame(); spawnCoins(2) }
    else showToast('❌ '+(divData.error||'エラー'),'error')
  }catch(e){showToast('❌ 通信エラー','error')}
  finally{processingAction=false;setMsg('')}
}

async function doWork(){
  if(processingAction)return
  const earn=G.eventEffects.workBonus?15:5
  showConfirm('💼 働きますか？',
    \`<div class="text-center"><div style="font-size:3rem">💼</div>
     <div class="text-xl font-black text-green-400 my-2">+\${earn}円もらえる\${G.eventEffects.workBonus?' (就労支援3倍！)':''}</div></div>\`,
    ()=>callAction({type:'work'}),'💼 働く！')
}

// ============================================================
// イベントカード
// ============================================================
async function drawEvent(){
  if(processingAction)return
  processingAction=true
  try{
    const res=await fetch('/api/game/draw-event',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:G})})
    const d=await res.json()
    if(d.success){ G=d.state; showEventOverlay(d.card) }
  }catch(e){showToast('❌ エラー','error')}
  finally{processingAction=false}
}

function showEventOverlay(card){
  const typeColor={inflation:'#4CAF50',deflation:'#f44336',work_bonus:'#22c55e',
    stock_up:'#f59e0b',stock_down:'#dc2626',bankrupt:'#7f1d1d',
    interest_up:'#2563eb',force_even:'#7c3aed',force_odd:'#db2777',investor:'#059669'}
  const col=typeColor[card.type]||'#374151'
  document.getElementById('eventCardDisplay').style.background=\`linear-gradient(135deg,\${col},\${col}cc)\`
  document.getElementById('eventCardDisplay').innerHTML=\`
    <div style="font-size:3.5rem" class="bounce mb-2">\${card.title.split(' ')[0]}</div>
    <h3 class="text-xl font-black mb-2 text-white">\${card.title}</h3>
    <p class="text-white font-semibold text-sm opacity-90">\${card.desc}</p>
  \`
  document.getElementById('eventOverlay').style.display='flex'
}

function dismissEvent(){
  document.getElementById('eventOverlay').style.display='none'
  renderGame()
}

// ============================================================
// 神社モーダル
// ============================================================
function showShrineModal(amount){
  pendingShrineAmount=amount
  document.getElementById('shrineDesc').textContent=\`合計 \${amount}円を受け取ります。誰から受け取るか選んでください。\`
  shrineSelections={}
  document.getElementById('shrineTargetList').innerHTML=G.players
    .filter((_,i)=>i!==G.currentPlayer)
    .map(p=>\`
      <div class="flex items-center gap-2 mb-2">
        <span class="text-sm font-bold text-white flex-1">\${esc(p.name)}（現金\${p.cash}円）</span>
        <input type="number" min="0" value="0" max="\${p.cash}" class="game-input" style="width:70px;font-size:.85rem;padding:4px 8px" id="shrine_\${p.id}" placeholder="0">
        <span class="text-sm text-gray-400">円</span>
      </div>\`).join('')
  document.getElementById('shrineModal').style.display='flex'
}

async function confirmShrineTarget(){
  const targets=[]
  G.players.forEach((p,i)=>{
    if(i===G.currentPlayer)return
    const inp=document.getElementById('shrine_'+p.id)
    const amt=parseInt(inp?.value)||0
    if(amt>0) targets.push({playerId:p.id,amount:amt})
  })
  closeShrineModal()
  await callAction({type:'shrine_collect',targets},false)
}
function closeShrineModal(){
  document.getElementById('shrineModal').style.display='none'
}

// ============================================================
// ターン終了
// ============================================================
async function endTurn(){
  if(processingAction)return
  processingAction=true
  document.getElementById('btnEndTurn').disabled=true
  setMsg('⌛ ターン処理中...')
  try{
    const res=await fetch('/api/game/end-turn',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:G})})
    const d=await res.json()
    if(d.success){
      G=d.state
      if(G.gameOver){showResult();return}
      if(G.needsHandoff&&G.handoffTo!==null) showPass(G.handoffTo)
      else{showScreen('game');renderGame()}
    }
  }catch(e){showToast('❌ 通信エラー','error')}
  finally{processingAction=false;setMsg('');document.getElementById('btnEndTurn').disabled=false}
}

// ============================================================
// 結果発表
// ============================================================
function showResult(){
  showScreen('result')
  if(!G)return
  const sorted=[...G.players].sort((a,b)=>b.totalAssets-a.totalAssets)
  const winner=sorted[0]
  const medals=['🥇','🥈','🥉','4️⃣']
  document.getElementById('winnerAnnounce').textContent=\`🎊 \${winner.name} の勝ち！ \${winner.totalAssets}円\`
  document.getElementById('resultRanking').innerHTML=sorted.map((p,i)=>\`
    <div class="flex items-center gap-3 rounded-2xl p-3" style="background:\${['linear-gradient(135deg,#FFD700,#FFA000)','linear-gradient(135deg,#B0BEC5,#78909C)','linear-gradient(135deg,#CD7F32,#8D4004)','#f3f4f6'][i]||'#f3f4f6'}">
      <span class="text-xl">\${medals[i]||'📌'}</span>
      <div class="flex-1 text-sm font-black \${i<3?'text-white':'text-gray-700'} truncate">\${p.isAI?'🤖':'👤'} \${esc(p.name)}</div>
      <div class="text-sm font-black \${i<3?'text-white':'text-gray-700'}">\${p.totalAssets}円</div>
    </div>\`).join('')

  document.getElementById('resultDetail').innerHTML=sorted.map(p=>\`
    <div class="flex justify-between text-xs">
      <span>\${esc(p.name)}：</span>
      <span>現金\${p.cash} + ATM\${p.atm} + 株\${calcStockVal(p)} = \${p.totalAssets}円</span>
    </div>\`).join('')

  spawnCoins(16)
}

// ============================================================
// API 呼び出しヘルパー
// ============================================================
async function callAction(action, useAction=true){
  if(processingAction)return null
  processingAction=true; setMsg('⌛ 処理中...')
  try{
    const res=await fetch('/api/game/action',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:G,action})})
    const d=await res.json()
    if(d.success){ G=d.state; renderGame(); spawnCoins(2) }
    else showToast('❌ '+(d.error||'エラー'),'error')
    return d
  }catch(e){showToast('❌ 通信エラー','error');return null}
  finally{processingAction=false;setMsg('')}
}

// ============================================================
// サイコロアニメーション
// ============================================================
function showDice(n){
  const faces=['','⚀','⚁','⚂','⚃','⚄','⚅']
  const el=document.getElementById('diceDisplay')
  if(!el)return
  let c=0
  const t=setInterval(()=>{
    el.textContent=faces[Math.floor(Math.random()*6)+1]; c++
    if(c>8){
      clearInterval(t)
      el.textContent=faces[n]||'🎲'
      el.classList.add('pop')
      setTimeout(()=>el.classList.remove('pop'),500)
    }
  },80)
  document.getElementById('diceNote').textContent=\`\${n}の目が出た！\`
}

// ============================================================
// UI ヘルパー
// ============================================================
function setMsg(m){const e=document.getElementById('actionMsg');if(e)e.textContent=m}

function showToast(msg,type='info'){
  const el=document.createElement('div')
  el.style.cssText=\`position:fixed;bottom:20px;left:50%;transform:translateX(-50%);
    background:\${type==='error'?'#ef4444':'#22c55e'};color:white;padding:10px 20px;
    border-radius:50px;font-weight:800;font-size:.9rem;z-index:9999;
    box-shadow:0 4px 18px rgba(0,0,0,.35);animation:fadeInUp .3s ease-out;\`
  el.textContent=msg; document.body.appendChild(el)
  setTimeout(()=>el.remove(),2600)
}

function spawnCoins(n){
  const coins=['💴','💵','🪙','💰','⭐','✨']
  for(let i=0;i<n;i++) setTimeout(()=>{
    const el=document.createElement('div'); el.className='coin-particle'
    el.textContent=coins[Math.floor(Math.random()*coins.length)]
    el.style.cssText=\`left:\${Math.random()*100}%;top:-40px;font-size:\${Math.random()*1.2+.8}rem;animation-duration:\${Math.random()*.8+1}s;\`
    document.getElementById('coinArea').appendChild(el)
    setTimeout(()=>el.remove(),2000)
  },i*130)
}

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}

function getCompanyDesc(id){
  const map={
    restaurant:'1-2→-10円 / 3-4→+10円 / 5-6→+30円',
    restaurant3:'1→-10円 / 2-6→+40円',
    bank:'他プレイヤーへ融資。年10〜20円の利息を回収',
    bus:'5-6が出たら追加行動1回',
    train:'5-6が出たらもう一度ターンが回ってくる',
    shrine:'1-2→50円 / 3-4→25円 相手から受け取る',
  }
  return map[id]||''
}

// ============================================================
// 確認モーダル
// ============================================================
function showConfirm(title,body,onOk,label){
  confirmCB=onOk
  document.getElementById('confirmTitle').textContent=title
  document.getElementById('confirmBody').innerHTML=body
  const okBtn=document.getElementById('confirmOkBtn')
  if(okBtn) okBtn.textContent=label||'✅ 決定！'
  document.getElementById('confirmModal').style.display='flex'
}
function closeConfirm(){document.getElementById('confirmModal').style.display='none';confirmCB=null}
function onConfirmOk(){const cb=confirmCB;closeConfirm();if(cb)cb()}

// ============================================================
// ルール・終了
// ============================================================
function showRules(){document.getElementById('rulesModal').style.display='flex'}
function closeRules(){document.getElementById('rulesModal').style.display='none'}
function confirmQuit(){
  showConfirm('🚪 ゲームをやめますか？','<div class="text-center text-gray-300">タイトルに戻ります</div>',()=>showScreen('title'),'🚪 やめる')
}

// ============================================================
// 初期化
// ============================================================
window.onload=()=>{
  generateStars('stars',80)
  buildPlayerRows()
  showScreen('title')
}
</script>
</body>
</html>`
}
