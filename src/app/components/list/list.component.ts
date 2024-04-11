import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/User-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent  implements OnInit {
  public userData: User[]=[];
   userForm!: FormGroup;
  public showAdd!: boolean;
  public showUpdate!: boolean;
  public userModelObj = new User;
  constructor(private userService: UserService, private fb: FormBuilder){
    this.userForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[ Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[7-9]{1}[0-9]{9}$')]],
      salary: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  add(){
    this.showAdd = true;
    this.showUpdate = false;
  }

  // list all user
  getAllUser(){
    this.userService.getAllUsers().subscribe((res)=>{
      this.userData = res;
      
      console.log(this.userData);
     
    }, error=>{
      console.log("Something went wrong")
    })
  }

  // add new user
  addUser(user: User){
    if(this.userForm.valid){
    this.userModelObj.firstName = this.userForm.value.firstName;
    this.userModelObj.lastName = this.userForm.value.lastName;
    this.userModelObj.email = this.userForm.value.email;
    this.userModelObj.mobile = this.userForm.value.mobile;
    this.userModelObj.salary = this.userForm.value.salary;
    this.userService.addUser(user).subscribe((res)=>{
      alert("Record added successfully");
      this.userForm.reset();
      this.getAllUser();
    },error=>{
      console.log("something went wrong")
    })
   
  }
  else{
    alert("Fill all the fields")
  }
  }
  
  update(user:User){
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = user.id
    this.userForm.controls['firstName'].setValue(user.firstName);
    this.userForm.controls['lastName'].setValue(user.lastName);
    this.userForm.controls['mobile'].setValue(user.mobile);
    this.userForm.controls['email'].setValue(user.email);
    this.userForm.controls['salary'].setValue(user.salary);
  }
  updateUser(){
    this.userModelObj.firstName = this.userForm.value.firstName;
    this.userModelObj.lastName = this.userForm.value.lastName;
    this.userModelObj.email = this.userForm.value.email;
    this.userModelObj.mobile = this.userForm.value.mobile;
    this.userModelObj.salary = this.userForm.value.salary;
    this.userService.updateUser(this.userModelObj).subscribe((res)=>{
      this.userForm.reset();
      this.getAllUser();
      alert("Employee updated successfuly");
    },error=>{
      console.log("Something went wrong")
    })
  }


deleteUser(id:number){
  if(confirm("Are you sure you want to delete user"))
  this.userService.deleteUser(id).subscribe((res)=>{
    alert("user deleted successfully");
    this.getAllUser();
  }, error=>{
    console.log("something went wrong")
  })
}

}
