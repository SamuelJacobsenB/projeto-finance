export interface User {
  id: string;

  name: string;
  email: string;
  password: string;
  profile_picture?: string;
  folder_path?: string;

  email_verified: boolean;
  verification_token?: number;
  token_expiration?: Date;

  created_at: Date;
}
