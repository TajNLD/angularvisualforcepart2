import { Component } from '@angular/core';

@Component({

    selector:'my-component',
    template:`
      This is my component {{name}}
    `

})

export class MyComponentComponent{

    name = 'Tajinder';

}
