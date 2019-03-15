import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'home', title: 'Home',  icon: 'ti-panel', class: '' },
    { path: 'http', title: 'HTTP Dashboard',  icon:'ti-user', class: '' },
    { path: 'mqtt', title: 'MQTT dashboard',  icon:'ti-view-list-alt', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public innerWidth: any;

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.innerWidth = window.innerWidth;
    }
    isNotMobileMenu(){
        if (this.innerWidth > 991) {
            return false;
        }
        return true;
    }

}
