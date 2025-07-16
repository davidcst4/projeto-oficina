import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Car, Users, Wrench, User } from "lucide-react";
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

interface DashboardProps {
  clientes: Cliente[];
  veiculos: Veiculo[];
  agendamentos: Agendamento[];
  operadores: Operador[];
  getClienteNome: (clienteId: string) => string;
  getVeiculoInfo: (veiculoId: string) => string;
  getOperadorNome: (operadorId: string) => string;
  getOperadorIniciais: (operadorId: string) => string;
  getStatusColor: (status: string) => string;
}

export function Dashboard({
  clientes,
  veiculos,
  agendamentos,
  operadores,
  getClienteNome,
  getVeiculoInfo,
  getOperadorNome,
  getOperadorIniciais,
  getStatusColor,
}: DashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Visão geral da sua oficina</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Clientes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Veículos
            </CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{veiculos.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agendamentos.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agendamentos.filter((a) => a.status === "em-andamento").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards por Operador */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {operadores.map((operador) => {
          const agendamentosOperador = agendamentos.filter(
            (a) => a.operadorId === operador.id
          );
          const emAndamento = agendamentosOperador.filter(
            (a) => a.status === "em-andamento"
          ).length;
          return (
            <Card key={operador.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-500 text-white text-xs">
                      {operador.iniciais}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-medium">
                      {operador.nome}
                    </CardTitle>
                    <p className="text-xs text-gray-500">Operador</p>
                  </div>
                </div>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {agendamentosOperador.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {emAndamento} em andamento
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximos Agendamentos</CardTitle>
          <CardDescription>Agendamentos para os próximos dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agendamentos.slice(0, 5).map((agendamento) => (
              <div
                key={agendamento.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">
                      {getClienteNome(agendamento.clienteId)}
                    </p>
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-gray-500 text-white text-xs">
                        {getOperadorIniciais(agendamento.operadorId)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="text-sm text-gray-600">
                    {getVeiculoInfo(agendamento.veiculoId)}
                  </p>
                  <p className="text-sm text-gray-600">{agendamento.servico}</p>
                  <p className="text-xs text-gray-500">
                    Operador: {getOperadorNome(agendamento.operadorId)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {agendamento.data} às {agendamento.hora}
                  </p>
                  <Badge
                    className={`${getStatusColor(
                      agendamento.status
                    )} text-white`}
                  >
                    {agendamento.status}
                  </Badge>
                </div>
              </div>
            ))}
            {agendamentos.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                Nenhum agendamento encontrado
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
