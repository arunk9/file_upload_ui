import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  batchId = '';
  errorMessage = '';
  users: any[] | undefined;
  searchTerm: string = '';
  sortDirection: string = 'ASC'; // Initial sort direction
  defaultSortClass = 'fa fa-sort'
  userNameSortClass = this.defaultSortClass;
  emailSortClass = this.defaultSortClass;


  constructor(private usersService: UsersService) { }

  onFileSelected(file: File): void {
    this.usersService.uploadFile(file).subscribe({
      next: data => {
        this.batchId = data.data.batch_id;
        this.getUsersByBatchId([]);
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    })
  }

  getUsersByBatchId(params: any): void {
    this.usersService.getUsersByBatchId(this.batchId, params).subscribe({
      next: data => {
        this.users = data.data;
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    })
  }

  filter(): void {
    this.getUsersByBatchId({search_text: this.searchTerm});
  }

  sortBy(key: string): void {
    // on sort click toggle current sort direction
    this.sortDirection = this.sortDirection == 'ASC' ? 'DESC' : 'ASC';
    let params = {
      sort_key: key,
      sort_order: this.sortDirection,
      search_text: ''
    }

    const ascendingClass = 'fa fa-sort-up';
    const descendingClass = 'fa fa-sort-down';

    if (key == 'username') {
      this.userNameSortClass = (this.sortDirection == 'ASC') ? ascendingClass : descendingClass;
      this.emailSortClass = this.defaultSortClass;
    } else {
      this.emailSortClass = (this.sortDirection == 'DESC') ? ascendingClass : descendingClass;
      this.userNameSortClass = this.defaultSortClass;
    }

    if (this.searchTerm.length > 2)
      params = { ...params, search_text: this.searchTerm};

    this.getUsersByBatchId(params);
  }
}
