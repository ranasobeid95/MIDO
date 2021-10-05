import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss'],
})
export class EmailVerifyComponent implements OnInit, OnDestroy {
  @Input() email: string = '';
  @Output() closeVerify = new EventEmitter();
  loading: boolean = false;
  result: boolean;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private authService: AuthService) {
    this.result = false;
  }

  ngOnInit(): void {
    this.authService
      .getUserChange()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((user) => {
        this.email = user!.email;
      });
  }

  resendEmail() {
    this.loading = true;
    this.authService.SendVerificationMail().then((res) => {
      this.loading = false;
      this.result = true;
    });
  }

  closeMessage() {
    this.closeVerify.emit();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
