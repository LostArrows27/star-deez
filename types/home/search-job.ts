export interface JobResponse {
  data: Data;
}

export interface Data {
  jobTitles: JobTitle[];
}

export interface JobTitle {
  id: string;
  label: string;
  __typename: string;
}
