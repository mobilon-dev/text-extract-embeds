import {MatchResult, PLATFORM_REGEX} from './data'


export interface Strategy {
    analyze(data: string): MatchResult[];
}

// concrete strategies

export class YoutubeStrategy implements Strategy {
    analyze(data: string): MatchResult[]{
        const results: MatchResult[] = [];
        const type = 'YOUTUBE';
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