import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  imports: [],
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit {

  ngOnInit(): void { }

}
