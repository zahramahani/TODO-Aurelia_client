// regenerator-runtime is to support async/await syntax in ESNext.
// If you don't use async/await, you can remove regenerator-runtime.
import 'regenerator-runtime/runtime'
import 'bootstrap'
import environment from './environment'
import { PLATFORM } from 'aurelia-pal'
import AuthService from './auth-service'
import '../node_modules/toastr/build/toastr.css'
// require('./veiw/signup/signup')

export function configure (aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
  // test validation
    .plugin(PLATFORM.moduleName('aurelia-validation'))
  // test validation
    .developmentLogging(environment.debug ? 'debug' : 'warn')
  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'))
  }

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));
  aurelia.start().then(() => {
    var auth = aurelia.container.get(AuthService)
    console.log(auth.isAuthenticated())
    
    const root = auth.isAuthenticated() ? PLATFORM.moduleName('app') : PLATFORM.moduleName('veiw/signup/signup')
    aurelia.setRoot(root)
  })
  // const authService = aurelia.container.get(AuthService)
  // aurelia.start().then(() => aurelia.setRoot(authService.authenticated ? PLATFORM.moduleName('auth') : PLATFORM.moduleName('app')))
  // const root = ? AuthService.
}
