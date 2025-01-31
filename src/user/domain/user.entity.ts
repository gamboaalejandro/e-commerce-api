export class User {
  id!: string;
  username!: string;
  address!: string | null;
  email!: string;
  password!: string;
  is_active!: boolean | null;
  role!: number | 1;
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date | null;
  constructor(partial: Partial<User>) {
    Object.assign(this, {
      ...partial,
      role: partial.role ?? 1, // 🔹 Asegura que `role` nunca sea `null`
      isActive: partial.is_active ?? true, // 🔹 Manejo seguro de `isActive`
    });
  }
}
