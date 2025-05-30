import React, { useState } from "react";
import { GearIcon } from "@radix-ui/react-icons";
import ModalOperador from "../components/ModalOperador";
import ModalEditarDados from "../components/ModalEditarDados";

export default function Home() {
  const [finalizadas, setFinalizadas] = useState(0);
  const [mostrarModalOperador, setMostrarModalOperador] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [turnoIniciado, setTurnoIniciado] = useState(false);
  const [operador, setOperador] = useState(null);

  const operadores = [
    { id: 501, nome: "Jhon Doe dos Santos Junior" },
    { id: 600, nome: "Jane Doe dos Santos Silva" },
    { id: 645, nome: "João Santos Smith" },
  ];

  const podeEditar = false;

  const [dadosTablet, setDadosTablet] = useState({
    identificador: "PC - 415",
    ip: "111.111.1.111",
    porta: "2222",
  });

  const handleSelecionar = (op) => {
    setOperador(op);
    localStorage.setItem("operador", JSON.stringify(op));
    setMostrarModalOperador(false);
  };

  const handleEditarChange = (campo, valor) => {
    setDadosTablet((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSalvarEdicao = () => {
    console.log("Dados salvos:", dadosTablet);
    setMostrarModalEditar(false);
  };

  const finalizarTurno = () => {
    setTurnoIniciado(false);
    setOperador(null);
    localStorage.removeItem("operador");
    setMostrarConfirmacao(false);
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

        {/* Contador */}
        <div className="flex flex-col items-center justify-center text-center flex-1">
          <h2 className="text-sm font-semibold">SOLICITAÇÕES FINALIZADAS</h2>
          <div className="text-5xl mt-2">{finalizadas}</div>
        </div>

        {/* Botões e engrenagem */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full px-2 space-y-3">
            <button
              onClick={() => setMostrarModalOperador(true)}
              className="w-full bg-[#1e293b] text-white py-3 rounded text-sm"
            >
              Selecionar Operador
            </button>
            <button
              onClick={() => {
                if (!turnoIniciado) {
                  if (!operador) {
                    setMostrarToast(true);
                    setTimeout(() => setMostrarToast(false), 3000);
                    return;
                  }
                  setTurnoIniciado(true);
                } else {
                  setMostrarConfirmacao(true);
                }
              }}
              className={`w-full py-3 rounded text-sm text-white font-semibold ${
                turnoIniciado ? "bg-red-600" : "bg-green-600"
              }`}
            >
              {turnoIniciado ? "Finalizar Turno" : "Iniciar Turno"}
            </button>
          </div>
          <GearIcon
            onClick={() => setMostrarModalEditar(true)}
            className="w-6 h-6 mt-4 cursor-pointer"
          />
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 bg-gray-100 flex items-center justify-center">
        <p className="text-md font-bold">
          {turnoIniciado
            ? "Aguardando Novas Solicitações."
            : "Aguardando a inicialização do turno."}
        </p>
      </main>

      {/* Modal de operador */}
      {mostrarModalOperador && (
        <ModalOperador
          operadores={operadores}
          onSelect={handleSelecionar}
          onClose={() => setMostrarModalOperador(false)}
        />
      )}

      {/* Modal de edição */}
      {mostrarModalEditar && (
        <ModalEditarDados
          dados={dadosTablet}
          onChange={handleEditarChange}
          onSave={handleSalvarEdicao}
          onClose={() => setMostrarModalEditar(false)}
          podeEditar={podeEditar}
        />
      )}

      {/* Modal de confirmação de finalização */}
      {mostrarConfirmacao && (
        <div className="absolute top-0 left-[260px] w-[calc(100%-260px)] h-full bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[360px] text-center space-y-4">
            <h2 className="text-lg font-bold">Finalizar Turno</h2>
            <p className="text-sm text-gray-700">
              Deseja realmente finalizar o turno?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={finalizarTurno}
                className="bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold"
              >
                Sim
              </button>
              <button
                onClick={() => setMostrarConfirmacao(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded text-sm font-semibold"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {mostrarToast && (
        <div className="fixed bottom-6 left-[280px] bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50 text-sm font-semibold animate-fade-in-out">
          Para iniciar o turno, selecione um operador.
        </div>
      )}
    </div>
  );
}
