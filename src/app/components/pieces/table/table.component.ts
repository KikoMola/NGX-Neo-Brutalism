import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { ComponentPreviewComponent } from '../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../code-snippet-preview/code-snippet-preview.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent
  ],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  public themeService = inject(ThemeService);

  // Tab state management for NON-STRIPED example
  nonStripedTableActiveTab: 'preview' | 'code' = 'preview';

  setNonStripedActiveTab(tab: 'preview' | 'code'): void {
    this.nonStripedTableActiveTab = tab;
  }
  
  // Tab state management for STRIPED example
  stripedTableActiveTab: 'preview' | 'code' = 'preview';

  setStripedActiveTab(tab: 'preview' | 'code'): void {
    this.stripedTableActiveTab = tab;
  }

  // Example data for the table (used by both)
  tableData = [
    { id: 1, name: 'Cy Ganderton', job: 'Quality Control Specialist', color: 'Blue' },
    { id: 2, name: 'Hart Hagerty', job: 'Desktop Support Technician', color: 'Purple' },
    { id: 3, name: 'Brice Swyre', job: 'Tax Accountant', color: 'Red' },
  ];

  ngOnInit(): void { }

  // Getter for NON-STRIPED table example code
  get nonStripedTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();

    const tableHtml = `
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium">
      <tr>
        <th class="py-3 px-4 text-left">ID</th>
        <th class="py-3 px-4 text-left">Nombre</th>
        <th class="py-3 px-4 text-left">Puesto</th>
        <th class="py-3 px-4 text-left">Color Favorito</th>
      </tr>
    </thead>
    <tbody>
      <!-- Fila 1 -->
      <tr class="border-b border-black">
        <td class="py-3 px-4">1</td>
        <td class="py-3 px-4">Cy Ganderton</td>
        <td class="py-3 px-4">Quality Control Specialist</td>
        <td class="py-3 px-4">Blue</td>
      </tr>
      <!-- Fila 2 -->
      <tr class="border-b border-black">
        <td class="py-3 px-4">2</td>
        <td class="py-3 px-4">Hart Hagerty</td>
        <td class="py-3 px-4">Desktop Support Technician</td>
        <td class="py-3 px-4">Purple</td>
      </tr>
      <!-- Fila 3 -->
      <tr class="border-b border-black">
        <td class="py-3 px-4">3</td>
        <td class="py-3 px-4">Brice Swyre</td>
        <td class="py-3 px-4">Tax Accountant</td>
        <td class="py-3 px-4">Red</td>
      </tr>
    </tbody>
  </table>
</div>`;

    return this.escapeHtml(tableHtml.trim());
  }

  // Getter for STRIPED table example code
  get stripedTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const lightBgClass = this.themeService.getLightBgClass();

    const tableHtml = `
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium">
      <tr>
        <th class="py-3 px-4 text-left">ID</th>
        <th class="py-3 px-4 text-left">Nombre</th>
        <th class="py-3 px-4 text-left">Puesto</th>
        <th class="py-3 px-4 text-left">Color Favorito</th>
      </tr>
    </thead>
    <tbody>
      <!-- Fila 1 -->
      <tr class="border-b border-black">
        <td class="py-3 px-4">1</td>
        <td class="py-3 px-4">Cy Ganderton</td>
        <td class="py-3 px-4">Quality Control Specialist</td>
        <td class="py-3 px-4">Blue</td>
      </tr>
      <!-- Fila 2 (striped) -->
      <tr class="border-b border-black ${lightBgClass}">
        <td class="py-3 px-4">2</td>
        <td class="py-3 px-4">Hart Hagerty</td>
        <td class="py-3 px-4">Desktop Support Technician</td>
        <td class="py-3 px-4">Purple</td>
      </tr>
      <!-- Fila 3 -->
      <tr class="border-b border-black">
        <td class="py-3 px-4">3</td>
        <td class="py-3 px-4">Brice Swyre</td>
        <td class="py-3 px-4">Tax Accountant</td>
        <td class="py-3 px-4">Red</td>
      </tr>
       <!-- Nota: Para alternar colores dinámicamente, necesitarías lógica como @for (row of data; track row.id; let isEven = $even) y aplicar [ngClass]="isEven ? '${lightBgClass}' : ''" a la <tr> -->
    </tbody>
  </table>
</div>`;

    return this.escapeHtml(tableHtml.trim());
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
