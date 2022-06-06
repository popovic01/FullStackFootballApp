import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Liga } from 'src/app/models/liga';
import { LigaService } from 'src/app/services/liga.service';
import { LigaDialogComponent } from '../dialogs/liga-dialog/liga-dialog.component';

@Component({
  selector: 'app-liga',
  templateUrl: './liga.component.html',
  styleUrls: ['./liga.component.css']
})
export class LigaComponent implements OnInit, OnDestroy {

  //kolone koje se prikazuju u tabeli
  displayedColumns = ['id', 'naziv', 'oznaka', 'actions'];
  dataSource!: MatTableDataSource<Liga>;
  subscription!: Subscription;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  constructor(private ligaService: LigaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    //pretplata na observable - preko subscribe
    //povrtani tip metode iz servisa smestamo u promenljivu data
    this.subscription = this.ligaService.getAllLigas().subscribe(data => {
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
  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string): void {
    //otvaranje dijaloga
    const dialogRef = this.dialog.open(LigaDialogComponent, {data: {id, naziv, oznaka}});
    //setovanje flega
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1)
        this.loadData();
    })
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
