export const routes = {
    account: {
        login: 'Account/LoginUser',
        registerUser: 'Account/RegisterUser',
        registerClient: 'Account/RegisterClient',
        editUser: 'Account/EditUser',
        editClient: 'Account/EditClient',
        fetchAll: 'Account/GetAllUsersByRole',
        fetchOne: 'Account/GetUserById',
        fetchOwn: 'Account/GetUser',
        remove: 'Account/RemoveUser'
    },
    orders: {
        fetchAll: 'Order/GetOrders',
        fetchDetails: 'Order/GetOrderDetails',
        create: 'Order/CreateOrder',
        edit: 'Order/EditOrder',
        editPosition: 'Order/EditOrdersPosition',
        remove: 'Order/RemoveOrder',
        removePosition: 'Order/RemoveOrdersPosition',
        downloadOrderReport: 'Order/GetOrderPDF'
    },
    deliveries: {
        fetchAll: 'Delivery/GetDeliveries',
        fetchDetails: 'Delivery/GetOrderDelivery',
        create: 'Delivery/CreateDelivery',
        edit: 'Delivery/EditDelivery',
        remove: 'Delivery/RemoveDelivery',
        getDeliveryState: 'Delivery/GetDeliveryState',
        downloadDifferentReport: 'Delivery/GetDifferenceDeliveryPDF',
        downloadDeliveryReport: 'Delivery/GetDeliveryPDF',
    },
    dispatches: {
        fetchAll: 'Dispatch/GetDispatches',
        fetchForOrder: 'Dispatch/GetOrderDispatches',
        fetchDetails: 'Dispatch/GetDispatchDetails',
        remove: 'Dispatch/RemoveDispatch',
        create: 'Dispatch/CreateDispatch',
        edit: 'Dispatch/EditDispatch',
        downloadDispatchReport: 'Dispatch/GetDispatchPDF',
        downloadCMRReport: 'Dispatch/GetCMRPDF'
    }
};
