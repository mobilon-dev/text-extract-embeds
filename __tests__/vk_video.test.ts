import { describe, expect, it } from '@jest/globals';
import { analyzeEmbed } from '../src/embed_analyze';

describe('VK Video Embed Analysis', () => {
  it('should correctly extract VK video ID', () => {
    const input = 'Check out this VK video: https://vk.com/video-123456789_987654321';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('vk_video');
    expect(result[0].videoId).toBe('123456789_987654321');
  });

  it('should handle VK URLs without protocol', () => {
    const input = 'See www.vk.com/video-123456789_987654321';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('vk_video');
    expect(result[0].videoId).toBe('123456789_987654321');
  });

  it('should handle VK URLs with extra characters', () => {
    const input = 'Link: (https://vk.com/video-123456789_987654321)';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('vk_video');
    expect(result[0].videoId).toBe('123456789_987654321');
  });
});