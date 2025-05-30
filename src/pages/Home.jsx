import React, { useState } from "react";
import { GearIcon } from "@radix-ui/react-icons";
import ModalOperador from "../components/ModalOperador";
import ModalEditarDados from "../components/ModalEditarDados";
import CardSolicitacao from "../components/CardSolicitacao";

export default function Home() {
  const [finalizadas, setFinalizadas] = useState(10);
  const [mostrarModalOperador, setMostrarModalOperador] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [turnoIniciado, setTurnoIniciado] = useState(false);
  const [operador, setOperador] = useState(null);

  const podeEditar = false;

  const [dadosTablet, setDadosTablet] = useState({
    identificador: "PC - 415",
    ip: "111.111.1.111",
    porta: "2222",
  });

  const operadores = [
    { id: 501, nome: "Jhon Doe dos Santos Junior" },
    { id: 600, nome: "Jane Doe dos Santos Silva" },
    { id: 645, nome: "João Santos Smith" },
  ];

  const mockSolicitacoes = [
    {
      balanca: "01",
      dados: {
        placa: "ABC-1234",
        tara: "12.000 kg",
        liquido: "25.000 kg",
        bruto: "37.000 kg",
        data: "30/05/2025 10:30",
      },
    },
    {
      balanca: "02",
      dados: {
        placa: "XYZ-9876",
        tara: "11.000 kg",
        liquido: "28.000 kg",
        bruto: "39.000 kg",
        data: "30/05/2025 10:35",
      },
    },
    {
      balanca: "02",
      dados: {
        placa: "JJK-5432",
        tara: "10.000 kg",
        liquido: "30.000 kg",
        bruto: "40.000 kg",
        data: "30/05/2025 10:40",
      },
    },
  ];

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

        <div className="flex flex-col items-center justify-center text-center flex-1">
          <h2 className="text-sm font-semibold">SOLICITAÇÕES FINALIZADAS</h2>
          <div className="text-5xl mt-2">{finalizadas}</div>
        </div>

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
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {turnoIniciado ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSolicitacoes.map((s, i) => (
              <CardSolicitacao
                key={i}
                balanca={s.balanca}
                dados={s.dados}
                onAceitar={() => console.log("Aceito", s)}
                onRejeitar={() => console.log("Rejeitado", s)}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-md font-bold">
              Aguardando a inicialização do turno.
            </p>
          </div>
        )}
      </main>

      {/* Modais */}
      {mostrarModalOperador && (
        <ModalOperador
          operadores={operadores}
          onSelect={handleSelecionar}
          onClose={() => setMostrarModalOperador(false)}
        />
      )}

      {mostrarModalEditar && (
        <ModalEditarDados
          dados={dadosTablet}
          onChange={handleEditarChange}
          onSave={handleSalvarEdicao}
          onClose={() => setMostrarModalEditar(false)}
          podeEditar={podeEditar}
        />
      )}

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

      {mostrarToast && (
        <div className="fixed bottom-6 left-[280px] bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50 text-sm font-semibold animate-fade-in-out">
          Para iniciar o turno, selecione um operador.
        </div>
      )}
    </div>
  );
}
