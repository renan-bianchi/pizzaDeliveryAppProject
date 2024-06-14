import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user:any
  userName: string;
  
  constructor(public route: Router, public authService: AuthenticationService) {
    this.user = authService.getProfile()
  }
    
  
  ngOnInit() {
    this.authService.getCurrentUserUID().subscribe(uid => {
      if (uid) {
        this.authService.getUserData(uid).subscribe(userData => {
          this.userName = userData ? userData['name'] : 'Usuário';
        });
      } else {
        this.userName = 'Usuário';
      }
    });
  }

  async logout(){
    this.authService.signOut().then(()=>{
      this.route.navigate(['/login'])

    }).catch((error)=>{
      console.log(error);
    })
  }
}
