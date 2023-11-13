import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import AuthContext from './shared/context/auth-context';
import { Provider } from 'react-redux';
import { store } from './store';
import useAuth from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const Users = React.lazy(() => import('./users/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const Auth = React.lazy(() => import('./users/pages/Auth'));

const App: React.FC = () => {
  const { token, value } = useAuth();
  let routes;

  if (token)
    routes = (
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/:userId/places' element={<UserPlaces />} />
        <Route path='/places/new' element={<NewPlace />} />
        <Route path='/places/:placeId' element={<UpdatePlace />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    );
  else
    routes = (
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/:userId/places' element={<UserPlaces />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='*' element={<Navigate to='/auth' replace />} />
      </Routes>
    );
  return (
    <Provider store={store}>
      <AuthContext.Provider value={value}>
        <BrowserRouter>
          <MainNavigation />
          <Suspense
            fallback={
              <div className='center'>
                <LoadingSpinner />
              </div>
            }
          >
            <main>{routes}</main>
          </Suspense>
        </BrowserRouter>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
