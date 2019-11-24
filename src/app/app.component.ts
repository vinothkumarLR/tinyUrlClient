import { Component } from '@angular/core';
import { AppService } from './app.service';
import { FormControl, Validators } from "@angular/forms";


const regEx = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private appService: AppService) { }

  form_url = new FormControl('', [
    Validators.required,
    Validators.pattern(regEx)
  ]);

  urlText: string;
  tinyUrl: string = "http://localhost:8085/rest/url/";
  showResult: boolean = false;

  makeTiny(event) {
    console.log(this.urlText);
    this.appService.postTinyUrl({ 'url': this.urlText }).subscribe(any => {
      this.showResult = true;
      this.tinyUrl = this.tinyUrl + any.id;
      console.log(any);
    });
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }


}
