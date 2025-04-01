import {MatchResult, PLATFORM_REGEX} from './data'


export interface Strategy {
    analyze(data: string): MatchResult[];
}

// concrete strategies

export class YoutubeStrategy implements Strategy {
    analyze(data: string): MatchResult[]{
        const results: MatchResult[] = [];
        const type = 'youtube';
        const regexString = PLATFORM_REGEX[type];
            const regex = new RegExp(regexString, 'g');
            let match: RegExpExecArray | null;
    
            while ((match = regex.exec(data)) !== null) {
                const fullMatch = match[0];
                let videoId: string | null = match[1] || null;
    
                results.push({
                    type,
                    videoId: videoId,
                    url: fullMatch,
                    index: match.index,
                });
            }
    
        return results;
  }
}

export class VimeoStrategy implements Strategy {
    analyze(data: string): MatchResult[]{
        const results: MatchResult[] = [];
        const type = 'vimeo';
        const regexString = PLATFORM_REGEX[type];
            const regex = new RegExp(regexString, 'g');
            let match: RegExpExecArray | null;
    
            while ((match = regex.exec(data)) !== null) {
                const fullMatch = match[0];
                let videoId: string | null = match[1] || null;
    
                results.push({
                    type,
                    videoId: videoId,
                    url: fullMatch,
                    index: match.index,
                });
            }
    
        return results;
  }
}

export class RutubeStrategy implements Strategy {
    analyze(data: string): MatchResult[]{
        const results: MatchResult[] = [];
        const type = 'rutube';
        const regexString = PLATFORM_REGEX[type];
            const regex = new RegExp(regexString, 'g');
            let match: RegExpExecArray | null;
    
            while ((match = regex.exec(data)) !== null) {
                const fullMatch = match[0];
                let videoId: string | null = match[1] || null;
    
                results.push({
                    type,
                    videoId: videoId,
                    url: fullMatch,
                    index: match.index,
                });
            }
    
        return results;
  }
}

export class VkVideoStrategy implements Strategy {
    analyze(data: string): MatchResult[]{
        const results: MatchResult[] = [];
        const type = 'vk_video';
        const regexString = PLATFORM_REGEX[type];
            const regex = new RegExp(regexString, 'g');
            let match: RegExpExecArray | null;
    
            while ((match = regex.exec(data)) !== null) {
                const fullMatch = match[0];
                let videoId: string | null = match[1] || null;

                // Handle VK video ID specifically.  The regex now captures both parts.
                videoId = `${match[1]}_${match[2]}`;
    
                results.push({
                    type,
                    videoId: videoId,
                    url: fullMatch,
                    index: match.index,
                });
            }
    
        return results;
  }
}