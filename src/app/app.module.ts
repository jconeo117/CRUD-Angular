import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    ListaProductosComponent,
    UsuariosComponent,
    CategoriasComponent,
    NuevoUsuarioComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
