import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  @Input() isAddChefOpen: boolean = false;
  @Input() isEditChefOpen: boolean = false;  
  
  @Output() isDeleteDishOpenChange = new EventEmitter<boolean>();
  @Output() isDeleteRestaurantOpenChange = new EventEmitter<boolean>();
  @Output() isDeleteChefOpenChange = new EventEmitter<boolean>();
  @Output() isLoginOpenChange = new EventEmitter<boolean>();
  @Output() isEditDishOpenChange = new EventEmitter<boolean>();
  @Output() isAddChefOfWeekOpenChange = new EventEmitter<boolean>();
  @Output() isEditChefOpenChange = new EventEmitter<boolean>();
  @Output() isEditRestaurantOpenChange = new EventEmitter<boolean>();
  @Output() isAddChefOpenChange = new EventEmitter<boolean>();
  @Output() isAddDishOpenChange = new EventEmitter<boolean>();
  @Output() isAddRestaurantOpenChange = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.isAddChefOpenChange.emit(!this.isAddChefOpen);
    this.isEditChefOpenChange.emit(!this.isEditChefOpen);
  }
}
