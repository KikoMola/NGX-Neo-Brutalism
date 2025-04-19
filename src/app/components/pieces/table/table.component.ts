import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service';
import { ComponentPreviewComponent } from '../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../code-snippet-preview/code-snippet-preview.component';
import { BasicComponent } from './basic/basic.component';
import { StripedComponent } from './striped/striped.component';
import { BasicHoverComponent } from './basic-hover/basic-hover.component';
import { StripedHoverComponent } from './striped-hover/striped-hover.component';
// Define interface for table data rows
export interface TableRow {
  id: number;
  name: string;
  job: string;
  color: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
    BasicComponent,
    StripedComponent,
    BasicHoverComponent,
    StripedHoverComponent,
  ],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  public themeService = inject(ThemeService);  

  // Tab state management for STRIPED SELECTABLE example
  stripedSelectableTableActiveTab: 'preview' | 'code' = 'preview';

  setStripedSelectableActiveTab(tab: 'preview' | 'code'): void {
    this.stripedSelectableTableActiveTab = tab;
  }

  // Tab state management for TOGGLE COLUMNS example
  toggleColumnsTableActiveTab: 'preview' | 'code' = 'preview';

  setToggleColumnsActiveTab(tab: 'preview' | 'code'): void {
    this.toggleColumnsTableActiveTab = tab;
  }

  // Tab state management for FILTER example
  filterTableActiveTab: 'preview' | 'code' = 'preview';

  setFilterTableActiveTab(tab: 'preview' | 'code'): void {
    this.filterTableActiveTab = tab;
  }

  // Tab state management for SORTABLE example
  sortableTableActiveTab: 'preview' | 'code' = 'preview';

  setSortableTableActiveTab(tab: 'preview' | 'code'): void {
    this.sortableTableActiveTab = tab;
  }
  
  // Tab state management for OPTIONS example
  optionsTableActiveTab: 'preview' | 'code' = 'preview';

  setOptionsTableActiveTab(tab: 'preview' | 'code'): void {
    this.optionsTableActiveTab = tab;
  }

  // Tab state management for ALL FEATURES example
  allFeaturesTableActiveTab: 'preview' | 'code' = 'preview';

  setAllFeaturesTableActiveTab(tab: 'preview' | 'code'): void {
    this.allFeaturesTableActiveTab = tab;
  }

  // Example data for the table (used by all)
  tableData: TableRow[] = [
    { id: 1, name: 'Cy Ganderton', job: 'Quality Control Specialist', color: 'Blue' },
    { id: 2, name: 'Hart Hagerty', job: 'Desktop Support Technician', color: 'Purple' },
    { id: 3, name: 'Brice Swyre', job: 'Tax Accountant', color: 'Red' },
    { id: 4, name: 'Marjy Ferencz', job: 'Office Assistant I', color: 'Crimson' },
    { id: 5, name: 'Yancy Tear', job: 'Community Outreach Specialist', color: 'Indigo' },
  ];

  // Selection state
  selectedRowIds = new Set<number>();

  // Column visibility state
  visibleColumns = new Set<string>(['id', 'name', 'job', 'color']);

  isColumnSelectorOpen = false; // State for dropdown visibility

  // Filtering state
  filterId: string = '';
  filterName: string = '';
  filterJob: string = '';
  filterColor: string = '';

  get filteredTableData() {
    return this.tableData.filter(row => 
      (this.filterId === '' || row.id.toString().includes(this.filterId)) &&
      (row.name.toLowerCase().includes(this.filterName.toLowerCase())) &&
      (row.job.toLowerCase().includes(this.filterJob.toLowerCase())) &&
      (row.color.toLowerCase().includes(this.filterColor.toLowerCase()))
    );
  }

  // Sorting state
  sortColumnKey: keyof TableRow | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  get sortedTableData(): TableRow[] {
    if (!this.sortColumnKey || !this.sortDirection) {
      return this.tableData; // Return original data if no sort applied
    }

    // Create a copy to avoid modifying the original array
    const dataToSort = [...this.tableData];

    dataToSort.sort((a, b) => {
      const aValue = a[this.sortColumnKey!];
      const bValue = b[this.sortColumnKey!];

      let comparison = 0;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else {
        // Handle mixed types or other types if necessary
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    return dataToSort;
  }

  // --- Combined Filtered and Sorted Data Getter ---
  get filteredAndSortedTableData(): TableRow[] {
    // 1. Apply Filters
    let filteredData = this.tableData.filter(row => 
      (this.filterId === '' || row.id.toString().includes(this.filterId)) &&
      (row.name.toLowerCase().includes(this.filterName.toLowerCase())) &&
      (row.job.toLowerCase().includes(this.filterJob.toLowerCase())) &&
      (row.color.toLowerCase().includes(this.filterColor.toLowerCase()))
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
  
  // --- Colspan Getter ---
  get visibleColumnCount(): number {
    // +1 for the selection checkbox column, +1 for the toggle column placeholder, +1 for options
    return this.visibleColumns.size + 3; 
  }

  // --- Options Menu State ---
  openOptionsRowId: number | null = null;

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

  // --- Selection Logic ---
  toggleRowSelection(id: number): void {
    if (this.selectedRowIds.has(id)) {
      this.selectedRowIds.delete(id);
    } else {
      this.selectedRowIds.add(id);
    }
  }
  
  toggleSelectAll(): void {
    const currentDataIds = this.filteredAndSortedTableData.map(row => row.id);
    if (this.areAllSelected()) {
       // Deselect only the currently visible/filtered items
       currentDataIds.forEach(id => this.selectedRowIds.delete(id));
    } else {
       // Select only the currently visible/filtered items
       currentDataIds.forEach(id => this.selectedRowIds.add(id));
    }
  }
  
  isRowSelected(id: number): boolean { return this.selectedRowIds.has(id); }
  
  areAllSelected(): boolean { 
      const currentData = this.filteredAndSortedTableData; // Use current data for select all logic
      if (currentData.length === 0) return false; 
      // Check if all currently visible/filtered items are selected
      return currentData.every(row => this.selectedRowIds.has(row.id)); 
  }
  
  isAnySelected(): boolean { 
      const currentData = this.filteredAndSortedTableData;
      if (currentData.length === 0) return false;
      // Check if at least one visible/filtered item is selected, but not all
      return currentData.some(row => this.selectedRowIds.has(row.id)) && !this.areAllSelected();
  }

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
  
  isColumnVisible(columnKey: string): boolean { return this.visibleColumns.has(columnKey); }
  toggleColumnSelector(): void { this.isColumnSelectorOpen = !this.isColumnSelectorOpen; }

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

  // --- Options Menu Logic ---
  toggleOptions(rowId: number): void {
    this.openOptionsRowId = this.openOptionsRowId === rowId ? null : rowId;
  }

  handleOptionClick(option: string, rowId: number): void {
    console.log(`${option} clicked for row ${rowId}`);
    this.openOptionsRowId = null; // Close the menu after action
  }

  // --- Example Code Getters ---

  

  

  

  // Getter for STRIPED HOVER table example code
  get stripedHoverTableExampleCode(): string {
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
      <!-- Data rows generated by @for loop -->
       @for (row of tableData; track row.id; let isEven = $even) {
        <tr class="border-b border-black hover:bg-gray-100" [ngClass]="isEven ? '${lightBgClass}' : ''">
          <td class="py-3 px-4">{{ row.id }}</td>
          <td class="py-3 px-4">{{ row.name }}</td>
          <td class="py-3 px-4">{{ row.job }}</td>
          <td class="py-3 px-4">{{ row.color }}</td>
        </tr>
      }
    </tbody>
  </table>
</div>`;

    return this.escapeHtml(tableHtml.trim());
  }
  
  // Getter for STRIPED SELECTABLE table example code
  get stripedSelectableTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const lightBgClass = this.themeService.getLightBgClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();

    // Simplified Neo Checkbox HTML structure (Select All)
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
    
    // Simplified Neo Checkbox HTML structure (Row)
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
  // Component Logic:\n  import { ThemeService } from './path/to/theme.service\'; // Import ThemeService\n  // ... other imports\n  \n  tableData: TableRow[] = [/* ... your data ... */];\n  selectedRowIds = new Set<number>();\n  \n  constructor(public themeService: ThemeService) {} // Inject ThemeService\n  \n  toggleRowSelection(id: number): void { /* ... logic ... */ }\n  toggleSelectAll(): void { /* ... logic ... */ }\n  isRowSelected(id: number): boolean { return this.selectedRowIds.has(id); }\n  areAllSelected(): boolean { /* ... logic ... */ }\n  isAnySelected(): boolean { /* ... logic ... */ }`;

    const rawHtml = `
${tsLogicComment}
<!-- HTML Template -->
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium">
      <tr>
        <th class="py-3 px-4 text-left w-12">
          ${checkAllCheckboxHtml.trim()}
        </th>
        <th class="py-3 px-4 text-left">ID</th>
        <th class="py-3 px-4 text-left">Nombre</th>
        <th class="py-3 px-4 text-left">Puesto</th>
        <th class="py-3 px-4 text-left">Color Favorito</th>
      </tr>
    </thead>
    <tbody>
      @for (row of tableData; track row.id; let isEven = $even) {
        <tr class="border-b border-black" [ngClass]="isEven ? '${lightBgClass}' : ''">
          <td class="py-3 px-4">
             ${rowCheckboxHtml.trim()}
          </td>
          <td class="py-3 px-4">{{ row.id }}</td>
          <td class="py-3 px-4">{{ row.name }}</td>
          <td class="py-3 px-4">{{ row.job }}</td>
          <td class="py-3 px-4">{{ row.color }}</td>
        </tr>
      }
    </tbody>
  </table>
</div>`;
    return this.escapeHtml(rawHtml.trim());
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

  // Getter for FILTER table example code
  get filterTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const lightBgClass = this.themeService.getLightBgClass();

    // Comment explaining the required TS logic
    const tsLogicComment = `
  import { FormsModule } from '@angular/forms'; // Required!
  
  export class YourComponent {
    tableData = [ /* your data */ ];
    filterId: string = '';
    filterName: string = '';
    filterJob: string = '';
    filterColor: string = '';

    get filteredTableData() {
      return this.tableData.filter(row => 
        (this.filterId === '' || row.id.toString().includes(this.filterId)) &&
        (row.name.toLowerCase().includes(this.filterName.toLowerCase())) &&
        (row.job.toLowerCase().includes(this.filterJob.toLowerCase())) &&
        (row.color.toLowerCase().includes(this.filterColor.toLowerCase()))
      );
    }
  }
    `;

    const tableHtml = `
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium">
      <!-- Header Row -->
      <tr>
        <th class="py-3 px-4 text-left">ID</th>
        <th class="py-3 px-4 text-left">Nombre</th>
        <th class="py-3 px-4 text-left">Puesto</th>
        <th class="py-3 px-4 text-left">Color Favorito</th>
      </tr>
      <!-- Filter Row -->
      <tr class="bg-white">
         <th class="p-2">
            <div class="relative">
             <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
             <input 
               type="text" 
               [(ngModel)]="filterId" 
               placeholder="Filtrar..."
               class="relative w-full px-2 py-1 border-neo-border border-black bg-white text-sm text-gray-900 ${borderRadiusClass} focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
             >
           </div>
         </th> 
         <th class="p-2">
           <div class="relative">
             <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
             <input 
               type="text" 
               [(ngModel)]="filterName" 
               placeholder="Filtrar..."
               class="relative w-full px-2 py-1 border-neo-border border-black bg-white text-sm text-gray-900 ${borderRadiusClass} focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
             >
           </div>
         </th>
         <th class="p-2">
            <div class="relative">
             <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
             <input 
               type="text" 
               [(ngModel)]="filterJob" 
               placeholder="Filtrar..."
               class="relative w-full px-2 py-1 border-neo-border border-black bg-white text-sm text-gray-900 ${borderRadiusClass} focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
             >
           </div>
         </th>
         <th class="p-2">
            <div class="relative">
             <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
             <input 
               type="text" 
               [(ngModel)]="filterColor" 
               placeholder="Filtrar..."
               class="relative w-full px-2 py-1 border-neo-border border-black bg-white text-sm text-gray-900 ${borderRadiusClass} focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
             >
           </div>
         </th>
      </tr>
    </thead>
    <tbody>
       @for (row of filteredTableData; track row.id; let isEven = $even) {
        <tr class="border-b border-black" [ngClass]="isEven ? '${lightBgClass}' : ''">
          <td class="py-3 px-4">{{ row.id }}</td>
          <td class="py-3 px-4">{{ row.name }}</td>
          <td class="py-3 px-4">{{ row.job }}</td>
          <td class="py-3 px-4">{{ row.color }}</td>
        </tr>
       }
       @if (filteredTableData.length === 0) {
         <tr>
           <td colspan="4" class="text-center py-4 text-gray-500">No se encontraron resultados.</td>
         </tr>
       }
    </tbody>
  </table>
</div>`;

    // Combine TS comment and table HTML
    return this.escapeHtml(tsLogicComment + tableHtml.trim());
  }

  // Getter for SORTABLE table example code
  get sortableTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const lightBgClass = this.themeService.getLightBgClass();

    // Comment explaining the required TS logic
    const tsLogicComment = `
  interface TableRow { id: number; name: string; job: string; color: string; }

  export class YourComponent {
    tableData: TableRow[] = [ /* your data */ ];
    sortColumnKey: keyof TableRow | null = null;
    sortDirection: 'asc' | 'desc' | null = null;

    sortTable(columnKey: keyof TableRow): void { /* ... cycle logic ... */ }

    get sortedTableData(): TableRow[] { 
      // Return sorted copy based on sortColumnKey and sortDirection
      // ... sort logic ...
      return this.tableData; // Placeholder 
    }
  }
    `;

    // Define SVGs
    const ascSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-az-icon lucide-arrow-up-a-z"><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M20 8h-5"/><path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10"/><path d="M15 14h5l-5 6h5"/></svg>`;
    const descSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-az-icon lucide-arrow-down-a-z"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M20 8h-5"/><path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10"/><path d="M15 14h5l-5 6h5"/></svg>`;

    const tableHtml = `
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium">
      <tr>
        <!-- Sortable Headers with updated SVGs -->
        <th class="py-3 px-4 text-left">
           <button (click)="sortTable('id')" class="flex items-center space-x-1 hover:opacity-80">
             <span>ID</span>
             @if (sortColumnKey === 'id') {
               @if (sortDirection === 'asc') {
                 ${ascSvg}
               } @else if (sortDirection === 'desc') {
                 ${descSvg}
               }
             }
           </button>
        </th>
        <th class="py-3 px-4 text-left">
           <button (click)="sortTable('name')" class="flex items-center space-x-1 hover:opacity-80">
             <span>Nombre</span>
             @if (sortColumnKey === 'name') {
               @if (sortDirection === 'asc') {
                 ${ascSvg}
               } @else if (sortDirection === 'desc') {
                 ${descSvg}
               }
             }
           </button>
        </th>
         <th class="py-3 px-4 text-left">
           <button (click)="sortTable('job')" class="flex items-center space-x-1 hover:opacity-80">
             <span>Puesto</span>
             @if (sortColumnKey === 'job') {
               @if (sortDirection === 'asc') {
                 ${ascSvg}
               } @else if (sortDirection === 'desc') {
                 ${descSvg}
               }
             }
           </button>
        </th>
        <th class="py-3 px-4 text-left">
           <button (click)="sortTable('color')" class="flex items-center space-x-1 hover:opacity-80">
             <span>Color Favorito</span>
             @if (sortColumnKey === 'color') {
               @if (sortDirection === 'asc') {
                 ${ascSvg}
               } @else if (sortDirection === 'desc') {
                 ${descSvg}
               }
             }
           </button>
        </th>
      </tr>
    </thead>
    <tbody>
       @for (row of sortedTableData; track row.id; let isEven = $even) {
        <tr class="border-b border-black" [ngClass]="isEven ? '${lightBgClass}' : ''">
          <td class="py-3 px-4">{{ row.id }}</td>
          <td class="py-3 px-4">{{ row.name }}</td>
          <td class="py-3 px-4">{{ row.job }}</td>
          <td class="py-3 px-4">{{ row.color }}</td>
        </tr>
       }
    </tbody>
  </table>
</div>`;

    // Combine TS comment and table HTML
    return this.escapeHtml(tsLogicComment + tableHtml.trim());
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
}
