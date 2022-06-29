import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

export interface chefBodyReq {
  name: string;
  description: string;
  image: string;
  isActive: boolean;
}

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.scss'],
})
export class ChefsComponent implements OnInit {
  title = 'Add Chef';
  isAddChefOpen: boolean = false;
  isEditChefOpen: boolean = false;
  name: string = '';
  description: string = '';
  image: string = '';
  isActive: boolean = true;
  constructor(public apiService: ApiService) {}

  displayedColumns: string[] = [
    'name',
    'image',
    'description',
    'edit',
    'delete',
    'active',
  ];
  dataSource: any = [];
  chefsArray: any = [];
  chefs: any = [];
  selectedChef: any;

  ngOnInit(): void {
    this.apiService.getChefs().subscribe((res) => {
      this.chefsArray = res;
      for (const key in this.chefsArray) {
        this.chefs.push({
          name: this.chefsArray[key].name,
          image: this.chefsArray[key].image,
          description: this.chefsArray[key].description,
          isActive: this.chefsArray[key].isActive,
          id: this.chefsArray[key]._id,
        });
      }
      this.dataSource = this.chefs;
    });
  }
  openAddChef() {
    this.isAddChefOpen = !this.isAddChefOpen;
  }

  openEditChef(id: any) {
    this.isEditChefOpen = !this.isEditChefOpen;
    this.selectedChef = id;
  }

  addChef() {
    this.apiService
      .addChef(this.name, this.image, this.description, this.isActive)
      .subscribe((res) => {
        console.log(res);
      });
      this.isAddChefOpen = false;
  }

  editChef() {
    let body: chefBodyReq = {
      name: this.name,
      image: this.image,
      description: this.description,
      isActive: this.isActive,
    };
    this.apiService.editChef(this.selectedChef, body).subscribe((res) => {
      console.log(res);
    });
    this.isEditChefOpen = false;
  }

  deleteChef(id:string) {
    this.apiService.deleteChef(id, false).subscribe((res) => {
      console.log(res);
    });
  }
}
