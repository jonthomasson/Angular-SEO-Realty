import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Property } from '../../interfaces/home';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss']
})
export class HomeSearchComponent {
  @Input({required: true}) home!: Property;
}
