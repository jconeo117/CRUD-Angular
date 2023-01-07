import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  showModal = false;
  isLoggedIn = false;
  form: FormGroup;
  UserForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.UserForm = this.form;
    const logged = localStorage.getItem('isLogged');
    if (logged) {
      this.isLoggedIn = JSON.parse(logged);
    }
  }

  login(form: FormGroup) {
    const datos = {
      correo: form.controls['correo'].value,
      password: form.value.password,
    }

    console.log(datos)

    this.http.post('https://prueba-tecnica-idecide.azurewebsites.net/api/auth/login', datos).subscribe(
      (response: any) => {
        console.log(response)
        localStorage.setItem('token', response.token)
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        this.isLoggedIn = true;
        localStorage.setItem('isLogged', JSON.stringify(this.isLoggedIn));
        this.showModal = false;
       // window.location.reload()
      },
      (error: any) => {
        console.log(error)
      }
      );
      
  }

  logOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('isLogged');
    this.isLoggedIn = false;
    window.location.reload()
  }


  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
