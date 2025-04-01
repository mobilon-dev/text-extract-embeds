import { describe, expect, it } from '@jest/globals';
import { analyzeEmbed } from '../src/embed_analyze';

describe('YouTube Embed Analysis', () => {
  it('should correctly extract YouTube video ID from a standard URL', () => {
    const input = 'Check out this YouTube video: https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('youtube');
    expect(result[0].videoId).toBe('dQw4w9WgXcQ');
  });

  it('should correctly extract YouTube video ID from a short URL', () => {
    const input = 'Watch this on YouTube: https://youtu.be/abcdefg12345';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('youtube');
    expect(result[0].videoId).toBe('abcdefg12345');
  });

  it('should handle YouTube URLs without protocol', () => {
      const input = 'Visit this: www.youtube.com/watch?v=abcdefg12345';
      const result = analyzeEmbed(input);
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('youtube');
      expect(result[0].videoId).toBe('abcdefg12345');
  });

  it('should handle YouTube URLs with extra characters', () => {
      const input = 'Here\'s a link! (https://www.youtube.com/watch?v=abcdefg12345)';
      const result = analyzeEmbed(input);
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('youtube');
      expect(result[0].videoId).toBe('abcdefg12345');
  });
});