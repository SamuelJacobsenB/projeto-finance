"use client";

import React from "react";

import { Bar } from "react-chartjs-2";

import { Layout } from "@/components";
import "chart.js/auto";

// Configuração dos dados do gráfico
const data = {
  labels: ["Janeiro", "Fevereiro", "Março"],
  datasets: [
    {
      label: "Entradas",
      data: [300, 500, 700],
      backgroundColor: "blue",
    },
    {
      label: "Saídas",
      data: [200, 300, 400],
      backgroundColor: "red",
    },
  ],
};

// Configuração das opções do gráfico
const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const Dashboard = () => {
  const totalInputs = 300 + 500 + 700; // Somatório das entradas
  const totalOutputs = 200 + 300 + 400; // Somatório das saídas
  const balance = totalInputs - totalOutputs; // Saldo total

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        {/* Gráfico à esquerda */}
        <div style={{ width: "60%", height: "400px" }}>
          <Bar data={data} options={options} />
        </div>

        {/* Números à direita */}
        <div style={{ marginLeft: "20px", width: "40%" }}>
          <h3>Total</h3>
          <div style={{ color: "blue" }}>Entradas: {totalInputs}</div>
          <div style={{ color: "red" }}>Saídas: {totalOutputs}</div>
          <hr />
          <div>Saldo Total: {balance}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
