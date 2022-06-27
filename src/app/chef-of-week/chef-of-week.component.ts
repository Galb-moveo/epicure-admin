import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-chef-of-week',
  templateUrl: './chef-of-week.component.html',
  styleUrls: ['./chef-of-week.component.scss'],
})
export class ChefOfWeekComponent implements OnInit {
  chefOfWeekModal = new FormGroup({
    name: new FormControl(),
    chefId: new FormControl(),
  });
  displayedColumns: string[] = ['name', 'image', 'description', 'edit'];
  dataSource: any = [];
  constructor(public apiService: ApiService) {}
  chefOFWeekArray: any = [];
  chefOFWeek: any = [];
  chefsArray: any = [];
  chefs: any = [];
  isAddChefOfWeekOpen: boolean = false;
  selectedChef: string = '';

  ngOnInit(): void {
    this.apiService.getChefOfWeek().subscribe((res) => {
      this.chefOFWeekArray = res;
      for (const key in this.chefOFWeekArray) {
        this.chefOFWeek.push({
          id: this.chefOFWeekArray[key]._id,
          Chef: this.chefOFWeekArray[key].Chef,
        });
      }
      this.dataSource = this.chefOFWeek;
    });

    this.apiService.getChefs().subscribe((res) => {
      this.chefsArray = res;
      for (const key in this.chefsArray) {
        this.chefs.push({
          name: this.chefsArray[key].name,
          id: this.chefsArray[key]._id,
        });
      }
    });
  }

  openEditChefOfWeek(id: string) {
    this.isAddChefOfWeekOpen = !this.isAddChefOfWeekOpen;
    this.selectedChef = id;
    console.log(id);
  }

  editChefOfWeek() {
    let body = { chefOfId: this.chefOfWeekModal.value.chefId };
    this.apiService.editChefOfWeek(this.selectedChef, body).subscribe((res) => {
      this.isAddChefOfWeekOpen = !this.isAddChefOfWeekOpen;
      console.log(res);
    });
  }
}