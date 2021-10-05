import { RESULT } from 'src/app/constants/result';
import { ROUTES } from 'src/app/constants/routes';
import { Result, RESULTS_TYPES } from 'src/app/models/result';

const BASE_BATH = '../../../assets/icons/results-icons/';

export const RESULTS_LIST: RESULTS_TYPES[] = [
  {
    id: 1,
    name: 'Current Health Status',
    path: ROUTES.RESULTS_PAGE,
    imgName: `${BASE_BATH}health_status.png`,
    title: 'Health Status',
    percent: RESULT.overallHealth,
    lastAverage: 90,
  },
  {
    id: 2,
    name: 'Immunity',
    path: ROUTES.RESULTS_PAGE,
    imgName: `${BASE_BATH}Immunity.png`,
    param: 'Immunity',
    title: 'Immunity',
    percent: RESULT.immunity,
    lastAverage: 90,
  },
  {
    id: 3,
    name: 'Hydration',
    path: ROUTES.RESULTS_PAGE,
    imgName: `${BASE_BATH}Hydration.png`,
    param: 'Hydration',
    title: 'Hydration',
    percent: RESULT.hydration,
    lastAverage: 90,
  },
  {
    id: 4,
    name: 'Nutrition',
    path: ROUTES.RESULTS_PAGE,
    imgName: `${BASE_BATH}Nutrition.png`,
    param: 'Nutrition',
    title: 'Nutrition',
    percent: RESULT.nutrition,
    lastAverage: 90,
  },
  {
    id: 5,
    name: 'Liver',
    path: ROUTES.RESULTS_PAGE,
    imgName: `${BASE_BATH}Liver.png`,
    param: 'Liver',
    title: 'Liver',
    percent: RESULT.liverHealth,
    lastAverage: 90,
  },
  {
    id: 6,
    name: 'Kidney',
    path: ROUTES.RESULTS_PAGE,
    imgName: `${BASE_BATH}Kidney.png`,
    param: 'Kidney',
    title: 'Kidney',
    percent: RESULT.kidney,
    lastAverage: 90,
  },
];
