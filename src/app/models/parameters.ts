export interface ParametersMain {
  overallHealth?: ParametersMainOptions;
  immunity?: ParametersMainOptions;
  nutrition?: ParametersMainOptions;
  hydration?: ParametersMainOptions;
  liverHealth?: ParametersMainOptions;
  kidney?: ParametersMainOptions;
}

export interface ParametersMainOptions {
  key?: string;
  name?: string;
  imgBlack?: string;
  imgWhite?: string;
}
