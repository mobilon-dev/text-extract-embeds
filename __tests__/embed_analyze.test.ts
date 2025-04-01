import {describe, expect, test} from '@jest/globals';
import {analyzeEmbed} from '../src/embed_analyze.ts';

describe('analyzeEmbed', () => {
    it('should return an empty array if no matches are found', () => {
        const input = 'This is a string with no embedded links.';
        const result = analyzeEmbed(input);
        expect(result).toEqual([]);
    });

    it('should correctly identify and extract YouTube video IDs', () => {
        const input = 'Check out this video: https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        const result = analyzeEmbed(input);
        expect(result).toHaveLength(1);
        expect(result[0].type).toBe('youtube');
        expect(result[0].videoId).toBe('dQw4w9WgXcQ');
        expect(result[0].url).toBe('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        expect(result[0].index).toBe(22);
    });

    it('should correctly identify and extract multiple YouTube video IDs', () => {
        const input = 'Video 1: https://www.youtube.com/watch?v=dQw4w9WgXcQ Video 2: https://www.youtube.com/watch?v=abcdefg1234';
        const result = analyzeEmbed(input);
        expect(result).toHaveLength(2);
        expect(result[0].videoId).toBe('dQw4w9WgXcQ');
        expect(result[1].videoId).toBe('abcdefg1234');
    });

    it('should correctly identify and extract YouTube video IDs from short URLs', () => {
        const input = 'Short URL: https://youtu.be/abcdefg1234';
        const result = analyzeEmbed(input);
        expect(result).toHaveLength(1);
        expect(result[0].videoId).toBe('abcdefg1234');
    });

    it('should correctly identify and extract Vimeo video IDs', () => {
        const input = 'Watch this: https://vimeo.com/123456789';
        const result = analyzeEmbed(input);
        expect(result).toHaveLength(1);
        expect(result[0].type).toBe('vimeo');
        expect(result[0].videoId).toBe('123456789');
        expect(result[0].url).toBe('https://vimeo.com/123456789');
        expect(result[0].index).toBe(12);
    });

    it('should correctly identify and extract Rutube video IDs', () => {
        const input = 'Check this Rutube video: https://rutube.ru/video/b1c6f3a861e2e4f84179ba2f92521a57/';
        const result = analyzeEmbed(input);
        expect(result).toHaveLength(1);
        expect(result[0].type).toBe('rutube');
        expect(result[0].videoId).toBe('b1c6f3a861e2e4f84179ba2f92521a57');
        expect(result[0].url).toBe('https://rutube.ru/video/b1c6f3a861e2e4f84179ba2f92521a57/');
        expect(result[0].index).toBe(25);
    });

    it('should correctly identify and extract VK video IDs', () => {
        const input = 'Watch this VK video: https://vk.com/video-45256126_456242536';
        const result = analyzeEmbed(input);
        expect(result).toHaveLength(1);
        expect(result[0].type).toBe('vk_video');
        expect(result[0].videoId).toBe('45256126_456242536');
        expect(result[0].url).toBe('https://vk.com/video-45256126_456242536');
        expect(result[0].index).toBe(21);
    });

    it('should handle multiple different platforms correctly', () => {
        const input = 'YouTube: https://www.youtube.com/watch?v=dQw4w9WgXcQ Vimeo: https://vimeo.com/123456789 Rutube: https://rutube.ru/video/b1c6f3a861e2e4f84179ba2f92521a57/ VK: https://vk.com/video-45256126_456242536';
        const result = analyzeEmbed(input);
        expect(result.some(item => item.type === 'youtube')).toBe(true);
        expect(result.some(item => item.type === 'vimeo')).toBe(true);
        expect(result.some(item => item.type === 'rutube')).toBe(true);
        expect(result.some(item => item.type === 'vk_video')).toBe(true);
        expect(result.length).toBe(4);
    });
});