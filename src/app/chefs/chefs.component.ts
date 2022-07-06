import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
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
  isDeleteChefOpen: boolean = false;
  name: string = '';
  description: string = '';
  image: string = '';
  isActive: boolean = true;
  constructor(
    public apiService: ApiService,
    private toastService: HotToastService,
    private fb: FormBuilder,
  ) {}
  displayedColumns: string[] = [
    'image',
    'name',
    'description',
    'edit',
    'delete',
  ];
  dataSource: any = [];
  chefsArray: any = [];
  chefs: any = [];
  selectedChef: any;

      chefModal = this.fb.group({
      name:['',[Validators.minLength(2),Validators.required]],
      image: ['',Validators.required],
      description: ['',[Validators.required, Validators.minLength(4)]],
    });

  ngOnInit(): void {
    this.apiService.getChefs().subscribe((res) => {
      this.chefsArray = res;
      for (const key in this.chefsArray) {
        this.chefs.push({
          name: this.chefsArray[key].name,
          image: this.chefsArray[key].image,
          description: this.chefsArray[key].description,
          isActive: this.chefsArray[key].isActive,
          _id: this.chefsArray[key]._id,
        });
      }
      this.dataSource = this.chefs;
    });
  }
  openAddChef() {
    this.isAddChefOpen = !this.isAddChefOpen;
    this.chefModal.reset();
  }
  openDeleteChef(_id: string) {
    this.isDeleteChefOpen = !this.isDeleteChefOpen;
    this.selectedChef = _id;
  }

  openEditChef(row: any) {
    
    this.isEditChefOpen = !this.isEditChefOpen;
    this.chefModal.patchValue(row);
    this.selectedChef = row._id;
  }

  addChef() {
    this.apiService
      .addChef(this.chefModal.value.name, this.chefModal.value.image, this.chefModal.value.description, this.isActive)
      .subscribe((res) => {
        this.toastService.success('New chef added successfully!');
        this.apiService.getChefs().subscribe((res) => {
          this.dataSource = res;
        });
      });
    this.isAddChefOpen = false;
  }

  editChef() {
    let body: chefBodyReq = {
      name: this.chefModal.value.name,
      image: this.chefModal.value.image,
      description: this.chefModal.value.description,
      isActive: this.chefModal.value.isActive,
    };
    this.apiService.editChef(this.selectedChef, body).subscribe((res) => {
      this.toastService.success('Chef details changed successfully!');
      this.apiService.getChefs().subscribe((res) => {
        this.dataSource = res;
      });
    });
    this.isEditChefOpen = false;
  }

  deleteChef() {
    this.apiService.deleteChef(this.selectedChef, false).subscribe((res) => {
      this.toastService.success('Chef has been deleted successfully!');
      this.apiService.getChefs().subscribe((res) => {
        this.dataSource = res;
      });
      this.isDeleteChefOpen = false;
    });
  }
}
