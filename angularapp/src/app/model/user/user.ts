interface user{
  userid: number;
  name: string;
  fullName?: string; // Optional full name
  email: string;
  phoneNumber: string;
  phone?: string; // Optional phone alias
  password?: string; // Optional, not displayed
  confirmPassword?: string; // Optional confirm password for forms
  role:string;

}

