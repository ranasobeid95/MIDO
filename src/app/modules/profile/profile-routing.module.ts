import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  {
    path: 'setting/:type',
    component: SettingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
