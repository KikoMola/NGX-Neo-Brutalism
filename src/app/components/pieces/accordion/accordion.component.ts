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
    { id: 'item-2', title: 'Acordeon 2', content: 'Este es el contenido del acordeón 2.' },
    { id: 'item-3', title: 'Acordeon 3', content: 'Este es el contenido del acordeón 3.' },
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

  // Getter para generar el código del acordeón (con transiciones Tailwind y nueva sintaxis @for/@if)
  get accordionExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();

    // Generar HTML para un item genérico dentro del bucle @for
    const itemTemplateHtml = `
      <div class="border-neo-border border-black overflow-hidden ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
        <button
          (click)="toggleItem(item.id)" 
          [ngClass]="[
            '${primaryBgClass}',
            openItemId === item.id ? 'rounded-bl-none rounded-br-none' : '${borderRadiusClass}'
          ]"
          class="relative flex justify-between items-center w-full px-4 py-3 font-medium text-left text-white">
          <span>{{ item.title }}</span>
          <svg
            [ngClass]="{'transform rotate-180': openItemId === item.id}"
            class="w-5 h-5 transition-transform duration-500 ease-linear shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        @if (openItemId === item.id) {
          <div 
            [ngClass]="openItemId === item.id ? 'max-h-96' : 'max-h-0'" 
            class="overflow-hidden transition-[max-height] duration-500 ease-linear">
            <div class="p-4 bg-white">
              <p>{{ item.content }}</p>
            </div>
          </div>
        }
      </div>
    `;

    const tsLogicComment = `
  export class YourComponent {
    accordionItems: { id: string, title: string, content: string }[] = [
      { id: 'item-1', title: 'Title 1', content: 'Content 1...' },
      // ... more items
    ];
    openItemId: string | null = null;
    toggleItem(itemId: string): void { this.openItemId = this.openItemId === itemId ? null : itemId; }
  }`;

    const rawHtml = `
${tsLogicComment}
<div class="w-full max-w-xl space-y-2">
  @for (item of accordionItems; track item.id) {
    ${itemTemplateHtml.trim()}
  }
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
