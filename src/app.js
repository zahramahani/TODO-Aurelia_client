import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal'
import { Router } from 'aurelia-router';
import AuthService from './auth-service';
@inject(HttpClient, Router, AuthService)
export class App {
  constructor(httpClient, router, AuthService) {
    this.httpClient = httpClient;
    this.router = router;
    this.AuthService = AuthService;
  }
  logout() {
    // this.router.navigateToRoute('signup');
    this.AuthService.logout();
  }
  attached() {
    this.httpClient.configure(x => {
      x.withBaseUrl('http://partiya.todo.partdp.ir/api/') 
      // x.withBaseUrl('http://localhost:3001/api/')
        .withDefaults(
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
          })
        .withInterceptor({
          // request(request){
          // request.headers.append('Authorization', `Bearer ${localStorage.getItem('userToken')}`)
          // return request;
          // },
          responseError(error) {
        
            console.log('interseptoe66666666666666666')
            console.log(error)
            if (error.status === 400) {
              toastr.error('some thing wronge try again')
            } else if (error.status === 401) {
              toastr.error('you are unauthoriz please log in')
            } else if (error.status === 404) {
              toastr.error('your request is not available')
            }
          }
        })
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
  configureRouter(config, router) {
    config.title = 'Aurelia'
    config.map([
      { route: ['', 'dashboard'], name: 'dashboard', moduleId: PLATFORM.moduleName('./veiw/dashboard/dashboard'), nav: true, title: 'Dashboard' },
      { route: ['board'], name: 'board', moduleId: PLATFORM.moduleName('./veiw/board/board'), nav: true, title: 'Boards' },
      { route: ['todos'], name: 'todos', moduleId: PLATFORM.moduleName('./veiw/todos/todos'), nav: true, title: 'Todos' },
      { route: ['notFound'], name: 'notFound', moduleId: PLATFORM.moduleName('./veiw/notFound/notFound'), nav: false },
      { route: ['signup'], name: 'signup', moduleId: PLATFORM.moduleName('./veiw/signup/signup') }
    ])
    config.fallbackRoute('')
    config.mapUnknownRoutes('notFound')
    this.router = router
  }
}
