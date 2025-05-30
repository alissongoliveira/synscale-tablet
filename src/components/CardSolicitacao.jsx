import React from "react";

export default function CardSolicitacao({
  balanca,
  dados,
  onAceitar,
  onRejeitar,
}) {
  return (
    <div className="border rounded p-4 w-full max-w-[300px] bg-white shadow-md">
      <h2 className="text-center font-bold mb-2">BALANÇA {balanca}</h2>
      <hr className="mb-2" />
      <div className="text-sm space-y-1 mb-4">
        <p>
          <strong>PLACA:</strong> {dados.placa}
        </p>
        <p>
          <strong>TARA:</strong> {dados.tara}
        </p>
        <p>
          <strong>LÍQUIDO:</strong> {dados.liquido}
        </p>
        <p>
          <strong>BRUTO:</strong> {dados.bruto}
        </p>
        <p>
          <strong>DATA DA SOLICITAÇÃO:</strong> {dados.data}
        </p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onAceitar}
          className="bg-green-600 text-white px-4 py-1 rounded font-semibold text-sm"
        >
          Aceitar
        </button>
        <button
          onClick={onRejeitar}
          className="bg-red-600 text-white px-4 py-1 rounded font-semibold text-sm"
        >
          Rejeitar
        </button>
      </div>
    </div>
  );
}
