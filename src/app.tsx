import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TooltipProvider } from "@/components/ui/tooltip";

// Importar os componentes
import { Login } from "@/components/login";
import { Sidebar } from "@/components/sidebar";
import { Dashboard } from "@/components/dashboard";
import { Clientes } from "@/components/clientes";
import { Veiculos } from "@/components/veiculos";
import { Agendamentos } from "@/components/agendamentos";
import { OrdensServico } from "@/components/ordens-servico";

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
}

interface Veiculo {
  id: string;
  clienteId: string;
  marca: string;
  modelo: string;
  ano: string;
  placa: string;
  cor: string;
}

interface Operador {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  iniciais: string;
}

interface Agendamento {
  id: string;
  clienteId: string;
  veiculoId: string;
  operadorId: string;
  servico: string;
  descricao: string;
  data: string;
  hora: string;
  status: "agendado" | "em-andamento" | "concluido" | "cancelado";
  valor?: number;
}

interface OrdemServico {
  id: string;
  agendamentoId: string;
  clienteId: string;
  veiculoId: string;
  operadorId: string;
  servico: string;
  descricao: string;
  dataInicio: string;
  dataConclusao: string;
  pecasUtilizadas: Array<{
    nome: string;
    quantidade: number;
    valorUnitario: number;
  }>;
  maoDeObra: number;
  valorTotal: number;
  observacoes: string;
  status: "em-andamento" | "concluida" | "entregue";
}

