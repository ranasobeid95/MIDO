import { Health_Text, Result } from 'src/app/models/result';

export const generateImmunityText = (r: Result) => {
  const endMsgOne = `This week up your intake of Vit-C, drink plenty of fluids and avoid holding your urine. This can help your body battle any infection. Let's check back next week to track your progress`;

  const endMsgTwo = `This week up your intake of Vit-C, drink plenty of fluids and avoid holding your urine. This can help your body battle any infection. Consider checking with a doctor to help speed up your recovery!`;
  // 1
  if (r.blood! >= 80 && r.bacteria! >= 80 && r.leukocytes! >= 80) {
    return 'Your immunity today is OPTIMAL, NO signal of infection was detected!';
  }
  // 2)
  else if (
    r.blood! >= 80 &&
    r.bacteria! >= 80 &&
    r.leukocytes! < 80 &&
    r.leukocytes! >= 65
  ) {
    return `Mido detected traces of white-blood cells (WBC- leukocytes) in your urine. This can be sign of an infection. ${endMsgOne}`;
  }
  // 3)
  else if (r.blood! >= 80 && r.bacteria! >= 80 && r.leukocytes! < 65) {
    return `Mido detected white-blood cells (WBC- leukocytes) in your urine. This can mean that your body is battling an infection. ${endMsgOne}`;
  }
  // 4)
  else if (
    r.blood! < 80 &&
    r.blood! > 65 &&
    r.bacteria! >= 80 &&
    r.leukocytes! >= 80
  ) {
    return `Mido detected traces of blood in your urine. This can be sign of an infection.${endMsgOne}`;
  }
  // 5)
  else if (r.blood! < 65 && r.bacteria! >= 80 && r.leukocytes! >= 80) {
    return `Mido detected blood in your urine. This can mean that your body is bat.tling an infection. ${endMsgOne}`;
  }
  // 6)
  else if (
    r.blood! >= 80 &&
    r.bacteria! < 80 &&
    r.bacteria! > 65 &&
    r.leukocytes! >= 80
  ) {
    return `Mido detected traces bacteria in your urine. This can be sign of an infection. ${endMsgOne}`;
  }
  // 7)
  else if (r.blood! >= 80 && r.bacteria! < 65 && r.leukocytes! >= 80) {
    return `Mido detected bacteria in your urine. This can mean that your body is battling an infection. ${endMsgOne}`;
  }
  // 8)
  else if (r.blood! < 80 && r.bacteria! >= 80 && r.leukocytes! < 80) {
    return `Mido detected bacteria and white-blood cells (WBC- leukocytes) in your urine. This can be sign of an infection. ${endMsgOne}`;
  }
  // 9)
  else if (r.blood! < 80 && r.bacteria! < 80 && r.leukocytes! >= 80) {
    return `Mido detected blood and bacteria in your urine. This can be sign of an infection. ${endMsgOne}`;
  }
  // 10)
  else if (r.blood! >= 80 && r.bacteria! < 80 && r.leukocytes! < 80) {
    return `Mido detected bacteria and white blood cells in your urine. This can be sign of an infection. ${endMsgOne}`;
  }
  // 11)
  else if (r.blood! < 65 && r.bacteria! < 65 && r.leukocytes! < 65) {
    return `Mido detected  white-blood cells (WBC- leukocytes), bacteria & blood in your urine. This signals an INFECTION. ${endMsgTwo}`;
  }
  // 12)
  else {
    return `Mido detected traces of white-blood cells (WBC- leukocytes), bacteria & blood in your urine. This signals a a potential INFECTION. ${endMsgTwo}`;
  }
};

