import {describe, expect, test} from '@jest/globals';
import {analyzeEmbed} from '../src/embed_analyze.ts';

describe('General Embed Analysis', () => {
    it('should return an empty array if no matches are found', () => {
        const input = 'This is a string with no embedded links.';
        const result = analyzeEmbed(input);
        expect(result).toEqual([]);
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