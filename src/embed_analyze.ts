import {MatchResult} from './data'
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

    return results;
}