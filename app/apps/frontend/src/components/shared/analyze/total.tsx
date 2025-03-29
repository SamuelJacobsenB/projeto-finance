import { AnalyzeService } from "@/services";
import { C } from "@/components";

import "chart.js/auto";

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

export const Total = async () => {
  const analyzeService = new AnalyzeService();

  const { data, error } = await analyzeService.analyzeAll();

  const tableData = {
    labels: ["Balanceamento total"],
    datasets: [
      {
        label: "Entradas",
        data: data?.totalInputs,
        backgroundColor: "blue",
        s,
      },
      {
        label: "Saídas",
        data: data?.totalOutputs,
        backgroundColor: "red",
      },
    ],
  };

  if (error) {
    return <div>Error ao analisar dados: {error}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      {/* Gráfico à esquerda */}
      <div style={{ width: "60%", height: "400px" }}>
        <C.bar data={tableData} options={options} />
      </div>

      {/* Números à direita */}
      <div style={{ marginLeft: "20px", width: "40%" }}>
        <h3>Total</h3>
        <div style={{ color: "blue" }}>Entradas: {data?.totalInputs}</div>
        <div style={{ color: "red" }}>Saídas: {data?.totalOutputs}</div>
        <hr />
        <div>Saldo Total: {data?.balance}</div>
      </div>
    </div>
  );
};
