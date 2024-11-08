import { createBrowserRouter, useLocation } from 'react-router-dom';
import {
  AccountDeactivePage,
  DefaultDashboardPage,
  Error400Page,
  Error403Page,
  Error404Page,
  Error500Page,
  Error503Page,
  ErrorPage,
  PasswordResetPage,
  SignInPage,
  SignUpPage,
  VerifyEmailPage,
} from '../pages';
import { DashboardLayout } from '../layouts';
import React, { ReactNode, useEffect } from 'react';
import { RelatorioPage } from '../pages/Relatorio.tsx';

// Custom scroll restoration function
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    }); // Scroll to the top when the location changes
  }, [pathname]);

  return null; // This component doesn't render anything
};

type PageProps = {
  children: ReactNode;
};

// Create an HOC to wrap your route components with ScrollToTop
const PageWrapper = ({ children }: PageProps) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '',
        element: <SignInPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '',
        element: <DefaultDashboardPage />,
      },
    ],
  },
  {
    path: '/auth',
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <SignInPage />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'verify-email',
        element: <VerifyEmailPage />,
      },
      {
        path: 'password-reset',
        element: <PasswordResetPage />,
      },
      {
        path: 'account-delete',
        element: <AccountDeactivePage />,
      },
    ],
  },
  {
    path: 'errors',
    errorElement: <ErrorPage />,
    children: [
      {
        path: '400',
        element: <Error400Page />,
      },
      {
        path: '403',
        element: <Error403Page />,
      },
      {
        path: '404',
        element: <Error404Page />,
      },
      {
        path: '500',
        element: <Error500Page />,
      },
      {
        path: '503',
        element: <Error503Page />,
      },
    ],
  },
  {
    path: '/relatorio',
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '',
        element: <RelatorioPage />,
      },
    ],
  },
]);

export default router;
