import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle, Order, SelectedServices, PaymentPlan } from '../types';
import { INITIAL_ACTIVE_ORDER, INITIAL_VEHICLES } from '../api/mockData';

interface CheckoutState {
  vehicle: Vehicle;
  services: SelectedServices;
  paymentPlanType: 'full' | '30-40-30';
  customDeliveryCity: string;
}

interface CartCheckoutContextType {
  checkoutState: CheckoutState;
  setCheckoutVehicle: (vehicle: Vehicle) => void;
  toggleService: (service: keyof SelectedServices) => void;
  setPaymentPlanType: (type: 'full' | '30-40-30') => void;
  setCustomDeliveryCity: (city: string) => void;
  calculateTotal: () => {
    vehicleBase: number;
    customsDuty: number;
    clearingAgent: number;
    dvla: number;
    insurance: number;
    delivery: number;
    totalAmount: number;
    initialDue: number;
  };
  orders: Order[];
  createOrder: (customerInfo: {
    name: string;
    phone: string;
    email: string;
    ghanaPostGps: string;
    ghanaCardNumber: string;
  }) => Order;
  activeOrder: Order | null;
}

const CartCheckoutContext = createContext<CartCheckoutContextType | undefined>(undefined);

export const CartCheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checkoutState, setCheckoutState] = useState<CheckoutState>(() => {
    return {
      vehicle: INITIAL_VEHICLES[0],
      services: {
        clearing: true,
        dvla: true,
        insurance: false,
        delivery: true,
      },
      paymentPlanType: '30-40-30',
      customDeliveryCity: 'Accra / Tema Metro',
    };
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('agorazo_orders');
      return saved ? JSON.parse(saved) : [INITIAL_ACTIVE_ORDER];
    } catch {
      return [INITIAL_ACTIVE_ORDER];
    }
  });

  useEffect(() => {
    localStorage.setItem('agorazo_orders', JSON.stringify(orders));
  }, [orders]);

  const setCheckoutVehicle = (vehicle: Vehicle) => {
    setCheckoutState((prev) => ({
      ...prev,
      vehicle,
      // If already in Ghana and cleared, default clearing to false
      services: {
        ...prev.services,
        clearing: vehicle.availability !== 'available_ghana',
      }
    }));
  };

  const toggleService = (service: keyof SelectedServices) => {
    setCheckoutState((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service],
      }
    }));
  };

  const setPaymentPlanType = (type: 'full' | '30-40-30') => {
    setCheckoutState((prev) => ({
      ...prev,
      paymentPlanType: type,
    }));
  };

  const setCustomDeliveryCity = (city: string) => {
    setCheckoutState((prev) => ({
      ...prev,
      customDeliveryCity: city,
    }));
  };

  const calculateTotal = () => {
    const v = checkoutState.vehicle;
    const base = v.priceToTema;
    const customs = checkoutState.services.clearing ? v.pricingBreakdown.estimatedCustoms : 0;
    const clearingAgent = checkoutState.services.clearing ? v.pricingBreakdown.clearingFee : 0;
    const dvla = checkoutState.services.dvla ? v.pricingBreakdown.dvlaFee : 0;
    const insurance = checkoutState.services.insurance ? 6500 : 0;
    const delivery = checkoutState.services.delivery ? v.pricingBreakdown.deliveryFee : 0;

    const totalAmount = base + customs + clearingAgent + dvla + insurance + delivery;
    const initialDue = checkoutState.paymentPlanType === 'full' 
      ? totalAmount 
      : Math.round(totalAmount * 0.3);

    return {
      vehicleBase: base,
      customsDuty: customs,
      clearingAgent,
      dvla,
      insurance,
      delivery,
      totalAmount,
      initialDue,
    };
  };

  const createOrder = (customerInfo: {
    name: string;
    phone: string;
    email: string;
    ghanaPostGps: string;
    ghanaCardNumber: string;
  }) => {
    const { totalAmount, initialDue } = calculateTotal();
    const orderNumber = `AG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const plan: PaymentPlan = checkoutState.paymentPlanType === 'full' 
      ? {
          id: 'plan-full',
          name: '100% Upfront Settlement',
          description: 'Single full settlement for vehicle and all selected services.',
          type: 'full',
          milestones: [
            {
              id: `m-${Date.now()}-1`,
              milestoneNumber: 1,
              title: 'Full Vehicle & Services Payment',
              percentage: 100,
              amount: totalAmount,
              triggerEvent: 'Order Placement',
              status: 'paid',
              paidAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
              paymentMethod: 'Mobile Money (*170#)',
            }
          ]
        }
      : {
          id: 'plan-30-40-30',
          name: '30 / 40 / 30 Milestone Import Plan',
          description: '30% deposit today, 40% before ship departure, 30% upon arrival at Tema Port.',
          type: 'milestones',
          milestones: [
            {
              id: `m-${Date.now()}-1`,
              milestoneNumber: 1,
              title: 'Initial Deposit & Order Allocation',
              percentage: 30,
              amount: initialDue,
              triggerEvent: 'Order Placement',
              status: 'paid',
              paidAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
              paymentMethod: 'MTN Mobile Money (*170#)',
            },
            {
              id: `m-${Date.now()}-2`,
              milestoneNumber: 2,
              title: 'Pre-Shipment & Bill of Lading Issuance',
              percentage: 40,
              amount: Math.round(totalAmount * 0.4),
              triggerEvent: 'Before Vessel Departure',
              status: 'due',
              dueDate: 'In 14 days',
            },
            {
              id: `m-${Date.now()}-3`,
              milestoneNumber: 3,
              title: 'Tema Port Arrival & Customs Clearance',
              percentage: 30,
              amount: totalAmount - initialDue - Math.round(totalAmount * 0.4),
              triggerEvent: 'Vessel Arrival at Tema Port',
              status: 'upcoming',
              dueDate: 'In 6 weeks',
            }
          ]
        };

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      vehicle: checkoutState.vehicle,
      totalAmount,
      amountPaid: initialDue,
      balanceDue: totalAmount - initialDue,
      services: checkoutState.services,
      paymentPlan: plan,
      status: 'confirmed',
      shippingInfo: {
        vesselName: 'PACIFIC TRADER',
        voyageNumber: 'V.2609A',
        containerNumber: `MSCU${Math.floor(1000000 + Math.random() * 9000000)}`,
        billOfLadingNumber: `BL-SZ-TMA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        departurePort: 'Shenzhen Shekou Port, China',
        departureDate: 'Scheduled in 7 days',
        etaTema: 'ETA 7 weeks',
      },
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      customer: customerInfo,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const activeOrder = orders[0] || null;

  return (
    <CartCheckoutContext.Provider
      value={{
        checkoutState,
        setCheckoutVehicle,
        toggleService,
        setPaymentPlanType,
        setCustomDeliveryCity,
        calculateTotal,
        orders,
        createOrder,
        activeOrder,
      }}
    >
      {children}
    </CartCheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CartCheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CartCheckoutProvider');
  }
  return context;
};
