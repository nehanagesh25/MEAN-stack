import { Component, OnInit, createPlatform } from '@angular/core';
import { IssueService } from '../../issue.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';
import { Issue } from '../../issue.model'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  issue: any = {};
  updateForm: FormGroup;
  constructor(private service: IssueService,  private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.createForm();
   }

   createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      country:['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.service.getIssueById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('name').setValue(this.issue.name);
        this.updateForm.get('age').setValue(this.issue.age);
        this.updateForm.get('country').setValue(this.issue.country);
        this.updateForm.get('gender').setValue(this.issue.gender);
     
      });
    });

  }
  updateIssue(name, age, country, gender) {
    this.service.updateIssue(this.id, name, age, country, gender).subscribe(() => {
      this.router.navigate(['/list']);
    
    });
   
  }

}
