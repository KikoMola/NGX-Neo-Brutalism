import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentPreviewComponent } from '../../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../../code-snippet-preview/code-snippet-preview.component';
import { ThemeService } from '../../../../services/theme.service';
import { TableRow } from '../table.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-full',
  imports: [
    CommonModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
    FormsModule,
  ],
  templateUrl: './full.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullComponent implements OnInit {
  public themeService = inject(ThemeService);

  // Sorting state
  sortColumnKey: keyof TableRow | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  isColumnSelectorOpen = false; // State for dropdown visibility

  // Filtering state
  filterId: string = '';
  filterName: string = '';
  filterJob: string = '';
  filterColor: string = '';

  // Selection state
  selectedRowIds = new Set<number>();

  // Column visibility state
  visibleColumns = new Set<string>(['id', 'name', 'job', 'color']);

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

  // Tab state management for ALL FEATURES example
  allFeaturesTableActiveTab: 'preview' | 'code' = 'preview';

  setAllFeaturesTableActiveTab(tab: 'preview' | 'code'): void {
    this.allFeaturesTableActiveTab = tab;
  }

  toggleSelectAll(): void {
    const currentDataIds = this.filteredAndSortedTableData.map((row) => row.id);
    if (this.areAllSelected()) {
      // Deselect only the currently visible/filtered items
      currentDataIds.forEach((id) => this.selectedRowIds.delete(id));
    } else {
      // Select only the currently visible/filtered items
      currentDataIds.forEach((id) => this.selectedRowIds.add(id));
    }
  }

  areAllSelected(): boolean {
    const currentData = this.filteredAndSortedTableData; // Use current data for select all logic
    if (currentData.length === 0) return false;
    // Check if all currently visible/filtered items are selected
    return currentData.every((row) => this.selectedRowIds.has(row.id));
  }

  isAnySelected(): boolean {
    const currentData = this.filteredAndSortedTableData;
    if (currentData.length === 0) return false;
    // Check if at least one visible/filtered item is selected, but not all
    return (
      currentData.some((row) => this.selectedRowIds.has(row.id)) &&
      !this.areAllSelected()
    );
  }

  isColumnVisible(columnKey: string): boolean {
    return this.visibleColumns.has(columnKey);
  }
  toggleColumnSelector(): void {
    this.isColumnSelectorOpen = !this.isColumnSelectorOpen;
  }

  // --- Sorting Logic ---
  sortTable(columnKey: keyof TableRow): void {
    if (this.sortColumnKey === columnKey) {
      // Cycle direction: null -> asc -> desc -> null
      if (this.sortDirection === null) {
        this.sortDirection = 'asc';
      } else if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else {
        this.sortColumnKey = null;
        this.sortDirection = null;
      }
    } else {
      // New column sort: default to asc
      this.sortColumnKey = columnKey;
      this.sortDirection = 'asc';
    }
  }

  // --- Column Visibility Logic ---
  toggleColumnVisibility(columnKey: string): void {
    if (this.visibleColumns.has(columnKey)) {
      if (this.visibleColumns.size > 1) {
        // Prevent hiding last column
        this.visibleColumns.delete(columnKey);
      }
    } else {
      this.visibleColumns.add(columnKey);
    }
  }

  // --- Combined Filtered and Sorted Data Getter ---
  get filteredAndSortedTableData(): TableRow[] {
    // 1. Apply Filters
    let filteredData = this.tableData.filter(
      (row) =>
        (this.filterId === '' || row.id.toString().includes(this.filterId)) &&
        row.name.toLowerCase().includes(this.filterName.toLowerCase()) &&
        row.job.toLowerCase().includes(this.filterJob.toLowerCase()) &&
        row.color.toLowerCase().includes(this.filterColor.toLowerCase())
    );

    // 2. Apply Sorting
    if (this.sortColumnKey && this.sortDirection) {
      // Create a copy to avoid modifying the filtered array directly during sort
      const dataToSort = [...filteredData];
      dataToSort.sort((a, b) => {
        const aValue = a[this.sortColumnKey!];
        const bValue = b[this.sortColumnKey!];

        let comparison = 0;
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue);
        } else {
          comparison = String(aValue).localeCompare(String(bValue));
        }
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
      filteredData = dataToSort; // Assign the sorted array back
    }

    return filteredData;
  }

  // --- Selection Logic ---
  toggleRowSelection(id: number): void {
    if (this.selectedRowIds.has(id)) {
      this.selectedRowIds.delete(id);
    } else {
      this.selectedRowIds.add(id);
    }
  }

  isRowSelected(id: number): boolean {
    return this.selectedRowIds.has(id);
  }

  // --- Options Menu Logic ---
  toggleOptions(rowId: number): void {
    this.openOptionsRowId = this.openOptionsRowId === rowId ? null : rowId;
  }

  handleOptionClick(option: string, rowId: number): void {
    console.log(`${option} clicked for row ${rowId}`);
    this.openOptionsRowId = null; // Close the menu after action
  }

  // --- Options Menu State ---
  openOptionsRowId: number | null = null;

  // --- Colspan Getter ---
  get visibleColumnCount(): number {
    // +1 for the selection checkbox column, +1 for the toggle column placeholder, +1 for options
    return this.visibleColumns.size + 3;
  }

  ngOnInit(): void {
    // Reset ALL states on init
    this.selectedRowIds.clear();
    this.openOptionsRowId = null; // Reset options menu state
    this.visibleColumns = new Set<string>(['id', 'name', 'job', 'color']);
    this.isColumnSelectorOpen = false;
    this.filterId = '';
    this.filterName = '';
    this.filterJob = '';
    this.filterColor = '';
    this.sortColumnKey = null;
    this.sortDirection = null;
  }

  // Getter for ALL FEATURES table example code
  get allFeaturesTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const lightBgClass = this.themeService.getLightBgClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();
    const sortAscIcon = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m3 8 4-4 4 4\"/><path d=\"M7 4v16\"/><path d=\"M20 8h-5\"/><path d=\"M15 10V6.5a2.5 2.5 0 0 1 5 0V10\"/><path d=\"M15 14h5l-5 6h5\"/></svg>`;
    const sortDescIcon = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m3 16 4 4 4-4\"/><path d=\"M7 20V4\"/><path d=\"M20 8h-5\"/><path d=\"M15 10V6.5a2.5 2.5 0 0 1 5 0V10\"/><path d=\"M15 14h5l-5 6h5\"/></svg>`;
    const optionsIcon = `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z\" /></svg>`;

    // Simplified Neo Checkbox HTML structure (Select All) - Repeated for clarity
    const checkAllCheckboxHtml = `
              <div class="relative inline-flex items-center justify-center h-5 w-5 align-middle">
                <!-- Shadow Layer -->
                <div 
                  class="absolute inset-0 ${borderRadiusClass}" 
                  [ngStyle]="{'box-shadow': themeService.getShadowClassForElements()}"></div>
                <!-- Input Layer -->
                <input 
                  type="checkbox"
                  (change)="toggleSelectAll()"
                  [checked]="areAllSelected()"
                  [indeterminate]="isAnySelected()"
                  class="relative h-full w-full border-neo-border border-black transition-transform cursor-pointer ${borderRadiusClass} ${hoverXClass} ${hoverYClass}"
                  [ngClass]="isAnySelected() || areAllSelected() ? '${primaryBgClass} text-white focus:ring-offset-0 focus:ring-transparent' : 'bg-white focus:ring-blue-500'" 
                  style="appearance: none; -webkit-appearance: none; -moz-appearance: none;"
                  title="Select all rows"
                  >
              </div>
    `;

    // Simplified Neo Checkbox HTML structure (Row) - Repeated for clarity
    const rowCheckboxHtml = `
              <div class="relative inline-flex items-center justify-center h-5 w-5 align-middle">
                 <!-- Shadow Layer -->
                <div 
                  class="absolute inset-0 ${borderRadiusClass}" 
                  [ngStyle]="{'box-shadow': themeService.getShadowClassForElements()}"></div>
                <!-- Input Layer -->
                <input 
                  type="checkbox"
                  (change)="toggleRowSelection(row.id)"
                  [checked]="isRowSelected(row.id)"
                  class="relative h-full w-full border-neo-border border-black transition-transform cursor-pointer ${borderRadiusClass} ${hoverXClass} ${hoverYClass}"
                  [ngClass]="isRowSelected(row.id) ? '${primaryBgClass} text-white focus:ring-offset-0 focus:ring-transparent' : 'bg-white focus:ring-blue-500'" 
                  style="appearance: none; -webkit-appearance: none; -moz-appearance: none;"
                  title="Select row {{ row.id }}"
                  >
              </div>
    `;

    const tsLogicComment = `
  // Component Logic:\n  import { ThemeService } from './path/to/theme.service\'; // Import ThemeService\n  // ... other imports\n\n  interface TableRow { id: number; name: string; job: string; color: string; }\n  \n  tableData: TableRow[] = [/* ... your data ... */];\n  selectedRowIds = new Set<number>();\n  visibleColumns = new Set<string>([\'id\', \'name\', \'job\', \'color\']);\n  isColumnSelectorOpen = false;\n  filterId: string = \'\'; filterName: string = \'\'; filterJob: string = \'\'; filterColor: string = \'\';\n  sortColumnKey: keyof TableRow | null = null;\n  sortDirection: \'asc\' | \'desc\' | null = null;\n  openOptionsRowId: number | null = null;\n  \n  constructor(public themeService: ThemeService) {} // Inject ThemeService\n\n  get filteredAndSortedTableData(): TableRow[] { /* ... filter and sort logic ... */ }\n  get visibleColumnCount(): number { return this.visibleColumns.size + 2; } // +2 for checkbox and options\n\n  ngOnInit(): void { /* ... reset states ... */ }\n  toggleRowSelection(id: number): void { /* ... logic ... */ }\n  toggleSelectAll(): void { /* ... logic ... */ }\n  isRowSelected(id: number): boolean { return this.selectedRowIds.has(id); }\n  areAllSelected(): boolean { /* ... logic ... */ }\n  isAnySelected(): boolean { /* ... logic ... */ }\n  toggleColumnVisibility(columnKey: string): void { /* ... logic ... */ }\n  isColumnVisible(columnKey: string): boolean { return this.visibleColumns.has(columnKey); }\n  toggleColumnSelector(): void { this.isColumnSelectorOpen = !this.isColumnSelectorOpen; }\n  sortTable(columnKey: keyof TableRow): void { /* ... logic ... */ }\n  toggleOptions(rowId: number): void { /* ... logic ... */ }\n  handleOptionClick(option: string, rowId: number): void { console.log(option, rowId); this.openOptionsRowId = null; }\n    `;

    const rawHtml = `
${tsLogicComment}
<!-- HTML Template -->
<div 
  class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" 
  style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium align-middle">
      <!-- Header Row 1: Selection, Sortable Titles, Column Toggle -->
      <tr>
        <!-- Select All Checkbox -->
        <th class="py-3 px-4 text-left w-12 align-middle">
          ${checkAllCheckboxHtml.trim()}
        </th>
        
        <!-- Sortable ID Header -->
        @if (isColumnVisible('id')) {
          <th class="py-3 px-4 text-left align-middle">
            <button (click)="sortTable('id')" class="flex items-center space-x-1 hover:opacity-80">
              <span>ID</span>
              @if (sortColumnKey === 'id') {
                @if (sortDirection === 'asc') { ${sortAscIcon} } 
                @else if (sortDirection === 'desc') { ${sortDescIcon} }
              }
            </button>
          </th>
        }
        
        <!-- Sortable Name Header -->
        @if (isColumnVisible('name')) {
          <th class="py-3 px-4 text-left align-middle">
            <button (click)="sortTable('name')" class="flex items-center space-x-1 hover:opacity-80">
              <span>Nombre</span>
              @if (sortColumnKey === 'name') {
                @if (sortDirection === 'asc') { ${sortAscIcon} } 
                @else if (sortDirection === 'desc') { ${sortDescIcon} }
              }
            </button>
          </th>
        }
        
        <!-- Sortable Job Header -->
        @if (isColumnVisible('job')) {
          <th class="py-3 px-4 text-left align-middle">
            <button (click)="sortTable('job')" class="flex items-center space-x-1 hover:opacity-80">
              <span>Puesto</span>
              @if (sortColumnKey === 'job') {
                @if (sortDirection === 'asc') { ${sortAscIcon} } 
                @else if (sortDirection === 'desc') { ${sortDescIcon} }
              }
            </button>
          </th>
        }
        
        <!-- Sortable Color Header -->
        @if (isColumnVisible('color')) {
          <th class="py-3 px-4 text-left align-middle">
            <button (click)="sortTable('color')" class="flex items-center space-x-1 hover:opacity-80">
              <span>Color Favorito</span>
              @if (sortColumnKey === 'color') {
                @if (sortDirection === 'asc') { ${sortAscIcon} } 
                @else if (sortDirection === 'desc') { ${sortDescIcon} }
              }
            </button>
          </th>
        }
        
        <!-- Options Header -->
        <th class="py-3 px-4 text-center w-20 align-middle">Opciones</th>
        
        <!-- Column Toggle Button Header -->
        <th class="py-2 px-4 text-right align-middle">
           <div class="relative inline-block text-left">
             <!-- Neobrutalist Button Structure -->
            <div class="relative">
               <!-- Shadow Layer -->
               <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
               <!-- Button Content -->
               <button (click)="toggleColumnSelector()" type="button" class="relative inline-flex justify-center items-center border-neo-border border-black px-2 py-1 bg-white text-sm font-medium text-gray-700 transition-transform ${borderRadiusClass} ${hoverXClass} ${hoverYClass}" aria-haspopup="true" [attr.aria-expanded]="isColumnSelectorOpen">
                 ${optionsIcon} <!-- Reusing options icon for simplicity -->
               </button>
             </div>
            <!-- Dropdown Panel -->
            @if (isColumnSelectorOpen) {
              <div class="origin-top-right absolute right-0 mt-2 w-48 border-neo-border border-black bg-white focus:outline-none z-10 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};" role="menu">
                <div class="py-1" role="none">
                  <label class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"><input type="checkbox" (change)="toggleColumnVisibility('id')" [checked]="isColumnVisible('id')" class="form-checkbox h-4 w-4 mr-2 border-black text-blue-600 focus:ring-blue-500"> ID</label>
                  <label class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"><input type="checkbox" (change)="toggleColumnVisibility('name')" [checked]="isColumnVisible('name')" class="form-checkbox h-4 w-4 mr-2 border-black text-blue-600 focus:ring-blue-500"> Nombre</label>
                  <label class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"><input type="checkbox" (change)="toggleColumnVisibility('job')" [checked]="isColumnVisible('job')" class="form-checkbox h-4 w-4 mr-2 border-black text-blue-600 focus:ring-blue-500"> Puesto</label>
                  <label class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"><input type="checkbox" (change)="toggleColumnVisibility('color')" [checked]="isColumnVisible('color')" class="form-checkbox h-4 w-4 mr-2 border-black text-blue-600 focus:ring-blue-500"> Color</label>
                </div>
              </div>
            }
          </div>
        </th>
      </tr>
      
      <!-- Header Row 2: Filter Inputs -->
      <tr class="bg-white">
        <th class="p-2"></th> <!-- Empty cell for checkbox -->
        @if (isColumnVisible('id')) { <th class="p-2"><div class="relative"><div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div><input type="text" [(ngModel)]="filterId" placeholder="Filtrar..." class="relative w-full px-2 py-1 border-neo-border border-black bg-white text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${borderRadiusClass}"></div></th> }
        @if (isColumnVisible('name')) { <th class="p-2"><div class="relative"><div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div><input type="text" [(ngModel)]="filterName" placeholder="Filtrar..." class="relative w-full px-2 py-1 border-neo-border border-black bg-white text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${borderRadiusClass}"></div></th> }
        @if (isColumnVisible('job')) { <th class="p-2"><div class="relative"><div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div><input type="text" [(ngModel)]="filterJob" placeholder="Filtrar..." class="relative w-full px-2 py-1 border-neo-border border-black bg-white text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${borderRadiusClass}"></div></th> }
        @if (isColumnVisible('color')) { <th class="p-2"><div class="relative"><div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div><input type="text" [(ngModel)]="filterColor" placeholder="Filtrar..." class="relative w-full px-2 py-1 border-neo-border border-black bg-white text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${borderRadiusClass}"></div></th> }
        <th class="p-2"></th> <!-- Empty cell for options -->
        <th class="p-2"></th> <!-- Empty cell for toggle column -->
      </tr>
    </thead>
    <tbody>
      @for (row of filteredAndSortedTableData; track row.id; let isEven = $even) {
        <tr class="border-b border-black" [ngClass]="isEven ? '${lightBgClass}' : ''">
          <!-- Row Selection Checkbox -->
          <td class="py-3 px-4 align-middle">
            ${rowCheckboxHtml.trim()}
          </td>
          <!-- Data Cells (Conditional) -->
          @if (isColumnVisible('id')) { <td class="py-3 px-4 align-middle">{{ row.id }}</td> }
          @if (isColumnVisible('name')) { <td class="py-3 px-4 align-middle">{{ row.name }}</td> }
          @if (isColumnVisible('job')) { <td class="py-3 px-4 align-middle">{{ row.job }}</td> }
          @if (isColumnVisible('color')) { <td class="py-3 px-4 align-middle">{{ row.color }}</td> }
          <!-- Options Cell -->
          <td class="py-3 px-4 text-center align-middle">
            <div class="relative inline-block text-left">
              <div class="relative">
                <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
                <button (click)="toggleOptions(row.id)" type="button" class="relative inline-flex justify-center items-center border-neo-border border-black px-2 py-1 bg-white text-sm font-medium text-gray-700 transition-transform ${borderRadiusClass} ${hoverXClass} ${hoverYClass}">
                   ${optionsIcon}
                </button>
              </div>
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
          <td class="align-middle"></td> <!-- Empty cell for toggle column placeholder -->
        </tr>
      }
      <!-- No Results Row -->
      @if (filteredAndSortedTableData.length === 0) {
        <tr>
           <td [attr.colspan]="visibleColumnCount" class="text-center py-4 text-gray-500">No se encontraron resultados.</td>
        </tr>
      }
    </tbody>
  </table>
</div>`;
    return this.escapeHtml(rawHtml.trim());
  }

  // Getter for OPTIONS table example code

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
