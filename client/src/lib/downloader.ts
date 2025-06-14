export interface DownloadOptions {
  videoId: string;
  title: string;
  quality?: 'high' | 'medium' | 'low';
  format?: 'mp4' | 'mp3' | 'webm';
}

export interface DownloadProgress {
  progress: number;
  status: 'preparing' | 'downloading' | 'completed' | 'error';
  error?: string;
}

// YouTube video download utilities
export class VideoDownloader {
  private static instance: VideoDownloader;
  
  static getInstance(): VideoDownloader {
    if (!VideoDownloader.instance) {
      VideoDownloader.instance = new VideoDownloader();
    }
    return VideoDownloader.instance;
  }

  async downloadVideo(options: DownloadOptions, onProgress?: (progress: DownloadProgress) => void): Promise<void> {
    try {
      onProgress?.({ progress: 0, status: 'preparing' });
      
      // Create a download instruction modal instead of direct download
      // This provides users with legal options for downloading content
      const instructionContent = this.createDownloadInstructions(options.videoId, options.title, options.format || 'mp4');
      
      // Simulate preparation
      await new Promise(resolve => setTimeout(resolve, 500));
      onProgress?.({ progress: 50, status: 'downloading' });
      
      // Create and download instruction file
      const blob = new Blob([instructionContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const fileExtension = options.format || 'mp4';
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.sanitizeFilename(options.title)}_${fileExtension}_download_instructions.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      onProgress?.({ progress: 100, status: 'completed' });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      onProgress?.({ progress: 0, status: 'error', error: errorMessage });
      throw error;
    }
  }

  private createDownloadInstructions(videoId: string, title: string, format: string): string {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const isAudio = format === 'mp3';
    
    return `YouTube${isAudio ? '音声' : '動画'}ダウンロード手順 - ${title}
======================================

動画URL: ${youtubeUrl}
動画ID: ${videoId}
希望形式: ${format.toUpperCase()}

合法的なダウンロード方法:
----------------------

1. YouTube Premium (推奨)
   - 公式のオフライン視聴機能
   - ${isAudio ? '音楽アプリで音声再生可能' : '高画質でダウンロード可能'}
   - 著作権を完全に遵守

2. 著作権フリーコンテンツの場合
   - YouTube Creator Studioからダウンロード
   - 自分がアップロードしたコンテンツのみ
   - ${isAudio ? 'YouTube Musicでの音楽ダウンロード' : '動画の直接ダウンロード'}

3. サードパーティツール（注意が必要）
   - yt-dlp (オープンソース、コマンドライン)
   - 4K Video Downloader (デスクトップアプリ)
   - ${isAudio ? 'Any Video Converter (音声抽出機能)' : 'ClipGrab (動画ダウンロード)'}
   ⚠️ 使用前に著作権を確認してください

4. ブラウザ拡張機能
   - Video DownloadHelper
   - ${isAudio ? 'Audio Downloader' : 'SaveFrom.net Helper'}
   ⚠️ 信頼できるソースからのみインストール

${isAudio ? 'MP3変換手順:' : 'MP4ダウンロード手順:'}
${isAudio ? '---------------' : '------------------'}
${isAudio ? 
`1. 動画をダウンロード後、音声を抽出
2. FFmpeg, Audacity等で変換
3. ビットレート: 128kbps-320kbps推奨` :
`1. 希望の画質を選択 (480p, 720p, 1080p)
2. ダウンロード先フォルダを指定
3. 完了まで待機`}

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

生成日時: ${new Date().toLocaleString('ja-JP')}
URLPlayer - プライベート動画視聴アプリ`;
  }

  private sanitizeFilename(filename: string): string {
    return filename
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .toLowerCase()
      .substring(0, 100); // Limit length
  }

  // Get video info for download
  async getVideoInfo(videoId: string): Promise<{ title: string; duration: string; quality: string[] }> {
    try {
      const response = await fetch(`/api/video-info/${videoId}`);
      if (!response.ok) {
        throw new Error('Failed to get video info');
      }
      return await response.json();
    } catch (error) {
      // Fallback to mock data if API is not available
      return {
        title: 'YouTube Video',
        duration: '00:00',
        quality: ['high', 'medium', 'low']
      };
    }
  }
}

export const downloader = VideoDownloader.getInstance();