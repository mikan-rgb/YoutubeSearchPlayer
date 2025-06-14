import { useState } from "react";
import { Play, ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extractVideoId, createEmbedUrl } from "@/lib/youtube";
import DownloadButton from "@/components/DownloadButton";

interface VideoPlayerProps {
  currentVideoId: string | null;
  currentVideoTitle: string;
  onVideoLoad: (videoId: string, title?: string) => void;
  isLoading: boolean;
}

export default function VideoPlayer({
  currentVideoId,
  currentVideoTitle,
  onVideoLoad,
  isLoading
}: VideoPlayerProps) {
  const [urlInput, setUrlInput] = useState("");

  const handleUrlLoad = () => {
    if (!urlInput.trim()) {
      alert("Please enter a YouTube URL");
      return;
    }

    const videoId = extractVideoId(urlInput.trim());
    if (!videoId) {
      alert("Invalid YouTube URL. Please check the URL and try again.");
      return;
    }

    onVideoLoad(videoId);
    setUrlInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUrlLoad();
    }
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
        <div className="relative aspect-video">
          {!currentVideoId ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-gray-600 mb-4 mx-auto" />
                <p className="text-gray-400 text-lg mb-2">
                  動画URLを入力して、アプリ内で安全に視聴
                </p>
                <p className="text-gray-500 text-sm">
                  プライバシー保護モードで再生されます
                </p>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <iframe
                className="w-full h-full border-0"
                src={createEmbedUrl(currentVideoId, false)}
                title="プライベート動画プレイヤー"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                🔒 プライベートモード
              </div>
            </div>
          )}
        </div>

        {/* Video Info Section */}
        {currentVideoId && (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2 text-white">
              {currentVideoTitle}
            </h2>
            <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
              <span>プライベートモードで視聴中</span>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 hover:text-white transition-colors text-gray-400"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>いいね</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 hover:text-white transition-colors text-gray-400"
                >
                  <Share2 className="h-4 w-4" />
                  <span>共有</span>
                </Button>
              </div>
            </div>
            
            {/* Download Section */}
            <div className="border-t border-gray-600 pt-4">
              <DownloadButton videoId={currentVideoId} title={currentVideoTitle} />
            </div>
          </div>
        )}
      </div>

      {/* URL Input Section */}
      <div className="mt-6 bg-youtube-gray rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 text-white flex items-center">
          🔒 プライベート動画プレイヤー
        </h3>
        <div className="flex space-x-2">
          <Input
            type="url"
            placeholder="YouTubeのURLをここに貼り付け (例: https://www.youtube.com/watch?v=...)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-youtube-dark border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:border-youtube-blue focus:outline-none"
          />
          <Button
            onClick={handleUrlLoad}
            disabled={isLoading}
            className="bg-youtube-red hover:bg-red-600 px-4 py-2 rounded font-medium transition-colors"
          >
            {isLoading ? "読み込み中..." : "動画を読み込む"}
          </Button>
        </div>
        <div className="mt-3 text-gray-400 text-sm space-y-1">
          <p>✓ プライバシー保護モードで再生</p>
          <p>✓ 追跡・Cookie なし (youtube-nocookie.com使用)</p>
          <p>✓ アプリ内で安全に視聴</p>
          <p className="text-xs">対応: youtube.com/watch?v=, youtu.be/, youtube.com/embed/</p>
        </div>
      </div>
    </div>
  );
}
