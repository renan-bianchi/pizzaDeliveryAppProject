import { confirmPasswordReset } from '@angular/fire/auth';
import { LoginPage } from './../login/login.page';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regForm: FormGroup
  
  constructor(public formBuilder:FormBuilder, public loadingCtrl: LoadingController, public authService:AuthenticationService, public router : Router) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/)
      ]],
      address: ['', [Validators.required]],
      password:['', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/)
      ]
      ],
      confirmPassword: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/)
      ]
      ]
    })
  }
  //(?=.*\d)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}
  get errorControl(){
    return this.regForm?.controls;
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.regForm?.valid) {
      const { email, password, fullname, address } = this.regForm.value;

      try {
        const user = await this.authService.registerUser(email, password);

        if (user) {
          // Adiciona dados adicionais ao Firestore
          await this.authService.addUserData(user.uid, fullname, address, email);
          loading.dismiss();
          this.router.navigate(['/home']);
        }
      } catch (error) {
        alert(error);
        loading.dismiss();
      }
    } else {
      console.log('provide correct values');
    }
  }
}





//   async signUp(){
//     const loading = await this.loadingCtrl.create();
//     await loading.present();
//     if(this.regForm?.valid){
//       const user = await this.authService.registerUser(this.regForm.value.email,this.regForm.value.password).catch((error) =>{
//         alert(error);
//         loading.dismiss()

//       })

//       if(user){
//         loading.dismiss()
//         this.router.navigate(['/home'])

//       }else{
//         console.log('provide correct values');
//       }
//     }

//   }

// }
