interface MatchResult {
    type: string;
    videoId: string | null;
    url: string;
    index: number;
}

interface AnalysisResult {
    [key: string]: MatchResult[];
}

interface PlatformRegex {
    [key: string]: string;
}


const PLATFORM_REGEX: PlatformRegex = {
        // video
        'YOUTUBE': '(?:https?://)?(?:www\\.)?(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/)([\\w-]+)',
        'VIMEO': '(?:https?://)?(?:www\\.)?vimeo\\.com\\/(\\d+)',
        'RUTUBE': '(?:https?://)?(?:www\\.)?rutube\\.ru\\/video\\/([\\w-]+)\/',
        'VK': '(?:https?://)?(?:www\\.)?vk\\.com\\/video-?(\\d+)_(\\d+)', // Modified VK regex to capture both parts of the ID

        // audio
        // 'SOUNDCLOUD': //,
        // 'SPOTIFY': //,
        // 'APPLE_MUSIC': //,
        // 'BANDCAMP': //,
        // 'ANCHOR': //,

        // social networks
        // 'X': //,
        // 'FACEBOOK': //,
        // 'INSTAGRAM': //,
        // 'TIKTOK': //,
        // 'PINTEREST': //,
        // 'REDDIT': //,

        // maps
        // 'GOOGLE_MAPS': //,
        // 'OPEN_STREET_MAP': //,
        // 'MAPBOX': //,

        // documents
        // 'GOOGLE_DOCS': //,
        // 'GOOGLE_SHEETS': //,
        // 'GOOGLE_SLIDES': //,
        // 'MICROSOFT_ONE_DRIVE': //,
        // 'SCRIBD': //,
        // 'SLIDE_SHARE': //,
        // 'PREZI': //,

        // 3D-models
        // 'SKETCHFAB': //,

        // other
        // 'TYPEFORM': //,
        // 'CODEPEN': //,
        // 'JSFIDDLE': //,
        // 'CODE_SANDBOX': //,
        // 'GOOGLE_FORMS': //,
        // 'THING_LINK': //,
        // 'CEROS': //,
}

export function analyzeEmbed(data: string): AnalysisResult {
    const results: AnalysisResult = {};

    for (const [type, regexString] of Object.entries(PLATFORM_REGEX)) { // Только для VIDEO, чтобы не было ошибок
        const regex = new RegExp(regexString, 'g');
        const matches: MatchResult[] = [];
        let match: RegExpExecArray | null;

        while ((match = regex.exec(data)) !== null) {
            const fullMatch = match[0];
            let videoId: string | null = match[1] || null;

            // Handle VK video ID specifically.  The regex now captures both parts.
            if (type === 'VK') {
                videoId = `${match[1]}_${match[2]}`;
            }


            matches.push({
                type,
                videoId: videoId,
                url: fullMatch,
                index: match.index,
            });
        }

        if (matches.length > 0) {
            results[type] = matches;
        }
    }

    return results;
}

// Пример использования:
const inputString = 'Привет. Вот видео с котами https://www.youtube.com/watch?v=JxS5E-kZc2s и плейлист:https://www.youtube.com/watch?v=yRfKToBbdOc     https://www.youtube.com/watch?v=OWXMsL_JnQQ  А вот видео Rutube: https://rutube.ru/video/b1c6f3a861e2e4f84179ba2f92521a57/  и vk: https://vk.com/video-45256126_456242536';
const analysis = analyzeEmbed(inputString);
console.log(analysis);