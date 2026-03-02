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
    * { font-family: 'Nunito', sans-serif; }
    
    :root {
      --color-primary: #6C63FF;
      --color-secondary: #FF6584;
      --color-accent: #FFD700;
      --color-success: #4CAF50;
      --color-danger: #f44336;
    }

    body {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      min-height: 100vh;
    }

    .game-card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .game-card:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.2); }

    .btn-primary {
      background: linear-gradient(135deg, #6C63FF, #9B59B6);
      color: white;
      border-radius: 50px;
      font-weight: 800;
      padding: 12px 28px;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.2s;
      box-shadow: 0 4px 15px rgba(108,99,255,0.4);
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(108,99,255,0.5); }
    .btn-primary:active { transform: translateY(0); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    .btn-success {
      background: linear-gradient(135deg, #4CAF50, #2E7D32);
      color: white;
      border-radius: 50px;
      font-weight: 800;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s;
      box-shadow: 0 4px 12px rgba(76,175,80,0.4);
    }
    .btn-success:hover { transform: translateY(-2px); }
    .btn-success:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    .btn-danger {
      background: linear-gradient(135deg, #FF6584, #f44336);
      color: white;
      border-radius: 50px;
      font-weight: 800;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s;
      box-shadow: 0 4px 12px rgba(244,67,54,0.4);
    }
    .btn-danger:hover { transform: translateY(-2px); }
    .btn-danger:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    .btn-gold {
      background: linear-gradient(135deg, #FFD700, #FF8C00);
      color: #333;
      border-radius: 50px;
      font-weight: 800;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s;
      box-shadow: 0 4px 12px rgba(255,215,0,0.5);
    }
    .btn-gold:hover { transform: translateY(-2px); }
    .btn-gold:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    .btn-sky {
      background: linear-gradient(135deg, #00BCD4, #0097A7);
      color: white;
      border-radius: 50px;
      font-weight: 800;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s;
    }
    .btn-sky:hover { transform: translateY(-2px); }
    .btn-sky:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pop {
      0% { transform: scale(0.5); opacity: 0; }
      70% { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      75% { transform: translateX(8px); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 10px rgba(108,99,255,0.4); }
      50% { box-shadow: 0 0 25px rgba(108,99,255,0.8), 0 0 50px rgba(108,99,255,0.4); }
    }
    @keyframes coinFall {
      0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(-2deg); }
      50% { transform: translateY(-10px) rotate(2deg); }
    }
    @keyframes pulse-ring {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(2); opacity: 0; }
    }

    .bounce { animation: bounce 1s infinite; }
    .pop { animation: pop 0.5s ease-out; }
    .shake { animation: shake 0.5s ease-out; }
    .fade-in-up { animation: fadeInUp 0.5s ease-out; }
    .float { animation: float 3s ease-in-out infinite; }
    .glow { animation: glow 2s infinite; }

    .coin-particle {
      position: fixed;
      font-size: 2rem;
      pointer-events: none;
      z-index: 9999;
      animation: coinFall 1.5s ease-in forwards;
    }

    .screen { display: none; }
    .screen.active { display: block; }

    /* タイトル画面 */
    .title-bg {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .star {
      position: absolute;
      background: white;
      border-radius: 50%;
      animation: twinkle 2s infinite;
    }
    @keyframes twinkle {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(0.5); }
    }

    /* プレイヤーカード */
    .player-card {
      border-radius: 16px;
      padding: 12px;
      border: 3px solid transparent;
      transition: all 0.3s;
    }
    .player-card.active {
      border-color: #FFD700;
      box-shadow: 0 0 20px rgba(255,215,0,0.5);
      animation: glow 2s infinite;
    }
    .player-card.human { background: linear-gradient(135deg, #E3F2FD, #BBDEFB); }
    .player-card.ai { background: linear-gradient(135deg, #F3E5F5, #E1BEE7); }

    /* 株カード */
    .stock-card {
      background: white;
      border-radius: 16px;
      padding: 14px;
      border: 2px solid #e0e0e0;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      overflow: hidden;
    }
    .stock-card:hover { border-color: #6C63FF; transform: translateY(-3px); }
    .stock-card.selected { border-color: #6C63FF; background: #F3F0FF; }

    /* 不動産カード */
    .realestate-card {
      background: white;
      border-radius: 16px;
      padding: 14px;
      border: 2px solid #e0e0e0;
      cursor: pointer;
      transition: all 0.2s;
    }
    .realestate-card:hover { border-color: #4CAF50; transform: translateY(-3px); }
    .realestate-card.owned { border-color: #4CAF50; background: #F1F8E9; cursor: default; }

    /* イベントカード */
    .event-card {
      border-radius: 20px;
      padding: 24px;
      text-align: center;
      animation: pop 0.5s ease-out;
      position: relative;
      overflow: hidden;
    }
    .event-card.luck { background: linear-gradient(135deg, #4CAF50, #8BC34A); color: white; }
    .event-card.bad { background: linear-gradient(135deg, #f44336, #FF5722); color: white; }
    .event-card.chance { background: linear-gradient(135deg, #FF9800, #FFB300); color: white; }

    /* ログ */
    .log-item {
      padding: 6px 12px;
      border-radius: 10px;
      margin-bottom: 4px;
      font-size: 0.85rem;
      font-weight: 600;
      background: #f8f9fa;
      border-left: 4px solid #6C63FF;
    }

    /* ターンプログレス */
    .turn-progress {
      background: #e0e0e0;
      border-radius: 50px;
      height: 12px;
      overflow: hidden;
    }
    .turn-progress-bar {
      background: linear-gradient(135deg, #6C63FF, #9B59B6);
      height: 100%;
      border-radius: 50px;
      transition: width 0.5s ease;
    }

    /* モーダル */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.7);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(4px);
    }
    .modal-content {
      background: white;
      border-radius: 24px;
      padding: 32px;
      max-width: 500px;
      width: 90%;
      animation: pop 0.4s ease-out;
      max-height: 90vh;
      overflow-y: auto;
    }

    /* チュートリアル */
    .tutorial-step {
      display: none;
    }
    .tutorial-step.active {
      display: block;
      animation: fadeInUp 0.4s ease-out;
    }

    /* ランキング */
    .rank-1 { background: linear-gradient(135deg, #FFD700, #FFA000); }
    .rank-2 { background: linear-gradient(135deg, #B0BEC5, #78909C); }
    .rank-3 { background: linear-gradient(135deg, #CD7F32, #8D4004); }

    /* スクロールバー */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
    ::-webkit-scrollbar-thumb { background: #6C63FF; border-radius: 10px; }

    /* タブ */
    .tab-btn {
      padding: 8px 16px;
      border-radius: 50px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      border: 2px solid #e0e0e0;
      font-size: 0.85rem;
    }
    .tab-btn.active {
      background: #6C63FF;
      color: white;
      border-color: #6C63FF;
    }

    /* レスポンシブ */
    @media (max-width: 768px) {
      .game-board { flex-direction: column; }
      .sidebar { width: 100% !important; }
    }

    .asset-bar {
      height: 8px;
      border-radius: 50px;
      background: #e0e0e0;
      overflow: hidden;
      margin-top: 4px;
    }
    .asset-bar-fill {
      height: 100%;
      border-radius: 50px;
      background: linear-gradient(135deg, #6C63FF, #9B59B6);
      transition: width 0.8s ease;
    }

    .quantity-input {
      width: 60px;
      text-align: center;
      border: 2px solid #6C63FF;
      border-radius: 8px;
      padding: 4px;
      font-weight: 700;
      font-size: 1rem;
    }

    .tooltip {
      position: relative;
    }
    .tooltip:hover .tooltip-text {
      display: block;
    }
    .tooltip-text {
      display: none;
      position: absolute;
      bottom: 125%;
      left: 50%;
      transform: translateX(-50%);
      background: #333;
      color: white;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 0.8rem;
      white-space: nowrap;
      z-index: 100;
    }
  </style>
</head>
<body>

<!-- ===== コイン演出エリア ===== -->
<div id="coinArea"></div>

<!-- ===== タイトル画面 ===== -->
<div id="screen-title" class="screen active">
  <div class="title-bg" id="titleBg">
    <!-- 星 -->
    <div id="stars"></div>

    <div class="text-center z-10 relative px-4">
      <div class="float mb-4">
        <div style="font-size: 5rem; filter: drop-shadow(0 0 20px gold);">💰</div>
      </div>
      <h1 style="font-size: clamp(2rem, 8vw, 4rem); font-weight: 900; color: white; text-shadow: 0 0 30px rgba(255,215,0,0.8); letter-spacing: -1px;" class="mb-2">
        もしもし投資ランド！
      </h1>
      <p style="color: #a0c4ff; font-size: 1.1rem; font-weight: 600;" class="mb-8">
        🎮 お金を増やして一番のお金持ちになろう！
      </p>

      <div class="flex flex-col gap-4 items-center max-w-sm mx-auto">
        <button class="btn-primary w-full text-xl py-4" onclick="showScreen('setup')" style="animation: glow 2s infinite;">
          🚀 ゲームスタート！
        </button>
        <button class="btn-gold w-full text-lg py-3" onclick="showTutorial()">
          📖 あそびかたを見る
        </button>
        <button class="btn-sky w-full text-lg py-3" onclick="showGlossary()">
          📚 用語じてん
        </button>
      </div>

      <div class="mt-8 flex gap-6 justify-center" style="color: #a0c4ff; font-size: 0.85rem; font-weight: 600;">
        <span>👶 7さいから</span>
        <span>👨‍👩‍👧 親子で楽しめる</span>
        <span>🎓 投資を学べる</span>
      </div>
    </div>
  </div>
</div>

<!-- ===== ゲーム設定画面 ===== -->
<div id="screen-setup" class="screen">
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="game-card p-8 max-w-md w-full fade-in-up">
      <h2 class="text-3xl font-black text-center mb-6" style="color: #6C63FF;">
        🎮 ゲーム設定
      </h2>

      <div class="mb-6">
        <label class="block font-bold text-gray-700 mb-2 text-lg">
          👤 あなたの名前
        </label>
        <input type="text" id="playerNameInput" placeholder="なまえを入れてね"
          class="w-full border-3 border-purple-300 rounded-xl p-3 text-lg font-bold"
          style="border: 3px solid #c084fc; outline: none; font-size: 1.1rem;"
          maxlength="10" value="プレイヤー1"
          onfocus="this.style.borderColor='#6C63FF'" onblur="this.style.borderColor='#c084fc'">
      </div>

      <div class="mb-6">
        <label class="block font-bold text-gray-700 mb-3 text-lg">
          👥 プレイヤーの数
        </label>
        <div class="grid grid-cols-4 gap-2">
          ${[1,2,3,4].map(n => `
          <button onclick="selectPlayerCount(${n})" id="pc${n}"
            class="player-count-btn py-3 rounded-xl font-black text-lg border-3 transition-all"
            style="border: 3px solid ${n === 2 ? '#6C63FF' : '#e0e0e0'}; background: ${n === 2 ? '#F3F0FF' : 'white'}; color: ${n === 2 ? '#6C63FF' : '#666'};">
            ${n}人
          </button>`).join('')}
        </div>
        <p class="text-sm text-gray-500 mt-2 font-semibold">※ 2人以上はコンピューターと対戦！</p>
      </div>

      <div class="mb-6">
        <label class="block font-bold text-gray-700 mb-3 text-lg">
          ⏱️ ゲームの長さ
        </label>
        <div class="grid grid-cols-3 gap-2">
          ${[
            {turns: 6, label: '短い', sub: '6ターン', emoji: '⚡'},
            {turns: 10, label: 'ふつう', sub: '10ターン', emoji: '🎮'},
            {turns: 15, label: '長い', sub: '15ターン', emoji: '🏆'}
          ].map((g, i) => `
          <button onclick="selectGameLength('${g.turns}')" id="gl${g.turns}"
            class="game-length-btn py-3 rounded-xl font-black text-sm border-3 transition-all"
            style="border: 3px solid ${i === 1 ? '#6C63FF' : '#e0e0e0'}; background: ${i === 1 ? '#F3F0FF' : 'white'}; color: ${i === 1 ? '#6C63FF' : '#666'};">
            ${g.emoji}<br>${g.label}<br><span style="font-size:0.75rem">${g.sub}</span>
          </button>`).join('')}
        </div>
      </div>

      <div class="flex gap-3">
        <button class="btn-primary flex-1 text-lg py-3" onclick="startGame()">
          🚀 スタート！
        </button>
        <button class="py-3 px-6 rounded-full font-bold text-gray-500 border-2 border-gray-300" onclick="showScreen('title')">
          ← もどる
        </button>
      </div>
    </div>
  </div>
</div>

<!-- ===== メインゲーム画面 ===== -->
<div id="screen-game" class="screen">
  <div class="min-h-screen p-3" style="background: linear-gradient(135deg, #f5f3ff 0%, #fce4ec 100%);">
    
    <!-- ヘッダー -->
    <div class="game-card p-3 mb-3">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-3">
          <span class="text-2xl font-black" style="color: #6C63FF;">💰 投資ランド</span>
          <div class="bg-purple-100 rounded-full px-3 py-1">
            <span class="font-bold text-purple-700" id="turnDisplay">ターン 1 / 10</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn-gold py-2 px-4 text-sm" onclick="showHelp()">❓ ヘルプ</button>
          <button class="py-2 px-4 rounded-full font-bold text-gray-500 border-2 border-gray-300 text-sm" onclick="confirmQuit()">🚪 やめる</button>
        </div>
      </div>
      <!-- ターン進捗 -->
      <div class="turn-progress mt-2">
        <div class="turn-progress-bar" id="turnProgress" style="width: 10%"></div>
      </div>
    </div>

    <div class="flex gap-3 flex-wrap lg:flex-nowrap">
      
      <!-- 左サイド：プレイヤー情報 -->
      <div class="w-full lg:w-64 flex-shrink-0">
        
        <!-- プレイヤーカード群 -->
        <div id="playerCards" class="space-y-2 mb-3">
          <!-- JSで動的生成 -->
        </div>

        <!-- ゲームログ -->
        <div class="game-card p-3">
          <h3 class="font-black text-sm mb-2" style="color: #6C63FF;">📜 ゲームきろく</h3>
          <div id="gameLog" class="space-y-1 max-h-36 overflow-y-auto">
          </div>
        </div>
      </div>

      <!-- メイン：アクションエリア -->
      <div class="flex-1">
        
        <!-- 現在のプレイヤー情報 -->
        <div class="game-card p-4 mb-3" id="currentPlayerInfo">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div class="text-sm text-gray-500 font-bold">いまのプレイヤー</div>
              <div class="text-2xl font-black" id="currentPlayerName" style="color: #6C63FF;">-</div>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-500 font-bold">手持ちのお金</div>
              <div class="text-2xl font-black text-green-600" id="currentPlayerCash">¥0</div>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-500 font-bold">総資産</div>
              <div class="text-2xl font-black" style="color: #6C63FF;" id="currentPlayerTotal">¥0</div>
            </div>
          </div>
        </div>

        <!-- タブ -->
        <div class="flex gap-2 mb-3 flex-wrap">
          <button class="tab-btn active" id="tab-stocks" onclick="switchTab('stocks')">📈 株</button>
          <button class="tab-btn" id="tab-realestate" onclick="switchTab('realestate')">🏠 不動産</button>
          <button class="tab-btn" id="tab-portfolio" onclick="switchTab('portfolio')">💼 ポートフォリオ</button>
          <button class="tab-btn" id="tab-ranking" onclick="switchTab('ranking')">🏆 ランキング</button>
        </div>

        <!-- 株タブ -->
        <div id="content-stocks" class="tab-content">
          <div class="game-card p-4 mb-3">
            <h3 class="font-black text-lg mb-3" style="color: #6C63FF;">📈 株を売り買いしよう</h3>
            <div id="stockList" class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <!-- JSで動的生成 -->
            </div>
          </div>
        </div>

        <!-- 不動産タブ -->
        <div id="content-realestate" class="tab-content" style="display:none;">
          <div class="game-card p-4 mb-3">
            <h3 class="font-black text-lg mb-3" style="color: #4CAF50;">🏠 不動産を買おう</h3>
            <p class="text-sm text-gray-600 font-semibold mb-3">💡 不動産を持つと毎ターン家賃が入ってくるよ！</p>
            <div id="realestateList" class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <!-- JSで動的生成 -->
            </div>
          </div>
        </div>

        <!-- ポートフォリオタブ -->
        <div id="content-portfolio" class="tab-content" style="display:none;">
          <div class="game-card p-4 mb-3">
            <h3 class="font-black text-lg mb-3" style="color: #FF9800;">💼 持ち物一覧</h3>
            <div id="portfolioContent">
              <!-- JSで動的生成 -->
            </div>
          </div>
        </div>

        <!-- ランキングタブ -->
        <div id="content-ranking" class="tab-content" style="display:none;">
          <div class="game-card p-4 mb-3">
            <h3 class="font-black text-lg mb-3" style="color: #FF9800;">🏆 資産ランキング</h3>
            <div id="rankingContent">
              <!-- JSで動的生成 -->
            </div>
          </div>
        </div>

        <!-- アクションボタン -->
        <div class="game-card p-4" id="actionArea">
          <div id="actionButtons" class="flex gap-2 flex-wrap">
            <button class="btn-primary flex-1" id="btnEndTurn" onclick="endTurn()">
              ⏭️ ターンを終える → イベントカード
            </button>
          </div>
          <div id="actionMessage" class="mt-2 text-center text-sm font-bold text-gray-500"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ===== イベントカード演出 ===== -->
<div id="screen-event" class="screen">
  <div class="min-h-screen flex items-center justify-center p-4" style="background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);">
    <div class="max-w-md w-full text-center">
      <h2 class="text-2xl font-black text-white mb-4">🎴 イベントカード！</h2>
      <div id="eventCardDisplay" class="mb-6">
        <!-- JSで動的生成 -->
      </div>
      <button class="btn-primary text-xl py-4 px-12" onclick="dismissEvent()">
        つぎへ → 
      </button>
    </div>
  </div>
</div>

<!-- ===== ゲーム結果画面 ===== -->
<div id="screen-result" class="screen">
  <div class="min-h-screen flex items-center justify-center p-4" style="background: linear-gradient(135deg, #1a1a2e, #16213e);">
    <div class="game-card p-8 max-w-lg w-full text-center fade-in-up">
      <div style="font-size: 4rem;" class="bounce mb-2" id="resultTrophy">🏆</div>
      <h2 class="text-3xl font-black mb-2" style="color: #FFD700;">ゲームしゅうりょう！</h2>
      <div id="winnerAnnounce" class="text-xl font-black mb-6 text-gray-700"></div>
      
      <div id="resultRanking" class="space-y-3 mb-6">
        <!-- JSで動的生成 -->
      </div>

      <!-- 学習ポイント -->
      <div class="bg-blue-50 rounded-2xl p-4 mb-6 text-left">
        <h3 class="font-black text-blue-800 mb-2">📚 今日学んだこと</h3>
        <div id="learningPoints" class="space-y-1 text-sm text-blue-700 font-semibold">
        </div>
      </div>

      <div class="flex gap-3">
        <button class="btn-primary flex-1" onclick="startGame()">
          🔄 もう一度！
        </button>
        <button class="btn-gold flex-1" onclick="showScreen('title')">
          🏠 タイトルに戻る
        </button>
      </div>
    </div>
  </div>
</div>

<!-- ===== チュートリアルモーダル ===== -->
<div id="tutorialModal" class="modal-overlay" style="display:none;">
  <div class="modal-content max-w-lg">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-black" style="color: #6C63FF;">📖 あそびかた</h2>
      <button onclick="closeTutorial()" class="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
    </div>

    <div id="tutorialSteps">
      <div class="tutorial-step active" data-step="0">
        <div class="text-center mb-4">
          <div style="font-size: 4rem;">🎮</div>
          <h3 class="text-xl font-black mt-2" style="color: #6C63FF;">投資ランドへようこそ！</h3>
        </div>
        <p class="text-gray-700 font-semibold mb-3">このゲームでは、みんなが<strong>投資家</strong>になって、お金を増やす体験ができるよ！</p>
        <div class="bg-purple-50 rounded-xl p-3">
          <p class="font-black text-purple-700">🎯 目標：ゲーム終了時に一番たくさんお金を持っている人が勝ち！</p>
        </div>
      </div>

      <div class="tutorial-step" data-step="1">
        <div class="text-center mb-4">
          <div style="font-size: 4rem;">📈</div>
          <h3 class="text-xl font-black mt-2" style="color: #6C63FF;">株を買おう！</h3>
        </div>
        <p class="text-gray-700 font-semibold mb-3"><strong>株（かぶ）</strong>とは、会社の一部を買うこと。会社が儲かると株の値段が上がって、お金が増えるよ！</p>
        <div class="space-y-2">
          <div class="bg-green-50 rounded-xl p-3 flex items-center gap-2">
            <span class="text-2xl">📈</span>
            <div>
              <div class="font-black text-green-700">株価が上がったとき</div>
              <div class="text-sm text-green-600">売ればお金が増える！</div>
            </div>
          </div>
          <div class="bg-red-50 rounded-xl p-3 flex items-center gap-2">
            <span class="text-2xl">📉</span>
            <div>
              <div class="font-black text-red-700">株価が下がったとき</div>
              <div class="text-sm text-red-600">我慢して持ち続けるか、損を覚悟で売るか…</div>
            </div>
          </div>
        </div>
      </div>

      <div class="tutorial-step" data-step="2">
        <div class="text-center mb-4">
          <div style="font-size: 4rem;">🏠</div>
          <h3 class="text-xl font-black mt-2" style="color: #4CAF50;">不動産を買おう！</h3>
        </div>
        <p class="text-gray-700 font-semibold mb-3"><strong>不動産（ふどうさん）</strong>は家や土地のこと。買ったら毎ターン<strong>家賃</strong>が入ってきて、安定してお金が増えるよ！</p>
        <div class="bg-green-50 rounded-xl p-4">
          <div class="font-black text-green-700 mb-1">💡 不動産のポイント</div>
          <ul class="text-sm text-green-600 space-y-1 font-semibold">
            <li>✅ 毎ターン安定して家賃が入る</li>
            <li>✅ 持っていれば確実に回収できる</li>
            <li>⚠️ 最初にまとまったお金が必要</li>
          </ul>
        </div>
      </div>

      <div class="tutorial-step" data-step="3">
        <div class="text-center mb-4">
          <div style="font-size: 4rem;">🎴</div>
          <h3 class="text-xl font-black mt-2" style="color: #FF9800;">イベントカード！</h3>
        </div>
        <p class="text-gray-700 font-semibold mb-3">ターンを終えるとランダムにイベントカードが引かれるよ。良いことも悪いことも起きる！</p>
        <div class="grid grid-cols-3 gap-2">
          <div class="rounded-xl p-2 text-center" style="background: linear-gradient(135deg, #4CAF50, #8BC34A); color: white;">
            <div class="font-black text-sm">😊 良い</div>
            <div class="text-xs">お金が増える</div>
          </div>
          <div class="rounded-xl p-2 text-center" style="background: linear-gradient(135deg, #f44336, #FF5722); color: white;">
            <div class="font-black text-sm">😱 悪い</div>
            <div class="text-xs">お金が減る</div>
          </div>
          <div class="rounded-xl p-2 text-center" style="background: linear-gradient(135deg, #FF9800, #FFB300); color: white;">
            <div class="font-black text-sm">🎲 チャンス</div>
            <div class="text-xs">特別なこと</div>
          </div>
        </div>
      </div>

      <div class="tutorial-step" data-step="4">
        <div class="text-center mb-4">
          <div style="font-size: 4rem;">🏆</div>
          <h3 class="text-xl font-black mt-2" style="color: #FFD700;">勝ち方のコツ！</h3>
        </div>
        <div class="space-y-3">
          <div class="bg-purple-50 rounded-xl p-3">
            <div class="font-black text-purple-700">💡 分散投資をしよう</div>
            <div class="text-sm text-purple-600 font-semibold">一つの株に全部かけると危ない！いろんな種類に少しずつ投資しよう</div>
          </div>
          <div class="bg-blue-50 rounded-xl p-3">
            <div class="font-black text-blue-700">🏠 不動産で安定収入</div>
            <div class="text-sm text-blue-600 font-semibold">毎ターン家賃が入る不動産は安心の投資先！</div>
          </div>
          <div class="bg-green-50 rounded-xl p-3">
            <div class="font-black text-green-700">💰 余裕を持たせよう</div>
            <div class="text-sm text-green-600 font-semibold">全部使いきると突然のイベントに対応できない！</div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mt-4">
      <button id="tutPrevBtn" onclick="tutorialNav(-1)" class="py-2 px-6 rounded-full font-bold border-2 border-gray-300 text-gray-500" style="display:none;">← まえ</button>
      <div class="flex gap-1 mx-auto" id="tutDots">
        ${[0,1,2,3,4].map(i => `<div class="w-3 h-3 rounded-full ${i === 0 ? 'bg-purple-500' : 'bg-gray-300'}" id="tutDot${i}"></div>`).join('')}
      </div>
      <button id="tutNextBtn" onclick="tutorialNav(1)" class="btn-primary py-2 px-6">つぎ →</button>
    </div>
  </div>
</div>

<!-- ===== 用語辞典モーダル ===== -->
<div id="glossaryModal" class="modal-overlay" style="display:none;">
  <div class="modal-content max-w-lg">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-black" style="color: #6C63FF;">📚 投資よう語じてん</h2>
      <button onclick="closeGlossary()" class="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
    </div>
    <div class="space-y-3 max-h-96 overflow-y-auto">
      ${[
        {term: '株（かぶ）', emoji: '📈', desc: '会社の一部を買う権利のこと。会社が儲かれば値段が上がり、損をすれば値段が下がる。'},
        {term: '株価（かぶか）', emoji: '💹', desc: '株の値段のこと。需要と供給で毎日変わる。'},
        {term: '投資（とうし）', emoji: '💰', desc: 'お金を使って、将来もっと多くのお金を得ようとすること。'},
        {term: '資産（しさん）', emoji: '💎', desc: '持っているお金や財産の合計のこと。現金・株・不動産などを全部足したもの。'},
        {term: '不動産（ふどうさん）', emoji: '🏠', desc: '土地や建物のこと。買えば家賃収入が入ってくる投資先。'},
        {term: '家賃（やちん）', emoji: '🏘️', desc: '不動産を人に貸したときにもらえるお金。毎月安定して入ってくる。'},
        {term: '分散投資（ぶんさんとうし）', emoji: '🎯', desc: 'リスクを減らすために、いろんな種類の投資先に少しずつ分けて投資すること。「たまごを一つのかごに入れるな」という格言がある。'},
        {term: 'リスク', emoji: '⚠️', desc: '投資で損をする可能性のこと。リスクが高い投資は儲かるかもしれないけど、損する可能性も高い。'},
        {term: 'リターン', emoji: '🎁', desc: '投資で得られる利益のこと。リスクとリターンはセットで考えることが大切。'},
        {term: '配当（はいとう）', emoji: '💵', desc: '会社が儲けたお金を株主（株を持っている人）に分けること。'},
        {term: 'ポートフォリオ', emoji: '💼', desc: '自分が持っている投資の組み合わせのこと。バランスよく組み合わせることが大切。'},
        {term: '流動性（りゅうどうせい）', emoji: '🌊', desc: '必要なときにすぐにお金に変えられるかどうか。現金が一番流動性が高い。'},
      ].map(g => `
        <div class="bg-gray-50 rounded-xl p-3">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xl">${g.emoji}</span>
            <span class="font-black text-gray-800">${g.term}</span>
          </div>
          <p class="text-sm text-gray-600 font-semibold">${g.desc}</p>
        </div>
      `).join('')}
    </div>
    <button onclick="closeGlossary()" class="btn-primary w-full mt-4">とじる</button>
  </div>
</div>

<!-- ===== ヘルプモーダル ===== -->
<div id="helpModal" class="modal-overlay" style="display:none;">
  <div class="modal-content">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-black" style="color: #6C63FF;">❓ ゲームの操作方法</h2>
      <button onclick="document.getElementById('helpModal').style.display='none'" class="text-gray-400 text-2xl">✕</button>
    </div>
    <div class="space-y-3">
      <div class="bg-purple-50 rounded-xl p-3">
        <div class="font-black text-purple-700">📈 株タブ</div>
        <div class="text-sm text-gray-600 font-semibold">株を買ったり売ったりできるよ。数量を選んでボタンを押してね！</div>
      </div>
      <div class="bg-green-50 rounded-xl p-3">
        <div class="font-black text-green-700">🏠 不動産タブ</div>
        <div class="text-sm text-gray-600 font-semibold">不動産を購入できるよ。持てば毎ターン家賃が入ってくる！</div>
      </div>
      <div class="bg-orange-50 rounded-xl p-3">
        <div class="font-black text-orange-700">💼 ポートフォリオタブ</div>
        <div class="text-sm text-gray-600 font-semibold">今持っている株や不動産の一覧が確認できるよ。</div>
      </div>
      <div class="bg-yellow-50 rounded-xl p-3">
        <div class="font-black text-yellow-700">🏆 ランキングタブ</div>
        <div class="text-sm text-gray-600 font-semibold">全プレイヤーの資産ランキングが見られるよ。</div>
      </div>
      <div class="bg-blue-50 rounded-xl p-3">
        <div class="font-black text-blue-700">⏭️ ターンを終える</div>
        <div class="text-sm text-gray-600 font-semibold">アクションが終わったらこのボタンを押してね。イベントカードが引かれるよ！</div>
      </div>
    </div>
    <button onclick="document.getElementById('helpModal').style.display='none'" class="btn-primary w-full mt-4">OK！</button>
  </div>
</div>

<!-- ===== 購入確認モーダル ===== -->
<div id="confirmModal" class="modal-overlay" style="display:none;">
  <div class="modal-content">
    <h3 class="text-xl font-black mb-4" id="confirmTitle"></h3>
    <div id="confirmBody" class="mb-6"></div>
    <div class="flex gap-3">
      <button class="btn-primary flex-1" id="confirmOkBtn">✅ 購入する！</button>
      <button class="flex-1 py-3 rounded-full font-bold border-2 border-gray-300 text-gray-500" onclick="closeConfirm()">キャンセル</button>
    </div>
  </div>
</div>

<script>
// ===== グローバル状態 =====
let gameState = null
let selectedPlayerCount = 2
let selectedGameLength = 10
let tutorialStep = 0
let isMyTurn = true
let processingAction = false

// ===== 画面切替 =====
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'))
  document.getElementById('screen-' + name).classList.add('active')
}

// ===== タイトル：星生成 =====
function generateStars() {
  const container = document.getElementById('stars')
  if (!container) return
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div')
    star.className = 'star'
    const size = Math.random() * 3 + 1
    star.style.cssText = \`
      width: \${size}px; height: \${size}px;
      left: \${Math.random() * 100}%;
      top: \${Math.random() * 100}%;
      animation-delay: \${Math.random() * 3}s;
      animation-duration: \${Math.random() * 2 + 1}s;
    \`
    container.appendChild(star)
  }
}

// ===== プレイヤー数選択 =====
function selectPlayerCount(n) {
  selectedPlayerCount = n
  document.querySelectorAll('.player-count-btn').forEach((btn, i) => {
    const selected = i + 1 === n
    btn.style.borderColor = selected ? '#6C63FF' : '#e0e0e0'
    btn.style.background = selected ? '#F3F0FF' : 'white'
    btn.style.color = selected ? '#6C63FF' : '#666'
  })
}

// ===== ゲーム長さ選択 =====
function selectGameLength(turns) {
  selectedGameLength = parseInt(turns)
  document.querySelectorAll('.game-length-btn').forEach(btn => {
    const selected = btn.id === 'gl' + turns
    btn.style.borderColor = selected ? '#6C63FF' : '#e0e0e0'
    btn.style.background = selected ? '#F3F0FF' : 'white'
    btn.style.color = selected ? '#6C63FF' : '#666'
  })
}

// ===== ゲームスタート =====
async function startGame() {
  const playerName = document.getElementById('playerNameInput')?.value || 'プレイヤー1'
  showScreen('game')
  setActionMessage('⌛ ゲームを準備中...')

  try {
    const res = await fetch('/api/game/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerName: playerName.trim() || 'プレイヤー1',
        playerCount: selectedPlayerCount,
        maxTurns: selectedGameLength
      })
    })
    const data = await res.json()
    if (data.success) {
      gameState = data.state
      gameState.maxTurns = selectedGameLength
      renderGame()
      setActionMessage('')
      spawnCoins(5)
    }
  } catch (e) {
    setActionMessage('❌ エラーが発生しました')
  }
}

// ===== ゲーム描画 =====
function renderGame() {
  if (!gameState) return
  const s = gameState
  const cp = s.players[s.currentPlayer]

  // ターン表示
  document.getElementById('turnDisplay').textContent = \`ターン \${s.turn} / \${s.maxTurns}\`
  const prog = (s.turn / s.maxTurns) * 100
  document.getElementById('turnProgress').style.width = prog + '%'

  // 現在プレイヤー情報
  document.getElementById('currentPlayerName').textContent = cp.isAI ? \`🤖 \${cp.name}\` : \`👤 \${cp.name}\`
  document.getElementById('currentPlayerCash').textContent = \`¥\${cp.cash.toLocaleString()}\`
  document.getElementById('currentPlayerTotal').textContent = \`¥\${cp.totalAssets.toLocaleString()}\`

  // プレイヤーカード
  renderPlayerCards()

  // 株リスト
  renderStocks()

  // 不動産リスト
  renderRealEstate()

  // ポートフォリオ
  renderPortfolio()

  // ランキング
  renderRanking()

  // ログ
  renderLog()

  // ターン制御
  isMyTurn = !cp.isAI
  document.getElementById('btnEndTurn').disabled = !isMyTurn
}

// ===== プレイヤーカード =====
function renderPlayerCards() {
  const s = gameState
  const container = document.getElementById('playerCards')
  container.innerHTML = s.players.map((p, i) => {
    const isActive = i === s.currentPlayer
    const isHuman = !p.isAI
    const maxAssets = Math.max(...s.players.map(x => x.totalAssets))
    const barWidth = maxAssets > 0 ? (p.totalAssets / maxAssets * 100) : 50
    return \`
    <div class="player-card \${isActive ? 'active' : ''} \${isHuman ? 'human' : 'ai'}">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-lg">\${isHuman ? '👤' : '🤖'}</span>
        <span class="font-black text-sm">\${p.name}</span>
        \${isActive ? '<span class="ml-auto text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-black">いまのターン</span>' : ''}
      </div>
      <div class="text-xs text-gray-600 font-bold">💰 現金: ¥\${p.cash.toLocaleString()}</div>
      <div class="text-xs font-black mt-0.5" style="color: #6C63FF;">総資産: ¥\${p.totalAssets.toLocaleString()}</div>
      <div class="asset-bar mt-1">
        <div class="asset-bar-fill" style="width: \${barWidth}%"></div>
      </div>
    </div>\`
  }).join('')
}

// ===== 株リスト =====
function renderStocks() {
  const s = gameState
  const cp = s.players[s.currentPlayer]
  const container = document.getElementById('stockList')

  container.innerHTML = s.stockItems.map(stock => {
    const price = s.stockPrices[stock.id]
    const held = cp.stocks[stock.id] || 0
    const canBuy = cp.cash >= price && isMyTurn
    const canSell = held > 0 && isMyTurn
    const priceChange = ((price - stock.basePrice) / stock.basePrice * 100).toFixed(1)
    const isUp = price >= stock.basePrice

    return \`
    <div class="stock-card">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-2xl">\${stock.emoji}</span>
        <div>
          <div class="font-black text-sm">\${stock.name}</div>
          <div class="text-xs text-gray-500 font-semibold">\${stock.desc}</div>
        </div>
        <div class="ml-auto text-right">
          <div class="font-black" style="color: \${isUp ? '#4CAF50' : '#f44336'}">¥\${price.toLocaleString()}</div>
          <div class="text-xs font-bold \${isUp ? 'text-green-500' : 'text-red-500'}">\${isUp ? '▲' : '▼'} \${Math.abs(parseFloat(priceChange))}%</div>
        </div>
      </div>
      <div class="flex items-center gap-2 mt-2">
        <div class="text-xs text-gray-500 font-bold flex-1">保有: <span class="text-purple-600">\${held}株</span></div>
        <input type="number" value="1" min="1" max="99" class="quantity-input" id="qty_\${stock.id}" style="width:50px;">
        <button class="btn-success text-xs py-1 px-3" onclick="buyStock('\${stock.id}')" \${canBuy ? '' : 'disabled'}>買う</button>
        <button class="btn-danger text-xs py-1 px-3" onclick="sellStock('\${stock.id}')" \${canSell ? '' : 'disabled'}>売る</button>
      </div>
    </div>\`
  }).join('')
}

// ===== 不動産リスト =====
function renderRealEstate() {
  const s = gameState
  const cp = s.players[s.currentPlayer]
  const container = document.getElementById('realestateList')

  container.innerHTML = s.realEstates.map(re => {
    const owned = cp.realEstate.includes(re.id)
    const canBuy = cp.cash >= re.price && !owned && isMyTurn
    const roi = ((re.rentPerTurn * s.maxTurns / re.price) * 100).toFixed(0)

    return \`
    <div class="realestate-card \${owned ? 'owned' : ''}">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-2xl">\${re.emoji}</span>
        <div>
          <div class="font-black text-sm">\${re.name}</div>
          <div class="text-xs text-gray-500 font-semibold">\${re.desc}</div>
        </div>
        \${owned ? '<div class="ml-auto bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-black">所有中</div>' : ''}
      </div>
      <div class="grid grid-cols-2 gap-2 text-xs font-bold mb-2">
        <div class="bg-gray-50 rounded-lg p-2">
          <div class="text-gray-500">購入価格</div>
          <div class="text-gray-800">¥\${re.price.toLocaleString()}</div>
        </div>
        <div class="bg-green-50 rounded-lg p-2">
          <div class="text-green-600">毎ターン家賃</div>
          <div class="text-green-700">+¥\${re.rentPerTurn.toLocaleString()}</div>
        </div>
      </div>
      \${!owned ? \`<button class="btn-success w-full text-sm" onclick="buyRealEstate('\${re.id}')" \${canBuy ? '' : 'disabled'}>🏠 ¥\${re.price.toLocaleString()} で購入する</button>\` : \`<div class="text-center text-green-600 font-black text-sm">✅ あなたの不動産です！毎ターン +¥\${re.rentPerTurn.toLocaleString()}</div>\`}
    </div>\`
  }).join('')
}

// ===== ポートフォリオ =====
function renderPortfolio() {
  const s = gameState
  const cp = s.players[s.currentPlayer]
  const container = document.getElementById('portfolioContent')

  let html = ''

  // 株
  const heldStocks = s.stockItems.filter(st => (cp.stocks[st.id] || 0) > 0)
  if (heldStocks.length > 0) {
    html += '<h4 class="font-black text-gray-700 mb-2">📈 保有株</h4><div class="space-y-2 mb-4">'
    html += heldStocks.map(st => {
      const qty = cp.stocks[st.id]
      const price = s.stockPrices[st.id]
      const value = price * qty
      const profit = (price - st.basePrice) * qty
      return \`
      <div class="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
        <span class="text-xl">\${st.emoji}</span>
        <div class="flex-1">
          <div class="font-black text-sm">\${st.name}</div>
          <div class="text-xs text-gray-500 font-bold">\${qty}株 × ¥\${price.toLocaleString()}</div>
        </div>
        <div class="text-right">
          <div class="font-black">¥\${value.toLocaleString()}</div>
          <div class="text-xs font-bold \${profit >= 0 ? 'text-green-500' : 'text-red-500'}">\${profit >= 0 ? '+' : ''}¥\${profit.toLocaleString()}</div>
        </div>
      </div>\`
    }).join('')
    html += '</div>'
  } else {
    html += '<div class="text-center text-gray-400 py-4 font-bold">株をまだ持っていないよ📈<br>株タブから購入しよう！</div>'
  }

  // 不動産
  const ownedRE = s.realEstates.filter(r => cp.realEstate.includes(r.id))
  if (ownedRE.length > 0) {
    html += '<h4 class="font-black text-gray-700 mb-2">🏠 保有不動産</h4><div class="space-y-2">'
    html += ownedRE.map(re => \`
    <div class="flex items-center gap-3 bg-green-50 rounded-xl p-3">
      <span class="text-xl">\${re.emoji}</span>
      <div class="flex-1">
        <div class="font-black text-sm">\${re.name}</div>
        <div class="text-xs text-gray-500 font-bold">購入価格 ¥\${re.price.toLocaleString()}</div>
      </div>
      <div class="text-right">
        <div class="font-black text-green-600">毎ターン</div>
        <div class="text-sm font-black text-green-700">+¥\${re.rentPerTurn.toLocaleString()}</div>
      </div>
    </div>\`).join('')
    html += '</div>'
  }

  if (heldStocks.length === 0 && ownedRE.length === 0) {
    html = '<div class="text-center text-gray-400 py-8 font-bold text-lg">まだ何も持っていないよ！<br>株や不動産を買ってみよう！</div>'
  }

  container.innerHTML = html
}

// ===== ランキング =====
function renderRanking() {
  const s = gameState
  const sorted = [...s.players].sort((a, b) => b.totalAssets - a.totalAssets)
  const container = document.getElementById('rankingContent')

  container.innerHTML = sorted.map((p, i) => {
    const medals = ['🥇', '🥈', '🥉', '4️⃣']
    const colors = ['from-yellow-400 to-orange-400', 'from-gray-300 to-gray-400', 'from-amber-600 to-amber-700', 'from-gray-100 to-gray-200']
    const maxAssets = sorted[0].totalAssets
    const barWidth = maxAssets > 0 ? (p.totalAssets / maxAssets * 100) : 0
    return \`
    <div class="rounded-xl p-3 mb-2 bg-gradient-to-r \${colors[i]}">
      <div class="flex items-center gap-3">
        <span class="text-2xl">\${medals[i]}</span>
        <div class="flex-1">
          <div class="font-black text-sm \${i < 3 ? 'text-white' : 'text-gray-700'}">\${p.isAI ? '🤖' : '👤'} \${p.name}</div>
          <div class="text-xs font-bold \${i < 3 ? 'text-white opacity-80' : 'text-gray-500'}">現金 ¥\${p.cash.toLocaleString()}</div>
          <div class="bg-white bg-opacity-40 rounded-full h-2 mt-1">
            <div class="bg-white rounded-full h-2 transition-all" style="width:\${barWidth}%"></div>
          </div>
        </div>
        <div class="font-black \${i < 3 ? 'text-white' : 'text-gray-700'}">¥\${p.totalAssets.toLocaleString()}</div>
      </div>
    </div>\`
  }).join('')
}

// ===== ログ =====
function renderLog() {
  const container = document.getElementById('gameLog')
  container.innerHTML = (gameState.log || []).slice(0, 10).map(l => \`<div class="log-item">\${l}</div>\`).join('')
}

// ===== 株購入 =====
async function buyStock(stockId) {
  if (!isMyTurn || processingAction) return
  const qty = parseInt(document.getElementById('qty_' + stockId)?.value) || 1
  const stock = gameState.stockItems.find(s => s.id === stockId)
  const price = gameState.stockPrices[stockId]
  const total = price * qty

  showConfirm(
    '📈 株を購入しますか？',
    \`<div class="text-center">
      <div class="text-4xl mb-2">\${stock.emoji}</div>
      <div class="font-black text-lg">\${stock.name}</div>
      <div class="text-2xl font-black text-green-600 my-2">¥\${total.toLocaleString()}</div>
      <div class="text-sm text-gray-500">\${qty}株 × ¥\${price.toLocaleString()}</div>
      <div class="mt-2 text-sm font-bold text-gray-600">手持ち: ¥\${gameState.players[gameState.currentPlayer].cash.toLocaleString()}</div>
    </div>\`,
    async () => {
      await doAction({ type: 'buy_stock', stockId, qty })
    }
  )
}

// ===== 株売却 =====
async function sellStock(stockId) {
  if (!isMyTurn || processingAction) return
  const qty = parseInt(document.getElementById('qty_' + stockId)?.value) || 1
  const stock = gameState.stockItems.find(s => s.id === stockId)
  const price = gameState.stockPrices[stockId]
  const total = price * qty

  showConfirm(
    '📉 株を売却しますか？',
    \`<div class="text-center">
      <div class="text-4xl mb-2">\${stock.emoji}</div>
      <div class="font-black text-lg">\${stock.name}</div>
      <div class="text-2xl font-black text-blue-600 my-2">+¥\${total.toLocaleString()}</div>
      <div class="text-sm text-gray-500">\${qty}株 × ¥\${price.toLocaleString()}</div>
    </div>\`,
    async () => {
      await doAction({ type: 'sell_stock', stockId, qty })
    }
  )
}

// ===== 不動産購入 =====
async function buyRealEstate(reId) {
  if (!isMyTurn || processingAction) return
  const re = gameState.realEstates.find(r => r.id === reId)

  showConfirm(
    '🏠 不動産を購入しますか？',
    \`<div class="text-center">
      <div class="text-4xl mb-2">\${re.emoji}</div>
      <div class="font-black text-lg">\${re.name}</div>
      <div class="text-2xl font-black text-green-600 my-2">¥\${re.price.toLocaleString()}</div>
      <div class="bg-green-50 rounded-xl p-3 mt-2 text-left">
        <div class="text-sm font-bold text-green-700">💡 購入したら...</div>
        <div class="text-sm text-green-600 font-semibold">毎ターン +¥\${re.rentPerTurn.toLocaleString()} の家賃収入！</div>
      </div>
    </div>\`,
    async () => {
      await doAction({ type: 'buy_realestate', reId })
    }
  )
}

// ===== アクション実行 =====
async function doAction(action) {
  if (processingAction) return
  processingAction = true
  setActionMessage('⌛ 処理中...')

  try {
    const res = await fetch('/api/game/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: gameState, action })
    })
    const data = await res.json()
    if (data.success) {
      gameState = data.state
      renderGame()
      spawnCoins(3)
    } else {
      showToast('❌ ' + (data.error || 'エラー'), 'error')
      document.getElementById('currentPlayerInfo').classList.add('shake')
      setTimeout(() => document.getElementById('currentPlayerInfo').classList.remove('shake'), 500)
    }
  } catch (e) {
    showToast('❌ 通信エラー', 'error')
  } finally {
    processingAction = false
    setActionMessage('')
  }
}

// ===== ターン終了 =====
async function endTurn() {
  if (!isMyTurn || processingAction) return
  processingAction = true
  setActionMessage('⌛ ターン終了中...')

  try {
    const res = await fetch('/api/game/next-turn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: gameState })
    })
    const data = await res.json()
    if (data.success) {
      gameState = data.state

      if (gameState.lastEvent) {
        showEventCard(gameState.lastEvent)
      } else if (gameState.gameOver) {
        showResult()
      } else {
        renderGame()
      }
    }
  } catch (e) {
    showToast('❌ 通信エラー', 'error')
  } finally {
    processingAction = false
    setActionMessage('')
  }
}

// ===== イベントカード表示 =====
function showEventCard(event) {
  showScreen('event')
  const container = document.getElementById('eventCardDisplay')

  const typeColors = {
    luck: 'from-green-400 to-lime-400',
    bad: 'from-red-400 to-orange-400',
    chance: 'from-yellow-400 to-orange-400'
  }

  container.innerHTML = \`
  <div class="event-card \${event.type} mx-4">
    <div style="font-size: 5rem;" class="bounce mb-3">\${event.emoji}</div>
    <h3 class="text-2xl font-black mb-2">\${event.title}</h3>
    <p class="text-lg font-bold mb-4 opacity-90">\${event.desc}</p>
    \${event.effect !== 0 ? \`
    <div class="inline-block bg-white bg-opacity-30 rounded-2xl px-6 py-3">
      <div class="text-3xl font-black">\${event.effect > 0 ? '+' : ''}¥\${event.effect.toLocaleString()}</div>
    </div>\` : ''}
  </div>\`

  if (event.effect > 0) spawnCoins(8)
}

// ===== イベント閉じる =====
function dismissEvent() {
  if (gameState.gameOver) {
    showResult()
  } else {
    showScreen('game')
    renderGame()
  }
}

// ===== 結果表示 =====
function showResult() {
  showScreen('result')
  const s = gameState
  const sorted = [...s.players].sort((a, b) => b.totalAssets - a.totalAssets)
  const winner = sorted[0]

  document.getElementById('winnerAnnounce').textContent = \`🎊 \${winner.name} の勝ち！総資産 ¥\${winner.totalAssets.toLocaleString()}\`

  const medals = ['🥇', '🥈', '🥉', '4️⃣']
  document.getElementById('resultRanking').innerHTML = sorted.map((p, i) => \`
  <div class="flex items-center gap-3 p-3 rounded-2xl \${i === 0 ? 'rank-1 text-white' : i === 1 ? 'rank-2 text-white' : i === 2 ? 'rank-3 text-white' : 'bg-gray-100'}">
    <span class="text-2xl">\${medals[i]}</span>
    <div class="flex-1 font-black">\${p.isAI ? '🤖' : '👤'} \${p.name}</div>
    <div class="font-black">¥\${p.totalAssets.toLocaleString()}</div>
  </div>\`).join('')

  // 学習ポイント
  const points = [
    '💡 株は会社の一部を買うこと。会社が儲かると値段が上がるよ！',
    '🏠 不動産は毎ターン安定した家賃収入をもたらすよ！',
    '🎯 分散投資でリスクを分散させることが大切！',
    '💰 手持ちの現金も大切に！いざというときのために残しておこう',
    '📈 長期的な目線で投資することが成功の秘訣！'
  ]
  document.getElementById('learningPoints').innerHTML = points.map(p => \`<div class="flex items-start gap-2">\${p}</div>\`).join('')

  spawnCoins(15)
}

// ===== タブ切替 =====
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'))
  document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none')
  document.getElementById('tab-' + tab).classList.add('active')
  document.getElementById('content-' + tab).style.display = 'block'

  if (tab === 'portfolio') renderPortfolio()
  if (tab === 'ranking') renderRanking()
}

// ===== コインエフェクト =====
function spawnCoins(count) {
  const area = document.getElementById('coinArea')
  const coins = ['💰', '🪙', '💵', '💴', '⭐', '✨']
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const coin = document.createElement('div')
      coin.className = 'coin-particle'
      coin.textContent = coins[Math.floor(Math.random() * coins.length)]
      coin.style.left = (Math.random() * 100) + '%'
      coin.style.animationDuration = (Math.random() * 1 + 1) + 's'
      coin.style.fontSize = (Math.random() * 1.5 + 1) + 'rem'
      area.appendChild(coin)
      setTimeout(() => coin.remove(), 2000)
    }, i * 150)
  }
}

// ===== トースト =====
function showToast(msg, type = 'info') {
  const toast = document.createElement('div')
  toast.style.cssText = \`
    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
    background: \${type === 'error' ? '#f44336' : '#4CAF50'};
    color: white; padding: 12px 24px; border-radius: 50px;
    font-weight: 800; font-size: 1rem; z-index: 9999;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    animation: fadeInUp 0.3s ease-out;
  \`
  toast.textContent = msg
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 3000)
}

// ===== アクションメッセージ =====
function setActionMessage(msg) {
  const el = document.getElementById('actionMessage')
  if (el) el.textContent = msg
}

// ===== 確認モーダル =====
let confirmCallback = null
function showConfirm(title, body, onOk) {
  confirmCallback = onOk
  document.getElementById('confirmTitle').textContent = title
  document.getElementById('confirmBody').innerHTML = body
  document.getElementById('confirmModal').style.display = 'flex'
}
function closeConfirm() {
  document.getElementById('confirmModal').style.display = 'none'
  confirmCallback = null
}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('confirmOkBtn').onclick = async () => {
    closeConfirm()
    if (confirmCallback) await confirmCallback()
  }
})

// ===== チュートリアル =====
function showTutorial() {
  tutorialStep = 0
  updateTutorial()
  document.getElementById('tutorialModal').style.display = 'flex'
}
function closeTutorial() {
  document.getElementById('tutorialModal').style.display = 'none'
}
function tutorialNav(dir) {
  tutorialStep = Math.max(0, Math.min(4, tutorialStep + dir))
  updateTutorial()
}
function updateTutorial() {
  document.querySelectorAll('.tutorial-step').forEach((s, i) => {
    s.classList.toggle('active', i === tutorialStep)
  })
  document.querySelectorAll('[id^="tutDot"]').forEach((d, i) => {
    d.style.background = i === tutorialStep ? '#6C63FF' : '#d1d5db'
  })
  document.getElementById('tutPrevBtn').style.display = tutorialStep > 0 ? 'block' : 'none'
  const nextBtn = document.getElementById('tutNextBtn')
  if (tutorialStep >= 4) {
    nextBtn.textContent = '✅ さあ遊ぼう！'
    nextBtn.onclick = () => { closeTutorial(); showScreen('setup') }
  } else {
    nextBtn.textContent = 'つぎ →'
    nextBtn.onclick = () => tutorialNav(1)
  }
}

// ===== 用語辞典 =====
function showGlossary() {
  document.getElementById('glossaryModal').style.display = 'flex'
}
function closeGlossary() {
  document.getElementById('glossaryModal').style.display = 'none'
}

// ===== ヘルプ =====
function showHelp() {
  document.getElementById('helpModal').style.display = 'flex'
}

// ===== 終了確認 =====
function confirmQuit() {
  if (confirm('ゲームをやめますか？進行状況は保存されません。')) {
    showScreen('title')
  }
}

// ===== 初期化 =====
window.onload = () => {
  generateStars()
  showScreen('title')
}
</script>
</body>
</html>`
}
