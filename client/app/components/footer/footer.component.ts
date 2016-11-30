import { Component } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './client/app/components/footer/footer.html',
  styleUrls: ['./client/app/components/footer/footer.css'],
})

export class FooterComponent {
  gotoTop() {
    return window.scrollTo(0,0)
  }
}
