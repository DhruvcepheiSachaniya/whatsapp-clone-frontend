export interface Message {
  message: string;
  from_number: string;
  to_number: string;
  IsImage?: boolean;
  fromSelf?: boolean;
  timestamp?: number;
  IsActive?: boolean;
  ownerId?: { MobileNumber: string };
  receiverId?: { MobileNumber: string };
}
