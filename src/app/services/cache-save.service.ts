import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheSaveService {
  private tabHistory: any[] = [];
  constructor() {
    this.tabHistory = JSON.parse(localStorage.getItem('TAB_HISTORY') ?? '[]');
  }

  public get getTabs(): any[] {
    return this.tabHistory;
  }

  public saveRoute(route: string, title: string) {
    let tabHist = JSON.parse(localStorage.getItem('TAB_HISTORY') ?? '[]');
    if (!tabHist.find((i: any) => i.route == route))
      tabHist.push({ title, route });
    this.tabHistory = tabHist;
    localStorage.setItem('TAB_HISTORY', JSON.stringify(tabHist));
  }

  public removeRoute(route: string) {
    let tabHist = JSON.parse(localStorage.getItem('TAB_HISTORY') ?? '[]');
    tabHist = tabHist.filter((i: any) => i.route == route);
    this.tabHistory = tabHist;
    localStorage.setItem('TAB_HISTORY', JSON.stringify(tabHist));
  }
}
