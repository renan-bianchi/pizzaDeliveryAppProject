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
  constructor(public route: Router, public authService: AuthenticationService) {
    this.user = authService.getProfile()
  }
    
  
    ngOnInit() {
  }

  async logout(){
    this.authService.signOut().then(()=>{
      this.route.navigate(['/login'])

    }).catch((error)=>{
      console.log(error);
    })
  }
}
