import { Component, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatchService } from './match.service';

@Component({
  selector: 'match-details-dialog',
  templateUrl: 'match-details.component.html',
  providers: [MatchService],
})
export class MatchDetailsDialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<MatchDetailsDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private matchService: MatchService) { }

  comments: string[] = [];

  ngOnInit(): void {
    this.matchService.getComments(this.data.match.id)
      .then(comments => this.comments = comments);
  }

  showCommentInput: boolean = false;
  commentText: string;

  commentButtonClick(): void {
    this.showCommentInput = true;
  }

  sendCommentButtonClick(): void {
    const body = {
      'message': this.commentText,
    };
    const id = this.data.match.id;
    this.matchService.postComment(id, this.commentText)
      .then(() => {
        this.comments.push(this.commentText);
        this.commentText = '';
        this.showCommentInput = false;
      });
  }
}
