import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'seo-realty';

  constructor(private metaService: Meta) { }

  ngOnInit(): void {
    this.metaService.addTag({ name: 'description', content: 'Discover real estate with ease. Leveraging advanced SEO techniques, our platform offers a seamless property search experience that gets you closer to your dream home.' });
  }
}
