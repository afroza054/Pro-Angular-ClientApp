import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { menuList } from '../shared/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent {

  menuItems = menuList;
  config = {
    paddingAtStart: true,
    listBackgroundColor: '#fff',
    fontColor: 'rgb(8, 54, 71)',
    backgroundColor: '#fff',
    selectedListFontColor: 'red',
    collapseOnSelect: true
  };
  constructor(private router: Router) {
    //console.log(this.menuItems);
  }
  selectedItem(event) {
    if (event.link) {
      console.log(event.link)
      this.router.navigateByUrl(event.link)
    }
  }
}
