import { Component } from '@angular/core';
import {NavLink} from "../../../models/NavLink";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isAdmin: boolean = false;
  links: Array<NavLink> = [
    {path: "Home", label: "Accueil"},
    {path: "admin", label: "admin", authorization : "ADMIN"},
    {path: "page1", label: "Page 1"},
    {path: "page 2", label: "Page 2"},
  ]
}
