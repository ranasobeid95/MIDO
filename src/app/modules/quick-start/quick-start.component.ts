import { Component, OnInit } from '@angular/core';
import { QUICK_START } from 'src/app/constants/quick-start';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-quick-start',
  templateUrl: './quick-start.component.html',
  styleUrls: ['./quick-start.component.scss'],
})
export class QuickStartComponent implements OnInit {
  userName!: string;
  quickStart = QUICK_START;
  show = false;
  selectedStep: number = -1;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userName = this.authService.getUser()?.firstName!;
  }

  showContent(index: number) {
    if (this.selectedStep == index) {
      this.selectedStep = -1;
    } else {
      this.selectedStep = index;
      let eleId = `content`;
      document.getElementById(eleId)!.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
}
