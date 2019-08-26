import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal'
import {Router} from 'aurelia-router';
import AuthService from './auth-service'
@inject(HttpClient,Router)
export class App {
  constructor(httpClient,router,AuthService){
    this.httpClient=httpClient;
    this.router=router;
    this.AuthService = AuthService;
  }
  logout(){
    this.router.navigateToRoute('signup');
  }
  attached(){
    this.httpClient.configure(x =>{
      x.withBaseUrl('http://localhost:3001/api/');
      // x.withInterceptor({
      //   request(message) {
      //     return message;
      //   },
      //   responseError(error) {
      //   throw error;
      //   }
      //   }); 
    })
  }
  configureRouter (config, router) {
    config.title = 'Aurelia'
    config.map([
      { route: ['','dashboard'], name: 'dashboard', moduleId: PLATFORM.moduleName('./veiw/dashboard/dashboard'), nav: true, title: 'Dashboard' },
      { route: ['board'], name: 'board', moduleId: PLATFORM.moduleName('./veiw/board/board'), nav: true, title: 'Boards' },
      { route: ['todos'], name: 'todos', moduleId: PLATFORM.moduleName('./veiw/todos/todos'), nav: true, title: 'Todos' },
      { route: ['notFound'], name: 'notFound', moduleId: PLATFORM.moduleName('./veiw/notFound/notFound'), nav: false },
      { route: ['signup'], name: 'signup', moduleId: PLATFORM.moduleName('./veiw/signup/signup') },
      { route: ['signup'], name: 'logout', moduleId: PLATFORM.moduleName('./veiw/signup/signup'), nav: true, title: 'logout' }

    ])
    config.fallbackRoute('')
    config.mapUnknownRoutes('notFound')
    this.router = router
  }
}
