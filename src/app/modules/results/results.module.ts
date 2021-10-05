import { NgModule } from '@angular/core';
import { ResultsComponent } from './results.component';
import { ResultsRoutingModule } from './results-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ResultsComponent],
  imports: [ResultsRoutingModule, SharedModule],
})
export class ResultsModule {}
