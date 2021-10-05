import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowHidePasswordDirective } from './directives/show-hide-password.directive';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { StatusCardComponent } from './components/status-card/status-card.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SelectComponent } from './components/select/select.component';
import { ChartsModule } from 'ng2-charts';
import { LoaderMainComponent } from './components/loader-main/loader-main.component';
import { CollapseComponent } from './components/collapse/collapse.component';
import { AboutCardComponent } from './components/about-card/about-card.component';
import { CropImageComponent } from './components/crop-image/crop-image.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChartContainerComponent } from './components/chart/chart-container/chart-container.component';
import { ChartRadarComponent } from './components/chart/chart-radar/chart-radar.component';
import { DetectScrollDirective } from './directives/detect-scroll.directive';
import { ChartLineComponent } from './components/chart/chart-line/chart-line.component';
import { ChartBarComponent } from './components/chart/chart-bar/chart-bar.component';

const SHARED_MODULES = [
  CommonModule,
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
  ChartsModule,
  ImageCropperModule,
];

@NgModule({
  declarations: [
    ShowHidePasswordDirective,
    StatusCardComponent,
    SelectComponent,
    LoaderMainComponent,
    CollapseComponent,
    AboutCardComponent,
    CropImageComponent,
    ChartContainerComponent,
    ChartRadarComponent,
    DetectScrollDirective,
    ChartLineComponent,
    ChartBarComponent,
  ],
  imports: [...SHARED_MODULES, NgCircleProgressModule.forRoot()],
  exports: [
    ...SHARED_MODULES,
    ShowHidePasswordDirective,
    StatusCardComponent,
    SelectComponent,
    ChartsModule,
    LoaderMainComponent,
    CollapseComponent,
    AboutCardComponent,
    CropImageComponent,
    ChartContainerComponent,
    ChartRadarComponent,
    ChartLineComponent,
    ChartBarComponent,
  ],
})
export class SharedModule {}
