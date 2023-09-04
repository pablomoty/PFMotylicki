import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { AuthService } from "./auth.service"
import { Usuario } from "../dashboard/pages/usuarios/models/modelusuario"
import { Router } from "@angular/router"
import { MockProvider } from "ng-mocks"
import { Store } from "@ngrx/store"



describe('AuthService', () => {

  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [

        MockProvider(Router),
        MockProvider(Store)
      ]
    });

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);

  })

  afterEach(() => {

    httpController.verify();
  })

  it('authUsuario$ envia valor cuando el login se hace correctamente', (done) => {

    const mockUsuario: Usuario = {

        id: 1,
        nombre: "Juan",
        apellido: "Perez",
        email: "juanperez@gmail.com",
        password: "123456",
        rol: "ADMIN",
        genero: "Masculino"
      
    }

    const mockResponse: Usuario[] = [mockUsuario];


    service.login({
        
      email: mockUsuario.email,
      password: mockUsuario.password
      
    });

    httpController.expectOne({
      method: 'GET',
      url: `http://localhost:3000/usuarios?email=${mockUsuario.email}&password=${mockUsuario.password}`
    }).flush(mockResponse)


    service.authUsuario$.subscribe({

      next: (authUsuario) => {

        expect(authUsuario).toBeTruthy();
        expect(authUsuario).toEqual(mockUsuario);
        done();

      }
    })
  })
})

