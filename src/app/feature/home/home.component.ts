import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomesService } from '../../services/homes.service';
import { computed } from '@angular/core';
import { Property } from '../../interfaces/home';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homes = this.homeService.homesWithPrices;
  featuredHome = computed(() => {
    const randomIndex = Math.floor(Math.random() * this.homes()?.length);
   /* if (randomIndex) {*/
      return this.homes()[randomIndex];
    //}

    /*return {} as Property;*/
    
  })

  constructor(private homeService: HomesService) { }

  async ngOnInit() {
   
  }

}
