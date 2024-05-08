import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  blogForm!:FormGroup;
  isSubmit:boolean = false;
  blogsData:any = []

  constructor(public fb:FormBuilder,private http:HttpClient){}

  ngOnInit(){

    this.blogForm = this.fb.group({
      'title' : ['',Validators.required],
      'description' : ['',Validators.required]
    })

    this.fetchData()

  }

  fetchData(){
    this.http.get('http://localhost:3030/blogs').subscribe((res:any)=>{
      if(res){
        this.blogsData =res
      }
    },err=>{
      console.log('error while getting data')
    })
  }

  handleSubmit(){
    this.isSubmit = true;
    if(!this.blogForm.valid){
      return
    }
    const data = this.blogForm.value
    this.http.post('http://localhost:3030/blogs',data).subscribe((res:any)=>{
      console.log('data send');
      this.isSubmit = false
      this.blogForm.reset();
      this.fetchData()
    },err=>{
      console.log('error while sending data')
    })
  }
}
