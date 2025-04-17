import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { HeroComponent } from '../../hero/hero.component';
import { CustomizationDemoComponent } from '../../customization-demo/customization-demo.component';
import { FaqComponent } from '../../faq/faq.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-main',
  imports: [HeroComponent, CustomizationDemoComponent, FaqComponent, FooterComponent],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {

  ngOnInit(): void { }

}
