import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { AuthService } from "./auth.service"
import { Alumno } from "../dashboard/pages/alumnos/models/modelalumno"
import { Router } from "@angular/router"
import { MockProvider } from "ng-mocks"



describe('AuthService', () => {

  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [

        MockProvider(Router)
      ]
    });

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);

  })

  afterEach(() => {

    httpController.verify();
  })

  it('authUser$ envia valor cuando el login se hace correctamente', (done) => {

    const mockAlumno: Alumno = {

        id: 1,
        nombre: "Juan",
        apellido: "Perez",
        email: "juanperez@gmail.com",
        curso: "JavaScript",
        genero: "Masculino"
      
    }

    const mockResponse: Alumno[] = [mockAlumno];


    service.login({
        
      email: mockAlumno.email,
      apellido: mockAlumno.apellido
      
    });

    httpController.expectOne({
      method: 'GET',
      url: `http://localhost:3000/alumnos?email=${mockAlumno.email}&password=${mockAlumno.apellido}`
    }).flush(mockResponse)


    service.authUser$.subscribe({

      next: (authUser) => {

        expect(authUser).toBeTruthy();
        expect(authUser).toEqual(mockAlumno);
        done();

      }
    })
  })
})

