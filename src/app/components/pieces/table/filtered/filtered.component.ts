import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentPreviewComponent } from '../../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../../code-snippet-preview/code-snippet-preview.component';
import { TableRow } from '../table.component';

@Component({
  selector: 'app-filtered',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
  ],
  templateUrl: './filtered.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilteredComponent implements OnInit {
  public themeService = inject(ThemeService);

  // Filtering state
  filterId: string = '';
  filterName: string = '';
  filterJob: string = '';
  filterColor: string = '';

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

  get filteredTableData() {
    return this.tableData.filter(
      (row) =>
        (this.filterId === '' || row.id.toString().includes(this.filterId)) &&
        row.name.toLowerCase().includes(this.filterName.toLowerCase()) &&
        row.job.toLowerCase().includes(this.filterJob.toLowerCase()) &&
        row.color.toLowerCase().includes(this.filterColor.toLowerCase())
    );
  }

  // Tab state management for FILTER example
  filterTableActiveTab: 'preview' | 'code' = 'preview';

  setFilterTableActiveTab(tab: 'preview' | 'code'): void {
    this.filterTableActiveTab = tab;
  }

  ngOnInit(): void {
    this.filterId = '';
    this.filterName = '';
    this.filterJob = '';
    this.filterColor = '';
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

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