export const generateNutritionText = (r: Result) => {
  // 1
  if (r.pH_Score! >= 80 && r.glucose! >= 80 && r.ketones! >= 80) {
    return 'Your nutrition today is OPTIMAL! No signs for metabolic disorders detected and well balanced nutrition!';
  }
  // 2)
  else if (
    r.pH_Score! >= 80 &&
    r.glucose! >= 80 &&
    r.ketones! < 80 &&
    r.ketones! >= 65
  ) {
    return `Your nutrition today is GOOD! Mido detected traces of ketones. This can happen if you haven't eaten in a while, or if you're limiting carbs, but can also signal metabolic disorder! Let's continue tracking to prevent metabolic disorders from arising!`;
  }
  // 3)
  else if (r.pH_Score! >= 80 && r.glucose! >= 80 && r.ketones! < 65) {
    return `Your nutrition today needs some work! Ketones were detected in your urine.  Ketones can appear in your urine if you have been fasting, or limiting your carbs, but they can also signal metabolic disorders! This week limit your added sugars, and get moving! Exercise can limit risk of metabolic disorders! Let's check back next week`;
  }
  // 4)
  else if (
    r.pH_Score! < 80 &&
    r.pH_Score! > 65 &&
    r.glucose! >= 80 &&
    r.ketones! >= 80
  ) {
    return `Your nutrition today is GOOD! Mido detected that your urine is slightly acidic. This week up your veggie and fruit intake to help balance your body's pH. A balance body pH can help the proteins in your body function its best!`;
  }
  // 5)
  else if (r.pH_Score! < 65 && r.glucose! >= 80 && r.ketones! >= 80) {
    return `Your nutrition today needs some work! Your urine's pH is acidic! Balance your pH by increasing the intake of fruits and veggies. A balance body pH can help your proteins function best, and even prevent kidney disorders!`;
  }
  // 6)
  else if (
    r.pH_Score! >= 80 &&
    r.glucose! < 80 &&
    r.glucose! > 65 &&
    r.ketones! >= 80
  ) {
    return `Your nutrition today is OK! Mido detected traces of glucose in your urine. This can happen if your blood glucose is out of control. This week limit your added sugars and carbs! You can also try to get-moving, exercise has proven effective in getting your glucose under control, and limiting your risk for metabolic disorders!`;
  }
  // 7)
  else if (r.pH_Score! >= 80 && r.glucose! < 65 && r.ketones! >= 80) {
    return `Your nutrition today needs some work! Glucose was detected in your urine! Tugar in your urine can signal metabolic disorders! limit your intake of added sugars and carbs; and get moving! This can prevent any potential metabolic disorder from arising! Let's check back next week for improvements!`;
  }
  // 8)
  else if (r.pH_Score! < 80 && r.glucose! >= 80 && r.ketones! < 80) {
    return `Your nutrition today needs some work! Your pH is  acidic, and  ketones were detected. This week up your intake of veggies to balance your pH. Ketones can appear in your urine if you have been fasting, or limiting your carbs, but they can also signal metabolic disorders! This week limit your added sugars, and get moving! Exercise can limit risk of metabolic disorders! Let's check back next week`;
  }
  // 9)
  else if (r.pH_Score! < 80 && r.glucose! < 80 && r.ketones! >= 80) {
    return `Your nutrition today needs some work! Your pH is  acidic, and  glucose were detected. This week up your intake of veggies to balance your pH. Sugar in your urine can signal metabolic disorders! limit your intake of added sugars and carbs; and get moving! This can prevent any potential metabolic disorder from arising!`;
  }
  // 10)
  else if (r.pH_Score! >= 80 && r.glucose! < 80 && r.ketones! < 80) {
    return `Your nutrition today needs some work! Ketones  and  glucose were detected. Sugar and Ketones in your urine can signal metabolic disorders! limit your intake of added sugars and carbs; and get moving! This can prevent any potential metabolic disorder from arising! Let's check back next week for improvements!`;
  }
  // 11)
  else if (r.pH_Score! < 65 && r.glucose! < 65 && r.ketones! < 65) {
    return `Your nutrition today needs some work! Your pH is  acidic, ketones and glucose were detected- you have high risk for metabolic disorders! This week up your intake of veggies to balance your pH; limit your intake of added sugars and carbs; and get moving! This can help to keep your glucose under control! Let's check again next week!`;
  }
  // 12)
  else {
    return `Your nutrition today needs some work! Your pH is slightly acidic, and traces of ketones and glucose were detected. This week up your intake of veggies to balance your pH; limit your intake of added sugars and carbs; and get moving! This can help to keep your glucose under control!`;
  }
};

