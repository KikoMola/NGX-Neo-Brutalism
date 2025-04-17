import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  imports: [],
  templateUrl: './alert-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogComponent implements OnInit {

  ngOnInit(): void { }

}
