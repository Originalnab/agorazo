import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { HomePage } from '../pages/HomePage';
import { CataloguePage } from '../pages/CataloguePage';
import { VehicleDetailPage } from '../pages/VehicleDetailPage';
import { ComparePage } from '../pages/ComparePage';
import { RequestCarPage } from '../pages/RequestCarPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderSuccessPage } from '../pages/OrderSuccessPage';
import { CustomerDashboardPage } from '../pages/customer/CustomerDashboardPage';
import { OrdersPage } from '../pages/customer/OrdersPage';
import { TrackingPage } from '../pages/customer/TrackingPage';
import { DocumentsPage } from '../pages/customer/DocumentsPage';
import { SavedCarsPage } from '../pages/customer/SavedCarsPage';
import { QuotesPage } from '../pages/customer/QuotesPage';
import { SellerDashboardPage } from '../pages/seller/SellerDashboardPage';
import { AddVehiclePage } from '../pages/seller/AddVehiclePage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { PricingEnginePage } from '../pages/admin/PricingEnginePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'cars', element: <CataloguePage /> },
      { path: 'cars/:slug', element: <VehicleDetailPage /> },
      { path: 'compare', element: <ComparePage /> },
      { path: 'request-a-car', element: <RequestCarPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'checkout/success', element: <OrderSuccessPage /> },
      
      // Customer Portal Routes
      { path: 'customer', element: <Navigate to="/customer/dashboard" replace /> },
      { path: 'customer/dashboard', element: <CustomerDashboardPage /> },
      { path: 'customer/orders', element: <OrdersPage /> },
      { path: 'customer/tracking', element: <TrackingPage /> },
      { path: 'customer/documents', element: <DocumentsPage /> },
      { path: 'customer/saved', element: <SavedCarsPage /> },
      { path: 'customer/quotes', element: <QuotesPage /> },

      // Seller / Dealer Portal Routes
      { path: 'seller', element: <Navigate to="/seller/dashboard" replace /> },
      { path: 'seller/dashboard', element: <SellerDashboardPage /> },
      { path: 'seller/inventory', element: <SellerDashboardPage /> },
      { path: 'seller/orders', element: <OrdersPage /> },
      { path: 'seller/add', element: <AddVehiclePage /> },

      // Admin Console Routes
      { path: 'admin', element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'admin/dashboard', element: <AdminDashboardPage /> },
      { path: 'admin/pricing', element: <PricingEnginePage /> },

      // Fallback
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
