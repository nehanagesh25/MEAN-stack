import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service'
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;


  constructor(private service: IssueService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      name: ['',Validators.required ],
      age: ['',Validators.required ],
      country:['',Validators.required ],
      gender: ['',Validators.required ]
    });
   }
   addIssue(name,age,country,gender){
     this.service.addIssue(name,age,country,gender).subscribe(() => {
       this.router.navigate(['/list']);
     });
   }

  ngOnInit() {
  }

}
