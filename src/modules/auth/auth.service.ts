import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/lib/supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabase: SupabaseService) {}

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.getClient().auth.signUp({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) throw new Error(error.message);
    return data; // Retorna user y session
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.getClient().auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) throw new Error(error.message);
    return data; // Retorna user y session (con access_token)
  }

  async getUser(token: string) {
    const { data, error } = await this.supabase.getClient().auth.getUser(token);
    if (error) throw new Error(error.message);
    return data.user;
  }
}
