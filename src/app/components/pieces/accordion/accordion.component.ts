import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { CodeSnippetPreviewComponent } from '../../code-snippet-preview/code-snippet-preview.component';
import { ComponentPreviewComponent } from '../../component-preview/component-preview.component';
import { ThemeService } from '../../../services/theme.service';

// Interfaz para los ítems del acordeón
interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-accordion',
  standalone: true,
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

  // Datos con un solo ítem de ejemplo
  accordionItems: AccordionItem[] = [
    { id: 'item-1', title: '¿Cómo funciona esto?', content: 'Este es el contenido del único ítem del acordeón.' },
  ];

  // ID del ítem actualmente abierto
  openItemId: string | null = null;

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {}

  // Método para cambiar la pestaña activa
  setActiveTab(tab: 'preview' | 'code'): void {
    this.accordionActiveTab = tab;
  }

  // Método para abrir/cerrar un ítem
  toggleItem(itemId: string): void {
    this.openItemId = this.openItemId === itemId ? null : itemId;
  }

  // Getter para generar el código del acordeón (botón sin border-radius)
  get accordionExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass(); // Radius del contenedor
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();

    const item = this.accordionItems[0]; 
    const itemHtml = `
    <!-- Item 1 -->
    <div class="border-neo-border border-black overflow-hidden ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
      <!-- Trigger (Botón directo SIN border-radius) -->
      <button
        (click)="toggleItem('${item.id}')"
        class="relative flex justify-between items-center w-full px-4 py-3 font-medium text-left text-white ${primaryBgClass}"> <!-- Eliminado borderRadiusClass -->
        <span>${item.title}</span>
        <svg
          [ngClass]="{'transform rotate-180': openItemId === '${item.id}'}"
          class="w-5 h-5 transition-transform duration-200 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <!-- Content -->
      <div *ngIf="openItemId === '${item.id}'" class="p-4 bg-white">
        <p>${item.content}</p>
      </div>
    </div>`;

    const tsLogicComment = `
<!--
  Lógica TS necesaria:
  accordionItems: AccordionItem[] = [{ id: 'item-1', title: '...', content: '...' }];
  openItemId: string | null = null;
  toggleItem(itemId: string): void { ... }
-->`;

    const rawHtml = `
${tsLogicComment}
<div class="w-full max-w-xl space-y-2"> ${itemHtml}
</div>`;

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
