export interface Candidate {
  _id: string;
  name: string;
  createdAt?: string;
}

export interface CandidateResult {
  name: string;
  voteCount: number;
}

export interface CandidatesResponse {
  success: boolean;
  data: {
    candidates: Candidate[];
    count: number;
  };
}

export interface CastVoteRequest {
  candidate_name: string;
}

export interface CastVoteResponse {
  success: boolean;
  message: string;
  data: { candidate: Candidate };
}

export interface ResultsResponse {
  success: boolean;
  data: {
    total: number;
    candidates: CandidateResult[];
  };
}
