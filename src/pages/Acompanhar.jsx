import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Acompanhar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pesoDesejado = 24000 } = location.state || {};

  const [pesoAtual, setPesoAtual] = useState(23000);
  const [podeFinalizar, setPodeFinalizar] = useState(false);

  // Simula o aumento do peso atual (futuramente substituir por WebSocket)
  useEffect(() => {
    const interval = setInterval(() => {
      setPesoAtual((prev) => {
        const novo = prev + Math.floor(Math.random() * 12); // incremento aleatório
        if (novo >= pesoDesejado) {
          setPodeFinalizar(true);
          clearInterval(interval);
        }
        return novo;
      });
    }, 700);
    return () => clearInterval(interval);
  }, [pesoDesejado]);

  const handleFinalizar = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 font-mono text-black">
      <div className="bg-gray-200 rounded-xl p-10 shadow-lg min-w-[340px] space-y-8">
        <div>
          <p className="text-sm font-semibold mb-1">PESO DESEJADO:</p>
          <div className="border rounded p-4 text-center text-4xl font-bold bg-gray-100">
            {pesoDesejado}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-1">PESO ATUAL:</p>
          <div className="border rounded p-4 text-center text-4xl font-bold bg-gray-100">
            {pesoAtual}
          </div>
        </div>

        {podeFinalizar && (
          <button
            onClick={handleFinalizar}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded font-bold text-sm"
          >
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
}
