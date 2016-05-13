import {Component} from "angular2/core";

@Component({
    selector: "hello",
    template: require("hello/hello.component.html")
})
export class HelloComponent {
    name = "world";
}
