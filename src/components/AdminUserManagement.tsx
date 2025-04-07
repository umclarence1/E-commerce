
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { 
  MoreHorizontal, 
  UserPlus, 
  Mail, 
  Edit2, 
  Trash2, 
  UserCheck, 
  Search, 
  UserX 
} from "lucide-react";
import { authStore, ROLES, PERMISSIONS } from "@/utils/authUtils";
import { useToast } from "@/hooks/use-toast";

const MOCK_USERS = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "user", dateJoined: "2023-10-15", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", dateJoined: "2023-11-22", status: "active" },
  { id: 3, name: "Robert Johnson", email: "robert@example.com", role: "user", dateJoined: "2024-01-05", status: "active" },
  { id: 4, name: "Kwame Asante", email: "kwame@example.com", role: "manager", dateJoined: "2023-09-18", status: "active" },
  { id: 5, name: "Ama Owusu", email: "ama@example.com", role: "user", dateJoined: "2024-02-10", status: "inactive" },
  { id: 6, name: "David Mensah", email: "david@example.com", role: "admin", dateJoined: "2023-08-05", status: "active" },
  { id: 7, name: "Owner", email: "owner@debutify.com", role: "super_admin", dateJoined: "2023-01-01", status: "active" },
];

interface AdminUserManagementProps {
  className?: string;
}

const AdminUserManagement: React.FC<AdminUserManagementProps> = ({ className }) => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" });
  const { toast } = useToast();
  
  const canManageUsers = authStore.hasPermission(PERMISSIONS.MANAGE_USERS);
  const canManageAdmins = authStore.hasPermission(PERMISSIONS.MANAGE_ADMINS);
  const isSuperAdmin = authStore.isSuperAdmin();
  
  const filteredUsers = users.filter(user => {
    // Super admins can see everyone
    if (isSuperAdmin) return true;
    
    // Regular admins cannot see super admins
    if (user.role === 'super_admin' && !isSuperAdmin) return false;
    
    // Admins without manage_admins permission cannot see other admins
    if (user.role === 'admin' && !canManageAdmins) return false;
    
    return user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send a request to create the user
    const newId = Math.max(...users.map(u => u.id)) + 1;
    const today = new Date().toISOString().split('T')[0];
    
    setUsers([
      ...users,
      {
        id: newId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        dateJoined: today,
        status: "active"
      }
    ]);
    
    setNewUser({ name: "", email: "", role: "user" });
    setIsAddUserOpen(false);
    
    toast({
      title: "Success",
      description: `User ${newUser.name} has been added`,
    });
  };
  
  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    const user = users.find(u => u.id === userId);
    
    toast({
      title: "Status Updated",
      description: `${user?.name}'s account is now ${newStatus}`,
    });
  };
  
  const handleDeleteUser = (userId: number) => {
    const user = users.find(u => u.id === userId);
    
    // Don't allow deleting super_admin if you're not a super_admin
    if (user?.role === 'super_admin' && !isSuperAdmin) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to delete a super admin",
        variant: "destructive",
      });
      return;
    }
    
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "User Deleted",
      description: `${user?.name} has been removed`,
    });
  };
  
  const handleRoleChange = (userId: number, newRole: string) => {
    const user = users.find(u => u.id === userId);
    
    // Don't allow changing super_admin if you're not a super_admin
    if (user?.role === 'super_admin' && !isSuperAdmin) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to change a super admin's role",
        variant: "destructive",
      });
      return;
    }
    
    // Don't allow setting role to super_admin if you're not a super_admin
    if (newRole === 'super_admin' && !isSuperAdmin) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to create a super admin",
        variant: "destructive",
      });
      return;
    }
    
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    
    toast({
      title: "Role Updated",
      description: `${user?.name}'s role is now ${newRole}`,
    });
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        {canManageUsers && (
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <UserPlus className="h-4 w-4" /> 
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account. They will receive an email with instructions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select 
                    value={newUser.role} 
                    onValueChange={(value) => setNewUser({...newUser, role: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      {canManageAdmins && <SelectItem value="admin">Admin</SelectItem>}
                      {isSuperAdmin && <SelectItem value="super_admin">Super Admin</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>
                  Add User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-md">All Users</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                {canManageUsers && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.role === 'super_admin' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' 
                        : user.role === 'admin' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' 
                        : user.role === 'manager' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </TableCell>
                  <TableCell>{user.dateJoined}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  {canManageUsers && (
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem 
                            onClick={() => window.location.href = `mailto:${user.email}`}
                            className="flex items-center gap-2"
                          >
                            <Mail className="h-4 w-4" /> Email User
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          {(canManageAdmins || user.role !== 'admin' && user.role !== 'super_admin') && (
                            <>
                              <DropdownMenuLabel>Role</DropdownMenuLabel>
                              <DropdownMenuItem 
                                onClick={() => handleRoleChange(user.id, 'user')}
                                disabled={user.role === 'user' || (user.role === 'super_admin' && !isSuperAdmin)}
                              >
                                Set as User
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleRoleChange(user.id, 'manager')}
                                disabled={user.role === 'manager' || (user.role === 'super_admin' && !isSuperAdmin)}
                              >
                                Set as Manager
                              </DropdownMenuItem>
                              {canManageAdmins && (
                                <DropdownMenuItem 
                                  onClick={() => handleRoleChange(user.id, 'admin')}
                                  disabled={user.role === 'admin' || (user.role === 'super_admin' && !isSuperAdmin)}
                                >
                                  Set as Admin
                                </DropdownMenuItem>
                              )}
                              {isSuperAdmin && (
                                <DropdownMenuItem 
                                  onClick={() => handleRoleChange(user.id, 'super_admin')}
                                  disabled={user.role === 'super_admin'}
                                >
                                  Set as Super Admin
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                            </>
                          )}
                          
                          <DropdownMenuLabel>Status</DropdownMenuLabel>
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(user.id, 'active')}
                            disabled={user.status === 'active'}
                            className="flex items-center gap-2 text-green-600"
                          >
                            <UserCheck className="h-4 w-4" /> Set Active
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(user.id, 'inactive')}
                            disabled={user.status === 'inactive'}
                            className="flex items-center gap-2 text-amber-600"
                          >
                            <UserX className="h-4 w-4" /> Set Inactive
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem 
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={user.email === 'owner@debutify.com' && !isSuperAdmin}
                            className="flex items-center gap-2 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" /> Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserManagement;
