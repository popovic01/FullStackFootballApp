import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Liga } from 'src/app/models/liga';
import { Tim } from 'src/app/models/tim';
import { LigaService } from 'src/app/services/liga.service';
import { TimService } from 'src/app/services/tim.service';

@Component({
  selector: 'app-tim-dialog',
  templateUrl: './tim-dialog.component.html',
  styleUrls: ['./tim-dialog.component.css']
})
export class TimDialogComponent implements OnInit, OnDestroy {

  //oznaka za operaciju o kojoj se radi - 1: insert, 2: update, 3: delete
  public flag!: number;
  subscription!: Subscription;
  lige!: Liga[];

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<TimDialogComponent>,  
    @Inject(MAT_DIALOG_DATA) public data: Tim, public timService: TimService, public ligaService: LigaService) { }

  ngOnInit(): void {
    this.ligaService.getAllLigas().subscribe(data => {
	  this.lige = data;
    });
  }

  //poredi da li je doslo do promene, bez toga ne radi
  compareTo(a: any, b: any) {
    return a.id == b.id;
  }

  public add(): void {
    //kad dodajemo tim, pojavice se padajuca lista koja prikazuje koje lige postoje u bazi
    this.subscription = this.timService.addTim(this.data).subscribe(() => 
    this.snackBar.open('Uspešno dodat tim: ' + this.data.naziv, 'OK', {duration: 2500}),
    (error: Error) => {
    this.snackBar.open('Došlo je do greške prilikom dodavanja novog tima!', 'Zatvori', {duration: 2500})
    });
  }

  public update(): void {
    this.subscription = this.timService.updateTim(this.data).subscribe(() => 
    this.snackBar.open('Uspešno izmenjen tim: ' + this.data.naziv, 'OK', {duration: 2500}),
    (error: Error) => {
    this.snackBar.open('Došlo je do greške prilikom dodavanja novog tima!', 'Zatvori', {duration: 2500})
    });
  }

  public delete(): void {
    this.subscription = this.timService.deleteTim(this.data.id).subscribe(() => 
    this.snackBar.open('Uspešno obrisan tim: ' + this.data.naziv, 'OK', {duration: 2500}),
    (error: Error) => {
    this.snackBar.open('Došlo je do greške prilikom brisanja postojećeg tima!', 'Zatvori', {duration: 2500})
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