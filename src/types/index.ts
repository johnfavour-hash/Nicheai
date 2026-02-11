export type SocialPlatform = 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin' | 'facebook' | 'pinterest';
export type ContentType = 'text' | 'image' | 'video' | 'video-series' | 'twitter-thread' | 'instagram-carousel' | 'instagram-story';
export type ContentFormat = 'single' | 'thread' | 'carousel' | 'series' | 'story' | 'script-to-video';
export type ProjectStatus = 'idea' | 'scripting' | 'production' | 'review' | 'published';
export type LegalDocType = 'nda' | 'model_release' | 'sponsorship_agreement' | 'service_agreement';
export type AspectRatio = '16:9' | '9:16' | '1:1';
export type AIVoice = 'Zephyr' | 'Puck' | 'Charon' | 'Kore' | 'Fenrir';

export interface BrandProfile {
    name: string;
    website: string;
    colors: string[];
    voice: string;
    bio: string;
}

export interface Asset {
    id: string;
    url: string;
    type: 'image' | 'video' | 'audio' | 'text';
    name: string;
    dateAdded: number;
}

export interface Project {
    id: string;
    title: string;
    status: ProjectStatus;
    type: ContentType;
    niche: string;
    lastModified: number;
    progress: number;
    description?: string;
    platform?: SocialPlatform;
    publishedUrl?: string;
    content?: GeneratedContent;
    dueDate?: string;
    comments?: number;
}

export interface GeneratedContent {
    id: string;
    type: ContentType;
    title: string;
    caption: string;
    hashtags?: string;
    platforms: SocialPlatform[];
    imageUrl?: string;
    videoUrl?: string;
    publishedUrl?: string;
}

export interface GeneratedText extends GeneratedContent {
    type: 'text' | 'twitter-thread';
}

export interface GeneratedImage extends GeneratedContent {
    type: 'image' | 'instagram-carousel' | 'instagram-story';
}

export interface GeneratedVideo extends GeneratedContent {
    type: 'video' | 'video-series';
}

export interface RepurposedContent {
    platform: SocialPlatform;
    content: GeneratedContent;
}

export interface ScheduledPost {
    id: string;
    content: GeneratedContent;
    scheduledAt: number | Date;
    platforms: SocialPlatform[];
}

export interface StrategyPost {
    day: string;
    platform: SocialPlatform;
    contentType: string;
    prompt: string;
    reason: string;
}

export interface ContentStrategy {
    week: StrategyPost[];
}

export interface AudienceInsights {
    painPoints: string[];
    aspirations: string[];
    trendingTopics: string[];
}

export interface SponsorshipPitch {
    subject: string;
    emailBody: string;
    keySellingPoints: string[];
}

export interface MediaKitData {
    bio: string;
    audienceSummary: string;
    collaborationIdeas: string[];
}

export interface EngagementSuggestions {
    questions: string[];
    polls: string[];
}

export interface ConnectedAccount {
    id: string;
    platform: SocialPlatform;
    handle: string;
}

export interface BriefParams {
    role: 'video_editor' | 'thumbnail_artist' | 'scriptwriter' | 'collab_partner';
    projectTitle: string;
    context: string;
    styleGuide: string;
}

export interface TrendNewsItem {
    title: string;
    summary: string;
    url: string;
    source: string;
    timeAgo: string;
}

export interface ViralityReport {
    score: number;
    reasoning: string;
    hookSuggestions: string[];
    ctaSuggestions: string[];
    hashtagSuggestions: string[];
}

export interface CaptionSegment {
    start: number;
    end: number;
    text: string;
}
