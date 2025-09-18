import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeachBox } from './search-box';

describe('SeachBox', () => {
  let component: SeachBox;
  let fixture: ComponentFixture<SeachBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeachBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeachBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
