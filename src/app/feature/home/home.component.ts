import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomesService } from '../../services/homes.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homes = this.homeService.homes;

  constructor(private homeService: HomesService) { }
    ngOnInit(): void {
      console.log(this.homes());
    }
}
