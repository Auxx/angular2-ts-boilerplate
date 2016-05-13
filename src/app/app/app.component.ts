import {Component} from "angular2/core";
import {HelloComponent} from "hello/hello.component";

@Component({
    selector: "app",
    directives: [HelloComponent],
    template: require("app/app.component.html")
})
export class AppComponent { }
