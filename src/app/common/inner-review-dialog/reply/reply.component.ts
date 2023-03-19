import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { Reply } from 'src/app/models/Auth/reply';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { ReviewService } from 'src/app/services/ModelServices/review.service';

@Component({
    selector: 'app-reply',
    templateUrl: './reply.component.html',
    styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

    @Input() replies: Reply[];
    @Input() reviewId: string;
    @Input() currentUser: UserDTO;
    reactiveForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ReplyComponent>,
        private router: Router,
        private musicService: ReviewService,
    ) { }

    ngOnInit(): void {
        this.reactiveForm = new FormGroup({
            reply: new FormControl("", Validators.required),
        });
    }

    sendReply(comment: string) {
        var reply: Reply = {
            Id: "",
            User: this.currentUser,
            Comment: comment,
            ReplyDate: new Date()
        };
        if (!this.reactiveForm.valid) return;
        this.musicService.Reply(comment, this.reviewId).subscribe(data => {
            if (data.status) {
                this.replies.push(reply)
                this.reactiveForm.setValue({reply: ""});
            }
        })
    }

    getImage(profilePicture: string): string {
        return profilePicture != "" ? this.createImgPath(profilePicture) : "/assets/images/profile_vector.jpg";
    }

    createImgPath(serverPath: string) {
        return `https://localhost:7172/${serverPath}`;
    }

    navigateProfile(userId: string) {
        const currentUrl = this.router.url;
        this.router.navigateByUrl(`/profile/${userId}`, { skipLocationChange: true }).then(_ => {
            this.dialogRef.close();
        });
    }
}
