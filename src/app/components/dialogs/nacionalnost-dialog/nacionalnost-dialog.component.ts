import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Nacionalnost } from 'src/app/models/nacionalnost';
import { NacionalnostService } from 'src/app/services/nacionalnost.service';

@Component({
  selector: 'app-nacionalnost-dialog',
  templateUrl: './nacionalnost-dialog.component.html',
  styleUrls: ['./nacionalnost-dialog.component.css']
})
export class NacionalnostDialogComponent implements OnInit, OnDestroy {

  //oznaka za operaciju o kojoj se radi - 1: insert, 2: update, 3: delete
  public flag!: number;
  subscription!: Subscription;

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<NacionalnostDialogComponent>,  
    @Inject(MAT_DIALOG_DATA) public data: Nacionalnost, public nacionalnostService: NacionalnostService) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.subscription = this.nacionalnostService.addNacionalnost(this.data).subscribe(() => 
    this.snackBar.open('Uspešno dodata nacionalnost: ' + this.data.naziv, 'OK', {duration: 2500}),
    (error: Error) => {
    this.snackBar.open('Došlo je do greške prilikom dodavanja nove nacionalnosti!', 'Zatvori', {duration: 2500})
    });
  }

  public update(): void {
    this.subscription = this.nacionalnostService.updateNacionalnost(this.data).subscribe(() => 
    this.snackBar.open('Uspešno izmenjena nacionalnost: ' + this.data.naziv, 'OK', {duration: 2500}),
    (error: Error) => {
    this.snackBar.open('Došlo je do greške prilikom modifikacije nove nacionalnosti!', 'Zatvori', {duration: 2500})
    });
  }

  public delete(): void {
    this.subscription = this.nacionalnostService.deleteNacionalnost(this.data.id).subscribe(() => 
    this.snackBar.open('Uspešno obrisana nacionalnost: ' + this.data.naziv, 'OK', {duration: 2500}),
    (error: Error) => {
    this.snackBar.open('Došlo je do greške prilikom brisanja postojeće nacionalnost!', 'Zatvori', {duration: 2500})
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene!', 'Zatvori', {duration:1000});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
