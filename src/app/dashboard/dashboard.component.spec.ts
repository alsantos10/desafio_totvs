import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MockBreakpointObserver } from './breakpoint.mock';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let breakpointObserver: BreakpointObserver;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: BreakpointObserver, useClass: MockBreakpointObserver },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    
    component = fixture.componentInstance;
    breakpointObserver = TestBed.inject(BreakpointObserver);
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();

    // component['breakpointObserver'].
  });
});
