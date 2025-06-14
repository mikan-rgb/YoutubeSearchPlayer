export interface DownloadOptions {
  videoId: string;
  title: string;
  quality?: 'high' | 'medium' | 'low';
  format?: 'mp4' | 'webm';
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
      const instructionContent = this.createDownloadInstructions(options.videoId, options.title);
      
      // Simulate preparation
      await new Promise(resolve => setTimeout(resolve, 500));
      onProgress?.({ progress: 50, status: 'downloading' });
      
      // Create and download instruction file
      const blob = new Blob([instructionContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.sanitizeFilename(options.title)}_download_instructions.txt`;
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

  private createDownloadInstructions(videoId: string, title: string): string {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    return `YouTube動画ダウンロード手順 - ${title}
======================================

動画URL: ${youtubeUrl}
動画ID: ${videoId}

合法的なダウンロード方法:
----------------------

1. YouTube Premium (推奨)
   - 公式のオフライン視聴機能
   - 高画質でダウンロード可能
   - 著作権を完全に遵守

2. 著作権フリー動画の場合
   - YouTube Creator Studioからダウンロード
   - 自分がアップロードした動画のみ

3. 許可された用途での利用
   - 教育目的での使用（条件あり）
   - フェアユース規定に基づく使用

注意事項:
--------
- 著作権で保護されたコンテンツの無断ダウンロードは違法です
- YouTubeの利用規約を必ずお読みください
- このアプリはプライバシー保護のみを目的としています

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