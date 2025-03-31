
import {describe, expect, test} from '@jest/globals';
import {analyzeEmbed} from '../src/embed_analyze.ts';

describe('analyzeEmbed', () => {
    it('should return an empty object if no matches are found', () => {
        const input = 'This is a string with no embedded links.';
        const result = analyzeEmbed(input);
        expect(result).toEqual({});
    });

    it('should correctly identify and extract YouTube video IDs', () => {
        const input = 'Check out this video: https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        const result = analyzeEmbed(input);
        expect(result).toHaveProperty('YOUTUBE');
        expect(result.YOUTUBE).toHaveLength(1);
        expect(result.YOUTUBE[0].type).toBe('YOUTUBE');
        expect(result.YOUTUBE[0].videoId).toBe('dQw4w9WgXcQ');
        expect(result.YOUTUBE[0].url).toBe('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        expect(result.YOUTUBE[0].index).toBe(22);
    });

    it('should correctly identify and extract multiple YouTube video IDs', () => {
        const input = 'Video 1: https://www.youtube.com/watch?v=dQw4w9WgXcQ Video 2: https://www.youtube.com/watch?v=abcdefg1234';
        const result = analyzeEmbed(input);
        expect(result).toHaveProperty('YOUTUBE');
        expect(result.YOUTUBE).toHaveLength(2);
        expect(result.YOUTUBE[0].videoId).toBe('dQw4w9WgXcQ');
        expect(result.YOUTUBE[1].videoId).toBe('abcdefg1234');
    });

    it('should correctly identify and extract YouTube video IDs from short URLs', () => {
        const input = 'Short URL: https://youtu.be/abcdefg1234';
        const result = analyzeEmbed(input);
        expect(result).toHaveProperty('YOUTUBE');
        expect(result.YOUTUBE).toHaveLength(1);
        expect(result.YOUTUBE[0].videoId).toBe('abcdefg1234');
    });

    it('should correctly identify and extract Vimeo video IDs', () => {
        const input = 'Watch this: https://vimeo.com/123456789';
        const result = analyzeEmbed(input);
        expect(result).toHaveProperty('VIMEO');
        expect(result.VIMEO).toHaveLength(1);
        expect(result.VIMEO[0].type).toBe('VIMEO');
        expect(result.VIMEO[0].videoId).toBe('123456789');
        expect(result.VIMEO[0].url).toBe('https://vimeo.com/123456789');
        expect(result.VIMEO[0].index).toBe(12);
    });

    it('should correctly identify and extract Rutube video IDs', () => {
        const input = 'Check this Rutube video: https://rutube.ru/video/b1c6f3a861e2e4f84179ba2f92521a57/';
        const result = analyzeEmbed(input);
        expect(result).toHaveProperty('RUTUBE');
        expect(result.RUTUBE).toHaveLength(1);
        expect(result.RUTUBE[0].type).toBe('RUTUBE');
        expect(result.RUTUBE[0].videoId).toBe('b1c6f3a861e2e4f84179ba2f92521a57');
        expect(result.RUTUBE[0].url).toBe('https://rutube.ru/video/b1c6f3a861e2e4f84179ba2f92521a57/');
        expect(result.RUTUBE[0].index).toBe(25);
    });

    it('should correctly identify and extract VK video IDs', () => {
        const input = 'Watch this VK video: https://vk.com/video-45256126_456242536';
        const result = analyzeEmbed(input);
        expect(result).toHaveProperty('VK');
        expect(result.VK).toHaveLength(1);
        expect(result.VK[0].type).toBe('VK');
        expect(result.VK[0].videoId).toBe('45256126_456242536');
        expect(result.VK[0].url).toBe('https://vk.com/video-45256126_456242536');
        expect(result.VK[0].index).toBe(21);
    });

    it('should handle multiple different platforms correctly', () => {
        const input = 'YouTube: https://www.youtube.com/watch?v=dQw4w9WgXcQ Vimeo: https://vimeo.com/123456789 Rutube: https://rutube.ru/video/b1c6f3a861e2e4f84179ba2f92521a57/ VK: https://vk.com/video-45256126_456242536';
        const result = analyzeEmbed(input);
        expect(result).toHaveProperty('YOUTUBE');
        expect(result).toHaveProperty('VIMEO');
        expect(result).toHaveProperty('RUTUBE');
        expect(result).toHaveProperty('VK');

        expect(result.YOUTUBE[0].videoId).toBe('dQw4w9WgXcQ');
        expect(result.VIMEO[0].videoId).toBe('123456789');
        expect(result.RUTUBE[0].videoId).toBe('b1c6f3a861e2e4f84179ba2f92521a57');
        expect(result.VK[0].videoId).toBe('45256126_456242536');
    });

    it('should handle strings with no protocol (e.g., "www.youtube.com...")', () => {
        const input = 'Check out www.youtube.com/watch?v=dQw4w9WgXcQ';
        const result = analyzeEmbed(input);
        expect(result).toHaveProperty('YOUTUBE');
        expect(result.YOUTUBE).toHaveLength(1);
        expect(result.YOUTUBE[0].videoId).toBe('dQw4w9WgXcQ');
    });

    it('should handle strings with extra characters around the URLs', () => {
        const input = 'Here is a link: (https://www.youtube.com/watch?v=dQw4w9WgXcQ).';
        const result = analyzeEmbed(input);
        expect(result).toHaveProperty('YOUTUBE');
        expect(result.YOUTUBE).toHaveLength(1);
        expect(result.YOUTUBE[0].videoId).toBe('dQw4w9WgXcQ');
    });

    it('should correctly extract multiple instances of the same platform', () => {
        const input = 'YouTube video 1: https://www.youtube.com/watch?v=dQw4w9WgXcQ, YouTube video 2: https://www.youtube.com/watch?v=abcdefg1234';
        const result = analyzeEmbed(input);
        expect(result).toHaveProperty('YOUTUBE');
        expect(result.YOUTUBE).toHaveLength(2);
        expect(result.YOUTUBE[0].videoId).toBe('dQw4w9WgXcQ');
        expect(result.YOUTUBE[1].videoId).toBe('abcdefg1234');
    });

    it('should not identify invalid URLs', () => {
        const input = 'This is not a URL: youtube.com/watch?v=dQw4w9WgXcQ'; // Missing protocol
        const result = analyzeEmbed(input);
        expect(result).toEqual({});
    });
});