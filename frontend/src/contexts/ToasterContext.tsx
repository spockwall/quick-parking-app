'use client';

import { Toaster } from "react-hot-toast";

export default function ToasterContext() {
  return (
    <Toaster />
  );
}

// Usage
// APP.tsx
{/* <html lang="en">
  <body>
    <AuthContext>
      <ToasterContext />
      <ActiveStatus />
      {children}
    </AuthContext>
  </body>
</html> */}
// import { toast } from "react-hot-toast";
// toast.error('Invalid Input!');
// toast.success('Successfully!');
