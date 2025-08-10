export interface User {
    id?: string;
    login: string;
    password: string;
    role: 'admin' | 'manager' | 'cashier';
    name: string;
    createdAt?: Date;
    active: boolean;
}
//# sourceMappingURL=User.d.ts.map