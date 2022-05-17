import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Liga } from 'src/app/models/liga';
import { LigaService } from 'src/app/services/liga.service';

@Component({
  selector: 'app-liga-dialog',
  templateUrl: './liga-dialog.component.html',
  styleUrls: ['./liga-dialog.component.css']
})
export class LigaDialogComponent implements OnInit {

  //oznaka za operaciju o kojoj se radi - 1: insert, 2: update, 3: delete
  public flag!: number;
  subscription!: Subscription;

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<LigaDialogComponent>,  
    @Inject(MAT_DIALOG_DATA) public data: Liga, public ligaService: LigaService) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.subscription = this.ligaService.addLiga(this.data).subscribe(() => 
    this.snackBar.open('Uspešno dodata liga: ' + this.data.naziv, 'OK', {duration: 2500}),
    (error: Error) => {
    this.snackBar.open('Došlo je do greške prilikom dodavanja nove lige!', 'Zatvori', {duration: 2500})
    });
  }

  public update(): void {
    this.subscription = this.ligaService.updateLiga(this.data).subscribe(() => 
    this.snackBar.open('Uspešno izmenjena liga: ' + this.data.naziv, 'OK', {duration: 2500}),
    (error: Error) => {
    this.snackBar.open('Došlo je do greške prilikom dodavanja nove lige!', 'Zatvori', {duration: 2500})
    });
  }

  public delete(): void {
    this.subscription = this.ligaService.deleteLiga(this.data.id).subscribe(() => 
    this.snackBar.open('Uspešno obrisana liga: ' + this.data.naziv, 'OK', {duration: 2500}),
    (error: Error) => {
    this.snackBar.open('Došlo je do greške prilikom brisanja postojeće lige!', 'Zatvori', {duration: 2500})
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene!', 'Zatvori', {duration:1000});
  }

}
