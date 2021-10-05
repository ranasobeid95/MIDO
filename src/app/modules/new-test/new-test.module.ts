import { NgModule } from '@angular/core';
import { NewTestComponent } from './new-test.component';
import { NewTestRoutingModule } from './new-test-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionCardRadioComponent } from './question-card-radio/question-card-radio.component';
import { QuestionCardSelectComponent } from './question-card-select/question-card-select.component';
import { UploadImageComponent } from './upload-image/upload-image.component';

@NgModule({
  declarations: [
    NewTestComponent,
    QuestionCardRadioComponent,
    QuestionCardSelectComponent,
    UploadImageComponent,
  ],
  imports: [NewTestRoutingModule, SharedModule],
})
export class NewTestModule {}