export const generateHydrationText = (r: Result) => {
  // 1
  if (r.gravity! >= 90) {
    return `Your hydration today is OPTIMAL! Keep your current water intake to keep your body functioning its best!`;
  }
  // 2
  else if (r.gravity! < 90 && r.gravity! >= 80) {
    return `Your hydration today is GOOD! Reach OPTIMAL hydration status by increasing your water intake by 1 daily water-glass!`;
  }
  // 3
  else if (r.gravity! < 80 && r.gravity! >= 65) {
    return `Your hydration today is low. Up your water intake by 2-3 daily water-glasses in order to reach OPTIMAL hydration status! Remember that water is essential to all of your bodily functions!`;
  } else {
    return `Your hydration today is LOW. Your body needs more water to function properly. Up your water intake by 4-6 daily glasses to help your body function its best! Remember that your body needs water for all its normal body functions!`;
  }
};
export const generateLiverText = (r: Result) => {
  // 1
  if (r.urobilinogen! >= 90 && r.bilirubin! >= 90) {
    return `Your liver function is OPTIMAL today! Keep-it up!`;
  }
  // 2
  else if (
    r.urobilinogen! < 90 &&
    r.urobilinogen! >= 80 &&
    r.bilirubin! < 90 &&
    r.bilirubin! >= 80
  ) {
    return `Your liver function is GOOD today! Make it optimal by trying some liver friendly foods this week: green tea, black coffee, avocado or fatty-fish!`;
  }
  // 3
  else if (r.urobilinogen! >= 80 && r.bilirubin! < 80 && r.bilirubin! >= 65) {
    return `Your liver function is GOOD today! Make it optimal by trying some liver friendly foods this week: green tea, black coffee, avocado or fatty-fish!`;
  }
  // 4
  else if (r.urobilinogen! >= 80 && r.bilirubin! < 65) {
    return `Mido detected bilirubin! This can happen if your liver is stressed! This week limit your alcohol consumption to zero, and help your liver introducing some liver friendly foods. Give green tea, black coffee, avocado or fatty-fish a try this week!`;
  }
  // 5
  else if (
    r.urobilinogen! < 80 &&
    r.urobilinogen! >= 65 &&
    r.bilirubin! >= 80
  ) {
    return `Mido detected traces of urobilinogen! This can happen if your liver is stressed! This week limit your alcohol consumption, and help your liver introducing some liver friendly foods. Give green tea, black coffee, avocado or fatty-fish a try this week!`;
  }
  // 6
  else if (r.urobilinogen! < 65 && r.bilirubin! >= 80) {
    return `Mido detected urobilinogen! This can happen if your liver is stressed! This week limit your alcohol consumption to zero, and help your liver introducing some liver friendly foods. Give green tea, black coffee, avocado or fatty-fish a try this week!`;
  }
  // 7
  else if (
    r.urobilinogen! < 80 &&
    r.urobilinogen! >= 65 &&
    r.bilirubin! < 80 &&
    r.bilirubin! >= 65
  ) {
    return `Mido detected traces of urobilinogen and bilirubin! This can happen if your liver is stressed! This week limit your alcohol consumption, and help your liver introducing some liver friendly foods. Give green tea, black coffee, avocado or fatty-fish a try this week!`;
  }
  // 8
  else if (r.urobilinogen! < 80 && r.urobilinogen! >= 65 && r.bilirubin! < 65) {
    return `Mido detected bilirubin and traces of urobilinogen! This can happen if your liver is stressed! This week limit your alcohol consumption to zero, and help your liver introducing some liver friendly foods. Give green tea, black coffee, avocado or fatty-fish a try this week!`;
  }
  // 9
  else if (r.urobilinogen! < 65 && r.bilirubin! < 80 && r.bilirubin! >= 65) {
    return `Mido detected bilirubin and traces of urobilinogen! This can happen if your liver is stressed! This week limit your alcohol consumption to zero, and help your liver introducing some liver friendly foods. Give green tea, black coffee, avocado or fatty-fish a try this week!`;
  } else {
    return `Mido detected  urobilinogen and bilirubin! This can happen if your liver is stressed! This week limit your alcohol consumption to zero, and help your liver introducing some liver friendly foods. Give green tea, black coffee, avocado or fatty-fish a try this week! Let's check back next week!`;
  }
};

