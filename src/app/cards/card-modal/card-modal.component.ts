import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component(
{
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})

export class CardModalComponent implements OnInit
{
  cardForm!: FormGroup;
  showSpinner:boolean=false;

  constructor
  (
    private dialogRef : MatDialogRef<CardModalComponent>,
    private fb : FormBuilder,
    private cardService : CardService,
    private _snackBar: MatSnackBar,
    private snackbarService : SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data:Card
  )
  {

  }

  ngOnInit(): void
  {
    console.log(this.data);

    this.cardForm = this.fb.group(
      {
        name:   [ this.data?.name    || '', Validators.maxLength(50)],
        title:  [ this.data?.title   || '', [Validators.required, Validators.max(255)]],
        phone:  [ this.data?.phone   || '', [Validators.required, Validators.maxLength(20)] ],
        email:  [ this.data?.email   || '', [Validators.email, Validators.maxLength(50)] ],
        address:[ this.data?.address || '',  Validators.max(255)]
      });
  }

  addcard() : void
  {
    //console.log(this.cardForm.value);

    this.showSpinner = true;

    this.cardService.addCard(this.cardForm.value)
    .subscribe((res:any)=>
      {
        //console.log(res);
         this.getSuccess(res || 'Business card added successfully');
      }, (err: any) =>
      {
        this.getError(err.message || 'Error occured while adding business card');
      });
  }

  updateCard() : void
  {
      this.showSpinner = true;

      this.cardService.updateCard(this.cardForm.value, this.data.id)
      .subscribe((res:any)=>
      {
        //console.log(res);
        this.getSuccess(res || 'Business card successfully updated');
      }, (err: any) =>
      {
        this.getError(err.message || 'There was an error in the business card update process');
      });
  }

  deleteCard() : void
  {
    this.showSpinner = true;

    this.cardService.deleteCard(this.data.id)
    .subscribe((res:any)=>
    {
      this.getSuccess(res || 'Business card was deleted successfully');
    }, (err: any) =>
    {
      this.getError(err.message || 'Error occurred while deleting business card');
    });
  }

  getSuccess(message:string) : void
  {
    /*
     this._snackBar.open(message, '',
          {
            duration:4000
          });
     */

    this.snackbarService.createSnackBar('success', message, 999999999999999999);

    this.cardService.getCards();//Retrieve data
    this.showSpinner = false;
    this.dialogRef.close(true);
  }

  getError(message:string) : void
  {
    /*
    this._snackBar.open(message || 'Error occurred', '',
          {
            duration:4000
          });
    */

    this.snackbarService.createSnackBar('error', message);
    this.showSpinner = false;
  }
}
