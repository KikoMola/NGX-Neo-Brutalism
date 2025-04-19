import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../../../services/theme.service';
import { CommonModule } from '@angular/common';
import { ComponentPreviewComponent } from '../../../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../../../code-snippet-preview/code-snippet-preview.component';

@Component({
  selector: 'app-disabled',
  imports: [CommonModule, ComponentPreviewComponent, CodeSnippetPreviewComponent],
  templateUrl: './disabled.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledComponent {
  public themeService = inject(ThemeService);

  // Estado para controlar la pestaña activa del primer ejemplo
  primaryDisabledActiveTab: 'preview' | 'code' = 'preview';

  // Método para cambiar la pestaña activa
  setPrimaryDisabledTab(tab: 'preview' | 'code'): void {
    this.primaryDisabledActiveTab = tab;
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

  // Getter para generar el código del botón primario dinámicamente
  get primaryDisabledExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    // No hover classes for disabled
    const rawHtml = `
<div class="relative inline-block">
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <button disabled class="relative flex px-4 py-2 border-neo-border border-black font-medium text-white opacity-50 cursor-not-allowed ${primaryBgClass} ${borderRadiusClass}">
    Deshabilitado
  </button>
</div>`;
    return this.escapeHtml(rawHtml.trim());
  }

}
