import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Nacionalnost } from 'src/app/models/nacionalnost';
import { Tim } from 'src/app/models/tim';
import { IgracService } from 'src/app/services/igrac.service';
import { IgracDialogComponent } from '../dialogs/igrac-dialog/igrac-dialog.component';

@Component({
  selector: 'app-igrac',
  templateUrl: './igrac.component.html',
  styleUrls: ['./igrac.component.css']
})
export class IgracComponent implements OnInit, OnDestroy, OnChanges {

  displayedColumns = ['id', 'ime', 'prezime', 'brojReg', 'datumRodjenja', 'nacionalnost', 'tim', 'actions'];
  subscription!: Subscription;
  dataSource!: MatTableDataSource<IgracComponent>;
  //ulaz u igrac je selektovan tim
  @Input() selektovanTim!: Tim;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  constructor(private igracService: IgracService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    //pretplata na observable - preko subscribe
    //povrtani tip metode iz servisa smestamo u promenljivu data
    this.subscription = this.igracService.getAllIgraciZaTimID(this.selektovanTim.id).subscribe(data => {
      //punimo dataSource podacima koje vraca servis
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    });
  }

  //opcioni parametri kod metode za update i delete - pomocu upitnika (pita na odbrani)
  public openDialog(flag: number, id?: number, ime?: string, prezime?: string, brojReg?: string, datumRodjenja?: Date, nacionalnost?: Nacionalnost, tim?: Tim): void {
    //otvori dijalog, i prosledi opcione parametre, ako postoje
    const dialogRef = this.dialog.open(IgracDialogComponent, {data: {id, ime, prezime, brojReg, datumRodjenja, nacionalnost, tim}});
    //setovanje flega
    dialogRef.componentInstance.flag = flag;
    //ako dodajemo igraca, dodajemo u tim koji je selektovan
    if (flag == 1) {
      dialogRef.componentInstance.data.tim = this.selektovanTim;
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1)
        this.loadData();
    })
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    //svaki put pri promeni, proverava se da li postoji selektovani tim, i ukoliko postoji poziva metodu loadData
    if (this.selektovanTim.id) {
      this.loadData();
    }
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value;
    //ako ima viska razmaka
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    //ugradjen property filter, kao i sort i paginator
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
