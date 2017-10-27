import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'match-details-dialog',
  templateUrl: 'match-details.component.html',
})
export class MatchDetailsDialog {
  constructor(public dialogRef: MatDialogRef<MatchDetailsDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  showCommentInput: boolean = false;

  commentButtonClick(): void {
    this.showCommentInput = true;
  }
}
