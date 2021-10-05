import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { SettingAccountComponent } from './setting-account/setting-account.component';
import { SettingPasswordComponent } from './setting-password/setting-password.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  declarations: [
    ProfileComponent,
    SettingAccountComponent,
    SettingPasswordComponent,
    SettingComponent,
  ],
  imports: [ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
