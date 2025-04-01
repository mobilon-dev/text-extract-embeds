import { describe, expect, it } from '@jest/globals';
import { analyzeEmbed } from '../src/embed_analyze';

describe('Yandex Music Embed Analysis', () => {
  it('should correctly extract Yandex Music track and album IDs from a .ru URL', () => {
    const input = 'Listen to this track: https://music.yandex.ru/album/112233/track/445566';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('yandex_music');
    expect(result[0].albumId).toBe('112233');
    expect(result[0].trackId).toBe('445566');
  });

  it('should correctly extract Yandex Music track and album IDs from a .com URL', () => {
    const input = 'Hear this track: https://music.yandex.com/album/778899/track/112233';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('yandex_music');
    expect(result[0].albumId).toBe('778899');
    expect(result[0].trackId).toBe('112233');
  });

  it('should handle Yandex Music URLs without protocol', () => {
    const input = 'Listen at music.yandex.ru/album/112233/track/445566';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('yandex_music');
    expect(result[0].albumId).toBe('112233');
    expect(result[0].trackId).toBe('445566');
  });

  it('should handle Yandex Music URLs with extra characters', () => {
    const input = 'Link: (https://music.yandex.ru/album/112233/track/445566)';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('yandex_music');
    expect(result[0].albumId).toBe('112233');
    expect(result[0].trackId).toBe('445566');
  });

  it('should handle Yandex Music URLs with album and track ID swapped', () => {
    const input = 'Listen at https://music.yandex.ru/track/445566/album/112233';
    const result = analyzeEmbed(input);
    expect(result).toHaveLength(0); // or however you want to handle it - maybe throw an error
  });

});