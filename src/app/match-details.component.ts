import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatchService } from './match.service';

@Component({
  selector: 'match-details-dialog',
  templateUrl: 'match-details.component.html',
  providers: [MatchService],
})
export class MatchDetailsDialog {
  constructor(public dialogRef: MatDialogRef<MatchDetailsDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private matchService: MatchService) { }

  showCommentInput: boolean = false;
  commentText: string;

  commentButtonClick(): void {
    this.showCommentInput = true;
  }

  sendCommentButtonClick(): void {
    const body = {
      'message': this.commentText,
    };
    const id = this.data.match.display_name;
    this.matchService.postComment(id, this.commentText);
  }
}
