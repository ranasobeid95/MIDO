export const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getAverage = (...args: number[]) => {
  let temp = args.reduce((acc, curr) => acc + curr, 0) / args.length;
  return Math.round(temp);
};

export const sortByDate = (res: any[]) => {
  return res.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};
