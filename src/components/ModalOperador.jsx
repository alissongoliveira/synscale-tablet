import React from "react";

export default function ModalOperador({ operadores, onSelect, onClose }) {
  return (
    <div className="absolute top-0 left-[260px] w-[calc(100%-260px)] h-full flex items-start justify-center z-50">
      <div className="bg-gray-200 mt-5 p-6 rounded-xl w-[900px] max-w-[95%] shadow-lg">
        {/* Botão de fechar */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-700 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Lista de operadores */}
        <div className="space-y-3">
          {operadores.map((op) => (
            <button
              key={op.id}
              onClick={() => onSelect(op)}
              className="w-full text-left p-4 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 font-semibold text-sm transition"
            >
              {op.id} - {op.nome}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
