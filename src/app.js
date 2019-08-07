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
      x.withBaseUrl('http://172.30.200.88:8081/api/');
    })

    this.httpClient.fetch(`tasks/1`, {
      method: 'PUT',
      body:"fffffff"
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // this.todo.tasks = data.map(element => Object.assign(new Task(), element)); 
    });
  }
  configureRouter (config, router) {
    config.title = 'Aurelia'
    config.map([
      { route: ['', 'dashboard'], name: 'dashboard', moduleId: PLATFORM.moduleName('./veiw/dashboard/dashboard'), nav: true, title: 'Dashboard' },
      { route: ['board'], name: 'board', moduleId: PLATFORM.moduleName('./veiw/board/board'), nav: true, title: 'Boards' },
      { route: ['todos'], name: 'todos', moduleId: PLATFORM.moduleName('./veiw/todos/todos'), nav: true, title: 'Todos' },
      { route: 'not-found', name: 'not-found', moduleId: PLATFORM.moduleName('./veiw/not-found/not-found'), nav: false }
    ])
    // config.fallbackRoute('not-found')
    config.mapUnknownRoutes('not-found')
    this.router = router
  }
}
