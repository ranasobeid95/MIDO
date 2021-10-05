import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { RESULTS_KEYS } from 'src/app/constants/result-keys';
import { Result } from 'src/app/models/result';
import { Test } from 'src/app/models/test';
import { AuthService } from '../auth/auth.service';
import { getAverage, getRandomValue, sortByDate } from './new-test.utils';

@Injectable({
  providedIn: 'root',
})
export class NewTestService {
  constructor(
    private afStore: AngularFirestore,
    private authService: AuthService
  ) {}

  postNewTest(newTest: Test) {
    const testRef = this.afStore.collection('tests');
    const testData = {
      userId: this.authService.getUser()?.uid,
      alcoholDrinks: newTest.alcoholDrinks ? newTest.alcoholDrinks : '',
      dietChange: newTest.dietChange ? newTest.dietChange : '',
      exercise: newTest.exercise ? newTest.exercise : '',
      cardPhoto: newTest.cardPhoto ? newTest.cardPhoto : '',
      createdAt: newTest.createdAt,
      results: newTest.results || null,
    };

    return testRef
      .add(testData)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async handleResults() {
    const prevTests = await this.getAllTests();

    let finalResults: Result = {};

    //  Generate Results
    if (prevTests.length <= 1) {
      finalResults = this.generateResultsValue(null);
    } else {
      const prevResult = prevTests[1].results;
      finalResults = this.generateResultsValue(prevResult);
    }

    return finalResults;
  }

  private generateResultsValue(prevResult: Result | null) {
    let r: any = {};

    RESULTS_KEYS.forEach((key: string) => {
      let min: number = 60;
      let max: number = 100;

      if (!!prevResult) {
        // To ensure next-value is close with previous one, To make results more reality
        let value = prevResult[key as keyof Result] as any;
        min = value - 8 < 60 ? 60 : value - 8;
        max = value + 8 > 100 ? 100 : value + 8;
      }

      if (key === 'pH_Value') {
        r['pH_Value'] = getRandomValue(4, 9);
      } else if (!key.includes('Text')) {
        switch (key) {
          case 'immunity':
            r['immunity'] = getAverage(r.bacteria, r.blood, r.leukocytes);
            break;
          case 'nutrition':
            r['nutrition'] = getAverage(r.pH_Score, r.glucose, r.ketones);
            break;
          case 'hydration':
            r['hydration'] = getAverage(r.gravity);
            break;
          case 'liverHealth':
            r['liverHealth'] = getAverage(r.bilirubin, r.urobilinogen);
            break;
          case 'kidney':
            r['kidney'] = getAverage(r.proteins);
            break;
          case 'overallHealth':
            r['overallHealth'] = getAverage(
              r.immunity,
              r.nutrition,
              r.hydration,
              r.liverHealth,
              r.kidney
            );
            break;
          default:
            r[key] = getRandomValue(min, max);
            break;
        }
      } else if (key.includes('Text')) {
        //generate Text
        if (!!!prevResult) {
          r[key] = '...';
        } else {
          // will be change with real Text based on previous value
          r[key] = '...';
        }
      }
    });

    return r;
  }

  getAllTests() {
    const userId = this.authService.getUser()?.uid;
    const testsCollection = this.afStore.collection<any>('tests', (ref) =>
      ref.where('userId', '==', userId)
    );
    return testsCollection
      .valueChanges()
      .pipe(
        map((tests) => {
          // fix date if it have for format
          const editedTest = tests.map((el) => {
            let formattedDate;
            if (typeof el.createdAt === 'object') {
              formattedDate = el.createdAt.toDate();
            } else {
              formattedDate = el.createdAt;
            }
            return { ...el, createdAt: formattedDate };
          });

          if (tests.length <= 1) return editedTest;
          return sortByDate(editedTest);
        }),
        first()
      )
      .toPromise();
  }
}
