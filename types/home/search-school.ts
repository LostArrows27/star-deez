export interface SearchResult {
  results: Result[];
}

export interface Result {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: Exhaustive;
  query: string;
  queryAfterRemoval: string;
  params: string;
  index: string;
  processingTimeMS: number;
  processingTimingsMS: ProcessingTimingsMS;
  serverTimeMS: number;
}

export interface Exhaustive {
  nbHits: boolean;
  typo: boolean;
}

export interface Hit {
  institutionOriginal: string;
  institution: string;
  accountId: string;
  institutionSlug: string;
  objectID: string;
  _highlightResult: HighlightResult;
}

export interface HighlightResult {
  institution: Institution;
}

export interface Institution {
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
}

export interface ProcessingTimingsMS {
  _request: Request;
}

export interface Request {
  roundTrip: number;
}
