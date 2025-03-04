import { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    const drawChart = () => {
      if (!window.google || !window.google.visualization) {
        console.error("Google Charts ainda não carregado.");
        return;
      }

      const dataPie = window.google.visualization.arrayToDataTable([
        ["Exercicio", "Reps", { role: "style" }] as [string, string, { role: string }],
        ["Arremesso - 2pts", 30, { role: "style", color: "#262626" }] as [string, number, { role: string, color: string }],
        ["Bandeja", 40, { role: "style", color: "#8C8C8C" }] as [string, number, { role: string, color: string }],
        ["Arremesso - 3pts", 20, { role: "style", color: "#BFBFBF" }] as [string, number, { role: string, color: string }],
        ["Arremesso - PullUp", 20, { role: "style", color: "#f9f9f9" }] as [string, number, { role: string, color: string }],
      ]);

      const optionsPie = {
        title: "Reps por Exercício",
        backgroundColor: "#262626",
        borderRadius: 6,
        colors: ["#262626", "#8C8C8C", "#BFBFBF", "#f9f9f9"],
        titleTextStyle: { color: "#f9f9f9", fontSize: 18 },
        legend: { textStyle: { color: "#f9f9f9" } },
        pieSliceTextStyle: { color: "#000000" },
      };

      const chartPie = new window.google.visualization.PieChart(
        document.getElementById("piechart") as HTMLElement
      );
      chartPie.draw(dataPie, optionsPie);

      const dataBar = window.google.visualization.arrayToDataTable([
        ["Treino", "Porcentagem %", { role: "style" }] as [string, string | number, { role: string }],
        ["Treino C - 24/07", 58, { role: "style", color: "#262626" }] as [string, number, { role: string, color: string }],
        ["Treino A - 28/05", 56.5, { role: "style", color: "#8C8C8C" }] as [string, number, { role: string, color: string }],
        ["Treino C - 30/01", 56.4, { role: "style", color: "#BFBFBF" }] as [string, number, { role: string, color: string }],
        ["Treino B - 18/02", 55, { role: "style", color: "#f9f9f9" }] as [string, number, { role: string, color: string }],
      ]);

      const optionsBar = {
        title: "Melhores Treinos (%)",
        backgroundColor: "#262626",
        borderRadius: 6,
        hAxis: { textStyle: { color: "#f9f9f9" } },
        vAxis: { textStyle: { color: "#f9f9f9" } },
        titleTextStyle: { color: "#f9f9f9", fontSize: 18 },
        legend: "none",
      };

      const chartBar = new window.google.visualization.BarChart(
        document.getElementById("barchart") as HTMLElement
      );
      chartBar.draw(dataBar, optionsBar);
    };

    const loadGoogleCharts = () => {
      if (!window.google || !window.google.charts) {
        console.error("Google Charts ainda não carregado.");
        return;
      }

      window.google.charts.load("current", { packages: ["corechart"] });
      window.google.charts.setOnLoadCallback(drawChart);
    };

    if (!window.google || !window.google.charts) {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/charts/loader.js";
      script.async = true;
      script.onload = loadGoogleCharts;
      document.body.appendChild(script);
    } else {
      loadGoogleCharts();
    }

    window.addEventListener("resize", drawChart);

    return () => {
      window.removeEventListener("resize", drawChart);
    };
  }, []);


  return (
    <div className="user_activity">
      <div style={{ 
          width: "80%", 
          height: "300px", 
          marginBottom: "20px", 
          marginTop: "20px", 
          borderRadius: "10px", 
          overflow: "hidden" 
      }}>
          <div id="piechart" style={{ width: "100%", height: "100%" }}></div>
      </div>

      <div style={{ 
          width: "80%", 
          height: "300px", 
          marginBottom: "20px",  
          borderRadius: "10px", 
          overflow: "hidden" 
      }}>
          <div id="barchart" style={{ width: "100%", height: "100%" }}></div>
      </div>
    </div>
  );
}

export default Dashboard;
