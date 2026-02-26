import { Component, inject } from '@angular/core';
import { UserService } from '../../services/users.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styles: ``,
})
export class RegisterComponent {

  userService = inject(UserService)
  form = new FormGroup({
    name: new FormControl<string|null>(null),    
    lastName: new FormControl<string|null>(null),  
    secondLastName: new FormControl<string|null>(null),    
    email: new FormControl<string|null>(null),    
    passWord: new FormControl<string|null>(null),     
    confirmPassWord: new FormControl<string|null>(null),    
  });

  comparePassWord() : Boolean{
    const passWord = this.form.get('passWord')?.value ?? '';
    const confirmPassword = this.form.get('confirmPassWord') ?? '';

    return passWord  === confirmPassword;
  }


  register(){
    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }    

    const payLoad = {
      name: this.form.get('name')?.value,
      lastName: this.form.get('lastName')?.value,
      secondLastName: this.form.get('secondLastName')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('passWord')?.value,
    }
        
    this.userService.register(payLoad).subscribe({
      next(value) {
        console.log(value)
      },
    })
  }

}
