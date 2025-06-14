export class AppExporter {
  private static instance: AppExporter;
  
  static getInstance(): AppExporter {
    if (!AppExporter.instance) {
      AppExporter.instance = new AppExporter();
    }
    return AppExporter.instance;
  }

  async exportApp(): Promise<void> {
    try {
      const htmlContent = this.generateStandaloneHTML();
      
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'URLPlayer_standalone.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('App export failed:', error);
      throw error;
    }
  }

  private generateStandaloneHTML(): string {
    return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>URLPlayer - プライベートYouTube視聴</title>
  <style>
    ${this.getInlineStyles()}
  </style>
</head>
<body class="bg-youtube-dark text-white">
  <div id="app">
    ${this.getAppHTML()}
  </div>
  
  <script>
    ${this.getInlineJavaScript()}
  </script>
</body>
</html>`;
  }

  private getInlineStyles(): string {
    return `
    :root {
      --youtube-red: #ff0000;
      --youtube-dark: #0f0f0f;
      --youtube-gray: #272727;
      --youtube-blue: #1976d2;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Roboto', 'Arial', sans-serif;
      background-color: var(--youtube-dark);
      color: white;
      min-height: 100vh;
    }
    
    .bg-youtube-dark { background-color: var(--youtube-dark); }
    .bg-youtube-gray { background-color: var(--youtube-gray); }
    .bg-youtube-red { background-color: var(--youtube-red); }
    .text-youtube-red { color: var(--youtube-red); }
    .text-youtube-blue { color: var(--youtube-blue); }
    .border-youtube-blue { border-color: var(--youtube-blue); }
    
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .header {
      background-color: var(--youtube-dark);
      border-bottom: 1px solid #404040;
      position: sticky;
      top: 0;
      z-index: 50;
      padding: 1rem 0;
    }
    
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.25rem;
      font-weight: bold;
    }
    
    .search-container {
      flex: 1;
      max-width: 32rem;
      position: relative;
    }
    
    .search-input {
      width: 100%;
      background-color: var(--youtube-gray);
      border: 1px solid #404040;
      border-radius: 1.5rem;
      padding: 0.5rem 3rem 0.5rem 1rem;
      color: white;
      outline: none;
    }
    
    .search-input:focus {
      border-color: var(--youtube-blue);
    }
    
    .search-button {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      background-color: #404040;
      border: none;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      color: white;
      cursor: pointer;
    }
    
    .search-button:hover {
      background-color: #505050;
    }
    
    .main-content {
      padding: 1.5rem 0;
    }
    
    .grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
    }
    
    @media (max-width: 1024px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
    
    .video-player {
      background-color: black;
      border-radius: 0.5rem;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    .video-container {
      position: relative;
      aspect-ratio: 16/9;
    }
    
    .video-placeholder {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #404040, #202020);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
    }
    
    .video-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    
    .privacy-badge {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
    }
    
    .video-info {
      padding: 1rem;
    }
    
    .video-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .video-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #a0a0a0;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }
    
    .action-buttons {
      display: flex;
      gap: 1rem;
    }
    
    .btn {
      background: none;
      border: none;
      color: #a0a0a0;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      transition: color 0.2s;
    }
    
    .btn:hover {
      color: white;
    }
    
    .download-section {
      border-top: 1px solid #404040;
      padding-top: 1rem;
      margin-top: 1rem;
    }
    
    .download-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    
    .select {
      background-color: var(--youtube-dark);
      border: 1px solid #404040;
      color: white;
      padding: 0.5rem;
      border-radius: 0.25rem;
      outline: none;
    }
    
    .download-btn {
      width: 100%;
      background-color: #16a34a;
      color: white;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-bottom: 0.75rem;
    }
    
    .download-btn:hover {
      background-color: #15803d;
    }
    
    .download-btn:disabled {
      background-color: #404040;
      cursor: not-allowed;
    }
    
    .legal-notice {
      font-size: 0.75rem;
      color: #a0a0a0;
      text-align: center;
      line-height: 1.4;
    }
    
    .url-input-section {
      margin-top: 1.5rem;
      background-color: var(--youtube-gray);
      border-radius: 0.5rem;
      padding: 1rem;
    }
    
    .url-input-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
    }
    
    .url-input-container {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    
    .url-input {
      flex: 1;
      background-color: var(--youtube-dark);
      border: 1px solid #404040;
      color: white;
      padding: 0.5rem 0.75rem;
      border-radius: 0.25rem;
      outline: none;
    }
    
    .url-input:focus {
      border-color: var(--youtube-blue);
    }
    
    .url-btn {
      background-color: var(--youtube-red);
      color: white;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .url-btn:hover {
      background-color: #dc2626;
    }
    
    .url-features {
      font-size: 0.875rem;
      color: #a0a0a0;
      line-height: 1.4;
    }
    
    .sidebar {
      background-color: var(--youtube-gray);
      border-radius: 0.5rem;
      padding: 1rem;
    }
    
    .sidebar-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    
    .video-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .video-item {
      display: flex;
      gap: 0.75rem;
      padding: 0.5rem;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .video-item:hover {
      background-color: #404040;
    }
    
    .video-thumb {
      width: 5rem;
      height: 3rem;
      object-fit: cover;
      border-radius: 0.25rem;
      flex-shrink: 0;
    }
    
    .video-details {
      flex: 1;
      min-width: 0;
    }
    
    .video-item-title {
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.25rem;
      line-height: 1.2;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .video-channel {
      font-size: 0.75rem;
      color: #a0a0a0;
    }
    
    .privacy-section {
      margin-top: 1.5rem;
      background-color: var(--youtube-gray);
      border-radius: 0.5rem;
      padding: 1rem;
    }
    
    .privacy-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
    }
    
    .privacy-features {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #d0d0d0;
    }
    
    .privacy-feature {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }
    
    .check-icon {
      color: #22c55e;
      font-weight: bold;
    }
    
    .export-section {
      text-align: center;
      margin-top: 2rem;
      padding: 1rem;
      background-color: var(--youtube-gray);
      border-radius: 0.5rem;
    }
    
    .export-btn {
      background-color: var(--youtube-blue);
      color: white;
      font-weight: 500;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.2s;
    }
    
    .export-btn:hover {
      background-color: #1565c0;
    }
    
    .hidden { display: none; }
    
    .loading-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
    }
    
    .loading-content {
      background-color: var(--youtube-gray);
      border-radius: 0.5rem;
      padding: 1.5rem;
      text-align: center;
    }
    
    .spinner {
      width: 2rem;
      height: 2rem;
      border: 2px solid #404040;
      border-top-color: var(--youtube-red);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    `;
  }

  private getAppHTML(): string {
    return `
    <!-- Loading Overlay -->
    <div id="loadingOverlay" class="loading-overlay hidden">
      <div class="loading-content">
        <div class="spinner"></div>
        <p>🔒 プライベートモードで動画を読み込み中...</p>
      </div>
    </div>

    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <div class="text-youtube-red" style="font-size: 1.5rem;">▶</div>
            <span>URLPlayer</span>
          </div>
          
          <div class="search-container">
            <input 
              type="text" 
              id="searchInput"
              class="search-input"
              placeholder="🔒 YouTube動画を検索またはURLを貼り付け..."
            />
            <button id="searchButton" class="search-button">🔍</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container main-content">
      <div class="grid">
        <!-- Video Player -->
        <div>
          <div class="video-player">
            <div class="video-container">
              <div id="videoPlaceholder" class="video-placeholder">
                <div style="font-size: 4rem; margin-bottom: 1rem;">▶️</div>
                <p style="font-size: 1.125rem; margin-bottom: 0.5rem;">動画URLを入力して、アプリ内で安全に視聴</p>
                <p style="color: #a0a0a0; font-size: 0.875rem;">プライバシー保護モードで再生されます</p>
              </div>
              <iframe 
                id="videoFrame" 
                class="video-iframe hidden"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
                referrerpolicy="no-referrer"
                loading="lazy"
              ></iframe>
              <div id="privacyBadge" class="privacy-badge hidden">🔒 プライベートモード</div>
            </div>

            <!-- Video Info -->
            <div id="videoInfo" class="video-info hidden">
              <h2 id="videoTitle" class="video-title">YouTube Video</h2>
              <div class="video-meta">
                <span>プライベートモードで視聴中</span>
                <div class="action-buttons">
                  <button class="btn">👍 いいね</button>
                  <button class="btn">📤 共有</button>
                </div>
              </div>
              
              <!-- Download Section -->
              <div class="download-section">
                <div class="download-options">
                  <select id="qualitySelect" class="select">
                    <option value="high">高画質 (1080p)</option>
                    <option value="medium">中画質 (720p)</option>
                    <option value="low">低画質 (480p)</option>
                  </select>
                  <select id="formatSelect" class="select">
                    <option value="mp4">MP4 (動画)</option>
                    <option value="mp3">MP3 (音声)</option>
                    <option value="webm">WebM</option>
                  </select>
                </div>
                <button id="downloadBtn" class="download-btn">📋 ダウンロード手順を取得</button>
                <div class="legal-notice">
                  <p>合法的なダウンロード手順を提供</p>
                  <p>著作権を遵守したアプローチ</p>
                </div>
              </div>
            </div>
          </div>

          <!-- URL Input Section -->
          <div class="url-input-section">
            <h3 class="url-input-title">🔒 プライベート動画プレイヤー</h3>
            <div class="url-input-container">
              <input 
                type="url" 
                id="urlInput"
                class="url-input"
                placeholder="YouTubeのURLをここに貼り付け (例: https://www.youtube.com/watch?v=...)"
              />
              <button id="loadVideoBtn" class="url-btn">動画を読み込む</button>
            </div>
            <div class="url-features">
              <p>✓ プライバシー保護モードで再生</p>
              <p>✓ 追跡・Cookie なし (youtube-nocookie.com使用)</p>
              <p>✓ アプリ内で安全に視聴</p>
              <p style="font-size: 0.75rem;">対応: youtube.com/watch?v=, youtu.be/, youtube.com/embed/</p>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div>
          <div class="sidebar">
            <h3 id="sidebarTitle" class="sidebar-title">人気動画</h3>
            <div id="videoList" class="video-list">
              <!-- Popular videos will be inserted here -->
            </div>
          </div>

          <!-- Privacy Section -->
          <div class="privacy-section">
            <h3 class="privacy-title">🔒 プライバシー保護</h3>
            <div class="privacy-features">
              <div class="privacy-feature">
                <span class="check-icon">✓</span>
                <span>youtube-nocookie.com を使用</span>
              </div>
              <div class="privacy-feature">
                <span class="check-icon">✓</span>
                <span>追跡Cookie なし</span>
              </div>
              <div class="privacy-feature">
                <span class="check-icon">✓</span>
                <span>アプリ内で安全に視聴</span>
              </div>
              <div class="privacy-feature">
                <span class="check-icon">✓</span>
                <span>直接リンクを開かない</span>
              </div>
            </div>
          </div>

          <!-- Export Section -->
          <div class="export-section">
            <h3 style="margin-bottom: 0.75rem;">📱 アプリをダウンロード</h3>
            <button id="exportAppBtn" class="export-btn">URLPlayerアプリを保存</button>
            <p style="font-size: 0.75rem; color: #a0a0a0; margin-top: 0.5rem;">
              スタンドアロンHTMLファイルとして保存
            </p>
          </div>
        </div>
      </div>
    </main>
    `;
  }

  private getInlineJavaScript(): string {
    return `
    // App State
    let currentVideoId = null;
    let currentVideoTitle = 'YouTube Video';
    let isSearchResults = false;
    
    // Popular Videos Data
    const popularVideos = [
      {
        id: 'dQw4w9WgXcQ',
        title: 'Beautiful Mountain Landscapes 4K',
        channel: 'Nature Channel',
        views: '2.1M views',
        time: '3 days ago',
        thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjkwIiB2aWV3Qm94PSIwIDAgMTYwIDkwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iOTAiIGZpbGw9IiM0MDQwNDAiLz48dGV4dCB4PSI4MCIgeT0iNTAiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7jgrXjg6Djg43jgqTjg6s8L3RleHQ+PC9zdmc+'
      },
      {
        id: '9bZkp7q19f0',
        title: 'Tokyo Night Walk - Neon City',
        channel: 'Urban Explorer',
        views: '847K views',
        time: '1 week ago',
        thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjkwIiB2aWV3Qm94PSIwIDAgMTYwIDkwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iOTAiIGZpbGw9IiM0MDQwNDAiLz48dGV4dCB4PSI4MCIgeT0iNTAiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7jgrXjg6Djg43jgqTjg6s8L3RleHQ+PC9zdmc+'
      },
      {
        id: 'M7lc1UVf-VE',
        title: 'Relaxing Ocean Sounds - 10 Hours',
        channel: 'Ambient Sounds',
        views: '5.2M views',
        time: '2 months ago',
        thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjkwIiB2aWV3Qm94PSIwIDAgMTYwIDkwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iOTAiIGZpbGw9IiM0MDQwNDAiLz48dGV4dCB4PSI4MCIgeT0iNTAiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7jgrXjg6Djg43jgqTjg6s8L3RleHQ+PC9zdmc+'
      }
    ];

    // Utility Functions
    function extractVideoId(url) {
      const regExp = /^.*(youtu.be\\/|v\\/|u\\/\\w\\/|embed\\/|watch\\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    }

    function createEmbedUrl(videoId, autoplay = false) {
      const params = new URLSearchParams({
        autoplay: autoplay ? '1' : '0',
        rel: '0',
        modestbranding: '1',
        iv_load_policy: '3',
        cc_load_policy: '0',
        fs: '1',
        disablekb: '0',
        enablejsapi: '1',
        origin: window.location.origin,
        playsinline: '1',
        controls: '1',
        showinfo: '0',
        privacy_mode: '1'
      });
      
      return \`https://www.youtube-nocookie.com/embed/\${videoId}?\${params.toString()}\`;
    }

    function sanitizeFilename(filename) {
      return filename
        .replace(/[^\\w\\s-]/g, '')
        .replace(/\\s+/g, '-')
        .toLowerCase()
        .substring(0, 100);
    }

    // Download Instructions Generator
    function generateDownloadInstructions(videoId, title, format) {
      const youtubeUrl = \`https://www.youtube.com/watch?v=\${videoId}\`;
      const isAudio = format === 'mp3';
      
      return \`YouTube\${isAudio ? '音声' : '動画'}ダウンロード手順 - \${title}
======================================

動画URL: \${youtubeUrl}
動画ID: \${videoId}
希望形式: \${format.toUpperCase()}

合法的なダウンロード方法:
----------------------

1. YouTube Premium (推奨)
   - 公式のオフライン視聴機能
   - \${isAudio ? '音楽アプリで音声再生可能' : '高画質でダウンロード可能'}
   - 著作権を完全に遵守

2. 著作権フリーコンテンツの場合
   - YouTube Creator Studioからダウンロード
   - 自分がアップロードしたコンテンツのみ
   - \${isAudio ? 'YouTube Musicでの音楽ダウンロード' : '動画の直接ダウンロード'}

3. サードパーティツール（注意が必要）
   - yt-dlp (オープンソース、コマンドライン)
   - 4K Video Downloader (デスクトップアプリ)
   - \${isAudio ? 'Any Video Converter (音声抽出機能)' : 'ClipGrab (動画ダウンロード)'}
   ⚠️ 使用前に著作権を確認してください

4. ブラウザ拡張機能
   - Video DownloadHelper
   - \${isAudio ? 'Audio Downloader' : 'SaveFrom.net Helper'}
   ⚠️ 信頼できるソースからのみインストール

\${isAudio ? 'MP3変換手順:' : 'MP4ダウンロード手順:'}
\${isAudio ? '---------------' : '------------------'}
\${isAudio ? 
\`1. 動画をダウンロード後、音声を抽出
2. FFmpeg, Audacity等で変換
3. ビットレート: 128kbps-320kbps推奨\` :
\`1. 希望の画質を選択 (480p, 720p, 1080p)
2. ダウンロード先フォルダを指定
3. 完了まで待機\`}

注意事項:
--------
- 著作権で保護されたコンテンツの無断ダウンロードは違法です
- YouTubeの利用規約を必ずお読みください
- 個人利用のみに留めてください
- このアプリはプライバシー保護視聴を目的としています

プライバシー保護視聴:
------------------
このアプリでは youtube-nocookie.com を使用して
追跡なしで動画を視聴できます。

生成日時: \${new Date().toLocaleString('ja-JP')}
URLPlayer - プライベート動画視聴アプリ\`;
    }

    // App Functions
    function showLoading() {
      document.getElementById('loadingOverlay').classList.remove('hidden');
    }

    function hideLoading() {
      document.getElementById('loadingOverlay').classList.add('hidden');
    }

    function loadVideo(videoId, title = 'YouTube Video') {
      showLoading();
      
      setTimeout(() => {
        currentVideoId = videoId;
        currentVideoTitle = title;
        
        const placeholder = document.getElementById('videoPlaceholder');
        const iframe = document.getElementById('videoFrame');
        const badge = document.getElementById('privacyBadge');
        const info = document.getElementById('videoInfo');
        const titleEl = document.getElementById('videoTitle');
        
        placeholder.classList.add('hidden');
        iframe.src = createEmbedUrl(videoId, false);
        iframe.classList.remove('hidden');
        badge.classList.remove('hidden');
        info.classList.remove('hidden');
        titleEl.textContent = title;
        
        hideLoading();
      }, 1000);
    }

    function downloadInstructions() {
      if (!currentVideoId) return;
      
      const quality = document.getElementById('qualitySelect').value;
      const format = document.getElementById('formatSelect').value;
      
      const instructions = generateDownloadInstructions(currentVideoId, currentVideoTitle, format);
      const blob = new Blob([instructions], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = \`\${sanitizeFilename(currentVideoTitle)}_\${format}_download_instructions.txt\`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    function renderVideoList(videos) {
      const container = document.getElementById('videoList');
      container.innerHTML = videos.map(video => \`
        <div class="video-item" onclick="loadVideo('\${video.id}', '\${video.title}')">
          <img src="\${video.thumbnail}" alt="Video thumbnail" class="video-thumb" />
          <div class="video-details">
            <h4 class="video-item-title">\${video.title}</h4>
            <p class="video-channel">\${video.channel}</p>
            <p class="video-channel">\${video.views} • \${video.time}</p>
          </div>
        </div>
      \`).join('');
    }

    function search(query) {
      showLoading();
      
      setTimeout(() => {
        const results = popularVideos.map(video => ({
          ...video,
          title: \`\${query} - \${video.title}\`
        }));
        
        renderVideoList(results);
        document.getElementById('sidebarTitle').textContent = '検索結果';
        isSearchResults = true;
        hideLoading();
      }, 800);
    }

    function exportApp() {
      // In standalone version, this would export a copy of itself
      alert('このアプリは既にスタンドアロン版です！\\n\\nこのHTMLファイルをコピーして共有できます。');
    }

    // Event Listeners
    document.addEventListener('DOMContentLoaded', function() {
      const searchInput = document.getElementById('searchInput');
      const searchButton = document.getElementById('searchButton');
      const urlInput = document.getElementById('urlInput');
      const loadVideoBtn = document.getElementById('loadVideoBtn');
      const downloadBtn = document.getElementById('downloadBtn');
      const exportAppBtn = document.getElementById('exportAppBtn');

      // Search functionality
      function handleSearch() {
        const query = searchInput.value.trim();
        if (!query) return;

        const videoId = extractVideoId(query);
        if (videoId) {
          loadVideo(videoId);
          searchInput.value = '';
        } else {
          search(query);
        }
      }

      searchButton.addEventListener('click', handleSearch);
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleSearch();
      });

      // URL loading
      function handleUrlLoad() {
        const url = urlInput.value.trim();
        if (!url) {
          alert('YouTubeのURLを入力してください');
          return;
        }

        const videoId = extractVideoId(url);
        if (!videoId) {
          alert('有効なYouTubeのURLを入力してください');
          return;
        }

        loadVideo(videoId);
        urlInput.value = '';
      }

      loadVideoBtn.addEventListener('click', handleUrlLoad);
      urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleUrlLoad();
      });

      // Download instructions
      downloadBtn.addEventListener('click', downloadInstructions);

      // Export app
      exportAppBtn.addEventListener('click', exportApp);

      // Initialize
      renderVideoList(popularVideos);
    });
    `;
  }
}

export const appExporter = AppExporter.getInstance();