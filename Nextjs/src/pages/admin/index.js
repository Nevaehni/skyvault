import Head from "next/head";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/Layouts/AdminLayout";


const Index = () => {

    return (
      <AdminLayout
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
      >
          <Head>
              <title>Dashboard</title>
          </Head>
          <div className="py-12">


          </div>
      </AdminLayout>
    );
};

export default Index;
