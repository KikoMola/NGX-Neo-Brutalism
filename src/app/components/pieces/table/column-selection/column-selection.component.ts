import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentPreviewComponent } from '../../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../../code-snippet-preview/code-snippet-preview.component';
import { TableRow } from '../table.component';

@Component({
  selector: 'app-column-selection',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
  ],
  templateUrl: './column-selection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnSelectionComponent implements OnInit {
  public themeService = inject(ThemeService);

  // Column visibility state
  visibleColumns = new Set<string>(['id', 'name', 'job', 'color']);

  isColumnSelectorOpen = false; // State for dropdown visibility

  // Tab state management for TOGGLE COLUMNS example
  toggleColumnsTableActiveTab: 'preview' | 'code' = 'preview';

  // Example data for the table (used by all)
  tableData: TableRow[] = [
    { id: 1, name: 'Cy Ganderton', job: 'Quality Control Specialist', color: 'Blue' },
    { id: 2, name: 'Hart Hagerty', job: 'Desktop Support Technician', color: 'Purple' },
    { id: 3, name: 'Brice Swyre', job: 'Tax Accountant', color: 'Red' },
    { id: 4, name: 'Marjy Ferencz', job: 'Office Assistant I', color: 'Crimson' },
    { id: 5, name: 'Yancy Tear', job: 'Community Outreach Specialist', color: 'Indigo' },
  ];

  setToggleColumnsActiveTab(tab: 'preview' | 'code'): void {
    this.toggleColumnsTableActiveTab = tab;
  }

  isColumnVisible(columnKey: string): boolean { return this.visibleColumns.has(columnKey); }
  toggleColumnSelector(): void { this.isColumnSelectorOpen = !this.isColumnSelectorOpen; }

  // --- Column Visibility Logic ---
  toggleColumnVisibility(columnKey: string): void {
    if (this.visibleColumns.has(columnKey)) {
      if (this.visibleColumns.size > 1) { // Prevent hiding last column
          this.visibleColumns.delete(columnKey);
      }
    } else {
        this.visibleColumns.add(columnKey);
    }
  }

  // Getter for TOGGLE COLUMNS table example code
  get toggleColumnsTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const lightBgClass = this.themeService.getLightBgClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();

    // Comment explaining the required TS logic
    const tsLogicComment = `
  export class YourComponent {
    tableData = [ /* your data */ ];
    visibleColumns = new Set<string>(['id', 'name', 'job', 'color']); 
    isColumnSelectorOpen = false;

    toggleColumnVisibility(columnKey: string): void { 
        if (this.visibleColumns.has(columnKey)) {
            if (this.visibleColumns.size > 1) { // Prevent hiding last column
                this.visibleColumns.delete(columnKey);
            }
        } else {
            this.visibleColumns.add(columnKey);
        }
    }
    isColumnVisible(columnKey: string): boolean { 
        return this.visibleColumns.has(columnKey); 
    }
    toggleColumnSelector(): void { this.isColumnSelectorOpen = !this.isColumnSelectorOpen; }
  }
    `;

    // HTML for the table including the styled button and dropdown in the header
    const tableHtml = `
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium">
      <tr>
        <th class="py-3 px-4 text-left">Nombre</th>
        @if (isColumnVisible('id')) { <th class="py-3 px-4 text-left">ID</th> }
        @if (isColumnVisible('job')) { <th class="py-3 px-4 text-left">Puesto</th> }
        @if (isColumnVisible('color')) { <th class="py-3 px-4 text-left">Color Favorito</th> }
        <!-- Column Toggle Button Header -->
        <th class="py-2 px-4 text-right">
          <div class="relative inline-block text-left">
            <!-- Neobrutalist Button Structure -->
            <div class="relative">
               <!-- Shadow Layer -->
               <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
               <!-- Button Content -->
               <button 
                  (click)="toggleColumnSelector()" 
                  type="button" 
                  class="relative inline-flex justify-center items-center border-neo-border border-black px-2 py-1 bg-white text-sm font-medium text-gray-700 transition-transform ${borderRadiusClass} ${hoverXClass} ${hoverYClass}"
                  aria-haspopup="true" 
                  [attr.aria-expanded]="isColumnSelectorOpen">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                   <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                 </svg>
               </button>
             </div>
            <!-- Dropdown Panel -->
            @if (isColumnSelectorOpen) {
              <div 
                class="origin-top-right absolute right-0 mt-2 w-48 border-neo-border border-black bg-white focus:outline-none z-10 ${borderRadiusClass}"
                style="box-shadow: ${shadowStyle};"
                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                  <label class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <input type="checkbox" (change)="toggleColumnVisibility('id')" [checked]="isColumnVisible('id')" class="form-checkbox h-4 w-4 mr-2 border-black text-blue-600 focus:ring-blue-500">
                    <span>ID</span>
                  </label>
                  <label class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <input type="checkbox" (change)="toggleColumnVisibility('job')" [checked]="isColumnVisible('job')" class="form-checkbox h-4 w-4 mr-2 border-black text-blue-600 focus:ring-blue-500">
                    <span>Puesto</span>
                  </label>
                  <label class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <input type="checkbox" (change)="toggleColumnVisibility('color')" [checked]="isColumnVisible('color')" class="form-checkbox h-4 w-4 mr-2 border-black text-blue-600 focus:ring-blue-500">
                    <span>Color Favorito</span>
                  </label>
                </div>
              </div>
            }
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
       @for (row of tableData; track row.id; let isEven = $even) {
        <tr class="border-b border-black" [ngClass]="isEven ? '${lightBgClass}' : ''">
          <td class="py-3 px-4">{{ row.name }}</td>
          @if (isColumnVisible('id')) { <td class="py-3 px-4">{{ row.id }}</td> }
          @if (isColumnVisible('job')) { <td class="py-3 px-4">{{ row.job }}</td> }
          @if (isColumnVisible('color')) { <td class="py-3 px-4">{{ row.color }}</td> }
          <td></td> 
        </tr>
      }
    </tbody>
  </table>
</div>`;

    // Combine TS comment and table HTML
    return this.escapeHtml(tsLogicComment + tableHtml.trim());
  }

  private escapeHtml(unsafe: string): string {
    return unsafe.replace(/&/g, '&amp;')
                 .replace(/</g, '&lt;')
                 .replace(/>/g, '&gt;')
                 .replace(/"/g, '&quot;')
                 .replace(/'/g, '&#039;');
  }

  ngOnInit(): void { }

}
