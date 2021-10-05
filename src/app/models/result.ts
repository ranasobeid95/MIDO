export interface Result {
  overallHealth?: number;
  healthText?: string;
  bacteria?: number;
  dateModified?: Date;
  createdAt?: Date;
  blood?: number;
  leukocytes?: number;
  immunity?: number;
  immunityText?: string;
  pH_Value?: number;
  pH_Score?: number;
  glucose?: number;
  ketones?: number;
  nutrition?: number;
  nutritionText?: string;
  hydration?: number;
  gravity?: number;
  hydrationText?: string;
  bilirubin?: number;
  urobilinogen?: number;
  liverHealth?: number;
  liverText?: string;
  proteins?: number;
  kidney?: number;
  kidneyText?: string;
  rec_1?: string;
  rec_2?: string;
}

export interface RESULTS_TYPES {
  id: number;
  title: string;
  name: string;
  path: string;
  imgName: string;
  param?: string | null;
  percent?: number;
  lastAverage?: number;
}

export interface Chart_Result {
  label: string;
  para: Array<string>;
}

export interface Parameters_Keys {
  Immunity: string;
  Hydration: string;
  Nutrition: string;
  Liver: string;
  Kidney: string;
}

export interface Health_Text {
  text: string;
  rec_1: string;
  rec_2: string | null;
}

export interface Keys_Value_Select {
  keyText?: string;
  keyValue?: string;
}
