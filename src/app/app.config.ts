import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { reducers, effects, CustomSerializer } from './store';
import * as fromGuards from '../app/todos/guards';
import { ModalModule } from 'ngx-bootstrap/modal';

export const appConfig: ApplicationConfig = {
  providers: [
    fromGuards.TodoExistGuard,
    fromGuards.guards,
    importProvidersFrom(
      RouterModule.forRoot(routes),
      StoreModule.forRoot(reducers),
      ModalModule.forRoot(),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
        autoPause: true,
        trace: false,
        traceLimit: 75,
      }),
      EffectsModule.forRoot(effects),
      StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer })
    ),
  ],
};
