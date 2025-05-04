
export interface ClientOrder {
  orderid: number;
  clientid: number;
  ordertype: 'Stocking' | 'Destocking';
  orderdate: string;
  status: 'Pending' | 'Validated' | 'Completed' | 'Cancelled' | 'Not Distributed' | 'Active';
  limitdate: string | null;
  destinationaddress: string | null;
  buyerinfo: string | null;
  notes: string | null;
}

export interface Client {
  clientid: number;
  clientname: string;
  contactinfo: string | null;
  email: string | null;
  address: string | null;
}
