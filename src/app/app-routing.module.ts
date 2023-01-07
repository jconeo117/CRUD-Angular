import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';
import { ProductosComponent } from './components/productos/productos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  {path:"", component:ListaProductosComponent},
  {path:"crear-producto/:id", component:ProductosComponent},
  {path:"crear-producto", component:ProductosComponent},
  {path:"nuevo-usuario", component:NuevoUsuarioComponent},
  {path:"usuarios", component:UsuariosComponent},
  {path:"categorias", component:CategoriasComponent},
  {path:"**",redirectTo:"", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
