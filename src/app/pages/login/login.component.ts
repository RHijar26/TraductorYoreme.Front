import { Component, inject } from '@angular/core';
import { JoinUsComponent } from "../../components/join-us/join-us.component";
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [JoinUsComponent, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  authService = inject(AuthService)
  router = inject(Router)
  

  form = new FormGroup({    
    email: new FormControl<string|null>(null, Validators.required),    
    passWord: new FormControl<string|null>(null, Validators.required),         
  });



  login(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const payLoad = {      
      email: this.form.get('email')?.value,
      password: this.form.get('passWord')?.value,
    }

    this.authService.login(payLoad).subscribe({
      next: (isSuccess) => {
        if (isSuccess) {
           this.router.navigate(['/']);
        }
      },
    });

  }



}
