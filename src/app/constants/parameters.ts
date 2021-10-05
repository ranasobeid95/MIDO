import { ParametersMain } from '../models/parameters';

const BASE_BATH = '../../assets/icons/results-icons/';

export const PARAMETERS_KEYS = [
  'overallHealth',
  'immunity',
  'nutrition',
  'hydration',
  'liverHealth',
  'kidney',
];

export const PARAMETERS_SUB = {
  immunity: [
    { key: 'bacteria', imgUrl: `${BASE_BATH}bacteria.png` },
    { key: 'blood', imgUrl: `${BASE_BATH}heamaturia.png` },
    { key: 'leukocytes', imgUrl: `${BASE_BATH}Leukocyte.png` },
  ],
  nutrition: [
    { key: 'pH_Score', imgUrl: `${BASE_BATH}pH.png` },
    { key: 'glucose', imgUrl: `${BASE_BATH}glucose.png` },
    { key: 'ketones', imgUrl: `${BASE_BATH}ketone.png` },
  ],
  hydration: [{ key: 'gravity', imgUrl: `${BASE_BATH}gravityDark.png` }],
  liverHealth: [
    { key: 'bilirubin', imgUrl: `${BASE_BATH}bilirubin.png` },
    { key: 'urobilinogen', imgUrl: `${BASE_BATH}Urobilinogen.png` },
  ],
  kidney: [{ key: 'proteins', imgUrl: `${BASE_BATH}protein.png` }],
};

export const PARAMETERS_MAIN: ParametersMain = {
  overallHealth: {
    key: 'overallHealth',
    name: 'Health Status',
    imgBlack: `${BASE_BATH}health_status.png`,
    imgWhite: `${BASE_BATH}status-health-light.png`,
  },
  immunity: {
    key: 'immunity',
    name: 'Immunity',
    imgBlack: `${BASE_BATH}Immunity.png`,
    imgWhite: `${BASE_BATH}immunity-light.png`,
  },
  nutrition: {
    key: 'nutrition',
    name: 'Nutrition',
    imgBlack: `${BASE_BATH}Nutrition.png`,
    imgWhite: `${BASE_BATH}nutration-light.png`,
  },
  hydration: {
    key: 'hydration',
    name: 'Hydration',
    imgBlack: `${BASE_BATH}Hydration.png`,
    imgWhite: `${BASE_BATH}hydratiion-light.png`,
  },
  liverHealth: {
    key: 'liverHealth',
    name: 'Liver',
    imgBlack: `${BASE_BATH}Liver.png`,
    imgWhite: `${BASE_BATH}liver-light.png`,
  },
  kidney: {
    key: 'kidney',
    name: 'Kidney',
    imgBlack: `${BASE_BATH}Kidney.png`,
    imgWhite: `${BASE_BATH}kidney-about.png`,
  },
};
