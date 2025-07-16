import { useState } from "react";
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
import { Plus, Edit, Trash2, FileText, Printer, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

interface OrdensServicoProps {
  ordensServico: OrdemServico[];
  setOrdensServico: (ordens: OrdemServico[]) => void;
  clientes: Cliente[];
  veiculos: Veiculo[];
  operadores: Operador[];
  getClienteNome: (clienteId: string) => string;
  getVeiculoInfo: (veiculoId: string) => string;
  getOperadorNome: (operadorId: string) => string;
}

export function OrdensServico({
  ordensServico,
  setOrdensServico,
  clientes,
  veiculos,
  operadores,
  getClienteNome,
  getVeiculoInfo,
  getOperadorNome,
}: OrdensServicoProps) {
  const [editandoOrdem, setEditandoOrdem] = useState<OrdemServico | null>(null);
  const [visualizandoOrdem, setVisualizandoOrdem] =
    useState<OrdemServico | null>(null);
  const [novaPeca, setNovaPeca] = useState({
    nome: "",
    quantidade: 1,
    valorUnitario: 0,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em-andamento":
        return "bg-yellow-500";
      case "concluida":
        return "bg-green-500";
      case "entregue":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "em-andamento":
        return "Em Andamento";
      case "concluida":
        return "Concluída";
      case "entregue":
        return "Entregue";
      default:
        return status;
    }
  };

  const calcularValorTotal = (ordem: OrdemServico) => {
    const valorPecas = ordem.pecasUtilizadas.reduce(
      (total, peca) => total + peca.quantidade * peca.valorUnitario,
      0
    );
    return valorPecas + ordem.maoDeObra;
  };

  const atualizarStatusOrdem = (id: string, status: OrdemServico["status"]) => {
    setOrdensServico(
      ordensServico.map((ordem) =>
        ordem.id === id
          ? { ...ordem, status, valorTotal: calcularValorTotal(ordem) }
          : ordem
      )
    );
  };

  const adicionarPeca = () => {
    if (
      editandoOrdem &&
      novaPeca.nome &&
      novaPeca.quantidade > 0 &&
      novaPeca.valorUnitario >= 0
    ) {
      const ordemAtualizada = {
        ...editandoOrdem,
        pecasUtilizadas: [...editandoOrdem.pecasUtilizadas, { ...novaPeca }],
      };
      ordemAtualizada.valorTotal = calcularValorTotal(ordemAtualizada);
      setEditandoOrdem(ordemAtualizada);
      setNovaPeca({ nome: "", quantidade: 1, valorUnitario: 0 });
    }
  };

  const removerPeca = (index: number) => {
    if (editandoOrdem) {
      const ordemAtualizada = {
        ...editandoOrdem,
        pecasUtilizadas: editandoOrdem.pecasUtilizadas.filter(
          (_, i) => i !== index
        ),
      };
      ordemAtualizada.valorTotal = calcularValorTotal(ordemAtualizada);
      setEditandoOrdem(ordemAtualizada);
    }
  };

  const salvarOrdem = () => {
    if (editandoOrdem) {
      editandoOrdem.valorTotal = calcularValorTotal(editandoOrdem);
      setOrdensServico(
        ordensServico.map((ordem) =>
          ordem.id === editandoOrdem.id ? editandoOrdem : ordem
        )
      );
      setEditandoOrdem(null);
    }
  };

  const imprimirOrdem = (ordem: OrdemServico) => {
    // Simular impressão - em um app real, você geraria um PDF
    const conteudo = `
      ORDEM DE SERVIÇO #${ordem.id}
      
      Cliente: ${getClienteNome(ordem.clienteId)}
      Veículo: ${getVeiculoInfo(ordem.veiculoId)}
      Operador: ${getOperadorNome(ordem.operadorId)}
      
      Serviço: ${ordem.servico}
      Data Início: ${ordem.dataInicio}
      Data Conclusão: ${ordem.dataConclusao}
      
      Peças Utilizadas:
      ${ordem.pecasUtilizadas
        .map(
          (peca) =>
            `- ${peca.nome}: ${
              peca.quantidade
            }x R$ ${peca.valorUnitario.toFixed(2)}`
        )
        .join("\n")}
      
      Mão de Obra: R$ ${ordem.maoDeObra.toFixed(2)}
      Valor Total: R$ ${ordem.valorTotal.toFixed(2)}
      
      Observações: ${ordem.observacoes}
    `;

    const novaJanela = window.open("", "_blank");
    if (novaJanela) {
      novaJanela.document.write(`<pre>${conteudo}</pre>`);
      novaJanela.document.close();
      novaJanela.print();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Ordens de Serviço
          </h2>
          <p className="text-gray-600">
            Gerencie todas as ordens de serviço geradas
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ordens</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ordensServico.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ordensServico.filter((o) => o.status === "em-andamento").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ordensServico.filter((o) => o.status === "concluida").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R${" "}
              {ordensServico
                .reduce((total, ordem) => total + ordem.valorTotal, 0)
                .toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Ordens de Serviço</CardTitle>
          <CardDescription>Gerencie todas as ordens de serviço</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ordensServico.map((ordem) => (
              <div key={ordem.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">OS #{ordem.id}</h3>
                      <Badge
                        className={`${getStatusColor(ordem.status)} text-white`}
                      >
                        {getStatusLabel(ordem.status)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p>
                          <strong>Cliente:</strong>{" "}
                          {getClienteNome(ordem.clienteId)}
                        </p>
                        <p>
                          <strong>Veículo:</strong>{" "}
                          {getVeiculoInfo(ordem.veiculoId)}
                        </p>
                        <p>
                          <strong>Serviço:</strong> {ordem.servico}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Operador:</strong>{" "}
                          {getOperadorNome(ordem.operadorId)}
                        </p>
                        <p>
                          <strong>Data Início:</strong> {ordem.dataInicio}
                        </p>
                        <p>
                          <strong>Data Conclusão:</strong> {ordem.dataConclusao}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <strong>Peças:</strong> {ordem.pecasUtilizadas.length}{" "}
                        item(s)
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        <strong>
                          Valor Total: R$ {ordem.valorTotal.toFixed(2)}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Select
                      value={ordem.status}
                      onValueChange={(value: OrdemServico["status"]) =>
                        atualizarStatusOrdem(ordem.id, value)
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="em-andamento">
                          Em Andamento
                        </SelectItem>
                        <SelectItem value="concluida">Concluída</SelectItem>
                        <SelectItem value="entregue">Entregue</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setVisualizandoOrdem(ordem)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditandoOrdem(ordem)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => imprimirOrdem(ordem)}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {ordensServico.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                Nenhuma ordem de serviço encontrada. As ordens são geradas
                automaticamente quando um agendamento é marcado como concluído.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Visualização */}
      <Dialog
        open={!!visualizandoOrdem}
        onOpenChange={() => setVisualizandoOrdem(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ordem de Serviço #{visualizandoOrdem?.id}</DialogTitle>
            <DialogDescription>
              Detalhes completos da ordem de serviço
            </DialogDescription>
          </DialogHeader>
          {visualizandoOrdem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cliente</Label>
                  <p className="text-sm">
                    {getClienteNome(visualizandoOrdem.clienteId)}
                  </p>
                </div>
                <div>
                  <Label>Veículo</Label>
                  <p className="text-sm">
                    {getVeiculoInfo(visualizandoOrdem.veiculoId)}
                  </p>
                </div>
                <div>
                  <Label>Operador</Label>
                  <p className="text-sm">
                    {getOperadorNome(visualizandoOrdem.operadorId)}
                  </p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge
                    className={`${getStatusColor(
                      visualizandoOrdem.status
                    )} text-white`}
                  >
                    {getStatusLabel(visualizandoOrdem.status)}
                  </Badge>
                </div>
              </div>
              <div>
                <Label>Serviço Realizado</Label>
                <p className="text-sm">{visualizandoOrdem.servico}</p>
              </div>
              <div>
                <Label>Descrição</Label>
                <p className="text-sm">{visualizandoOrdem.descricao}</p>
              </div>
              <div>
                <Label>Peças Utilizadas</Label>
                <div className="space-y-2">
                  {visualizandoOrdem.pecasUtilizadas.map((peca, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm border-b pb-1"
                    >
                      <span>{peca.nome}</span>
                      <span>
                        {peca.quantidade}x R$ {peca.valorUnitario.toFixed(2)} =
                        R$ {(peca.quantidade * peca.valorUnitario).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Mão de Obra</Label>
                  <p className="text-sm">
                    R$ {visualizandoOrdem.maoDeObra.toFixed(2)}
                  </p>
                </div>
                <div>
                  <Label>Valor Total</Label>
                  <p className="text-lg font-bold text-green-600">
                    R$ {visualizandoOrdem.valorTotal.toFixed(2)}
                  </p>
                </div>
              </div>
              {visualizandoOrdem.observacoes && (
                <div>
                  <Label>Observações</Label>
                  <p className="text-sm">{visualizandoOrdem.observacoes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Edição */}
      <Dialog
        open={!!editandoOrdem}
        onOpenChange={() => setEditandoOrdem(null)}
      >
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Editar Ordem de Serviço #{editandoOrdem?.id}
            </DialogTitle>
            <DialogDescription>
              Atualize os detalhes da ordem de serviço
            </DialogDescription>
          </DialogHeader>
          {editandoOrdem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mao-obra">Mão de Obra (R$)</Label>
                  <Input
                    id="mao-obra"
                    type="number"
                    value={editandoOrdem.maoDeObra}
                    onChange={(e) =>
                      setEditandoOrdem({
                        ...editandoOrdem,
                        maoDeObra: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="data-conclusao">Data Conclusão</Label>
                  <Input
                    id="data-conclusao"
                    type="date"
                    value={editandoOrdem.dataConclusao}
                    onChange={(e) =>
                      setEditandoOrdem({
                        ...editandoOrdem,
                        dataConclusao: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Peças Utilizadas</Label>
                <div className="space-y-2 mb-4">
                  {editandoOrdem.pecasUtilizadas.map((peca, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <span className="text-sm">
                        {peca.nome} - {peca.quantidade}x R${" "}
                        {peca.valorUnitario.toFixed(2)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removerPeca(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <Input
                    placeholder="Nome da peça"
                    value={novaPeca.nome}
                    onChange={(e) =>
                      setNovaPeca({ ...novaPeca, nome: e.target.value })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Qtd"
                    value={novaPeca.quantidade}
                    onChange={(e) =>
                      setNovaPeca({
                        ...novaPeca,
                        quantidade: Number.parseInt(e.target.value) || 1,
                      })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Valor unit."
                    value={novaPeca.valorUnitario}
                    onChange={(e) =>
                      setNovaPeca({
                        ...novaPeca,
                        valorUnitario: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                  <Button onClick={adicionarPeca}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={editandoOrdem.observacoes}
                  onChange={(e) =>
                    setEditandoOrdem({
                      ...editandoOrdem,
                      observacoes: e.target.value,
                    })
                  }
                  placeholder="Observações adicionais..."
                />
              </div>

              <div className="text-right">
                <p className="text-lg font-bold">
                  Valor Total: R$ {calcularValorTotal(editandoOrdem).toFixed(2)}
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setEditandoOrdem(null)}
                >
                  Cancelar
                </Button>
                <Button onClick={salvarOrdem}>Salvar Alterações</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
