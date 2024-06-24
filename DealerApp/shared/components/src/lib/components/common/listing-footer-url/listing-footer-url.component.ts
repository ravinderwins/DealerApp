import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listing-footer-url',
  templateUrl: './listing-footer-url.component.html',
  styleUrls: ['./listing-footer-url.component.scss'],
})
export class ListingFooterUrlComponent {
  @Input() title: string;
  @Input() orgName: string;
  @Input() url: string;
  @Input() instructions: string;
}
