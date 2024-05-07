import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
})
export class ImportComponent {

  @Output() fileSelected = new EventEmitter<File>();

  constructor() { }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.fileSelected.emit(file);
  }
}
