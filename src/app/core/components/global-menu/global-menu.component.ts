import {Component} from '@angular/core';
import {MenuListItem} from '../../../shared/components/menu-bar/menu-bar.component';

@Component({
  selector: 'app-global-menu',
  templateUrl: './global-menu.component.html',
})
export class GlobalMenuComponent {
  orderMode = false;
  tabType: 'admin' | 'store' | 'add' = 'admin';
  menuListItemLabel = 'MENU_BAR.TITLE.START';
  menuListItem: MenuListItem =
    {
      itemID: 1,
      itemLabel: 'MENU_BAR.TITLE.START'
    };


  onClickMenuItem(menuListItem: MenuListItem): void {
    if (this.menuListItemLabel !== menuListItem.itemLabel) {
      this.orderMode = !this.orderMode;
      this.menuListItemLabel = menuListItem.itemLabel;
    }
  }

  getMenuListItems(): MenuListItem[] {
    return [this.menuListItem, {
      itemID: 2,
      itemLabel: 'MENU_BAR.TITLE.ORDER'
    }
    ];
  }
}
