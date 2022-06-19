export type School = {
  id: string;
  month: string;
  camp: string;
  country: string;
  school: string;
  lessons: number;
};

export type graphData = {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
};

export type analysis = {
  analysis_main: string;
  analysis_sub: string;
  list_1: string;
  list_2: string;
  list_3: string;
  show_all: string;
  chart_main: string;
  schools_main: string;
};
