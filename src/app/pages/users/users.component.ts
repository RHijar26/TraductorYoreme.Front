import { Component } from '@angular/core';
import { UsersCatalogComponent } from "./pages/users.catalog/users.catalog.component";
import { UsersRegisteredComponent } from "./pages/users.registered/users.registered.component";

type UserTab = 'activeUsers' | 'pendingApproval' | 'rolesPermissions';

@Component({
  selector: 'app-users',
  imports: [UsersCatalogComponent, UsersRegisteredComponent],
  templateUrl: './users.component.html',
  styles: ``,
})
export class UsersComponent {

  activeTab: UserTab = 'activeUsers';
  pendingApprovalsCount = 5;

  setActiveTab(tab: UserTab): void {
    this.activeTab = tab;
  }

  getTabClass(tab: UserTab): string {
    const baseClass =
      'px-6 py-3 font-body-md text-body-md transition-colors border-b-2';

    if (this.activeTab === tab) {
      return `${baseClass} text-[#137fec] font-bold border-[#137fec] bg-[#137fec]/10`;
    }

    return `${baseClass} text-sidebar-text border-transparent hover:bg-slate-50`;
  }

}
