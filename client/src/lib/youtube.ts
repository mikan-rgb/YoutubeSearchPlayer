export interface VideoInfo {
  id: string;
  title: string;
  channel: string;
  views: string;
  time: string;
  thumbnail: string;
}

export function extractVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export function createEmbedUrl(videoId: string, autoplay: boolean = true): string {
  // Enhanced privacy and security parameters
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0', // Don't show related videos
    modestbranding: '1', // Minimal YouTube branding
    iv_load_policy: '3', // Hide video annotations
    cc_load_policy: '0', // Don't show captions by default
    fs: '1', // Allow fullscreen
    disablekb: '0', // Enable keyboard controls
    enablejsapi: '1', // Enable JS API for better control
    origin: window.location.origin, // Set origin for security
    playsinline: '1', // Play inline on mobile
    controls: '1', // Show player controls
    showinfo: '0', // Hide video info
    privacy_mode: '1' // Enable privacy-enhanced mode
  });
  
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function generateMockSearchResults(query: string): VideoInfo[] {
  const mockResults: VideoInfo[] = [
    {
      id: 'dQw4w9WgXcQ',
      title: `${query} - Complete Tutorial`,
      channel: 'Educational Channel',
      views: '1.2M views',
      time: '2 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=90'
    },
    {
      id: '9bZkp7q19f0',
      title: `How to ${query} - Step by Step`,
      channel: 'How-To Channel',
      views: '856K views',
      time: '1 week ago',
      thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=90'
    },
    {
      id: 'M7lc1UVf-VE',
      title: `${query} Explained Simply`,
      channel: 'Science Channel',
      views: '2.1M views',
      time: '3 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=90'
    },
    {
      id: 'jNQXAC9IVRw',
      title: `Advanced ${query} Techniques`,
      channel: 'Tech Reviews',
      views: '1.3M views',
      time: '5 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=90'
    },
    {
      id: 'YQHsXMglC9A',
      title: `${query} for Beginners`,
      channel: 'Learning Hub',
      views: '3.8M views',
      time: '1 month ago',
      thumbnail: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=90'
    }
  ];

  return mockResults;
}

export const popularVideos: VideoInfo[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Beautiful Mountain Landscapes 4K',
    channel: 'Nature Channel',
    views: '2.1M views',
    time: '3 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=90'
  },
  {
    id: '9bZkp7q19f0',
    title: 'Tokyo Night Walk - Neon City',
    channel: 'Urban Explorer',
    views: '847K views',
    time: '1 week ago',
    thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=90'
  },
  {
    id: 'M7lc1UVf-VE',
    title: 'Relaxing Ocean Sounds - 10 Hours',
    channel: 'Ambient Sounds',
    views: '5.2M views',
    time: '2 months ago',
    thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=90'
  },
  {
    id: 'jNQXAC9IVRw',
    title: 'Ultimate Coding Setup Tour 2024',
    channel: 'Tech Reviews',
    views: '1.3M views',
    time: '5 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=90'
  },
  {
    id: 'YQHsXMglC9A',
    title: 'Coffee Shop Jazz - Study Music',
    channel: 'Chill Music',
    views: '3.8M views',
    time: '1 month ago',
    thumbnail: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=90'
  }
];
