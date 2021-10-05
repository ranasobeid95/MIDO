import { Result } from 'src/app/models/result';

export const getLabels = (data: any[], datePipe: any) => {
  return data.map((el: any, i: number, arr: any[]) => {
    let curr = datePipe.transform(el.createdAt, 'MMM-dd');

    if (arr.length === 1) return curr;

    if (i === 0) {
      let next = datePipe.transform(arr[i + 1].createdAt, 'MMM-dd');
      return curr !== next
        ? curr
        : datePipe.transform(el.createdAt, 'MMM-dd h:mm');
    } else if (i < arr.length - 1) {
      let next = datePipe.transform(arr[i + 1].createdAt, 'MMM-dd');
      let prev = datePipe.transform(arr[i - 1].createdAt, 'MMM-dd');
      return curr !== next && curr !== prev
        ? curr
        : datePipe.transform(el.createdAt, 'MMM-dd h:mm');
    } else {
      let prev = datePipe.transform(arr[i - 1].createdAt, 'MMM-dd');
      return curr !== prev
        ? curr
        : datePipe.transform(el.createdAt, 'MMM-dd h:mm');
    }
  }) as string[];
};

export const getParametersDetails = (data: Result[]) => {
  const values: Result = data.reduce((acc: any | any[], curr, i) => {
    if (i === 0) {
      Object.keys(curr).forEach((el) => {
        if (typeof curr[`${el}` as keyof Result] === 'number') {
          acc[`${el}`] = [curr[el as keyof Result]];
        }
      });
    } else {
      Object.keys(curr).forEach((el) => {
        if (typeof curr[`${el}` as keyof Result] === 'number') {
          acc[`${el}`].push(curr[el as keyof Result]);
        }
      });
    }

    return acc;
  }, {});

  let paramsMain = {
    Health: {
      data: values.overallHealth,
      label: 'Health',
      message: data[data.length - 1].healthText,
      paramsName: ['Immunity', 'Nutrition', 'Hydration', 'Liver', 'Kidney'],
    },
    Immunity: {
      data: values.immunity,
      label: 'Immunity',
      message: data[data.length - 1].immunityText,
      params: [
        { data: values.bacteria, label: 'bacteria' },
        { data: values.blood, label: 'blood' },
        { data: values.leukocytes, label: 'leukocytes' },
      ],
    },
    Nutrition: {
      data: values.nutrition,
      label: 'Nutrition',
      message: data[data.length - 1].nutritionText,
      params: [
        { data: values.pH_Score, label: 'pH_Score' },
        { data: values.glucose, label: 'glucose' },
        { data: values.ketones, label: 'ketones' },
      ],
    },
    Hydration: {
      data: values.hydration,
      label: 'Hydration',
      message: data[data.length - 1].hydrationText,
      params: [{ data: values.gravity, label: 'gravity' }],
    },
    Liver: {
      data: values.liverHealth,
      label: 'Liver',
      message: data[data.length - 1].liverText,
      params: [
        { data: values.bilirubin, label: 'bilirubin' },
        { data: values.urobilinogen, label: 'Urobilinogen' },
      ],
    },
    Kidney: {
      data: values.kidney,
      label: 'Kidney',
      message: data[data.length - 1].kidneyText,
      params: [{ data: values.proteins, label: 'Protein' }],
    },
  };
  return paramsMain;
};

export const handelDataSet = (key: string, resultsDetails: any) => {
  let dataSet: any = [];
  if (key === 'Health') {
    resultsDetails.Health.paramsName.forEach((el: any) => {
      dataSet.push({
        data: resultsDetails[el].data,
        label: resultsDetails[el].label,
      });
    });
  } else {
    dataSet = [...resultsDetails[key].params];
  }

  return dataSet;
};

export const filterResultsRangeDate = (
  resArr: Result[],
  dateFirst: Date,
  dateLast: Date
) => {
  let firstDateInArr = new Date(resArr[0].createdAt!).setHours(0, 0, 0, 0);

  let rangeFirst = new Date(dateFirst).setHours(0, 0, 0, 0);
  let rangeLast = new Date(dateLast).setHours(0, 0, 0, 0);
  if (rangeLast < firstDateInArr) {
    return [];
  }

  let start: any = null;
  let end: any = null;
  for (let a = 0, z = resArr.length - 1; a < resArr.length - 1; a++, z--) {
    let dateFromStart = new Date(resArr[a].createdAt!).setHours(0, 0, 0, 0);
    let dateFromEnd = new Date(resArr[z].createdAt!).setHours(0, 0, 0, 0);
    if (start === null && dateFromStart >= rangeFirst) {
      start = a;
    }
    if (end === null && dateFromEnd <= rangeLast) {
      end = z;
    }

    if (start !== null && end !== null) break;
  }

  end = end !== null ? end : 0;
  start = start !== null ? start : resArr.length - 1;
  return resArr.slice(start, end + 1);
};
