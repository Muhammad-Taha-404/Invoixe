// app/(authenticated)/layout.tsx
export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Optional: Add Sidebar or Navbar here */}
      <main className="flex-1">{children}</main>
    </div>
  );
}