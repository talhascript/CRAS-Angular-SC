export interface Room {
  roomID: string;
  roomName: string;
  roomType: string;
  addedDate: Date;
  activated: boolean;
  capacity: number;
  occupied: number;
}
