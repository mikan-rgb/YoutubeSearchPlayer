import { useState } from "react";
import { Download, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { downloader, DownloadProgress } from "@/lib/downloader";

interface DownloadButtonProps {
  videoId: string;
  title: string;
}

export default function DownloadButton({ videoId, title }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress | null>(null);
  const [quality, setQuality] = useState<string>("high");
  const [format, setFormat] = useState<string>("mp4");

  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadProgress({ progress: 0, status: 'preparing' });

    try {
      await downloader.downloadVideo(
        {
          videoId,
          title,
          quality: quality as 'high' | 'medium' | 'low',
          format: format as 'mp4' | 'webm'
        },
        (progress) => {
          setDownloadProgress(progress);
        }
      );
      
      // Reset after completion
      setTimeout(() => {
        setDownloadProgress(null);
        setIsDownloading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Download failed:', error);
      setTimeout(() => {
        setDownloadProgress(null);
        setIsDownloading(false);
      }, 3000);
    }
  };

  const getStatusText = () => {
    if (!downloadProgress) return "";
    
    switch (downloadProgress.status) {
      case 'preparing':
        return '準備中...';
      case 'downloading':
        return `ダウンロード中... ${downloadProgress.progress}%`;
      case 'completed':
        return 'ダウンロード完了！';
      case 'error':
        return `エラー: ${downloadProgress.error}`;
      default:
        return '';
    }
  };

  const getStatusIcon = () => {
    if (!downloadProgress) return <Download className="h-4 w-4" />;
    
    switch (downloadProgress.status) {
      case 'preparing':
      case 'downloading':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Download className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-3">
      {/* Download Options */}
      <div className="grid grid-cols-2 gap-2">
        <Select value={quality} onValueChange={setQuality}>
          <SelectTrigger className="bg-youtube-dark border-gray-600 text-white">
            <SelectValue placeholder="品質を選択" />
          </SelectTrigger>
          <SelectContent className="bg-youtube-gray border-gray-600">
            <SelectItem value="high" className="text-white hover:bg-gray-700">高画質 (1080p)</SelectItem>
            <SelectItem value="medium" className="text-white hover:bg-gray-700">中画質 (720p)</SelectItem>
            <SelectItem value="low" className="text-white hover:bg-gray-700">低画質 (480p)</SelectItem>
          </SelectContent>
        </Select>

        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger className="bg-youtube-dark border-gray-600 text-white">
            <SelectValue placeholder="形式を選択" />
          </SelectTrigger>
          <SelectContent className="bg-youtube-gray border-gray-600">
            <SelectItem value="mp4" className="text-white hover:bg-gray-700">MP4 (動画)</SelectItem>
            <SelectItem value="mp3" className="text-white hover:bg-gray-700">MP3 (音声)</SelectItem>
            <SelectItem value="webm" className="text-white hover:bg-gray-700">WebM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Download Button */}
      <Button
        onClick={handleDownload}
        disabled={isDownloading || !videoId}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        {getStatusIcon()}
        <span className="ml-2">
          {isDownloading ? getStatusText() : `📋 ${format === 'mp3' ? 'MP3音声' : format === 'mp4' ? 'MP4動画' : 'WebM'}手順を取得`}
        </span>
      </Button>

      {/* Progress Bar */}
      {downloadProgress && downloadProgress.status === 'downloading' && (
        <div className="space-y-1">
          <Progress 
            value={downloadProgress.progress} 
            className="w-full h-2 bg-gray-700"
          />
          <p className="text-xs text-gray-400 text-center">
            {downloadProgress.progress}% 完了
          </p>
        </div>
      )}

      {/* Status Messages */}
      {downloadProgress && downloadProgress.status === 'completed' && (
        <div className="text-center text-green-400 text-sm">
          手順ファイルをダウンロードしました
        </div>
      )}

      {downloadProgress && downloadProgress.status === 'error' && (
        <div className="text-center text-red-400 text-sm">
          エラー: {downloadProgress.error}
        </div>
      )}

      {/* Legal Notice */}
      <div className="text-xs text-gray-400 text-center space-y-1">
        <p>合法的なダウンロード手順を提供</p>
        <p>著作権を遵守したアプローチ</p>
      </div>
    </div>
  );
}