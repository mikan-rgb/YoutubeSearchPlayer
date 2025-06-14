import { useState } from "react";
import { Play, ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extractVideoId, createEmbedUrl } from "@/lib/youtube";

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
                  Search for a video or paste a YouTube URL to start watching
                </p>
                <p className="text-gray-500 text-sm">
                  Supports youtube.com and youtu.be links
                </p>
              </div>
            </div>
          ) : (
            <iframe
              className="w-full h-full"
              src={createEmbedUrl(currentVideoId, true)}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Video Info Section */}
        {currentVideoId && (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2 text-white">
              {currentVideoTitle}
            </h2>
            <div className="flex items-center justify-between text-gray-400 text-sm">
              <span>0 views</span>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 hover:text-white transition-colors text-gray-400"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>0</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 hover:text-white transition-colors text-gray-400"
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 hover:text-white transition-colors text-gray-400"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* URL Input Section */}
      <div className="mt-6 bg-youtube-gray rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 text-white">Direct URL Player</h3>
        <div className="flex space-x-2">
          <Input
            type="url"
            placeholder="Paste YouTube URL here (e.g., https://www.youtube.com/watch?v=...)"
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
            {isLoading ? "Loading..." : "Load Video"}
          </Button>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Supports: youtube.com/watch?v=, youtu.be/, youtube.com/embed/
        </p>
      </div>
    </div>
  );
}
