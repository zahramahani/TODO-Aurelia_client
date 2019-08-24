import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal'
@inject(HttpClient)
export class App {
  constructor(httpClient){
    this.httpClient=httpClient;

  }
  attached(){
    this.httpClient.configure(x =>{
      x.withBaseUrl('http://localhost:3001/api/');
    })
  }
  configureRouter (config, router) {
    config.title = 'Aurelia'
    config.map([
      { route: ['', 'dashboard'], name: 'dashboard', moduleId: PLATFORM.moduleName('./veiw/dashboard/dashboard'), nav: true, title: 'Dashboard' },
      { route: ['board'], name: 'board', moduleId: PLATFORM.moduleName('./veiw/board/board'), nav: true, title: 'Boards' },
      { route: ['todos'], name: 'todos', moduleId: PLATFORM.moduleName('./veiw/todos/todos'), nav: true, title: 'Todos' },
      { route: ['notFound'], name: 'notFound', moduleId: PLATFORM.moduleName('./veiw/notFound/notFound'), nav: false },
      { route: ['signup'], name: 'signup', moduleId: PLATFORM.moduleName('./veiw/signup/signup') }
    ])
    // config.fallbackRoute('not-found')
    config.mapUnknownRoutes('notFound')
    this.router = router
  }
}
