import { describe, expect, it } from '@jest/globals';
import { analyzeEmbed } from '../src/embed_analyze';

describe('Vimeo Embed Analysis', () => {
  it('should correctly extract Vimeo video ID', () => {
    const input = 'Watch this Vimeo video: https://vimeo.com/987654321';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('vimeo');
    expect(result[0].videoId).toBe('987654321');
  });

   it('should handle Vimeo URLs without protocol', () => {
    const input = 'Check out www.vimeo.com/987654321';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('vimeo');
    expect(result[0].videoId).toBe('987654321');
  });

  it('should handle Vimeo URLs with extra characters', () => {
    const input = 'Link: (https://vimeo.com/987654321)';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('vimeo');
    expect(result[0].videoId).toBe('987654321');
  });
});