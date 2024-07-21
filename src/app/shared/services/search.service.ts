import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTerms = new BehaviorSubject<string>("");
  searchTerms$ = this.searchTerms.asObservable();

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
