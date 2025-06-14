import { useState } from "react";
import { Search, Menu, Video, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extractVideoId } from "@/lib/youtube";

interface HeaderProps {
  onSearch: (query: string) => void;
  onVideoLoad: (videoId: string, title?: string) => void;
}

export default function Header({ onSearch, onVideoLoad }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // Check if it's a YouTube URL
    const videoId = extractVideoId(searchQuery.trim());
    if (videoId) {
      onVideoLoad(videoId);
      setSearchQuery("");
    } else {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="bg-youtube-dark border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="p-2 hover:bg-gray-700 rounded-full"
            >
              <Menu className="h-5 w-5 text-white" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="text-youtube-red text-2xl font-bold">▶</div>
              <span className="text-xl font-bold text-white">URLPlayer</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="🔒 YouTube動画を検索またはURLを貼り付け..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-youtube-gray border border-gray-600 rounded-full py-2 px-4 pr-12 text-white placeholder-gray-400 focus:border-youtube-blue focus:outline-none"
              />
              <Button
                onClick={handleSearch}
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 hover:bg-gray-500 rounded-full p-2"
              >
                <Search className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="p-2 hover:bg-gray-700 rounded-full"
            >
              <Video className="h-5 w-5 text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="p-2 hover:bg-gray-700 rounded-full"
            >
              <Bell className="h-5 w-5 text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 bg-youtube-blue rounded-full flex items-center justify-center"
            >
              <User className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
