import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { ThemeService } from '../../../../../services/theme.service';
import { CommonModule } from '@angular/common';
import { ComponentPreviewComponent } from '../../../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../../../code-snippet-preview/code-snippet-preview.component';

@Component({
  selector: 'app-secondary-with-icon',
  imports: [CommonModule, ComponentPreviewComponent, CodeSnippetPreviewComponent],
  templateUrl: './with-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondaryWithIconComponent {
  public themeService = inject(ThemeService);

  // Estado para controlar la pestaña activa del primer ejemplo
  secondaryIconActiveTab: 'preview' | 'code' = 'preview';

  // Método para cambiar la pestaña activa
  setSecondaryIconTab(tab: 'preview' | 'code'): void {
    this.secondaryIconActiveTab = tab;
  }

  // Helper para escapar HTML
  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  get secondaryIconExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();
    const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>`;
    const rawHtml = `
<div class="relative inline-block">
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <button class="relative flex items-center px-4 py-2 bg-white border-neo-border border-black font-medium transition-transform ${borderRadiusClass} ${hoverXClass} ${hoverYClass}">
    ${svgIcon}
    Cancelar
  </button>
</div>`;
    return this.escapeHtml(rawHtml.trim());
  }
}
