
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authStore, PERMISSIONS } from "@/utils/authUtils";

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
  { name: 'Aug', sales: 3490 },
  { name: 'Sep', sales: 4490 },
  { name: 'Oct', sales: 4190 },
  { name: 'Nov', sales: 5490 },
  { name: 'Dec', sales: 6490 },
];

const visitorsData = [
  { name: 'Jan', visitors: 1400 },
  { name: 'Feb', visitors: 1600 },
  { name: 'Mar', visitors: 2000 },
  { name: 'Apr', visitors: 2780 },
  { name: 'May', visitors: 1890 },
  { name: 'Jun', visitors: 2390 },
  { name: 'Jul', visitors: 3490 },
  { name: 'Aug', visitors: 2490 },
  { name: 'Sep', visitors: 3490 },
  { name: 'Oct', visitors: 3190 },
  { name: 'Nov', visitors: 3490 },
  { name: 'Dec', visitors: 4490 },
];

const categoryData = [
  { name: "Women's Fashion", value: 4000 },
  { name: "Men's Fashion", value: 3000 },
  { name: "Jewelry & Accessories", value: 2000 },
  { name: "Electronics", value: 2780 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface AdminAnalyticsProps {
  className?: string;
}

const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ className }) => {
  const canExportData = authStore.hasPermission(PERMISSIONS.EXPORT_DATA);
  
  const exportToCSV = (data: any[], filename: string) => {
    const header = Object.keys(data[0]).join(',');
    const csv = [
      header,
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Analytics & Reporting</h2>
        {canExportData && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => exportToCSV(salesData, 'sales_report')}
            >
              <Download className="h-4 w-4" /> 
              Export Sales
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => exportToCSV(visitorsData, 'visitors_report')}
            >
              <Download className="h-4 w-4" /> 
              Export Visitors
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Monthly Sales (GH₵)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `GH₵ ${value}`} />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Monthly Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visitors" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `GH₵ ${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-2 rounded-md bg-secondary/50">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <div className="text-sm">New order <span className="font-medium">ORD-1237</span> from <span className="font-medium">Emma Boateng</span> - GH₵ 120.99</div>
                <div className="text-xs text-muted-foreground ml-auto">13 minutes ago</div>
              </div>
              <div className="flex items-center p-2 rounded-md bg-secondary/50">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <div className="text-sm">New customer <span className="font-medium">Kofi Mensah</span> registered</div>
                <div className="text-xs text-muted-foreground ml-auto">47 minutes ago</div>
              </div>
              <div className="flex items-center p-2 rounded-md bg-secondary/50">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <div className="text-sm">Low stock alert for <span className="font-medium">Kente Cloth Handmade</span></div>
                <div className="text-xs text-muted-foreground ml-auto">1 hour ago</div>
              </div>
              <div className="flex items-center p-2 rounded-md bg-secondary/50">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                <div className="text-sm">Payment failed for order <span className="font-medium">ORD-1235</span></div>
                <div className="text-xs text-muted-foreground ml-auto">3 hours ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
