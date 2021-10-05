export { ActivatedRoute } from '@angular/router';

import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

export class ActivatedRouteStub {
  private subjectParamMap = new ReplaySubject<ParamMap>();

  private testParams: any = {};

  constructor(initialParams?: Params) {
    if (initialParams) {
      this.setParamMap(initialParams);
      this.testParams = initialParams;
    }
  }

  readonly paramMap = this.subjectParamMap.asObservable();

  setParamMap(params: Params = {}) {
    this.subjectParamMap.next(convertToParamMap(params));
    this.testParams = params;
  }

  get snapshot() {
    return { params: this.testParams, queryParams: this.testParams };
  }

  get queryParamMap() {
    return this.subjectParamMap.asObservable();
  }
}
