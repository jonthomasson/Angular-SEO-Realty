import { Component, computed, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomesService } from '../../services/homes.service';
import { Property } from '../../interfaces/home';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() id: number = 0;
  homes = this.homeService.homesWithPrices;
  home = computed(() => this.homes().filter(x => x.identifier.Id == this.id)[0]);

  constructor(private homeService: HomesService) {
  }

    ngOnInit(): void {
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && !Array.isArray(value);
  }
  
}
