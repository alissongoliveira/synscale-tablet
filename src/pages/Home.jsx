import React, { useState, useEffect } from "react";
import { GearIcon } from "@radix-ui/react-icons";
import ModalOperador from "../components/ModalOperador";

export default function Home() {
  const [finalizadas, setFinalizadas] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [operador, setOperador] = useState(null);

  const operadores = [
    { id: 501, nome: "Jhon Doe dos Santos Junior" },
    { id: 600, nome: "Jane Doe dos Santos Silva" },
    { id: 645, nome: "João Santos Smith" },
  ];

  useEffect(() => {
    const salvo = localStorage.getItem("operador");
    if (salvo) setOperador(JSON.parse(salvo));
  }, []);

  const handleSelecionar = (op) => {
    setOperador(op);
    localStorage.setItem("operador", JSON.stringify(op));
    setMostrarModal(false);
  };

  return (
    <div className="flex h-screen w-screen text-black font-mono">
      {/* Sidebar */}
      <aside className="w-[260px] bg-gray-200 p-6 flex flex-col justify-between">
        {/* Logo e título */}
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="SynScale"
            className="w-20 h-20 object-contain"
          />
          <h1 className="text-xl font-bold mt-2">SynScale</h1>
          {operador && (
            <p className="mt-2 text-xs text-center font-semibold text-gray-700">
              Operador: {operador.nome.split(" ")[0]}
            </p>
          )}
        </div>

        {/* Contador centralizado */}
        <div className="flex flex-col items-center justify-center text-center flex-1">
          <h2 className="text-sm font-semibold">SOLICITAÇÕES FINALIZADAS</h2>
          <div className="text-5xl mt-2">{finalizadas}</div>
        </div>

        {/* Botões e engrenagem */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full px-2 space-y-3">
            <button
              onClick={() => setMostrarModal(true)}
              className="w-full bg-[#1e293b] text-white py-3 rounded text-sm"
            >
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

      {/* Modal */}
      {mostrarModal && (
        <ModalOperador
          operadores={operadores}
          onSelect={handleSelecionar}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
}
