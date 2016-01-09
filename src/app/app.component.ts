import {Component} from 'angular2/core';
import {HelloComponent} from 'hello/hello.component';

@Component({
    selector: 'app',
    template: require('app.component.html'),
    directives: [HelloComponent]
})
export class AppComponent { }
