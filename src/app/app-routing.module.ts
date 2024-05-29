import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'pagtreino',
    loadChildren: () => import('./pagtreino/pagtreino.module').then( m => m.PagtreinoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./paginas/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./paginas/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./paginas/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./paginas/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'admin-login',
    loadChildren: () => import('./paginas/admin/admin-login/admin-login.module').then( m => m.AdminLoginPageModule)
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./paginas/admin/admin-home/admin-home.module').then( m => m.AdminHomePageModule)
  },
  {
    path: 'cardapio',
    loadChildren: () => import('./paginas/cardapio/cardapio.module').then( m => m.CardapioPageModule)
  },
  {
    path: 'pagamento',
    loadChildren: () => import('./paginas/pagamento/pagamento.module').then( m => m.PagamentoPageModule)
  },
  {
    path: 'resumo-pedido',
    loadChildren: () => import('./resumo-pedido/resumo-pedido.module').then( m => m.ResumoPedidoPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
