export function mainPage(): string {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>💰 もしもし投資ランド！</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
  <style>
    * { font-family: 'Nunito', sans-serif; box-sizing: border-box; }

    body {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      min-height: 100vh; margin: 0;
    }

    /* ===== ボタン共通 ===== */
    .btn { border: none; cursor: pointer; border-radius: 50px; font-weight: 800; transition: all 0.2s; font-family: 'Nunito', sans-serif; display: inline-block; text-align: center; }
    .btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none !important; box-shadow: none !important; }
    .btn-primary { background: linear-gradient(135deg,#6C63FF,#9B59B6); color:#fff; padding:12px 28px; font-size:1rem; box-shadow:0 4px 15px rgba(108,99,255,.4); }
    .btn-primary:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 6px 20px rgba(108,99,255,.5); }
    .btn-success { background: linear-gradient(135deg,#4CAF50,#2E7D32); color:#fff; padding:8px 16px; font-size:.85rem; box-shadow:0 3px 10px rgba(76,175,80,.3); }
    .btn-success:hover:not(:disabled) { transform:translateY(-2px); }
    .btn-danger  { background: linear-gradient(135deg,#FF6584,#f44336); color:#fff; padding:8px 16px; font-size:.85rem; box-shadow:0 3px 10px rgba(244,67,54,.3); }
    .btn-danger:hover:not(:disabled)  { transform:translateY(-2px); }
    .btn-gold    { background: linear-gradient(135deg,#FFD700,#FF8C00); color:#333; padding:10px 20px; font-size:.9rem; box-shadow:0 4px 12px rgba(255,215,0,.5); }
    .btn-gold:hover:not(:disabled)    { transform:translateY(-2px); }
    .btn-sky     { background: linear-gradient(135deg,#00BCD4,#0097A7); color:#fff; padding:10px 20px; font-size:.9rem; }
    .btn-sky:hover:not(:disabled)     { transform:translateY(-2px); }
    .btn-outline { background:white; color:#6C63FF; border:2.5px solid #6C63FF; padding:10px 20px; font-size:.9rem; }
    .btn-outline:hover:not(:disabled) { background:#F3F0FF; }

    /* ===== カード ===== */
    .card { background:white; border-radius:20px; box-shadow:0 8px 32px rgba(0,0,0,.13); }

    /* ===== 画面管理 ===== */
    .screen { display:none; }
    .screen.active { display:block; }

    /* ===== アニメーション ===== */
    @keyframes bounce    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
    @keyframes fadeInUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    @keyframes pop       { 0%{transform:scale(.5);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
    @keyframes shake     { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
    @keyframes glow      { 0%,100%{box-shadow:0 0 10px rgba(108,99,255,.4)} 50%{box-shadow:0 0 25px rgba(108,99,255,.8),0 0 50px rgba(108,99,255,.3)} }
    @keyframes coinFall  { 0%{transform:translateY(-80px) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
    @keyframes float     { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-10px) rotate(2deg)} }
    @keyframes twinkle   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.25;transform:scale(.5)} }
    @keyframes slideUp   { from{opacity:0;transform:translateY(60px)} to{opacity:1;transform:translateY(0)} }
    @keyframes heartbeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.15)} 28%{transform:scale(1)} 42%{transform:scale(1.1)} 70%{transform:scale(1)} }

    .bounce      { animation: bounce 1s infinite; }
    .pop         { animation: pop .45s ease-out; }
    .shake       { animation: shake .4s ease-out; }
    .fade-in-up  { animation: fadeInUp .45s ease-out; }
    .float       { animation: float 3s ease-in-out infinite; }
    .glow        { animation: glow 2s infinite; }
    .heartbeat   { animation: heartbeat 1.2s infinite; }

    /* ===== コインパーティクル ===== */
    .coin-particle { position:fixed; pointer-events:none; z-index:9999; animation: coinFall 1.6s ease-in forwards; }

    /* ===== タイトル ===== */
    .title-bg {
      background: linear-gradient(160deg,#1a1a2e 0%,#16213e 55%,#0f3460 100%);
      min-height:100vh; display:flex; align-items:center; justify-content:center;
      position:relative; overflow:hidden;
    }
    .star { position:absolute; background:white; border-radius:50%; animation:twinkle 2s infinite; }

    /* ===== 設定画面 ===== */
    .player-row {
      display:flex; align-items:center; gap:10px;
      background:#f8f6ff; border-radius:14px; padding:10px 14px;
      border:2px solid #e0e0e0; margin-bottom:8px;
      transition: border-color .2s;
    }
    .player-row.human-row { border-color:#6C63FF; background:#f3f0ff; }
    .player-type-btn {
      border:2px solid #d0d0d0; border-radius:50px; padding:4px 12px;
      font-weight:800; font-size:.78rem; cursor:pointer; transition:all .2s;
      background:white; color:#666;
      font-family:'Nunito',sans-serif;
    }
    .player-type-btn.human { border-color:#6C63FF; background:#6C63FF; color:white; }
    .player-type-btn.ai    { border-color:#f97316; background:#f97316; color:white; }

    /* ===== パス画面 ===== */
    .pass-screen {
      min-height:100vh; display:flex; align-items:center; justify-content:center;
      background: linear-gradient(160deg,#1a1a2e,#16213e,#0f3460);
      position:relative; overflow:hidden;
    }
    .pass-card {
      background:rgba(255,255,255,.08); border:2px solid rgba(255,255,255,.15);
      border-radius:28px; padding:48px 40px; text-align:center;
      backdrop-filter:blur(12px); max-width:440px; width:90%;
      animation: slideUp .5s ease-out;
    }

    /* ===== ゲーム画面 ===== */
    .game-bg { background: linear-gradient(135deg,#f5f3ff 0%,#fce4ec 100%); min-height:100vh; padding:12px; }

    .turn-bar { background:#e0e0e0; border-radius:50px; height:10px; overflow:hidden; }
    .turn-bar-fill { background:linear-gradient(135deg,#6C63FF,#9B59B6); height:100%; border-radius:50px; transition:width .6s ease; }

    .player-info-card {
      border-radius:14px; padding:10px 12px; border:2.5px solid transparent; transition:all .3s;
    }
    .player-info-card.active   { border-color:#FFD700; animation:glow 2s infinite; }
    .player-info-card.human-bg { background:linear-gradient(135deg,#e8f4fd,#dbeafe); }
    .player-info-card.ai-bg    { background:linear-gradient(135deg,#f3e8fd,#ede9fe); }

    .asset-bar { background:#e0e0e0; border-radius:50px; height:6px; overflow:hidden; margin-top:3px; }
    .asset-bar-fill { background:linear-gradient(135deg,#6C63FF,#9B59B6); height:100%; border-radius:50px; transition:width .8s ease; }

    .tab-btn { padding:7px 14px; border-radius:50px; font-weight:700; cursor:pointer; transition:all .2s; border:2px solid #ddd; font-size:.82rem; background:white; font-family:'Nunito',sans-serif; }
    .tab-btn.active { background:#6C63FF; color:white; border-color:#6C63FF; }

    .stock-card {
      background:white; border-radius:14px; padding:12px; border:2px solid #e8e8e8;
      transition:all .2s;
    }
    .stock-card:hover { border-color:#a78bfa; transform:translateY(-2px); }

    .re-card {
      background:white; border-radius:14px; padding:12px; border:2px solid #e8e8e8;
      transition:all .2s;
    }
    .re-card:hover { border-color:#86efac; transform:translateY(-2px); }
    .re-card.owned { border-color:#4CAF50; background:#f0fdf4; }

    .qty-input { width:52px; text-align:center; border:2px solid #a78bfa; border-radius:8px; padding:3px; font-weight:700; font-size:.95rem; font-family:'Nunito',sans-serif; }

    .log-item { padding:5px 10px; border-radius:8px; font-size:.8rem; font-weight:600; background:#f8f9fa; border-left:3px solid #a78bfa; margin-bottom:3px; }

    /* ===== イベント画面 ===== */
    .event-bg { min-height:100vh; background:rgba(0,0,0,.88); backdrop-filter:blur(10px); display:flex; align-items:center; justify-content:center; }
    .event-card-display { border-radius:24px; padding:32px 28px; text-align:center; animation:pop .45s ease-out; }
    .event-card-display.luck   { background:linear-gradient(135deg,#4CAF50,#8BC34A); color:white; }
    .event-card-display.bad    { background:linear-gradient(135deg,#f44336,#FF5722); color:white; }
    .event-card-display.chance { background:linear-gradient(135deg,#FF9800,#FFB300); color:white; }

    /* ===== 結果画面 ===== */
    .result-bg { min-height:100vh; background:linear-gradient(160deg,#1a1a2e,#16213e); display:flex; align-items:center; justify-content:center; padding:16px; }

    .rank-gold   { background:linear-gradient(135deg,#FFD700,#FFA000); }
    .rank-silver { background:linear-gradient(135deg,#B0BEC5,#78909C); }
    .rank-bronze { background:linear-gradient(135deg,#CD7F32,#8D4004); }

    /* ===== モーダル ===== */
    .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.72); z-index:1000; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(5px); }
    .modal-box { background:white; border-radius:24px; padding:28px; max-width:480px; width:92%; animation:pop .38s ease-out; max-height:92vh; overflow-y:auto; }

    /* ===== チュートリアル ===== */
    .tut-step { display:none; }
    .tut-step.active { display:block; animation:fadeInUp .4s ease-out; }

    /* ===== スクロールバー ===== */
    ::-webkit-scrollbar { width:6px; }
    ::-webkit-scrollbar-track { background:#f0f0f0; border-radius:10px; }
    ::-webkit-scrollbar-thumb { background:#a78bfa; border-radius:10px; }

    @media (max-width:640px) {
      .pass-card { padding:32px 20px; }
    }
  </style>
</head>
<body>

<!-- コインエリア -->
<div id="coinArea"></div>

<!-- ======================================================
     画面①：タイトル
     ====================================================== -->
<div id="screen-title" class="screen active">
  <div class="title-bg" id="titleBg">
    <div id="stars"></div>
    <div class="text-center z-10 relative px-4">
      <div class="float mb-4" style="font-size:5rem;filter:drop-shadow(0 0 24px gold)">💰</div>
      <h1 style="font-size:clamp(2rem,8vw,3.8rem);font-weight:900;color:white;text-shadow:0 0 30px rgba(255,215,0,.8);line-height:1.15" class="mb-2">
        もしもし投資ランド！
      </h1>
      <p style="color:#a0c4ff;font-size:1.05rem;font-weight:700" class="mb-8">
        🎮 お金を増やして一番のお金持ちになろう！
      </p>
      <div class="flex flex-col gap-3 items-center max-w-xs mx-auto">
        <button class="btn btn-primary w-full text-xl py-4 glow" onclick="showScreen('setup')">🚀 ゲームスタート！</button>
        <button class="btn btn-gold    w-full text-lg py-3"       onclick="showTutorial()">📖 あそびかたを見る</button>
        <button class="btn btn-sky     w-full text-lg py-3"       onclick="showGlossary()">📚 用語じてん</button>
      </div>
      <div class="mt-8 flex gap-5 justify-center flex-wrap" style="color:#a0c4ff;font-size:.82rem;font-weight:700">
        <span>👶 7さいから</span><span>👨‍👩‍👧 親子で楽しめる</span><span>🎓 投資を学べる</span>
      </div>
    </div>
  </div>
</div>

<!-- ======================================================
     画面②：ゲーム設定（プレイヤー名・人数・長さ）
     ====================================================== -->
<div id="screen-setup" class="screen">
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="card p-7 max-w-lg w-full fade-in-up">
      <h2 class="text-2xl font-black text-center mb-5" style="color:#6C63FF">🎮 ゲーム設定</h2>

      <!-- プレイヤー人数 -->
      <div class="mb-4">
        <label class="block font-black text-gray-700 mb-2 text-base">👥 何人で遊ぶ？</label>
        <div class="grid grid-cols-4 gap-2" id="pcBtns">
          ${[1,2,3,4].map(n=>`
          <button onclick="selectPlayerCount(${n})" id="pc${n}"
            class="py-3 rounded-xl font-black text-lg border-3 transition-all"
            style="border:3px solid ${n===2?'#6C63FF':'#ddd'};background:${n===2?'#F3F0FF':'white'};color:${n===2?'#6C63FF':'#666'}">
            ${n}人
          </button>`).join('')}
        </div>
      </div>

      <!-- プレイヤー名入力 -->
      <div class="mb-5" id="playerNamesArea">
        <label class="block font-black text-gray-700 mb-2 text-base">✏️ プレイヤーの名前・種類</label>
        <div id="playerRowList">
          <!-- JSで生成 -->
        </div>
        <p class="text-xs text-gray-500 font-semibold mt-1">💡「人間」は画面を交代して操作、「AI」はコンピューターが自動で遊ぶよ</p>
      </div>

      <!-- ゲーム長さ -->
      <div class="mb-5">
        <label class="block font-black text-gray-700 mb-2 text-base">⏱️ ゲームの長さ</label>
        <div class="grid grid-cols-3 gap-2">
          ${[
            {turns:6,  label:'短い',   sub:'6ターン',  emoji:'⚡'},
            {turns:10, label:'ふつう', sub:'10ターン', emoji:'🎮'},
            {turns:15, label:'長い',   sub:'15ターン', emoji:'🏆'},
          ].map((g,i)=>`
          <button onclick="selectGameLength(${g.turns})" id="gl${g.turns}"
            class="game-length-btn py-3 rounded-xl font-black text-sm border-3 transition-all"
            style="border:3px solid ${i===1?'#6C63FF':'#ddd'};background:${i===1?'#F3F0FF':'white'};color:${i===1?'#6C63FF':'#666'}">
            ${g.emoji}<br>${g.label}<br><span style="font-size:.72rem">${g.sub}</span>
          </button>`).join('')}
        </div>
      </div>

      <div class="flex gap-3">
        <button class="btn btn-primary flex-1 text-lg py-3" onclick="startGame()">🚀 スタート！</button>
        <button class="btn btn-outline px-6 py-3" onclick="showScreen('title')">← もどる</button>
      </div>
    </div>
  </div>
</div>

<!-- ======================================================
     画面③：パス画面（画面を隠して次のプレイヤーへ渡す）
     ====================================================== -->
<div id="screen-pass" class="screen">
  <div class="pass-screen" id="passScreenBg">
    <div id="passStars"></div>
    <div class="pass-card z-10 relative">
      <div style="font-size:4.5rem" class="bounce mb-3" id="passEmoji">🙈</div>
      <h2 style="font-size:1.6rem;font-weight:900;color:white" class="mb-2" id="passTitle">画面を隠してね！</h2>
      <p style="color:#93c5fd;font-weight:700;font-size:1rem;line-height:1.6" class="mb-6" id="passDesc">
        次のプレイヤーに端末を渡してください
      </p>

      <!-- 次のプレイヤー名 -->
      <div style="background:rgba(255,255,255,.12);border-radius:16px;padding:16px 20px" class="mb-6">
        <div style="color:#fbbf24;font-size:.85rem;font-weight:800" class="mb-1">つぎのプレイヤー</div>
        <div style="color:white;font-size:2rem;font-weight:900" id="passNextName">－</div>
      </div>

      <button class="btn btn-primary w-full text-lg py-4 heartbeat" id="passReadyBtn" onclick="onPassReady()">
        ✅ 準備できた！スタート
      </button>
      <p style="color:#6b7280;font-size:.78rem;margin-top:10px;font-weight:600">
        ※ ボタンを押すまで前のプレイヤーの情報は見えません
      </p>
    </div>
  </div>
</div>

<!-- ======================================================
     画面④：メインゲーム
     ====================================================== -->
<div id="screen-game" class="screen">
  <div class="game-bg">

    <!-- ヘッダー -->
    <div class="card p-3 mb-3">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-xl font-black" style="color:#6C63FF">💰 投資ランド</span>
          <div class="bg-purple-100 rounded-full px-3 py-1">
            <span class="font-bold text-purple-700 text-sm" id="turnDisplay">ターン 1/10</span>
          </div>
          <div class="bg-orange-100 rounded-full px-3 py-1" id="currentPlayerBadge">
            <span class="font-bold text-orange-700 text-sm" id="currentPlayerBadgeText">－</span>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-gold py-2 px-3 text-sm" onclick="showHelp()">❓</button>
          <button class="btn btn-outline py-2 px-3 text-sm" onclick="confirmQuit()">🚪</button>
        </div>
      </div>
      <div class="turn-bar mt-2"><div class="turn-bar-fill" id="turnProgress" style="width:10%"></div></div>
    </div>

    <div class="flex gap-3 flex-wrap lg:flex-nowrap">

      <!-- 左：プレイヤーカード＋ログ -->
      <div class="w-full lg:w-60 flex-shrink-0">
        <div id="playerCards" class="space-y-2 mb-3"></div>
        <div class="card p-3">
          <div class="font-black text-sm mb-2" style="color:#6C63FF">📜 きろく</div>
          <div id="gameLog" class="space-y-1 max-h-36 overflow-y-auto"></div>
        </div>
      </div>

      <!-- 右：メインエリア -->
      <div class="flex-1 min-w-0">

        <!-- 現在プレイヤー情報バー -->
        <div class="card p-3 mb-3">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div class="text-xs text-gray-500 font-bold">いまのプレイヤー</div>
              <div class="text-xl font-black" id="curName" style="color:#6C63FF">－</div>
            </div>
            <div class="text-center">
              <div class="text-xs text-gray-500 font-bold">現金</div>
              <div class="text-xl font-black text-green-600" id="curCash">¥0</div>
            </div>
            <div class="text-right">
              <div class="text-xs text-gray-500 font-bold">総資産</div>
              <div class="text-xl font-black" style="color:#6C63FF" id="curTotal">¥0</div>
            </div>
          </div>
        </div>

        <!-- タブ -->
        <div class="flex gap-2 mb-3 flex-wrap">
          <button class="tab-btn active" id="tab-stocks"     onclick="switchTab('stocks')">📈 株</button>
          <button class="tab-btn"        id="tab-realestate" onclick="switchTab('realestate')">🏠 不動産</button>
          <button class="tab-btn"        id="tab-portfolio"  onclick="switchTab('portfolio')">💼 持ち物</button>
          <button class="tab-btn"        id="tab-ranking"    onclick="switchTab('ranking')">🏆 順位</button>
        </div>

        <!-- 株タブ -->
        <div id="content-stocks">
          <div class="card p-4 mb-3">
            <h3 class="font-black text-base mb-3" style="color:#6C63FF">📈 株を売り買いしよう</h3>
            <div id="stockList" class="grid grid-cols-1 md:grid-cols-2 gap-3"></div>
          </div>
        </div>

        <!-- 不動産タブ -->
        <div id="content-realestate" style="display:none">
          <div class="card p-4 mb-3">
            <h3 class="font-black text-base mb-1" style="color:#4CAF50">🏠 不動産を買おう</h3>
            <p class="text-xs text-gray-500 font-semibold mb-3">毎ターン家賃が入ってくるよ！</p>
            <div id="realestateList" class="grid grid-cols-1 md:grid-cols-2 gap-3"></div>
          </div>
        </div>

        <!-- ポートフォリオタブ -->
        <div id="content-portfolio" style="display:none">
          <div class="card p-4 mb-3">
            <h3 class="font-black text-base mb-3" style="color:#FF9800">💼 持ち物一覧</h3>
            <div id="portfolioContent"></div>
          </div>
        </div>

        <!-- ランキングタブ -->
        <div id="content-ranking" style="display:none">
          <div class="card p-4 mb-3">
            <h3 class="font-black text-base mb-3" style="color:#FF9800">🏆 現在の順位</h3>
            <div id="rankingContent"></div>
          </div>
        </div>

        <!-- アクションボタン -->
        <div class="card p-3">
          <button class="btn btn-primary w-full text-base py-3" id="btnEndTurn" onclick="endTurn()">
            ⏭️ ターンを終える → イベントカード
          </button>
          <div id="actionMsg" class="text-center text-sm font-bold text-gray-400 mt-1"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ======================================================
     画面⑤：イベントカード演出
     ====================================================== -->
<div id="screen-event" class="screen">
  <div class="event-bg p-4">
    <div style="max-width:420px;width:100%;text-align:center;margin:auto">
      <h2 class="text-2xl font-black text-white mb-4">🎴 イベントカード！</h2>
      <div id="eventCardDisplay" class="event-card-display mb-6 mx-auto" style="max-width:380px"></div>
      <button class="btn btn-primary text-xl py-4 px-12" onclick="dismissEvent()">つぎへ →</button>
    </div>
  </div>
</div>

<!-- ======================================================
     画面⑥：結果発表
     ====================================================== -->
<div id="screen-result" class="screen">
  <div class="result-bg">
    <div class="card p-7 max-w-lg w-full text-center fade-in-up">
      <div style="font-size:4rem" class="bounce mb-2" id="resultTrophy">🏆</div>
      <h2 class="text-2xl font-black mb-1" style="color:#FFD700">ゲームしゅうりょう！</h2>
      <div class="text-lg font-black mb-5 text-gray-700" id="winnerAnnounce"></div>
      <div id="resultRanking" class="space-y-2 mb-5"></div>
      <div class="bg-blue-50 rounded-2xl p-4 mb-5 text-left">
        <h3 class="font-black text-blue-800 mb-2 text-sm">📚 今日学んだこと</h3>
        <div id="learningPoints" class="space-y-1 text-xs text-blue-700 font-semibold"></div>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-primary flex-1" onclick="replayGame()">🔄 もう一度！</button>
        <button class="btn btn-gold    flex-1" onclick="showScreen('title')">🏠 タイトルへ</button>
      </div>
    </div>
  </div>
</div>

<!-- ======================================================
     モーダル群
     ====================================================== -->

<!-- チュートリアル -->
<div id="tutorialModal" class="modal-overlay" style="display:none">
  <div class="modal-box">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-black" style="color:#6C63FF">📖 あそびかた</h2>
      <button onclick="closeTutorial()" class="text-gray-400 text-2xl leading-none">✕</button>
    </div>
    <div id="tutSteps">
      <div class="tut-step active" data-step="0">
        <div class="text-center mb-3"><div style="font-size:3.5rem">🎮</div><h3 class="text-lg font-black mt-1" style="color:#6C63FF">投資ランドへようこそ！</h3></div>
        <p class="text-gray-700 font-semibold mb-3 text-sm">このゲームでは<strong>投資家</strong>になってお金を増やす体験ができるよ！</p>
        <div class="bg-purple-50 rounded-xl p-3 text-sm font-black text-purple-700">🎯 目標：ゲーム終了時に一番たくさんお金を持っている人が勝ち！</div>
      </div>
      <div class="tut-step" data-step="1">
        <div class="text-center mb-3"><div style="font-size:3.5rem">📈</div><h3 class="text-lg font-black mt-1" style="color:#6C63FF">株を買おう！</h3></div>
        <p class="text-gray-700 font-semibold mb-3 text-sm"><strong>株</strong>とは会社の一部を買うこと。会社が儲かれば値段が上がってお金が増えるよ！</p>
        <div class="space-y-2 text-sm">
          <div class="bg-green-50 rounded-xl p-2 flex gap-2 items-center"><span class="text-xl">📈</span><div><div class="font-black text-green-700">株価↑のとき → 売ればお金が増える！</div></div></div>
          <div class="bg-red-50 rounded-xl p-2 flex gap-2 items-center"><span class="text-xl">📉</span><div><div class="font-black text-red-700">株価↓のとき → 我慢するか損を覚悟で売るか…</div></div></div>
        </div>
      </div>
      <div class="tut-step" data-step="2">
        <div class="text-center mb-3"><div style="font-size:3.5rem">🏠</div><h3 class="text-lg font-black mt-1" style="color:#4CAF50">不動産を買おう！</h3></div>
        <p class="text-gray-700 font-semibold mb-3 text-sm"><strong>不動産</strong>は家や土地のこと。買ったら毎ターン<strong>家賃</strong>が入ってきて安定してお金が増えるよ！</p>
        <div class="bg-green-50 rounded-xl p-3 text-sm">
          <div class="font-black text-green-700 mb-1">💡 不動産のポイント</div>
          <ul class="text-green-600 space-y-1 font-semibold"><li>✅ 毎ターン安定した家賃収入</li><li>✅ 持ち続ければ確実に回収できる</li><li>⚠️ 最初にまとまったお金が必要</li></ul>
        </div>
      </div>
      <div class="tut-step" data-step="3">
        <div class="text-center mb-3"><div style="font-size:3.5rem">🎴</div><h3 class="text-lg font-black mt-1" style="color:#FF9800">イベントカード！</h3></div>
        <p class="text-gray-700 font-semibold mb-3 text-sm">ターンを終えるとランダムにイベントが起きるよ。良いことも悪いことも！</p>
        <div class="grid grid-cols-3 gap-2 text-center text-sm">
          <div class="rounded-xl p-2" style="background:linear-gradient(135deg,#4CAF50,#8BC34A);color:white"><div class="font-black">😊 良い</div><div style="font-size:.72rem">お金が増える</div></div>
          <div class="rounded-xl p-2" style="background:linear-gradient(135deg,#f44336,#FF5722);color:white"><div class="font-black">😱 悪い</div><div style="font-size:.72rem">お金が減る</div></div>
          <div class="rounded-xl p-2" style="background:linear-gradient(135deg,#FF9800,#FFB300);color:white"><div class="font-black">🎲 チャンス</div><div style="font-size:.72rem">特別なこと</div></div>
        </div>
      </div>
      <div class="tut-step" data-step="4">
        <div class="text-center mb-3"><div style="font-size:3.5rem">🤝</div><h3 class="text-lg font-black mt-1" style="color:#6C63FF">みんなで遊ぶとき</h3></div>
        <p class="text-gray-700 font-semibold mb-3 text-sm">1台のスマホ・タブレット・パソコンで何人でも遊べるよ！</p>
        <div class="space-y-2 text-sm">
          <div class="bg-purple-50 rounded-xl p-2"><div class="font-black text-purple-700">📱 ホットシート方式</div><div class="text-purple-600 font-semibold">ターンが終わると「次の人へ渡して」画面が出るよ。前の人の情報は隠れるから安心！</div></div>
          <div class="bg-blue-50 rounded-xl p-2"><div class="font-black text-blue-700">🤖 AI と混ぜて遊べる</div><div class="text-blue-600 font-semibold">設定でプレイヤーを「AI」にすればコンピューターが自動で遊ぶよ！</div></div>
        </div>
      </div>
      <div class="tut-step" data-step="5">
        <div class="text-center mb-3"><div style="font-size:3.5rem">🏆</div><h3 class="text-lg font-black mt-1" style="color:#FFD700">勝ち方のコツ！</h3></div>
        <div class="space-y-2 text-sm">
          <div class="bg-purple-50 rounded-xl p-2"><div class="font-black text-purple-700">💡 分散投資をしよう</div><div class="text-purple-600 font-semibold">一つの株に全部かけると危ない！いろんな種類に少しずつ投資しよう</div></div>
          <div class="bg-blue-50 rounded-xl p-2"><div class="font-black text-blue-700">🏠 不動産で安定収入</div><div class="text-blue-600 font-semibold">毎ターン家賃が入る不動産は安心！</div></div>
          <div class="bg-green-50 rounded-xl p-2"><div class="font-black text-green-700">💰 余裕を持たせよう</div><div class="text-green-600 font-semibold">全部使いきると突然のイベントに対応できない！</div></div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mt-4">
      <button id="tutPrevBtn" onclick="tutNav(-1)" class="btn btn-outline py-2 px-5 text-sm" style="display:none">← まえ</button>
      <div class="flex gap-1 mx-auto" id="tutDots">
        ${[0,1,2,3,4,5].map(i=>`<div class="w-2.5 h-2.5 rounded-full transition-all" id="tutDot${i}" style="background:${i===0?'#6C63FF':'#d1d5db'}"></div>`).join('')}
      </div>
      <button id="tutNextBtn" onclick="tutNav(1)" class="btn btn-primary py-2 px-5 text-sm">つぎ →</button>
    </div>
  </div>
</div>

<!-- 用語辞典 -->
<div id="glossaryModal" class="modal-overlay" style="display:none">
  <div class="modal-box">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-black" style="color:#6C63FF">📚 投資よう語じてん</h2>
      <button onclick="closeGlossary()" class="text-gray-400 text-2xl leading-none">✕</button>
    </div>
    <div class="space-y-2 max-h-96 overflow-y-auto">
      ${[
        {term:'株（かぶ）',        emoji:'📈', desc:'会社の一部を買う権利のこと。会社が儲かれば値段が上がり、損をすれば値段が下がる。'},
        {term:'株価（かぶか）',    emoji:'💹', desc:'株の値段のこと。需要と供給で毎日変わる。'},
        {term:'投資（とうし）',    emoji:'💰', desc:'お金を使って、将来もっと多くのお金を得ようとすること。'},
        {term:'資産（しさん）',    emoji:'💎', desc:'持っているお金や財産の合計のこと。現金・株・不動産などを全部足したもの。'},
        {term:'不動産（ふどうさん）',emoji:'🏠',desc:'土地や建物のこと。買えば家賃収入が入ってくる投資先。'},
        {term:'家賃（やちん）',    emoji:'🏘️', desc:'不動産を人に貸したときにもらえるお金。毎月安定して入ってくる。'},
        {term:'分散投資',          emoji:'🎯', desc:'リスクを減らすために、いろんな種類に少しずつ分けて投資すること。'},
        {term:'リスク',            emoji:'⚠️', desc:'投資で損をする可能性のこと。リスクが高い投資は儲かるかもしれないけど、損する可能性も高い。'},
        {term:'リターン',          emoji:'🎁', desc:'投資で得られる利益のこと。リスクとリターンはセットで考えることが大切。'},
        {term:'配当（はいとう）',  emoji:'💵', desc:'会社が儲けたお金を株主（株を持っている人）に分けること。'},
        {term:'ポートフォリオ',    emoji:'💼', desc:'自分が持っている投資の組み合わせのこと。バランスよく組み合わせることが大切。'},
        {term:'流動性（りゅうどうせい）',emoji:'🌊',desc:'必要なときにすぐにお金に変えられるかどうか。現金が一番流動性が高い。'},
      ].map(g=>`
        <div class="bg-gray-50 rounded-xl p-3">
          <div class="flex items-center gap-2 mb-0.5"><span class="text-lg">${g.emoji}</span><span class="font-black text-gray-800 text-sm">${g.term}</span></div>
          <p class="text-xs text-gray-600 font-semibold">${g.desc}</p>
        </div>`).join('')}
    </div>
    <button onclick="closeGlossary()" class="btn btn-primary w-full mt-4">とじる</button>
  </div>
</div>

<!-- ヘルプ -->
<div id="helpModal" class="modal-overlay" style="display:none">
  <div class="modal-box">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-black" style="color:#6C63FF">❓ 操作方法</h2>
      <button onclick="closeHelp()" class="text-gray-400 text-2xl leading-none">✕</button>
    </div>
    <div class="space-y-2 text-sm">
      <div class="bg-purple-50 rounded-xl p-3"><div class="font-black text-purple-700">📈 株タブ</div><div class="text-gray-600 font-semibold">株を買ったり売ったりできるよ。数量を入れてボタンを押してね！</div></div>
      <div class="bg-green-50 rounded-xl p-3"><div class="font-black text-green-700">🏠 不動産タブ</div><div class="text-gray-600 font-semibold">不動産を購入できるよ。毎ターン家賃が入ってくる！</div></div>
      <div class="bg-orange-50 rounded-xl p-3"><div class="font-black text-orange-700">💼 持ち物タブ</div><div class="text-gray-600 font-semibold">今持っている株や不動産の一覧を確認できるよ。</div></div>
      <div class="bg-yellow-50 rounded-xl p-3"><div class="font-black text-yellow-700">🏆 順位タブ</div><div class="text-gray-600 font-semibold">全プレイヤーの資産ランキングが見られるよ。</div></div>
      <div class="bg-blue-50 rounded-xl p-3"><div class="font-black text-blue-700">⏭️ ターンを終える</div><div class="text-gray-600 font-semibold">アクションが終わったら押してね。イベントカードが引かれるよ！</div></div>
      <div class="bg-pink-50 rounded-xl p-3"><div class="font-black text-pink-700">🤝 パス画面（複数人のとき）</div><div class="text-gray-600 font-semibold">次のプレイヤーへ端末を渡す画面が出るよ。前の人の情報は隠れているから安心！</div></div>
    </div>
    <button onclick="closeHelp()" class="btn btn-primary w-full mt-4">OK！</button>
  </div>
</div>

<!-- 購入確認 -->
<div id="confirmModal" class="modal-overlay" style="display:none">
  <div class="modal-box">
    <h3 class="text-lg font-black mb-3" id="confirmTitle"></h3>
    <div id="confirmBody" class="mb-5"></div>
    <div class="flex gap-3">
      <button class="btn btn-primary flex-1 py-3" onclick="onConfirmOk()">✅ 決定する！</button>
      <button class="btn btn-outline flex-1 py-3" onclick="closeConfirm()">キャンセル</button>
    </div>
  </div>
</div>

<script>
// ============================================================
// グローバル状態
// ============================================================
let gameState = null
let selectedPlayerCount = 2
let selectedGameLength  = 10
let tutStep = 0
let processingAction = false
let confirmCallback  = null
// 設定画面のプレイヤー設定
let playerConfigs = [
  { name:'プレイヤー1', isAI:false },
  { name:'プレイヤー2', isAI:false },
]

// ============================================================
// 画面管理
// ============================================================
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'))
  document.getElementById('screen-' + name).classList.add('active')
  window.scrollTo(0, 0)
}

// ============================================================
// タイトル：星生成
// ============================================================
function generateStars(containerId = 'stars', count = 80) {
  const c = document.getElementById(containerId)
  if (!c) return
  c.innerHTML = ''
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div')
    s.className = 'star'
    const sz = Math.random() * 3 + 1
    s.style.cssText = \`width:\${sz}px;height:\${sz}px;left:\${Math.random()*100}%;top:\${Math.random()*100}%;animation-delay:\${Math.random()*3}s;animation-duration:\${Math.random()*2+1}s;\`
    c.appendChild(s)
  }
}

// ============================================================
// 設定画面
// ============================================================
function selectPlayerCount(n) {
  selectedPlayerCount = n
  document.querySelectorAll('#pcBtns button').forEach((btn, i) => {
    const sel = i + 1 === n
    btn.style.borderColor = sel ? '#6C63FF' : '#ddd'
    btn.style.background  = sel ? '#F3F0FF' : 'white'
    btn.style.color       = sel ? '#6C63FF' : '#666'
  })
  buildPlayerRows()
}

function selectGameLength(t) {
  selectedGameLength = t
  document.querySelectorAll('.game-length-btn').forEach(btn => {
    const sel = btn.id === 'gl' + t
    btn.style.borderColor = sel ? '#6C63FF' : '#ddd'
    btn.style.background  = sel ? '#F3F0FF' : 'white'
    btn.style.color       = sel ? '#6C63FF' : '#666'
  })
}

function buildPlayerRows() {
  const n = selectedPlayerCount
  // 既存設定を保持しながら長さを調整
  while (playerConfigs.length < n) {
    const idx = playerConfigs.length + 1
    playerConfigs.push({ name:'プレイヤー' + idx, isAI: false })
  }
  playerConfigs = playerConfigs.slice(0, n)

  const container = document.getElementById('playerRowList')
  const COLORS = ['#6C63FF','#f97316','#10b981','#e11d48']
  const EMOJIS = ['👤','🎮','🌟','🔥']
  container.innerHTML = playerConfigs.map((p, i) => \`
    <div class="player-row \${p.isAI ? '' : 'human-row'}" id="pr\${i}">
      <span style="font-size:1.4rem">\${EMOJIS[i]}</span>
      <input
        type="text" maxlength="10"
        value="\${escHtml(p.name)}"
        oninput="playerConfigs[\${i}].name=this.value"
        class="flex-1 rounded-lg px-2 py-1 text-sm font-bold border-2 outline-none"
        style="border-color:\${p.isAI?'#f97316':COLORS[i]};min-width:0"
        onfocus="this.style.borderColor='#6C63FF'" onblur="this.style.borderColor=playerConfigs[\${i}].isAI?'#f97316':'\${COLORS[i]}'">
      <button
        class="player-type-btn \${p.isAI ? 'ai' : 'human'}"
        id="typeBtn\${i}"
        onclick="togglePlayerType(\${i})">
        \${p.isAI ? '🤖 AI' : '👤 人間'}
      </button>
    </div>
  \`).join('')
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}

function togglePlayerType(idx) {
  playerConfigs[idx].isAI = !playerConfigs[idx].isAI
  buildPlayerRows()
}

// ============================================================
// ゲームスタート
// ============================================================
async function startGame() {
  // 名前を input から取得（直接編集対応）
  const inputs = document.querySelectorAll('#playerRowList input')
  inputs.forEach((inp, i) => {
    if (playerConfigs[i]) playerConfigs[i].name = inp.value.trim() || ('プレイヤー'+(i+1))
  })

  showScreen('game')
  setActionMsg('⌛ ゲームを準備中...')

  try {
    const res = await fetch('/api/game/start', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ players: playerConfigs, maxTurns: selectedGameLength })
    })
    const data = await res.json()
    if (data.success) {
      gameState = data.state
      renderGame()
      setActionMsg('')
      spawnCoins(5)
    }
  } catch(e) {
    setActionMsg('❌ エラーが発生しました')
  }
}

// もう一度ボタン（設定を保持して再スタート）
async function replayGame() {
  showScreen('setup')
  buildPlayerRows()
}

// ============================================================
// パス画面（ホットシート引き継ぎ）
// ============================================================
function showPassScreen(nextPlayerIdx) {
  const p = gameState.players[nextPlayerIdx]
  document.getElementById('passNextName').textContent = (p.isAI ? '🤖' : '👤') + ' ' + p.name
  document.getElementById('passTitle').textContent = p.isAI ? '🤖 AI のターンです' : '📱 端末を渡してね！'
  document.getElementById('passDesc').textContent  = p.isAI
    ? 'AIが自動でプレイします。次へを押してください。'
    : \`「\${p.name}」さん、端末を受け取ったら準備OKボタンを押してね！前の人の情報は見えないよ 👀\`
  document.getElementById('passEmoji').textContent = p.isAI ? '🤖' : '🙈'
  document.getElementById('passReadyBtn').textContent = p.isAI ? '▶️ AI のターンを見る' : '✅ 準備できた！スタート'
  generateStars('passStars', 60)
  showScreen('pass')
}

function onPassReady() {
  // パス後はゲーム画面に戻って renderGame
  showScreen('game')
  renderGame()
}

// ============================================================
// ゲーム描画
// ============================================================
function renderGame() {
  if (!gameState) return
  const s  = gameState
  const cp = s.players[s.currentPlayer]

  // ヘッダー
  document.getElementById('turnDisplay').textContent = \`ターン \${s.turn}/\${s.maxTurns}\`
  const pct = Math.min(100, Math.round(s.turn / s.maxTurns * 100))
  document.getElementById('turnProgress').style.width = pct + '%'
  document.getElementById('currentPlayerBadgeText').textContent =
    (cp.isAI ? '🤖' : '👤') + ' ' + cp.name + ' のターン'

  // 現在プレイヤー情報バー
  document.getElementById('curName').textContent  = (cp.isAI ? '🤖 ' : '👤 ') + cp.name
  document.getElementById('curCash').textContent  = '¥' + cp.cash.toLocaleString()
  document.getElementById('curTotal').textContent = '¥' + cp.totalAssets.toLocaleString()

  renderPlayerCards()
  renderStocks()
  renderRealEstate()
  renderPortfolio()
  renderRanking()
  renderLog()

  // AI ターンなら操作不可
  const isHumanTurn = !cp.isAI
  document.getElementById('btnEndTurn').disabled = !isHumanTurn || processingAction
  if (!isHumanTurn) setActionMsg('🤖 AI のターンです…')
  else setActionMsg('')
}

// ============================================================
// プレイヤーカード
// ============================================================
function renderPlayerCards() {
  const s = gameState
  const maxA = Math.max(...s.players.map(p => p.totalAssets), 1)
  document.getElementById('playerCards').innerHTML = s.players.map((p, i) => {
    const active  = i === s.currentPlayer
    const bgClass = p.isAI ? 'ai-bg' : 'human-bg'
    const pct = Math.round(p.totalAssets / maxA * 100)
    return \`
    <div class="player-info-card \${bgClass} \${active ? 'active' : ''}">
      <div class="flex items-center gap-2 mb-0.5">
        <span>\${p.isAI ? '🤖' : '👤'}</span>
        <span class="font-black text-sm flex-1 truncate">\${escHtml(p.name)}</span>
        \${active ? '<span class="text-xs bg-yellow-400 text-yellow-900 px-2 rounded-full font-black">NOW</span>' : ''}
      </div>
      <div class="text-xs text-gray-600 font-bold">💰 ¥\${p.cash.toLocaleString()}</div>
      <div class="text-xs font-black" style="color:#6C63FF">総資産 ¥\${p.totalAssets.toLocaleString()}</div>
      <div class="asset-bar"><div class="asset-bar-fill" style="width:\${pct}%"></div></div>
    </div>\`
  }).join('')
}

// ============================================================
// 株リスト
// ============================================================
function renderStocks() {
  const s  = gameState
  const cp = s.players[s.currentPlayer]
  const canAct = !cp.isAI && !processingAction
  document.getElementById('stockList').innerHTML = s.stockItems.map(st => {
    const price  = s.stockPrices[st.id]
    const held   = cp.stocks[st.id] || 0
    const chgPct = ((price - st.basePrice) / st.basePrice * 100).toFixed(1)
    const isUp   = price >= st.basePrice
    return \`
    <div class="stock-card">
      <div class="flex items-start gap-2 mb-2">
        <span class="text-2xl">\${st.emoji}</span>
        <div class="flex-1 min-w-0">
          <div class="font-black text-sm leading-tight">\${st.name}</div>
          <div class="text-xs text-gray-400 font-semibold truncate">\${st.desc}</div>
        </div>
        <div class="text-right flex-shrink-0">
          <div class="font-black text-sm" style="color:\${isUp?'#4CAF50':'#f44336'}">¥\${price.toLocaleString()}</div>
          <div class="text-xs font-bold \${isUp?'text-green-500':'text-red-500'}">\${isUp?'▲':'▼'}\${Math.abs(parseFloat(chgPct))}%</div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-500 font-bold flex-1">保有:<span class="text-purple-600"> \${held}株</span></span>
        <input type="number" value="1" min="1" max="99" class="qty-input" id="qty_\${st.id}">
        <button class="btn btn-success" onclick="buyStock('\${st.id}')" \${canAct && cp.cash >= price ? '' : 'disabled'}>買う</button>
        <button class="btn btn-danger"  onclick="sellStock('\${st.id}')" \${canAct && held > 0 ? '' : 'disabled'}>売る</button>
      </div>
    </div>\`
  }).join('')
}

// ============================================================
// 不動産リスト
// ============================================================
function renderRealEstate() {
  const s  = gameState
  const cp = s.players[s.currentPlayer]
  const canAct = !cp.isAI && !processingAction
  document.getElementById('realestateList').innerHTML = s.realEstates.map(re => {
    const owned = cp.realEstate.includes(re.id)
    return \`
    <div class="re-card \${owned?'owned':''}">
      <div class="flex items-start gap-2 mb-2">
        <span class="text-2xl">\${re.emoji}</span>
        <div class="flex-1"><div class="font-black text-sm">\${re.name}</div><div class="text-xs text-gray-400 font-semibold">\${re.desc}</div></div>
        \${owned ? '<div class="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-black flex-shrink-0">所有中</div>' : ''}
      </div>
      <div class="grid grid-cols-2 gap-2 text-xs font-bold mb-2">
        <div class="bg-gray-50 rounded-lg p-2"><div class="text-gray-400">購入価格</div><div>¥\${re.price.toLocaleString()}</div></div>
        <div class="bg-green-50 rounded-lg p-2"><div class="text-green-600">毎ターン</div><div class="text-green-700">+¥\${re.rentPerTurn.toLocaleString()}</div></div>
      </div>
      \${owned
        ? \`<div class="text-center text-green-600 font-black text-xs">✅ 毎ターン +¥\${re.rentPerTurn.toLocaleString()} 入ってくるよ！</div>\`
        : \`<button class="btn btn-success w-full text-sm" onclick="buyRealEstate('\${re.id}')" \${canAct && cp.cash >= re.price ? '' : 'disabled'}>🏠 ¥\${re.price.toLocaleString()} で購入</button>\`
      }
    </div>\`
  }).join('')
}

// ============================================================
// ポートフォリオ
// ============================================================
function renderPortfolio() {
  const s  = gameState
  const cp = s.players[s.currentPlayer]
  const heldSt = s.stockItems.filter(st => (cp.stocks[st.id] || 0) > 0)
  const heldRE = s.realEstates.filter(re => cp.realEstate.includes(re.id))
  let html = ''
  if (heldSt.length > 0) {
    html += '<h4 class="font-black text-gray-700 mb-2 text-sm">📈 保有株</h4><div class="space-y-2 mb-4">'
    html += heldSt.map(st => {
      const qty    = cp.stocks[st.id]
      const price  = s.stockPrices[st.id]
      const profit = (price - st.basePrice) * qty
      return \`<div class="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
        <span class="text-xl">\${st.emoji}</span>
        <div class="flex-1 min-w-0"><div class="font-black text-xs">\${st.name}</div><div class="text-xs text-gray-400 font-semibold">\${qty}株 × ¥\${price.toLocaleString()}</div></div>
        <div class="text-right"><div class="font-black text-sm">¥\${(price*qty).toLocaleString()}</div><div class="text-xs font-bold \${profit>=0?'text-green-500':'text-red-500'}">\${profit>=0?'+':''}¥\${profit.toLocaleString()}</div></div>
      </div>\`
    }).join('') + '</div>'
  }
  if (heldRE.length > 0) {
    html += '<h4 class="font-black text-gray-700 mb-2 text-sm">🏠 保有不動産</h4><div class="space-y-2">'
    html += heldRE.map(re => \`<div class="flex items-center gap-3 bg-green-50 rounded-xl p-2">
      <span class="text-xl">\${re.emoji}</span>
      <div class="flex-1 min-w-0"><div class="font-black text-xs">\${re.name}</div><div class="text-xs text-gray-400 font-semibold">購入¥\${re.price.toLocaleString()}</div></div>
      <div class="text-right"><div class="font-black text-xs text-green-600">毎ターン</div><div class="font-black text-sm text-green-700">+¥\${re.rentPerTurn.toLocaleString()}</div></div>
    </div>\`).join('') + '</div>'
  }
  if (!html) html = '<div class="text-center text-gray-400 py-8 font-bold">まだ何も持っていないよ！<br>株や不動産を買ってみよう</div>'
  document.getElementById('portfolioContent').innerHTML = html
}

// ============================================================
// ランキング
// ============================================================
function renderRanking() {
  const sorted = [...gameState.players].sort((a,b) => b.totalAssets - a.totalAssets)
  const medals = ['🥇','🥈','🥉','4️⃣']
  const rankCls = ['rank-gold','rank-silver','rank-bronze','']
  const maxA = sorted[0].totalAssets || 1
  document.getElementById('rankingContent').innerHTML = sorted.map((p, i) => {
    const pct = Math.round(p.totalAssets / maxA * 100)
    return \`<div class="flex items-center gap-3 rounded-xl p-3 mb-2 \${rankCls[i] || 'bg-gray-100'}">
      <span class="text-2xl">\${medals[i]}</span>
      <div class="flex-1 min-w-0">
        <div class="font-black text-sm \${i<3?'text-white':'text-gray-700'} truncate">\${p.isAI?'🤖':'👤'} \${escHtml(p.name)}</div>
        <div class="bg-white bg-opacity-40 rounded-full h-1.5 mt-1"><div class="bg-white rounded-full h-1.5" style="width:\${pct}%"></div></div>
      </div>
      <div class="font-black \${i<3?'text-white':'text-gray-700'} text-sm flex-shrink-0">¥\${p.totalAssets.toLocaleString()}</div>
    </div>\`
  }).join('')
}

// ============================================================
// ログ
// ============================================================
function renderLog() {
  document.getElementById('gameLog').innerHTML =
    (gameState.log || []).slice(0,12).map(l => \`<div class="log-item">\${escHtml(l)}</div>\`).join('')
}

// ============================================================
// アクション
// ============================================================
async function buyStock(stockId) {
  if (processingAction) return
  const qty   = parseInt(document.getElementById('qty_' + stockId)?.value) || 1
  const st    = gameState.stockItems.find(s => s.id === stockId)
  const price = gameState.stockPrices[stockId]
  const total = price * qty
  showConfirm('📈 株を購入しますか？',
    \`<div class="text-center"><div class="text-4xl mb-1">\${st.emoji}</div><div class="font-black">\${st.name}</div>
     <div class="text-2xl font-black text-green-600 my-2">¥\${total.toLocaleString()}</div>
     <div class="text-sm text-gray-500">\${qty}株 × ¥\${price.toLocaleString()}</div>
     <div class="text-sm font-bold text-gray-500 mt-1">手持ち ¥\${gameState.players[gameState.currentPlayer].cash.toLocaleString()}</div></div>\`,
    () => doAction({ type:'buy_stock', stockId, qty }),
    '📈 買う！'
  )
}

async function sellStock(stockId) {
  if (processingAction) return
  const qty   = parseInt(document.getElementById('qty_' + stockId)?.value) || 1
  const st    = gameState.stockItems.find(s => s.id === stockId)
  const price = gameState.stockPrices[stockId]
  const total = price * qty
  showConfirm('📉 株を売却しますか？',
    \`<div class="text-center"><div class="text-4xl mb-1">\${st.emoji}</div><div class="font-black">\${st.name}</div>
     <div class="text-2xl font-black text-blue-600 my-2">+¥\${total.toLocaleString()}</div>
     <div class="text-sm text-gray-500">\${qty}株 × ¥\${price.toLocaleString()}</div></div>\`,
    () => doAction({ type:'sell_stock', stockId, qty }),
    '📉 売る！'
  )
}

async function buyRealEstate(reId) {
  if (processingAction) return
  const re = gameState.realEstates.find(r => r.id === reId)
  showConfirm('🏠 不動産を購入しますか？',
    \`<div class="text-center"><div class="text-4xl mb-1">\${re.emoji}</div><div class="font-black">\${re.name}</div>
     <div class="text-2xl font-black text-green-600 my-2">¥\${re.price.toLocaleString()}</div>
     <div class="bg-green-50 rounded-xl p-3 mt-2 text-left text-sm">
       <div class="font-black text-green-700">💡 購入すると…</div>
       <div class="text-green-600 font-semibold">毎ターン +¥\${re.rentPerTurn.toLocaleString()} の家賃収入！</div>
     </div></div>\`,
    () => doAction({ type:'buy_realestate', reId }),
    '🏠 購入する！'
  )
}

async function doAction(action) {
  processingAction = true
  setActionMsg('⌛ 処理中...')
  try {
    const res  = await fetch('/api/game/action', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ state:gameState, action })
    })
    const data = await res.json()
    if (data.success) {
      gameState = data.state
      renderGame()
      spawnCoins(3)
    } else {
      showToast('❌ ' + (data.error || 'エラー'), 'error')
    }
  } catch(e) { showToast('❌ 通信エラー','error') }
  finally { processingAction = false; setActionMsg('') }
}

// ============================================================
// ターン終了 → イベントカード → パス or 結果
// ============================================================
async function endTurn() {
  if (processingAction || gameState.players[gameState.currentPlayer].isAI) return
  processingAction = true
  setActionMsg('⌛ ターン終了中...')
  document.getElementById('btnEndTurn').disabled = true

  try {
    const res  = await fetch('/api/game/next-turn', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ state:gameState })
    })
    const data = await res.json()
    if (data.success) {
      gameState = data.state

      if (gameState.lastEvent) {
        // まずイベントカード画面を表示
        showEventCard(gameState.lastEvent)
      } else if (gameState.gameOver) {
        showResult()
      } else {
        afterEvent()
      }
    }
  } catch(e) { showToast('❌ 通信エラー','error') }
  finally { processingAction = false; setActionMsg('') }
}

// イベントカード表示
function showEventCard(ev) {
  showScreen('event')
  const typeMap = { luck:'luck', bad:'bad', chance:'chance' }
  document.getElementById('eventCardDisplay').className =
    'event-card-display mx-auto ' + (typeMap[ev.type] || 'chance')
  document.getElementById('eventCardDisplay').innerHTML = \`
    <div style="font-size:4.5rem" class="bounce mb-2">\${ev.emoji}</div>
    <h3 class="text-2xl font-black mb-2">\${escHtml(ev.title)}</h3>
    <p class="text-base font-bold mb-3 opacity-90">\${escHtml(ev.desc)}</p>
    \${ev.effect !== 0 ? \`<div style="background:rgba(255,255,255,.3);border-radius:16px;padding:10px 20px;display:inline-block">
      <div class="text-3xl font-black">\${ev.effect>0?'+':''}¥\${ev.effect.toLocaleString()}</div>
    </div>\` : ''}
  \`
  if (ev.effect > 0) spawnCoins(8)
}

// イベント画面「つぎへ」
function dismissEvent() {
  gameState.lastEvent = null
  if (gameState.gameOver) {
    showResult()
  } else {
    afterEvent()
  }
}

// イベント後の処理：パス画面 or そのままゲーム
function afterEvent() {
  if (gameState.needsHandoff && gameState.handoffTo !== null) {
    // 人間プレイヤーへの引き継ぎが必要
    showPassScreen(gameState.handoffTo)
  } else {
    // AI ターンが続くかゲーム画面へ
    showScreen('game')
    renderGame()
  }
}

// ============================================================
// 結果発表
// ============================================================
function showResult() {
  showScreen('result')
  const s      = gameState
  const sorted = [...s.players].sort((a,b) => b.totalAssets - a.totalAssets)
  const winner = sorted[0]
  const medals = ['🥇','🥈','🥉','4️⃣']
  const rnkCls = ['rank-gold','rank-silver','rank-bronze','bg-gray-100']

  document.getElementById('winnerAnnounce').textContent =
    \`🎊 \${winner.name} の勝ち！総資産 ¥\${winner.totalAssets.toLocaleString()}\`
  document.getElementById('resultRanking').innerHTML = sorted.map((p,i) => \`
    <div class="flex items-center gap-3 rounded-2xl p-3 \${rnkCls[i]}">
      <span class="text-2xl">\${medals[i]}</span>
      <div class="flex-1 font-black text-sm \${i<3?'text-white':'text-gray-700'} truncate">\${p.isAI?'🤖':'👤'} \${escHtml(p.name)}</div>
      <div class="font-black text-sm \${i<3?'text-white':'text-gray-700'}">¥\${p.totalAssets.toLocaleString()}</div>
    </div>\`).join('')

  document.getElementById('learningPoints').innerHTML = [
    '💡 株は会社の一部を買うこと。会社が儲かると値段が上がるよ！',
    '🏠 不動産は毎ターン安定した家賃収入をもたらすよ！',
    '🎯 分散投資でリスクを分散させることが大切！',
    '💰 手持ちの現金も大切に！いざというときのために残しておこう',
    '📈 長期的な目線で投資することが成功の秘訣！',
  ].map(t => \`<div>\${t}</div>\`).join('')

  spawnCoins(18)
}

// ============================================================
// タブ切替
// ============================================================
function switchTab(tab) {
  ['stocks','realestate','portfolio','ranking'].forEach(t => {
    document.getElementById('tab-'+t).classList.toggle('active', t===tab)
    document.getElementById('content-'+t).style.display = t===tab ? 'block' : 'none'
  })
  if (tab === 'portfolio') renderPortfolio()
  if (tab === 'ranking')   renderRanking()
}

// ============================================================
// コインエフェクト
// ============================================================
function spawnCoins(count) {
  const coins = ['💰','🪙','💵','⭐','✨','💫']
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div')
      el.className = 'coin-particle'
      el.textContent = coins[Math.floor(Math.random() * coins.length)]
      el.style.cssText = \`left:\${Math.random()*100}%;top:-40px;font-size:\${Math.random()*1.4+.8}rem;animation-duration:\${Math.random()*.8+1}s;\`
      document.getElementById('coinArea').appendChild(el)
      setTimeout(() => el.remove(), 2000)
    }, i * 140)
  }
}

// ============================================================
// トースト
// ============================================================
function showToast(msg, type='info') {
  const el = document.createElement('div')
  el.style.cssText = \`position:fixed;bottom:20px;left:50%;transform:translateX(-50%);
    background:\${type==='error'?'#f44336':'#4CAF50'};color:white;padding:10px 22px;
    border-radius:50px;font-weight:800;font-size:.95rem;z-index:9999;
    box-shadow:0 4px 20px rgba(0,0,0,.3);animation:fadeInUp .3s ease-out;\`
  el.textContent = msg
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 2800)
}

// ============================================================
// アクションメッセージ
// ============================================================
function setActionMsg(msg) {
  const el = document.getElementById('actionMsg')
  if (el) el.textContent = msg
}

// ============================================================
// 確認モーダル
// ============================================================
function showConfirm(title, body, onOk, okLabel) {
  confirmCallback = onOk
  document.getElementById('confirmTitle').textContent = title
  document.getElementById('confirmBody').innerHTML    = body
  // OK ボタンのラベルを動的に変更
  const okBtn = document.querySelector('#confirmModal .btn-primary')
  if (okBtn) okBtn.textContent = okLabel || '✅ 決定する！'
  document.getElementById('confirmModal').style.display = 'flex'
}
function closeConfirm() {
  document.getElementById('confirmModal').style.display = 'none'
  confirmCallback = null
}
function onConfirmOk() {
  const cb = confirmCallback
  closeConfirm()
  if (cb) cb()
}

// ============================================================
// チュートリアル
// ============================================================
const TUT_MAX = 5
function showTutorial() {
  tutStep = 0
  updateTutorial()
  document.getElementById('tutorialModal').style.display = 'flex'
}
function closeTutorial() { document.getElementById('tutorialModal').style.display = 'none' }
function tutNav(dir) { tutStep = Math.max(0, Math.min(TUT_MAX, tutStep + dir)); updateTutorial() }
function updateTutorial() {
  document.querySelectorAll('.tut-step').forEach((s,i) => s.classList.toggle('active', i===tutStep))
  for (let i=0;i<=TUT_MAX;i++) {
    const d = document.getElementById('tutDot'+i)
    if (d) d.style.background = i===tutStep ? '#6C63FF' : '#d1d5db'
  }
  document.getElementById('tutPrevBtn').style.display = tutStep>0?'inline-block':'none'
  const nxt = document.getElementById('tutNextBtn')
  if (tutStep >= TUT_MAX) {
    nxt.textContent = '✅ さあ遊ぼう！'
    nxt.onclick = () => { closeTutorial(); showScreen('setup'); buildPlayerRows() }
  } else {
    nxt.textContent = 'つぎ →'
    nxt.onclick = () => tutNav(1)
  }
}

// ============================================================
// 用語辞典
// ============================================================
function showGlossary()  { document.getElementById('glossaryModal').style.display = 'flex' }
function closeGlossary() { document.getElementById('glossaryModal').style.display = 'none' }

// ============================================================
// ヘルプ
// ============================================================
function showHelp()  { document.getElementById('helpModal').style.display = 'flex' }
function closeHelp() { document.getElementById('helpModal').style.display = 'none' }

// ============================================================
// ゲーム終了確認
// ============================================================
function confirmQuit() {
  if (confirm('ゲームをやめますか？進行状況は保存されません。')) showScreen('title')
}

// ============================================================
// 初期化
// ============================================================
window.onload = () => {
  generateStars('stars', 80)
  buildPlayerRows()
  showScreen('title')
}
</script>
</body>
</html>`
}
