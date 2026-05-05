import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { verifySession } from "@/lib/dal/dal";
import { getUserById } from "@/lib/dal/userDAL";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await verifySession();
  const user = await getUserById(userId as string);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        user={{
          id: user?._id.toHexString() || "",
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "",
        }}
      />
      <main className="w-full flex-1 px-6 py-8 sm:px-8">{children}</main>
      <Footer />
    </div>
  );
}
