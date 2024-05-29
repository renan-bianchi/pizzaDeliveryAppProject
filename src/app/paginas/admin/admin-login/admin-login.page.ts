import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {
  loginForm: FormGroup

  constructor(public formBuilder:FormBuilder, public loadingCtrl: LoadingController, public authService:AuthenticationService, public router : Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/)  
      ]],
      password:['', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/)
      ]
      ]
    })
  }
  get errorControl(){
    return this.loginForm?.controls;
  }

  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.loginForm?.valid){
      const user = await this.authService.loginUser(this.loginForm.value.email,this.loginForm.value.password).catch((error) =>{
        alert(error);
        loading.dismiss()

      })

// se der login com os campos vazios fica carregando pra sempre
// ver se não é o metodo de register q tá errado, deve ser algo de login, não registrar usuário
// o tutorial da mina é bom, mas tem umas parada meio erradal... fora q tá foda entender oq ela fala
      if(user){
        loading.dismiss()
        this.router.navigate(['/admin-home'])

      }else{
        console.log('provide correct values');
      }
    }

  }
}
