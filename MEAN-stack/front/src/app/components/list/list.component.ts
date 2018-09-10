import { Component, OnInit, ViewChild } from '@angular/core';
import { IssueService } from '../../issue.service';
import { Router } from '@angular/router';
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { Issue } from '../../issue.model'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues : Issue[];
  displayedColumns = ['name','age','country','gender','actions'];

  constructor(private service: IssueService, private router : Router) { }

  @ViewChild(MatPaginator) paginator:MatPaginator;

  ngOnInit() {
    this.fetchIssues();
   }
   fetchIssues(){
    this.service
      .getIssues()
      .subscribe((data: Issue[]) => {
        this.issues = data;
        console.log('data requested ...');
        console.log(this.issues);
      });
   }

   editIssue(id){
     this.router.navigate([`/edit/${id}`]);
   }

   deleteIssue(id){
     this.service.deleteIssue(id).subscribe(() => {
       this.fetchIssues();
     });
   }
}
