// Browser-compatible player configuration
// Uses environment variables or defaults

export function getPlayerUrls(): string[] {
  // In production, these could come from environment variables
  // For now, we'll use the default localhost URLs
  const defaultPlayers = [
 'http://45.157.178.204:3001',
  'http://45.157.178.204:3002',
  'http://45.157.178.204:3003',
  'http://45.157.178.204:3004',
  'http://45.157.178.204:3005',
  'http://45.157.178.204:3006',
  'http://45.157.178.204:3007',
  'http://45.157.178.204:3008'
  ];

  // Check if there's a custom configuration in environment variables
  // This would need to be set at build time for Vite
  const customPlayers = import.meta.env.VITE_PLAYER_URLS;
  
  if (customPlayers) {
    try {
      return JSON.parse(customPlayers);
    } catch (e) {
      console.warn('Failed to parse VITE_PLAYER_URLS, using defaults');
    }
  }

  return defaultPlayers;
}