export const generateKidneyText = (r: Result) => {
  // 1
  if (r.proteins! >= 90) {
    return `Your kidney-function is OPTIMAL today! Keep it up!`;
  }
  // 2
  else if (r.proteins! < 90 && r.proteins! >= 80) {
    return `Your kidney-function today is GOOD today! Reach OPTIMAL levels by limiting your processed foods intake!`;
  }
  // 3
  else if (r.proteins! < 80 && r.proteins! >= 65) {
    return `Traces of protein were detected in your urine. This can happen if your kidney is stressed. Reasons for this can be excess exercise. Help your kidney perform its best by keeping yourself hydrated, and limiting processed salty foods!`;
  } else {
    return `Proteins were detected in your urine. This can happen if your kidney is stressed. Reasons for this can be excess exercise. Help your kidney perform its best by keeping yourself hydrated, and limiting processed salty foods!`;
  }
};

export const generateHealthText = (r: Result): Health_Text => {
  let sen1: string;
  let sen2: string;
  let rec_1: string | null = null;
  let rec_2: string | null = null;

  // 1
  if (r.overallHealth! >= 90) {
    sen1 = `Mido is excited to see you! Your health today is OPTIMAL! `;
  }
  // 2
  else if (r.overallHealth! < 90 && r.overallHealth! >= 80) {
    sen1 = `Mido is excited to see you! Your health today is GREAT! `;
  }
  // 3
  else if (r.overallHealth! < 80 && r.overallHealth! >= 65) {
    sen1 = `Mido is happy to see you! Your health today is OK!`;
  } else {
    sen1 = `Mido is happy to see you! Your health today needs some work! Let's see what we can do to improve it!`;
  }

  // generated Text sen2, rec based on lowest parameters
  if (r.overallHealth! >= 80) {
    const temp = getLowestScore(r);
    sen2 = `You can still work on ${temp[0].param}`;
    rec_1 = r[`${temp[0].param}Text` as keyof Result] as string;
  } else {
    const temp = getLowestScore(r);
    sen2 = `You can still work on ${capitalizeStr(
      temp[0].param
    )} and ${capitalizeStr(temp[1].param)}`;

    rec_1 = r[`${temp[0].param}Text` as keyof Result] as string;
    rec_2 = r[`${temp[1].param}Text` as keyof Result] as string;
  }

  return { text: `${sen1} ${sen2}`, rec_1, rec_2 };
};

function getLowestScore(r: Result) {
  const result = Object.keys(r)
    .filter((el) => {
      let re = new RegExp(
        /immunity|hydration|nutrition|kidney|liverHealth/,
        'i'
      );
      return re.test(el) && !el.includes('Text');
    })
    .map((el) => {
      let param = el;
      if (el === 'liverHealth') {
        param = 'liver';
      }
      return { score: r[el as keyof Result], param };
    })
    .sort((a: any, b: any) => {
      return a.score - b.score;
    });

  return [result[0], result[1]];
}

function capitalizeStr(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}
