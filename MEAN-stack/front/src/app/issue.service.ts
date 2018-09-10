import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri = 'http://localhost:4201';

  constructor(private http :HttpClient) { }

  getIssues(){
    return this.http.get(`${this.uri}/issues`);

  }
   getIssueById(id){
    return this.http.get(`${this.uri}/issues/${id}`);
   }

  addIssue(name,age,country,gender){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const issue = {
      name: name,
      age: age,
      country:country,
      gender:gender
    };
    return this.http.post(`${this.uri}/issues/add`, issue, httpOptions);
  }

  updateIssue(id,name,age,country,gender){    
    const issue = {
      name: name,
      age: age,
      country:country,
      gender:gender
    };
    return this.http.post(`${this.uri}/issues/update/${id}`, issue);
  }

  deleteIssue(id){
    return this.http.get(`${this.uri}/issues/delete/${id}`);
  }
}
