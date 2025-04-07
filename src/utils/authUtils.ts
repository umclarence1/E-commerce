
// Authentication and authorization utilities
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

// Mock admin users - in a real app, this would come from a database
const ADMIN_EMAILS = ['admin@debutify.com'];

// Mock authentication store
export const authStore = {
  currentUser: null as User | null,
  isLoggedIn: false,
  
  // Mock login function
  login(email: string, password: string): boolean {
    // In a real app, this would validate against a database
    if (email && password) {
      const isAdmin = ADMIN_EMAILS.includes(email);
      this.currentUser = {
        id: '1',
        email: email,
        name: email.split('@')[0],
        role: isAdmin ? 'admin' : 'user'
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
  
  // Check if user is admin
  isAdmin(): boolean {
    return !!this.currentUser && this.currentUser.role === 'admin';
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
