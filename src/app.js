import { PLATFORM } from 'aurelia-pal'

export class App {
  configureRouter (config, router) {
    this.router = router
    config.title = 'Aurelia'
    config.map([
      { route: ['', 'index'], name: 'index', moduleId: PLATFORM.moduleName('./index'), nav: true, title: 'index' },
      { route: ['boards'], name: 'boards', moduleId: PLATFORM.moduleName('./boards'), nav: true, title: 'boards' },
      { route: ['todos'], name: 'todos', moduleId: PLATFORM.moduleName('./todos'), nav: true, title: 'todos' }
    ])
    config.mapUnknownRoutes('./not-found')
  }
}
