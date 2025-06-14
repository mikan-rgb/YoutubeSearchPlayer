import { History, Bookmark, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoInfo } from "@/lib/youtube";

interface SearchResultsProps {
  videos: VideoInfo[];
  onVideoSelect: (videoId: string, title: string) => void;
  isSearchResults: boolean;
}

export default function SearchResults({
  videos,
  onVideoSelect,
  isSearchResults
}: SearchResultsProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-youtube-gray rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 text-white">
          {isSearchResults ? "Search Results" : "Popular Videos"}
        </h3>

        <div className="space-y-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer transition-colors"
              onClick={() => onVideoSelect(video.id, video.title)}
            >
              <img
                src={video.thumbnail}
                alt="Video thumbnail"
                className="w-20 h-12 object-cover rounded flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white line-clamp-2 mb-1">
                  {video.title}
                </h4>
                <p className="text-xs text-gray-400">{video.channel}</p>
                <p className="text-xs text-gray-400">
                  {video.views} • {video.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-youtube-gray rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 text-white">Quick Actions</h3>
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-left p-2 hover:bg-gray-700 rounded transition-colors text-white"
          >
            <History className="h-4 w-4 mr-2" />
            Watch History
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-left p-2 hover:bg-gray-700 rounded transition-colors text-white"
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Saved Videos
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-left p-2 hover:bg-gray-700 rounded transition-colors text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Downloads
          </Button>
        </div>
      </div>
    </div>
  );
}
