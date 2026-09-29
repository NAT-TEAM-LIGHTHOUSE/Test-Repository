import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
type Callback = (payload: any) => void;
@Injectable({
  providedIn: 'root',
})
export class EventBus {
   private channels: Map<string, Subject<any>> = new Map();
  private subscriptions: Map<string, Callback[]> = new Map();

  publish(eventName: string, data?: any): void {
    if (!this.channels.has(eventName)) {
      this.channels.set(eventName, new Subject<any>());
    }
    this.channels.get(eventName)!.next(data);
  }

  subscribe(eventName: string, callback: Callback) {
    if (!this.channels.has(eventName)) {
      this.channels.set(eventName, new Subject<any>());
    }

    const subscription = this.channels.get(eventName)!.subscribe(callback);
    const storedCallbacks = this.subscriptions.get(eventName) || [];
    storedCallbacks.push(callback);
    this.subscriptions.set(eventName, storedCallbacks);

    // Optionally return the subscription to allow manual unsubscribe
    return subscription;
  }

  unsubscribe(eventName: string, callback?: Callback): void {
    if (!this.channels.has(eventName)) return;

    if (callback) {
      const current = this.subscriptions.get(eventName) || [];
      const updated = current.filter(cb => cb !== callback);
      this.subscriptions.set(eventName, updated);
      // Note: We do not unsubscribe from RxJS here unless you store Subscriptions.
    } else {
      this.channels.get(eventName)!.complete();
      this.channels.delete(eventName);
      this.subscriptions.delete(eventName);
    }
  }

     private enquiryRefreshSource = new Subject<boolean>();
  enquiryRefresh$ = this.enquiryRefreshSource.asObservable();

  emitEnquiryRefresh() {
    this.enquiryRefreshSource.next(true);
  } 
}
