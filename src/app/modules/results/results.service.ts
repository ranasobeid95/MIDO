import { Injectable } from '@angular/core';
import { Health_Text, Result } from 'src/app/models/result';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { sortResponse, handelFormatDateInArr } from './results.utils';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  generateHealthText,
  generateHydrationText,
  generateImmunityText,
  generateKidneyText,
  generateLiverText,
  generateNutritionText,
} from './results-generate-text';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  data: any;
  dateOfTests = new Subject<Date[]>();
  resultsFilterChange = new Subject<{ type: string; results: Result[] }>();

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    public datePipe: DatePipe
  ) {}

  fetchAllTests() {
    const userId = this.authService.getUser()?.uid;
    const testsCollection = this.afs.collection<any>('tests', (ref) =>
      ref.where('userId', '==', userId)
    );
    return testsCollection.valueChanges({ idField: 'idTest' }).pipe(
      map((tests) => {
        const editedTest = handelFormatDateInArr(tests, 'createdAt');

        // results of "setAllDates" function will used in chart-container
        // I'll keep it, But, maybe remove it if we refactor chart-container
        this.setAllDates(editedTest);

        // Generate Text based on value & filter all tests don't have results
        const resultsWithText = editedTest
          .filter(({ results }) => !!results && Object.keys(results).length > 1)
          .map((el) => {
            let resWithText = this.generateTexts(el.results);
            return { ...el, results: resWithText };
          });

        if (tests.length <= 1) return resultsWithText;
        return sortResponse(resultsWithText);
      })
    );
  }

  generateTexts(results: any) {
    const r = { ...results };
    r['immunityText'] = generateImmunityText(r);
    r['nutritionText'] = generateNutritionText(r);
    r['hydrationText'] = generateHydrationText(r);
    r['liverText'] = generateLiverText(r);
    r['kidneyText'] = generateKidneyText(r);
    let obj: Health_Text = generateHealthText(r);
    r['healthText'] = obj.text;
    r['rec_1'] = obj.rec_1;
    r['rec_2'] = obj.rec_2;

    return r;
  }

  setAllDates(arr: any[]) {
    let datesArray = arr.map((ele: any) => {
      return ele.createdAt;
    });

    this.dateOfTests.next(datesArray);
  }
}
