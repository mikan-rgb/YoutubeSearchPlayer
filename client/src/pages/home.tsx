import { useState } from "react";
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import SearchResults from "@/components/SearchResults";
import { VideoInfo, generateMockSearchResults, popularVideos } from "@/lib/youtube";

export default function Home() {
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [currentVideoTitle, setCurrentVideoTitle] = useState("YouTube Video");
  const [searchResults, setSearchResults] = useState<VideoInfo[]>(popularVideos);
  const [isSearchResults, setIsSearchResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = generateMockSearchResults(query);
      setSearchResults(results);
      setIsSearchResults(true);
      setIsLoading(false);
    }, 800);
  };

  const handleVideoLoad = (videoId: string, title?: string) => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setCurrentVideoId(videoId);
      setCurrentVideoTitle(title || "YouTube Video");
      setIsLoading(false);
    }, 1000);
  };

  const handleVideoSelect = (videoId: string, title: string) => {
    handleVideoLoad(videoId, title);
  };

  return (
    <div className="min-h-screen bg-youtube-dark">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-youtube-gray rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-youtube-red mx-auto mb-4"></div>
            <p className="text-white">Loading video...</p>
          </div>
        </div>
      )}

      <Header onSearch={handleSearch} onVideoLoad={handleVideoLoad} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <VideoPlayer
            currentVideoId={currentVideoId}
            currentVideoTitle={currentVideoTitle}
            onVideoLoad={handleVideoLoad}
            isLoading={isLoading}
          />
          <SearchResults
            videos={searchResults}
            onVideoSelect={handleVideoSelect}
            isSearchResults={isSearchResults}
          />
        </div>
      </div>
    </div>
  );
}
