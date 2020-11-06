import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantineUsersComponent } from './cantine-users.component';

describe('CantineUsersComponent', () => {
  let component: CantineUsersComponent;
  let fixture: ComponentFixture<CantineUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CantineUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CantineUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
