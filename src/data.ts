export interface MatchResult {
    type: string;
    videoId: string | null;
    url: string;
    index: number;
}

export interface PlatformRegex {
    [key: string]: string;
}

export const PLATFORM_REGEX: PlatformRegex = {
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