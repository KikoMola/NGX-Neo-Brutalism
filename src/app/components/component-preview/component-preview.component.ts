import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-component-preview',
  standalone: true,
  imports: [],
  templateUrl: './component-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentPreviewComponent {
  public themeService = inject(ThemeService);
}
