import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelLists } from './hotel-lists';

describe('HotelLists', () => {
  let component: HotelLists;
  let fixture: ComponentFixture<HotelLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelLists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelLists);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
