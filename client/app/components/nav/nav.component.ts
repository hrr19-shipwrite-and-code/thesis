import {Component} from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'nav',
  templateUrl: './client/app/components/nav/nav.html',
  styleUrls: ['./client/app/components/nav/nav.css'],
  providers: [AuthService]
})

export class NavComponent {
  constructor(private auth: AuthService) {}
  
}
