export interface Ride {
    id: number;
    employeeId: string;
    vehicleType: 'Bike' | 'Car';
    vehicleNo: string;
    vacantSeats: number;
    time: string;
    pickupPoint: string;
    destination: string;
    bookedEmployees: string[];
  }
  