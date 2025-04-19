import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentPreviewComponent } from '../../../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../../../code-snippet-preview/code-snippet-preview.component';
import { ThemeService } from '../../../../../services/theme.service';

@Component({
  selector: 'app-secondary-disabled',
  imports: [CommonModule, ComponentPreviewComponent, CodeSnippetPreviewComponent],
  templateUrl: './disabled.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondaryDisabledComponent {
  public themeService = inject(ThemeService);

  // Estado para controlar la pestaña activa del primer ejemplo
  secondaryDisabledActiveTab: 'preview' | 'code' = 'preview';

  // Método para cambiar la pestaña activa
  setSecondaryDisabledTab(tab: 'preview' | 'code'): void {
    this.secondaryDisabledActiveTab = tab;
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

  get secondaryDisabledExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    // No hover classes for disabled
    const rawHtml = `
<div class="relative inline-block">
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <button disabled class="relative flex px-4 py-2 bg-white border-neo-border border-black font-medium opacity-50 cursor-not-allowed ${borderRadiusClass}">
    Deshabilitado
  </button>
</div>`;
    return this.escapeHtml(rawHtml.trim());
  }
}
