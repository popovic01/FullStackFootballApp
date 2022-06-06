import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Liga } from 'src/app/models/liga';
import { Tim } from 'src/app/models/tim';
import { TimService } from 'src/app/services/tim.service';
import { TimDialogComponent } from '../dialogs/tim-dialog/tim-dialog.component';

@Component({
  selector: 'app-tim',
  templateUrl: './tim.component.html',
  styleUrls: ['./tim.component.css']
})
export class TimComponent implements OnInit, OnDestroy {

  //kolone koje se prikazuju u tabeli
  displayedColumns = ['id', 'naziv', 'osnovan', 'sediste', 'liga', 'actions'];
  dataSource!: MatTableDataSource<Tim>;
  subscription!: Subscription;
  selektovanTim!: Tim;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  constructor(private timService: TimService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    //pretplata na observable - preko subscribe
    //povrtani tip metode iz servisa smestamo u promenljivu data
    this.subscription = this.timService.getAllTims().subscribe(data => {
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
  public openDialog(flag: number, id?: number, naziv?: string, osnovan?: Date, sediste?: string, liga?: Liga): void {
    //otvaranje dijaloga
    const dialogRef = this.dialog.open(TimDialogComponent, {data: {id, naziv, osnovan, sediste, liga}});
    //setovanje flega
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1)
        this.loadData();
    })
  }

  selectRow(row: any) {
    this.selektovanTim = row;
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
