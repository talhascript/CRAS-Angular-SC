import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-profile-image',
  templateUrl: './change-profile-image.component.html',
  styleUrls: ['./change-profile-image.component.css'],
})
export class ChangeProfileImageComponent implements OnInit {
  selectedFile?: File;
  displayedImage: string = '';
  constructor(
    public dialogRef: MatDialogRef<ChangeProfileImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { defaultImage: string }
  ) {}

  getBase64(file: File) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.displayedImage = reader.result as string;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  ngOnInit(): void {}

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    this.getBase64(this.selectedFile as any);
  }

  onDismiss() {
    this.dialogRef.close();
  }

  onSubmitImage() {
    if (!this.selectedFile) return;
    this.dialogRef.close(this.selectedFile);
  }
}
