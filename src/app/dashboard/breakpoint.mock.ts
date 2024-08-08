import { BreakpointState } from "@angular/cdk/layout";
import { BehaviorSubject, Observable, skip } from "rxjs";

export class MockBreakpointObserver {
    private bp: BreakpointState = {matches: true, breakpoints: {Handset: true}};
    private state: BehaviorSubject<BreakpointState> = new BehaviorSubject(this.bp);

    observe(): Observable<BreakpointState> {
        return this.state.asObservable().pipe(skip(1));
    }
}