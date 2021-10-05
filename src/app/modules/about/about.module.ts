import { NgModule } from '@angular/core';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [AboutRoutingModule, SharedModule],
})
export class AboutModule {}
