import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentPreviewComponent } from '../../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../../code-snippet-preview/code-snippet-preview.component';
import { TableRow } from '../table.component';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-row-options',
  imports: [
    CommonModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
  ],
  templateUrl: './row-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowOptionsComponent implements OnInit {
  public themeService = inject(ThemeService);

  // Example data for the table (used by all)
  tableData: TableRow[] = [
    {
      id: 1,
      name: 'Cy Ganderton',
      job: 'Quality Control Specialist',
      color: 'Blue',
    },
    {
      id: 2,
      name: 'Hart Hagerty',
      job: 'Desktop Support Technician',
      color: 'Purple',
    },
    { id: 3, name: 'Brice Swyre', job: 'Tax Accountant', color: 'Red' },
    {
      id: 4,
      name: 'Marjy Ferencz',
      job: 'Office Assistant I',
      color: 'Crimson',
    },
    {
      id: 5,
      name: 'Yancy Tear',
      job: 'Community Outreach Specialist',
      color: 'Indigo',
    },
  ];

  // --- Options Menu State ---
  openOptionsRowId: number | null = null;

  // Tab state management for OPTIONS example
  optionsTableActiveTab: 'preview' | 'code' = 'preview';

  setOptionsTableActiveTab(tab: 'preview' | 'code'): void {
    this.optionsTableActiveTab = tab;
  }

  // --- Options Menu Logic ---
  toggleOptions(rowId: number): void {
    this.openOptionsRowId = this.openOptionsRowId === rowId ? null : rowId;
  }

  handleOptionClick(option: string, rowId: number): void {
    console.log(`${option} clicked for row ${rowId}`);
    this.openOptionsRowId = null; // Close the menu after action
  }

  get optionsTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const lightBgClass = this.themeService.getLightBgClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();

    // TS Logic Comment
    const tsLogicComment = `
  export class YourComponent {
    tableData = [ /* your data */ ];
    openOptionsRowId: number | null = null;
    
    toggleOptions(rowId: number): void { 
      this.openOptionsRowId = this.openOptionsRowId === rowId ? null : rowId; 
    }
    
    handleOptionClick(option: string, rowId: number): void {
      console.log(\`Action: \${option} on row \${rowId}\`);
      this.openOptionsRowId = null; // Close menu
    }
  }
    `;

    // Ellipsis SVG
    const ellipsisSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>`;

    // Table HTML
    const tableHtml = `
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium align-middle">
      <tr>
        <th class="py-3 px-4 text-left">ID</th>
        <th class="py-3 px-4 text-left">Nombre</th>
        <th class="py-3 px-4 text-left">Puesto</th>
        <th class="py-3 px-4 text-left">Color Favorito</th>
        <th class="py-3 px-4 text-center w-20">Opciones</th> 
      </tr>
    </thead>
    <tbody>
      @for (row of tableData; track row.id; let isEven = $even) {
        <tr class="border-b border-black" [ngClass]="isEven ? '${lightBgClass}' : ''">
          <td class="py-3 px-4 align-middle">{{ row.id }}</td>
          <td class="py-3 px-4 align-middle">{{ row.name }}</td>
          <td class="py-3 px-4 align-middle">{{ row.job }}</td>
          <td class="py-3 px-4 align-middle">{{ row.color }}</td>
          <td class="py-3 px-4 text-center align-middle">
            <div class="relative inline-block text-left">
              <!-- Button Container -->
              <div class="relative">
                <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
                <button (click)="toggleOptions(row.id)" type="button" class="relative inline-flex justify-center items-center border-neo-border border-black px-2 py-1 bg-white text-sm font-medium text-gray-700 transition-transform ${borderRadiusClass} ${hoverXClass} ${hoverYClass}">
                   ${ellipsisSvg}
                </button>
              </div>
              <!-- Dropdown Panel -->
              @if (openOptionsRowId === row.id) {
                <div class="origin-top-right absolute right-0 mt-2 w-32 border-neo-border border-black bg-white focus:outline-none z-10 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};" role="menu">
                  <div class="py-1" role="none">
                    <button (click)="handleOptionClick('Editar', row.id)" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Editar</button>
                    <button (click)="handleOptionClick('Eliminar', row.id)" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50" role="menuitem">Eliminar</button>
                  </div>
                </div>
              }
            </div>
          </td>
        </tr>
      }
    </tbody>
  </table>
</div>`;

    return this.escapeHtml(tsLogicComment + tableHtml.trim());
  }

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  ngOnInit(): void {}
}
