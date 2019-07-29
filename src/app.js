// import {PLATFORM} from 'aurelia-pal';

// export class App {
//   configureRouter(config, router) {
//     config.title = 'Aurelia';
//     config.map([
//       {
//         route: ['', 'welcome'],
//         name: 'welcome',
//         moduleId: PLATFORM.moduleName('./welcome'),
//         nav: true,
//         title: 'Welcome'
//       },
//       {
//         route: 'users',
//         name: 'users',
//         moduleId: PLATFORM.moduleName('./users'),
//         nav: true,
//         title: 'Github Users'
//       },
//       {
//         route: 'child-router',
//         name: 'child-router',
//         moduleId: PLATFORM.moduleName('./child-router'),
//         nav: true,
//         title: 'Child Router'
//       }
//     ]);

//     this.router = router;
//   }
// }

import { PLATFORM } from 'aurelia-pal'

export class App {
  configureRouter (config, router) {
    config.title = 'Aurelia'
    config.map([
      { route: ['', 'dashboard'], name: 'dashboard', moduleId: PLATFORM.moduleName('./dashboard'), nav: true, title: 'Dashboard' },
      { route: ['board'], name: 'board', moduleId: PLATFORM.moduleName('./board'), nav: true, title: 'Boards' },
      { route: ['todos'], name: 'todos', moduleId: PLATFORM.moduleName('./todos'), nav: true, title: 'Todos' },
      { route: 'not-found', name: 'not-found', moduleId: PLATFORM.moduleName('./not-found'), nav: false }
    ])
    config.fallbackRoute('board')
    config.mapUnknownRoutes('not-found')
    this.router = router
  }
}
