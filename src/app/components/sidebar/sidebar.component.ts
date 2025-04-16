import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
  standalone: true
})
export class SidebarComponent {
  @Output() linkClick = new EventEmitter<void>();
  
  onLinkClick() {
    this.linkClick.emit();
  }
}
