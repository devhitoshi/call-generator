import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Layout = ({ children, className }) => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle>コールジェネレータ</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default Layout;
