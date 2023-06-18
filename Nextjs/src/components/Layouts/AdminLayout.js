import Navigation from "@/components/Layouts/Navigation";
import { useAuth } from "@/hooks/auth";
import AdminDashboard from '@/components/Admin/Dashboard';


const AdminLayout = props => {
    const {
        header,
        setActiveRoute,
        activeRoute,
        children
    } = props;
    const { user } = useAuth({ middleware: "auth" });

    return (
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 bg-gray-900">
          <Navigation user={user} />

          <div className="fixed top-14 w-full h-full flex justify-between">

              {/* Index Content */}
              <main className="h-full w-full">
                  <AdminDashboard />
              </main>
          </div>
      </div>
    );
};

export default AdminLayout;
