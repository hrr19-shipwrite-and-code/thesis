import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './components/app/app.module.js';

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);