import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { provide } from '@angular/core';
bootstrap(AppComponent,[provide(Window, { useValue: window })]);