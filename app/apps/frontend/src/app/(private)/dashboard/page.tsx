"use client";

import { Suspense } from "react";

import { Analyze, Layout } from "@/components";

const Dashboard = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Analyze.total />
      </Suspense>
    </Layout>
  );
};

export default Dashboard;
