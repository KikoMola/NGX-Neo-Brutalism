import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-pieces',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './pieces.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PiecesComponent implements OnInit {
  constructor(public themeService: ThemeService) {}
  
  ngOnInit(): void { }
}
