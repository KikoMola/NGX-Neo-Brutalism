import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { CodeSnippetPreviewComponent } from '../../code-snippet-preview/code-snippet-preview.component';
import { ComponentPreviewComponent } from '../../component-preview/component-preview.component';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-accordion',
  imports: [
    CommonModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
  ],
  templateUrl: './accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements OnInit {
  accordionActiveTab: 'preview' | 'code' = 'preview';

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {}

  // Método para cambiar la pestaña activa
  setPrimaryButtonTab(tab: 'preview' | 'code'): void {
    this.accordionActiveTab = tab;
  }

  get accordionExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();

    const rawHtml = `
<h1>Hola</h1>`;

    return this.escapeHtml(rawHtml.trim());
  }

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
