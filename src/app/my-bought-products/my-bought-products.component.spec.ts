import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBoughtProductsComponent } from './my-bought-products.component';

describe('MyBoughtProductsComponent', () => {
  let component: MyBoughtProductsComponent;
  let fixture: ComponentFixture<MyBoughtProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBoughtProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBoughtProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
