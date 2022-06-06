import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Igrac } from 'src/app/models/igrac';
import { Nacionalnost } from 'src/app/models/nacionalnost';
import { IgracService } from 'src/app/services/igrac.service';
import { NacionalnostService } from 'src/app/services/nacionalnost.service';

@Component({
  selector: 'app-igrac-dialog',
  templateUrl: './igrac-dialog.component.html',
  styleUrls: ['./igrac-dialog.component.css']
})
export class IgracDialogComponent implements OnInit, OnDestroy {

  //oznaka za operaciju o kojoj se radi - 1: insert, 2: update, 3: delete
  public flag!: number;
  nacionalnosti!: Nacionalnost[];
  subscription!: Subscription;

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<IgracDialogComponent>,  
    @Inject(MAT_DIALOG_DATA) public data: Igrac, public igracService: IgracService, public nacionalnostService: NacionalnostService) { }

  ngOnInit(): void {
	this.subscription = this.nacionalnostService.getAllNacionalnosts().subscribe(data => {
		this.nacionalnosti = data;
	});
  }

  public add(): void {
    this.subscription = this.igracService.addIgrac(this.data).subscribe(() => 
    this.snackBar.open('Uspešno dodat igrač: ' + this.data.ime, 'OK', {duration: 2500}),
    (error: Error) => {
    this.snackBar.open('Došlo je do greške prilikom dodavanja novog igrača!', 'Zatvori', {duration: 2500})
    });
  }

  public update(): void {
    this.subscription = this.igracService.updateIgrac(this.data).subscribe(() => 
    this.snackBar.open('Uspešno izmenjen igrač: ' + this.data.ime, 'OK', {duration: 2500}),
    (error: Error) => {
    this.snackBar.open('Došlo je do greške prilikom izmene postojećeg igrača!', 'Zatvori', {duration: 2500})
    });
  }

  public delete(): void {
    this.subscription = this.igracService.deleteIgrac(this.data.id).subscribe(() => 
    this.snackBar.open('Uspešno obrisan igrač: ' + this.data.ime, 'OK', {duration: 2500}),
    (error: Error) => {
    this.snackBar.open('Došlo je do greške prilikom brisanja postojeceg igrača!', 'Zatvori', {duration: 2500})
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene!', 'Zatvori', {duration:1000});
  }

  public compareTo(a: any, b: any) {
	  return a.id = b.id;
  }

  ngOnDestroy(): void {
	  this.subscription.unsubscribe();
  }

}
