export interface User {
  uid?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  emailVerified?: boolean;
  gender?: string;
  profilePhoto?: string;
  height?: number;
  weight?: number;
  healthGoal?: string;
  diet?: string;
  dateOfBirth?: Date;
}
