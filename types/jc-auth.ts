export interface JcLoginResponse {
  // For existing users
  user?: {
    id: string;
    email: string;
    first_name: string;
    status: string;
  };
  accessToken?: string;
  refreshToken?: string;
  expires?: number;
  is_new_user: boolean;
  
  // For new users
  openId?: string;
  nickName?: string;
}

export interface JcAuthResponse {
  accessToken: string;
  refreshToken: string;
  expires: number;
  invite_code?: string;
} 