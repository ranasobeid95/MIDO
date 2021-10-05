import { Keys_Value_Select } from 'src/app/models/result';

export function sortResponse(data: any[]) {
  return data.sort((a: any, b: any) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
}

export function handelFormatDateInArr(arr: any[], key: string) {
  return arr.map((el) => {
    let formattedDate;
    if (typeof el[`${key}`] === 'object') {
      formattedDate = el[`${key}`].toDate();
    } else {
      formattedDate = el[`${key}`];
    }
    return { ...el, [key]: formattedDate };
  });
}

export const getSpecificKey = (_param: string): Keys_Value_Select => {
  const param = _param.toLowerCase();
  let res: Keys_Value_Select = {};

  if (param === 'health') {
    res = { keyText: 'healthText', keyValue: 'overallHealth' };
  } else if (param === 'liver') {
    res = { keyText: 'liverText', keyValue: 'liverHealth' };
  } else {
    res = { keyText: `${param}Text`, keyValue: param };
  }

  return res;
};