export function OficinaApp() {
  const [usuarioLogado, setUsuarioLogado] = useState<string | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Lista de operadores da oficina
  const [operadores] = useState<Operador[]>([
    {
      id: "1",
      nome: "João Silva",
      email: "joao@oficina.com",
      telefone: "(11) 99999-9999",
      iniciais: "JS",
    },
    {
      id: "2",
      nome: "Maria Santos",
      email: "maria@oficina.com",
      telefone: "(11) 98888-8888",
      iniciais: "MS",
    },
    {
      id: "3",
      nome: "Carlos Oliveira",
      email: "carlos@oficina.com",
      telefone: "(11) 97777-7777",
      iniciais: "CO",
    },
  ]);

  // Operador atual logado (baseado no login)
  const [operadorAtual, setOperadorAtual] = useState<Operador>(operadores[0]);
  const [filtroOperador, setFiltroOperador] = useState<string>("todos");

  // Estados para formulários
  const [novoCliente, setNovoCliente] = useState<Partial<Cliente>>({});
  const [novoVeiculo, setNovoVeiculo] = useState<Partial<Veiculo>>({});
  const [novoAgendamento, setNovoAgendamento] = useState<Partial<Agendamento>>(
    {}
  );
  const [editandoCliente, setEditandoCliente] = useState<Cliente | null>(null);
  const [editandoVeiculo, setEditandoVeiculo] = useState<Veiculo | null>(null);

  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [perfilTemp, setPerfilTemp] = useState<Operador>(operadorAtual);

  // Verificar se há usuário salvo no localStorage
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("oficina_usuario");
    if (usuarioSalvo) {
      setUsuarioLogado(usuarioSalvo);
      // Definir operador baseado no usuário logado
      const operador =
        operadores.find((op) => op.email === usuarioSalvo) || operadores[0];
      setOperadorAtual(operador);
    }
  }, [operadores]);

  // Função de login
  const handleLogin = (usuario: string, senha: string) => {
    setUsuarioLogado(usuario);

    // Definir operador baseado no usuário logado
    const operador =
      operadores.find((op) => op.email === usuario) || operadores[0];
    setOperadorAtual(operador);

    // Se for admin, manter o primeiro operador
    if (usuario === "admin") {
      setOperadorAtual(operadores[0]);
    }
  };

  // Função de logout
  const handleLogout = () => {
    setUsuarioLogado(null);
    localStorage.removeItem("oficina_usuario");
    // Reset do estado da aplicação
    setActiveTab("dashboard");
    setSidebarCollapsed(false);
  };

  // Se não estiver logado, mostrar tela de login
  if (!usuarioLogado) {
    return <Login onLogin={handleLogin} />;
  }

  // Funções para clientes
  const adicionarCliente = () => {
    if (novoCliente.nome && novoCliente.telefone) {
      const cliente: Cliente = {
        id: Date.now().toString(),
        nome: novoCliente.nome,
        telefone: novoCliente.telefone,
        email: novoCliente.email || "",
        endereco: novoCliente.endereco || "",
      };
      setClientes([...clientes, cliente]);
      setNovoCliente({});
      // Fechar o modal
      document.querySelector('[data-state="open"]')?.click();
    }
  };

  const editarCliente = (cliente: Cliente) => {
    setClientes(clientes.map((c) => (c.id === cliente.id ? cliente : c)));
    setEditandoCliente(null);
  };

  const excluirCliente = (id: string) => {
    setClientes(clientes.filter((c) => c.id !== id));
    setVeiculos(veiculos.filter((v) => v.clienteId !== id));
    setAgendamentos(agendamentos.filter((a) => a.clienteId !== id));
  };

  // Funções para veículos
  const adicionarVeiculo = () => {
    if (
      novoVeiculo.clienteId &&
      novoVeiculo.marca &&
      novoVeiculo.modelo &&
      novoVeiculo.placa
    ) {
      const veiculo: Veiculo = {
        id: Date.now().toString(),
        clienteId: novoVeiculo.clienteId,
        marca: novoVeiculo.marca,
        modelo: novoVeiculo.modelo,
        ano: novoVeiculo.ano || "",
        placa: novoVeiculo.placa,
        cor: novoVeiculo.cor || "",
      };
      setVeiculos([...veiculos, veiculo]);
      setNovoVeiculo({});
      // Fechar o modal
      document.querySelector('[data-state="open"]')?.click();
    }
  };

  const editarVeiculo = (veiculo: Veiculo) => {
    setVeiculos(veiculos.map((v) => (v.id === veiculo.id ? veiculo : v)));
    setEditandoVeiculo(null);
  };

  const excluirVeiculo = (id: string) => {
    setVeiculos(veiculos.filter((v) => v.id !== id));
    setAgendamentos(agendamentos.filter((a) => a.veiculoId !== id));
  };

  // Funções para agendamentos
  const adicionarAgendamento = () => {
    if (
      novoAgendamento.clienteId &&
      novoAgendamento.veiculoId &&
      novoAgendamento.operadorId &&
      novoAgendamento.servico &&
      novoAgendamento.data &&
      novoAgendamento.hora
    ) {
      const agendamento: Agendamento = {
        id: Date.now().toString(),
        clienteId: novoAgendamento.clienteId,
        veiculoId: novoAgendamento.veiculoId,
        operadorId: novoAgendamento.operadorId,
        servico: novoAgendamento.servico,
        descricao: novoAgendamento.descricao || "",
        data: novoAgendamento.data,
        hora: novoAgendamento.hora,
        status: "agendado",
        valor: novoAgendamento.valor,
      };
      setAgendamentos([...agendamentos, agendamento]);
      setNovoAgendamento({});
      // Fechar o modal
      document.querySelector('[data-state="open"]')?.click();
    }
  };

  const atualizarStatusAgendamento = (
    id: string,
    status: Agendamento["status"]
  ) => {
    const agendamento = agendamentos.find((a) => a.id === id);

    // Se está marcando como concluído, gerar ordem de serviço
    if (status === "concluido" && agendamento) {
      const novaOrdemServico: OrdemServico = {
        id: Date.now().toString(),
        agendamentoId: agendamento.id,
        clienteId: agendamento.clienteId,
        veiculoId: agendamento.veiculoId,
        operadorId: agendamento.operadorId,
        servico: agendamento.servico,
        descricao: agendamento.descricao,
        dataInicio: agendamento.data,
        dataConclusao: new Date().toISOString().split("T")[0],
        pecasUtilizadas: [],
        maoDeObra: agendamento.valor || 0,
        valorTotal: agendamento.valor || 0,
        observacoes: "",
        status: "concluida",
      };

      setOrdensServico([...ordensServico, novaOrdemServico]);
      alert(`Ordem de Serviço #${novaOrdemServico.id} gerada com sucesso!`);
    }

    setAgendamentos(
      agendamentos.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  // Funções auxiliares
  const getClienteNome = (clienteId: string) => {
    return (
      clientes.find((c) => c.id === clienteId)?.nome || "Cliente não encontrado"
    );
  };

  const getVeiculoInfo = (veiculoId: string) => {
    const veiculo = veiculos.find((v) => v.id === veiculoId);
    return veiculo
      ? `${veiculo.marca} ${veiculo.modelo} - ${veiculo.placa}`
      : "Veículo não encontrado";
  };

  const getOperadorNome = (operadorId: string) => {
    return (
      operadores.find((o) => o.id === operadorId)?.nome ||
      "Operador não encontrado"
    );
  };

  const getOperadorIniciais = (operadorId: string) => {
    return operadores.find((o) => o.id === operadorId)?.iniciais || "??";
  };

  const getVeiculosPorCliente = (clienteId: string) => {
    return veiculos.filter((v) => v.clienteId === clienteId);
  };

  const getAgendamentosFiltrados = () => {
    if (filtroOperador === "todos") {
      return agendamentos;
    }
    return agendamentos.filter((a) => a.operadorId === filtroOperador);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "agendado":
        return "bg-blue-500";
      case "em-andamento":
        return "bg-yellow-500";
      case "concluido":
        return "bg-green-500";
      case "cancelado":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Funções do perfil
  const abrirEdicaoPerfil = () => {
    setPerfilTemp(operadorAtual);
    setEditandoPerfil(true);
  };

  const salvarPerfil = () => {
    setOperadorAtual(perfilTemp);
    setEditandoPerfil(false);
  };

  const trocarOperador = (operadorId: string) => {
    const operador = operadores.find((o) => o.id === operadorId);
    if (operador) {
      setOperadorAtual(operador);
    }
  };

  const fazerLogoff = () => {
    if (confirm("Tem certeza que deseja sair do sistema?")) {
      handleLogout();
    }
  };

  // Renderizar conteúdo baseado na aba ativa
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            clientes={clientes}
            veiculos={veiculos}
            agendamentos={agendamentos}
            operadores={operadores}
            getClienteNome={getClienteNome}
            getVeiculoInfo={getVeiculoInfo}
            getOperadorNome={getOperadorNome}
            getOperadorIniciais={getOperadorIniciais}
            getStatusColor={getStatusColor}
          />
        );
      case "clientes":
        return (
          <Clientes
            clientes={clientes}
            novoCliente={novoCliente}
            setNovoCliente={setNovoCliente}
            editandoCliente={editandoCliente}
            setEditandoCliente={setEditandoCliente}
            adicionarCliente={adicionarCliente}
            editarCliente={editarCliente}
            excluirCliente={excluirCliente}
            getVeiculosPorCliente={getVeiculosPorCliente}
          />
        );
      case "veiculos":
        return (
          <Veiculos
            clientes={clientes}
            veiculos={veiculos}
            novoVeiculo={novoVeiculo}
            setNovoVeiculo={setNovoVeiculo}
            editandoVeiculo={editandoVeiculo}
            setEditandoVeiculo={setEditandoVeiculo}
            adicionarVeiculo={adicionarVeiculo}
            editarVeiculo={editarVeiculo}
            excluirVeiculo={excluirVeiculo}
            getClienteNome={getClienteNome}
          />
        );
      case "agendamentos":
        return (
          <Agendamentos
            clientes={clientes}
            veiculos={veiculos}
            operadores={operadores}
            agendamentos={agendamentos}
            novoAgendamento={novoAgendamento}
            setNovoAgendamento={setNovoAgendamento}
            filtroOperador={filtroOperador}
            setFiltroOperador={setFiltroOperador}
            adicionarAgendamento={adicionarAgendamento}
            atualizarStatusAgendamento={atualizarStatusAgendamento}
            getClienteNome={getClienteNome}
            getVeiculoInfo={getVeiculoInfo}
            getOperadorNome={getOperadorNome}
            getOperadorIniciais={getOperadorIniciais}
            getVeiculosPorCliente={getVeiculosPorCliente}
            getAgendamentosFiltrados={getAgendamentosFiltrados}
            getStatusColor={getStatusColor}
          />
        );
      case "ordens-servico":
        return (
          <OrdensServico
            ordensServico={ordensServico}
            setOrdensServico={setOrdensServico}
            clientes={clientes}
            veiculos={veiculos}
            operadores={operadores}
            getClienteNome={getClienteNome}
            getVeiculoInfo={getVeiculoInfo}
            getOperadorNome={getOperadorNome}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          operadorAtual={operadorAtual}
          operadores={operadores}
          trocarOperador={trocarOperador}
          abrirEdicaoPerfil={abrirEdicaoPerfil}
          fazerLogoff={fazerLogoff}
        />

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          <div className="p-6">{renderContent()}</div>
        </div>

        {/* Modal de Edição de Perfil */}
        <Dialog open={editandoPerfil} onOpenChange={setEditandoPerfil}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Perfil</DialogTitle>
              <DialogDescription>
                Atualize suas informações pessoais
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="perfil-nome" className="text-right">
                  Nome
                </Label>
                <Input
                  id="perfil-nome"
                  value={perfilTemp.nome}
                  onChange={(e) =>
                    setPerfilTemp({ ...perfilTemp, nome: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="perfil-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="perfil-email"
                  type="email"
                  value={perfilTemp.email}
                  onChange={(e) =>
                    setPerfilTemp({ ...perfilTemp, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="perfil-telefone" className="text-right">
                  Telefone
                </Label>
                <Input
                  id="perfil-telefone"
                  value={perfilTemp.telefone}
                  onChange={(e) =>
                    setPerfilTemp({ ...perfilTemp, telefone: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="perfil-iniciais" className="text-right">
                  Iniciais
                </Label>
                <Input
                  id="perfil-iniciais"
                  value={perfilTemp.iniciais}
                  onChange={(e) =>
                    setPerfilTemp({
                      ...perfilTemp,
                      iniciais: e.target.value.toUpperCase(),
                    })
                  }
                  className="col-span-3"
                  maxLength={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setEditandoPerfil(false)}
              >
                Cancelar
              </Button>
              <Button onClick={salvarPerfil}>Salvar alterações</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
