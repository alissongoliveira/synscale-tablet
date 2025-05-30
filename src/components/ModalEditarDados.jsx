import React from "react";
import { Tag, Network, Usb } from "lucide-react";

export default function ModalEditarDados({
  dados,
  onChange,
  onClose,
  onSave,
  podeEditar = false,
}) {
  return (
    <div className="absolute top-0 left-[260px] w-[calc(100%-260px)] h-full bg-black/20 flex items-start justify-center z-50">
      <div className="bg-gray-200 mt-5 p-6 rounded-xl w-[400px] max-w-[90%] shadow-lg">
        {/* Título e fechar */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-center w-full font-bold text-lg -ml-6">
            EDITAR DADOS
          </h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-700 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Campos */}
        <div className="divide-y divide-gray-300 border rounded mb-6">
          <div className="flex items-center gap-2 p-3">
            <Tag className="w-5 h-5" />
            <input
              value={dados.identificador}
              onChange={(e) => onChange("identificador", e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              disabled={!podeEditar}
            />
          </div>
          <div className="flex items-center gap-2 p-3">
            <Network className="w-5 h-5" />
            <input
              value={dados.ip}
              onChange={(e) => onChange("ip", e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              disabled={!podeEditar}
            />
          </div>
          <div className="flex items-center gap-2 p-3">
            <Usb className="w-5 h-5" />
            <input
              value={dados.porta}
              onChange={(e) => onChange("porta", e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              disabled={!podeEditar}
            />
          </div>
        </div>

        {/* Botão salvar */}
        <button
          onClick={onSave}
          disabled={!podeEditar}
          className={`w-full py-2 rounded text-white font-bold text-sm ${
            podeEditar
              ? "bg-[#1e293b] hover:brightness-110"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Salvar
        </button>

        {/* Aviso de permissão */}
        {!podeEditar && (
          <p className="text-center text-red-600 text-xs mt-3 font-semibold">
            Somente Usuários Com Previlégio,
            <br />
            Podem Fazer Isso!
          </p>
        )}
      </div>
    </div>
  );
}
