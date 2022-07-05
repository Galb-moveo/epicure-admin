import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-chef-of-week',
  templateUrl: './chef-of-week.component.html',
  styleUrls: ['./chef-of-week.component.scss'],
})
export class ChefOfWeekComponent implements OnInit {
  chefOfWeekModal = new FormControl();

  displayedColumns: string[] = ['image', 'name', 'description', 'edit'];
  dataSource: any = [];
  constructor(
    public apiService: ApiService,
    private toastService: HotToastService,
  ) {}
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
        this.dataSource.push({
          _id: this.chefOFWeekArray[key]._id,
          Chef: this.chefOFWeekArray[key].Chef,
        });
      }
      this.chefOFWeek = this.dataSource;
    });

    this.apiService.getChefs().subscribe((res) => {
      this.chefsArray = res;
      for (const key in this.chefsArray) {
        this.chefs.push({
          name: this.chefsArray[key].name,
          _id: this.chefsArray[key]._id,
        });
      }
    });
  }

  openEditChefOfWeek(row: any) {
    this.chefOfWeekModal.patchValue(row.Chef.name);
    this.isAddChefOfWeekOpen = !this.isAddChefOfWeekOpen;
    this.selectedChef = row._id;
  }

  editChefOfWeek() {
    this.chefs.forEach((chef: any) => {
      if (this.chefOfWeekModal.value == chef.name) {
        this.chefOfWeekModal.setValue(chef._id);
      }
    });
    let body = { chefOfId: this.chefOfWeekModal.value };
    this.apiService.editChefOfWeek(this.selectedChef, body).subscribe((res) => {
      this.toastService.success('Chef of the week changed successfully!');
      this.apiService.getChefOfWeek().subscribe((res) => {
        this.chefOFWeek = res;
      });
      console.log(res);
      this.isAddChefOfWeekOpen = !this.isAddChefOfWeekOpen;
    });
  }
}
