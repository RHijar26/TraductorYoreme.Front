export interface GetPhraseResponse {
    data: Phrases[];
    page: number;
    pageSize: number;
}

export interface Phrases {
    id: number;
    phrase: string;
    phraseLanguage: string;
    translation: string;
    translationLanguage: string;
    region: string;    
    model: string;    
    status: string;
    createDate: Date;
}
