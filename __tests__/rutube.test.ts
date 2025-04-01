import { describe, expect, it } from '@jest/globals';
import { analyzeEmbed } from '../src/embed_analyze';

describe('Rutube Embed Analysis', () => {
  it('should correctly extract Rutube video ID', () => {
    const input = 'See this Rutube video: https://rutube.ru/video/a1b2c3d4e5f678901234567890abcdef/';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('rutube');
    expect(result[0].videoId).toBe('a1b2c3d4e5f678901234567890abcdef');
  });

  it('should handle Rutube URLs without protocol', () => {
    const input = 'Visit www.rutube.ru/video/a1b2c3d4e5f678901234567890abcdef/';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('rutube');
    expect(result[0].videoId).toBe('a1b2c3d4e5f678901234567890abcdef');
  });

  it('should handle Rutube URLs with extra characters', () => {
    const input = 'Link: (https://rutube.ru/video/a1b2c3d4e5f678901234567890abcdef/)';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('rutube');
    expect(result[0].videoId).toBe('a1b2c3d4e5f678901234567890abcdef');
  });
});
