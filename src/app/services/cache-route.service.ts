import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';
import { Component, ComponentRef, Injectable } from '@angular/core';
import { CacheSaveService } from './cache-save.service';

interface DetachedRouteHandleExt extends DetachedRouteHandle {
  componentRef: ComponentRef<Component>;
}

interface RouteCacheRecord {
  handle: DetachedRouteHandleExt;
  /** retrieve called twice without calling should detach when the navigation starts
   * This flag is used to ignore those calls*/
  shouldAttachCalled: boolean;
}
@Injectable()
export class CacheRouteReuseStrategy implements RouteReuseStrategy {
  private routeCache = new Map<string, RouteCacheRecord>();

  constructor(private cacheService: CacheSaveService) {}

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const shouldDetach = this.isToBeReused(route, 'shouldDetach');
    return shouldDetach;
  }

  store(
    route: ActivatedRouteSnapshot,
    detachedTree: DetachedRouteHandleExt | null
  ): void {
    const key = this.getSnapshotKey(route);
    if (!detachedTree || !this.isToBeReused(route, 'store')) {
      return;
    }

    const previousStored = this.routeCache.get(key);
    if (previousStored) {
      if (!(previousStored.handle.componentRef === detachedTree.componentRef)) {
        previousStored.handle.componentRef.destroy();
      }
    }

    this.routeCache.set(key, {
      handle: detachedTree,
      shouldAttachCalled: false,
    });
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const key = this.getSnapshotKey(route);
    if (route.data['title']) {
      let title = route.data['title'];
      if (route.params['id']) title += route.params['id'];
      this.cacheService.saveRoute(key, title);
    }
    const stored = this.routeCache.get(key);
    const destroyed = !!(
      stored && stored.handle.componentRef.hostView.destroyed
    );
    const shouldAttach =
      !destroyed && !!stored && this.isToBeReused(route, 'shouldAttach');
    if (shouldAttach) {
      stored.shouldAttachCalled = true;
    }
    return shouldAttach;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandleExt | null {
    const key = this.getSnapshotKey(route);
    const stored = this.routeCache.get(key);
    const destroyed = !!(
      stored && stored.handle.componentRef.hostView.destroyed
    );

    const shouldBeRetrieved =
      !destroyed && !!stored && stored.shouldAttachCalled;

    if (destroyed) {
      this.routeCache.delete(key);
    }

    if (shouldBeRetrieved) {
      stored.shouldAttachCalled = false;
      if (!this.isToBeReused(route, 'retrieve')) {
        return null;
      }
      const detachedTree = stored.handle;
      return detachedTree;
    }

    if (!this.isToBeReused(route, 'pre-retrieve')) {
      return null;
    }

    return stored ? stored.handle : null;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    const result =
      future.routeConfig === curr.routeConfig &&
      !(this.getSnapshotKey(future) == this.getSnapshotKey(curr)); // from DefaultRouteReuseStrategy
    if (!result) this.deleteClosedTabs();
    return result;
  }

  private deleteClosedTabs() {
    let historyList = this.cacheService.getTabs;
    if (!historyList) historyList = [];
    let urls: string[] = historyList.map((i) => i.route);
    this.routeCache.forEach((_, key) => {
      let removeCache = true;
      for (let i = 0; i < urls.length; i++) {
        if (urls[i] === key) {
          removeCache = false;
          break;
        }
      }
      if (removeCache) this.destroyComponent(key);
    });
  }

  private destroyComponent(element: string) {
    const el = this.routeCache.get(element);
    this.routeCache.delete(element);
  }

  private getSnapshotKey(snapshot: ActivatedRouteSnapshot): string {
    return snapshot.pathFromRoot
      .map((v) => v.url.map((segment) => segment.toString()).join('/'))
      .filter((url) => !!url)
      .join('/');
  }

  private isToBeReused(route: ActivatedRouteSnapshot, msg: string) {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return false;
    }
    return true;
  }
}
