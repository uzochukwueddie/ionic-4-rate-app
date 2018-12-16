import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-newrating',
  templateUrl: './newrating.component.html',
  styleUrls: ['./newrating.component.scss']
})
export class NewratingComponent {
  @Input() ratenumber: number;

}
