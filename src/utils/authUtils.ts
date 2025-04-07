
// Authentication and authorization utilities
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'manager' | 'user';
  permissions: string[];
}

// Mock admin users - in a real app, this would come from a database
const ADMIN_EMAILS = ['admin@debutify.com'];
const SUPER_ADMIN_EMAILS = ['owner@debutify.com'];

// Role definitions with permissions
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user'
};

export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  MANAGE_PRODUCTS: 'manage_products',
  MANAGE_ORDERS: 'manage_orders',
  MANAGE_USERS: 'manage_users',
  MANAGE_MESSAGES: 'manage_messages',
  EXPORT_DATA: 'export_data',
  MANAGE_SETTINGS: 'manage_settings',
  MANAGE_ADMINS: 'manage_admins',
};

// Role to permissions mapping
const rolePermissions = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_MESSAGES,
    PERMISSIONS.EXPORT_DATA,
  ],
  [ROLES.MANAGER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.MANAGE_MESSAGES,
  ],
  [ROLES.USER]: [],
};

// Mock authentication store
export const authStore = {
  currentUser: null as User | null,
  isLoggedIn: false,
  
  // Mock login function
  login(email: string, password: string): boolean {
    // In a real app, this would validate against a database
    if (email && password) {
      const isSuperAdmin = SUPER_ADMIN_EMAILS.includes(email);
      const isAdmin = ADMIN_EMAILS.includes(email);
      
      let role = ROLES.USER;
      if (isSuperAdmin) {
        role = ROLES.SUPER_ADMIN;
      } else if (isAdmin) {
        role = ROLES.ADMIN;
      }
      
      this.currentUser = {
        id: '1',
        email: email,
        name: email.split('@')[0],
        role: role as User['role'],
        permissions: rolePermissions[role]
      };
      this.isLoggedIn = true;
      this.saveToStorage();
      return true;
    }
    return false;
  },
  
  // Mock logout function
  logout(): void {
    this.currentUser = null;
    this.isLoggedIn = false;
    localStorage.removeItem('auth_user');
  },
  
  // Check if user is admin or higher role
  isAdmin(): boolean {
    return !!this.currentUser && (
      this.currentUser.role === ROLES.ADMIN || 
      this.currentUser.role === ROLES.SUPER_ADMIN
    );
  },
  
  // Check if user is super admin
  isSuperAdmin(): boolean {
    return !!this.currentUser && this.currentUser.role === ROLES.SUPER_ADMIN;
  },
  
  // Check if user has specific permission
  hasPermission(permission: string): boolean {
    return !!this.currentUser && this.currentUser.permissions.includes(permission);
  },
  
  // Save user info to localStorage
  saveToStorage(): void {
    if (this.currentUser) {
      localStorage.setItem('auth_user', JSON.stringify(this.currentUser));
    }
  },
  
  // Load user info from localStorage
  loadFromStorage(): void {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
        this.isLoggedIn = true;
      } catch (e) {
        this.currentUser = null;
        this.isLoggedIn = false;
      }
    }
  }
};

// Initialize auth state on import
authStore.loadFromStorage();
