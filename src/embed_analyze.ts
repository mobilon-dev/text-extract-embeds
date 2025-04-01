import {MatchResult, PLATFORM_REGEX} from './data'
import {Analyzer} from './analyzer'
import {
    YoutubeStrategy,
    VimeoStrategy,
    RutubeStrategy,
    VkVideoStrategy,
    YandexMusicStrategy,
} from './strategy'

export function analyzeEmbed(data: string): MatchResult[] {
    const results: MatchResult[] = [];
    const analyzer: Analyzer = new Analyzer();
    analyzer.use("youtube", new YoutubeStrategy());
    analyzer.use("vimeo", new VimeoStrategy());
    analyzer.use("rutube", new RutubeStrategy());
    analyzer.use("vk_video", new VkVideoStrategy());
    analyzer.use("yandex_music", new YandexMusicStrategy());


    const youtubeMatches = analyzer.analyze("youtube", data);
    if (youtubeMatches) results.push(...youtubeMatches);
    const vimeoMatches = analyzer.analyze("vimeo", data);
    if (vimeoMatches) results.push(...vimeoMatches);
    const rutubeMatches = analyzer.analyze("rutube", data);
    if (rutubeMatches) results.push(...rutubeMatches);
    const vkVideoMatches = analyzer.analyze("vk_video", data);
    if (vkVideoMatches) results.push(...vkVideoMatches);
    const yandexMusicMatches = analyzer.analyze("yandex_music", data);
    if (yandexMusicMatches) results.push(...yandexMusicMatches);
    /*
    for (const [type, regexString] of Object.entries(PLATFORM_REGEX)) {
        const regex = new RegExp(regexString, 'g');
        let match: RegExpExecArray | null;

        while ((match = regex.exec(data)) !== null) {
            const fullMatch = match[0];
            let videoId: string | null = match[1] || null;

            // Handle VK video ID specifically.  The regex now captures both parts.
            if (type === 'VK') {
                videoId = `${match[1]}_${match[2]}`;
            }


            results.push({
                type,
                videoId: videoId,
                url: fullMatch,
                index: match.index,
            });
        }
    }
    */

    return results;
}

// Пример использования:
/*
const inputString = 'Привет. Вот видео с котами https://www.youtube.com/watch?v=JxS5E-kZc2s и плейлист:https://www.youtube.com/watch?v=yRfKToBbdOc     https://www.youtube.com/watch?v=OWXMsL_JnQQ  А вот видео Rutube: https://rutube.ru/video/b1c6f3a861e2e4f84179ba2f92521a57/  и vk: https://vk.com/video-45256126_456242536';
const analysis = analyzeEmbed(inputString);
console.log(analysis);
*/