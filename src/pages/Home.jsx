import React, { useState } from "react";
import { GearIcon } from "@radix-ui/react-icons";

export default function Home() {
  const [finalizadas, setFinalizadas] = useState(0);

  return (
    <div className="flex h-screen w-screen text-black font-mono">
      {/* Sidebar */}
      <aside className="w-[260px] bg-gray-200 p-6 flex flex-col justify-between">
        {/* Topo fixo com logo */}
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="SynScale"
            className="w-20 h-20 object-contain"
          />
          <h1 className="text-xl font-bold mt-2">SynScale</h1>
        </div>

        {/* Contador centralizado */}
        <div className="flex flex-col items-center justify-center text-center flex-1">
          <h2 className="text-sm font-semibold">SOLICITAÇÕES FINALIZADAS</h2>
          <div className="text-5xl mt-2">{finalizadas}</div>
        </div>

        {/* Botões + engrenagem fixos na base */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full px-2 space-y-3">
            <button className="w-full bg-[#1e293b] text-white py-3 rounded text-sm">
              Selecionar Operador
            </button>
            <button className="w-full bg-green-600 text-white py-3 rounded text-sm">
              Iniciar Turno
            </button>
          </div>
          <GearIcon className="w-6 h-6 mt-4" />
        </div>
      </aside>
      {/* Conteúdo principal */}
      <main className="flex-1 bg-gray-100 flex items-center justify-center">
        <p className="text-md font-bold">
          Aguardando a inicialização do turno.
        </p>
      </main>
    </div>
  );
}
