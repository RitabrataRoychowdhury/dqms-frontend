// src/app/routes.tsx

import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import LoadingSpinner from '../features/auth/common/LoadingSpinner.tsx';

// Lazy load pages
const Home = lazy(() => import('../features/auth/pages/Home'));
const Login = lazy(() => import('../features/auth/pages/Login'));
const Register = lazy(() => import('../features/auth/pages/Register'));
const Profile = lazy(() => import('../features/auth/pages/Profile'));
const AdminDashboard = lazy(() => import('../features/auth/pages/AdminDashboard'));
const CreateRealm = lazy(() => import('../features/auth/pages/CreateRealm'));
const Welcome = lazy(() => import('../features/auth/pages/Welcome'));
const NotFound = lazy(() => import('../features/auth/pages/NotFound'));

export const ROUTE_PATHS = {
  HOME: '/',
  WELCOME: '/welcome',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  CREATE_REALM: '/create-realm',
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<LoadingSpinner />}>
            <Home />
          </React.Suspense>
        ),
      },
      {
        path: ROUTE_PATHS.WELCOME,
        element: (
          <React.Suspense fallback={<LoadingSpinner />}>
            <Welcome />
          </React.Suspense>
        ),
      },
      {
        path: ROUTE_PATHS.LOGIN,
        element: (
          <React.Suspense fallback={<LoadingSpinner />}>
            <Login />
          </React.Suspense>
        ),
      },
      {
        path: ROUTE_PATHS.REGISTER,
        element: (
          <React.Suspense fallback={<LoadingSpinner />}>
            <Register />
          </React.Suspense>
        ),
      },
      {
        path: ROUTE_PATHS.PROFILE,
        element: (
          <ProtectedRoute>
            <React.Suspense fallback={<LoadingSpinner />}>
              <Profile />
            </React.Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATHS.DASHBOARD,
        element: (
          <ProtectedRoute>
            <React.Suspense fallback={<LoadingSpinner />}>
              <AdminDashboard />
            </React.Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATHS.CREATE_REALM,
        element: (
          <ProtectedRoute>
            <React.Suspense fallback={<LoadingSpinner />}>
              <CreateRealm />
            </React.Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: (
          <React.Suspense fallback={<LoadingSpinner />}>
            <NotFound />
          </React.Suspense>
        ),
      },
    ],
  },
];
