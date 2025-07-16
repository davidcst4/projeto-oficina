import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

interface AgendamentosProps {
  clientes: Cliente[];
  veiculos: Veiculo[];
  operadores: Operador[];
  agendamentos: Agendamento[];
  novoAgendamento: Partial<Agendamento>;
  setNovoAgendamento: (agendamento: Partial<Agendamento>) => void;
  filtroOperador: string;
  setFiltroOperador: (operadorId: string) => void;
  adicionarAgendamento: () => void;
  atualizarStatusAgendamento: (
    id: string,
    status: Agendamento["status"]
  ) => void;
  getClienteNome: (clienteId: string) => string;
  getVeiculoInfo: (veiculoId: string) => string;
  getOperadorNome: (operadorId: string) => string;
  getOperadorIniciais: (operadorId: string) => string;
  getVeiculosPorCliente: (clienteId: string) => Veiculo[];
  getAgendamentosFiltrados: () => Agendamento[];
  getStatusColor: (status: string) => string;
}

export function Agendamentos({
  clientes,
  veiculos,
  operadores,
  agendamentos,
  novoAgendamento,
  setNovoAgendamento,
  filtroOperador,
  setFiltroOperador,
  adicionarAgendamento,
  atualizarStatusAgendamento,
  getClienteNome,
  getVeiculoInfo,
  getOperadorNome,
  getOperadorIniciais,
  getVeiculosPorCliente,
  getAgendamentosFiltrados,
  getStatusColor,
}: AgendamentosProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Agendamentos
          </h2>
          <p className="text-gray-600">
            Gerencie todos os agendamentos de serviços
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button disabled={clientes.length === 0 || veiculos.length === 0}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Agendamento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Novo Agendamento</DialogTitle>
                <DialogDescription>
                  Agende um novo serviço para um cliente
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div>
                  <Label htmlFor="agend-cliente">Cliente *</Label>
                  <Select
                    value={novoAgendamento.clienteId || ""}
                    onValueChange={(value) => {
                      setNovoAgendamento({
                        ...novoAgendamento,
                        clienteId: value,
                        veiculoId: "",
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientes.map((cliente) => (
                        <SelectItem key={cliente.id} value={cliente.id}>
                          {cliente.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="agend-veiculo">Veículo *</Label>
                  <Select
                    value={novoAgendamento.veiculoId || ""}
                    onValueChange={(value) =>
                      setNovoAgendamento({
                        ...novoAgendamento,
                        veiculoId: value,
                      })
                    }
                    disabled={!novoAgendamento.clienteId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um veículo" />
                    </SelectTrigger>
                    <SelectContent>
                      {getVeiculosPorCliente(
                        novoAgendamento.clienteId || ""
                      ).map((veiculo) => (
                        <SelectItem key={veiculo.id} value={veiculo.id}>
                          {veiculo.marca} {veiculo.modelo} - {veiculo.placa}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="agend-operador">Operador Responsável *</Label>
                  <Select
                    value={novoAgendamento.operadorId || ""}
                    onValueChange={(value) =>
                      setNovoAgendamento({
                        ...novoAgendamento,
                        operadorId: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um operador" />
                    </SelectTrigger>
                    <SelectContent>
                      {operadores.map((operador) => (
                        <SelectItem key={operador.id} value={operador.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-gray-500 text-white text-xs">
                                {operador.iniciais}
                              </AvatarFallback>
                            </Avatar>
                            {operador.nome}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="servico">Tipo de Serviço *</Label>
                  <Select
                    value={novoAgendamento.servico || ""}
                    onValueChange={(value) =>
                      setNovoAgendamento({ ...novoAgendamento, servico: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Troca de óleo">
                        Troca de óleo
                      </SelectItem>
                      <SelectItem value="Revisão geral">
                        Revisão geral
                      </SelectItem>
                      <SelectItem value="Alinhamento">Alinhamento</SelectItem>
                      <SelectItem value="Balanceamento">
                        Balanceamento
                      </SelectItem>
                      <SelectItem value="Freios">Freios</SelectItem>
                      <SelectItem value="Suspensão">Suspensão</SelectItem>
                      <SelectItem value="Motor">Motor</SelectItem>
                      <SelectItem value="Ar condicionado">
                        Ar condicionado
                      </SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="valor">Valor Estimado (R$)</Label>
                  <Input
                    id="valor"
                    type="number"
                    value={novoAgendamento.valor || ""}
                    onChange={(e) =>
                      setNovoAgendamento({
                        ...novoAgendamento,
                        valor: Number.parseFloat(e.target.value),
                      })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="data">Data *</Label>
                  <Input
                    id="data"
                    type="date"
                    value={novoAgendamento.data || ""}
                    onChange={(e) =>
                      setNovoAgendamento({
                        ...novoAgendamento,
                        data: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="hora">Hora *</Label>
                  <Input
                    id="hora"
                    type="time"
                    value={novoAgendamento.hora || ""}
                    onChange={(e) =>
                      setNovoAgendamento({
                        ...novoAgendamento,
                        hora: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="descricao">Descrição do Serviço</Label>
                  <Textarea
                    id="descricao"
                    value={novoAgendamento.descricao || ""}
                    onChange={(e) =>
                      setNovoAgendamento({
                        ...novoAgendamento,
                        descricao: e.target.value,
                      })
                    }
                    placeholder="Descreva detalhes do serviço..."
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={adicionarAgendamento}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agendar Serviço
                </Button>
              </div>
              {(clientes.length === 0 || veiculos.length === 0) && (
                <p className="text-sm text-gray-500 text-center">
                  Cadastre pelo menos um cliente e um veículo antes de criar
                  agendamentos
                </p>
              )}
            </DialogContent>
          </Dialog>
          <Select value={filtroOperador} onValueChange={setFiltroOperador}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por operador" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os operadores</SelectItem>
              {operadores.map((operador) => (
                <SelectItem key={operador.id} value={operador.id}>
                  {operador.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Agendamentos</CardTitle>
          <CardDescription>
            {filtroOperador === "todos"
              ? "Todos os agendamentos da oficina"
              : `Agendamentos de ${getOperadorNome(filtroOperador)}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getAgendamentosFiltrados().map((agendamento) => (
              <div key={agendamento.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">
                        {getClienteNome(agendamento.clienteId)}
                      </h3>
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-gray-500 text-white text-xs">
                          {getOperadorIniciais(agendamento.operadorId)}
                        </AvatarFallback>
                      </Avatar>
                      <Badge
                        className={`${getStatusColor(
                          agendamento.status
                        )} text-white`}
                      >
                        {agendamento.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Veículo:</strong>{" "}
                      {getVeiculoInfo(agendamento.veiculoId)}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Serviço:</strong> {agendamento.servico}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Data/Hora:</strong> {agendamento.data} às{" "}
                      {agendamento.hora}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Operador:</strong>{" "}
                      {getOperadorNome(agendamento.operadorId)}
                    </p>
                    {agendamento.valor && (
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Valor:</strong> R${" "}
                        {agendamento.valor.toFixed(2)}
                      </p>
                    )}
                    {agendamento.descricao && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Descrição:</strong> {agendamento.descricao}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Select
                      value={agendamento.status}
                      onValueChange={(value: Agendamento["status"]) =>
                        atualizarStatusAgendamento(agendamento.id, value)
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agendado">Agendado</SelectItem>
                        <SelectItem value="em-andamento">
                          Em Andamento
                        </SelectItem>
                        <SelectItem value="concluido">Concluído</SelectItem>
                        <SelectItem value="cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
            {getAgendamentosFiltrados().length === 0 && (
              <p className="text-center text-gray-500 py-8">
                {filtroOperador === "todos"
                  ? "Nenhum agendamento encontrado"
                  : `Nenhum agendamento encontrado para ${getOperadorNome(
                      filtroOperador
                    )}`}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
