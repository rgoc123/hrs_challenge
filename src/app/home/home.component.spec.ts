import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User } from '../models/user.model';
import { UserService, AuthenticationService } from '../services';
import { HomeComponent } from './home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let comp: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;

    const currentUser: User = {
      firstName: "John",
      id: 1,
      lastName: "Connor",
      token: "fake-jwt-token",
      username: "john1",
      password: "123456"
    };

    comp.currentUser = currentUser;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should display the currentUser\'s name', () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    const h1 = headerElement.querySelector('h1');
    
    expect(h1.textContent).toContain('John');
  })

  it('should not display the form', () => {
    const formElement: HTMLElement = fixture.nativeElement;
    const form = formElement.querySelector('form');

    expect(form).toEqual(null)
  })

  it('should display the form', () => {
    comp.editUserDisplay = 'input-show'

    const formElement: HTMLElement = fixture.nativeElement;
    const form = formElement.querySelector('form');

    expect(form).toBeTruthy();
  })
});
