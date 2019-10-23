import { routerActions } from 'react-router-redux';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { App, Home } from 'containers';
import { NotFound, InternalServer } from 'containers/ErrorPages';
import About from 'containers/About/Loadable';
import StreamHome, { Stream } from 'containers/Stream/Loadable';
import BoardsHome, { Board, Thread } from 'containers/Boards/Loadable';
import Exchange from 'containers/Exchange/Loadable';
import DiscoveryHome from 'containers/Discovery/Loadable';
import Contribute from 'containers/Contribute/Loadable';
import Login from 'containers/Login/Loadable';
import LoginSuccess from 'containers/LoginSuccess/Loadable';
import Register from 'containers/Register/Loadable';
import Profile from 'containers/Profile/Loadable';

const isAuthenticated = connectedReduxRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => state.auth.user !== null,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
});

const isNotAuthenticated = connectedReduxRedirect({
  redirectPath: '/',
  authenticatedSelector: state => state.auth.user === null,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: false
});

const routes = [
  {
    component: App,
    routes: [
      { path: '/', exact: true, component: Home },
      { path: '/stream', component: StreamHome },
      { path: '/stream/:username', exact: true, component: Stream },
      { path: '/boards/', component: BoardsHome, exact: true },
      { path: '/boards/:boardTag/', exact: true, component: Board },
      { path: '/boards/:boardTag/thread/:threadId', exact: true, component: Thread },
      { path: '/exchange', component: Exchange },
      { path: '/discovery', component: DiscoveryHome },
      { path: '/about', component: About },
      { path: '/contribute', component: Contribute },
      { path: '/login', component: Login },
      { path: '/login-success', component: isAuthenticated(LoginSuccess) },
      { path: '/register', component: isNotAuthenticated(Register) },
      { path: '/u/:username/', exact: true, component: Profile },
      { component: NotFound },
      { path: '/500', component: InternalServer }
    ]
  }
];

export default routes;
