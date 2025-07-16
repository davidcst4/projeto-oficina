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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

interface VeiculosProps {
  clientes: Cliente[];
  veiculos: Veiculo[];
  novoVeiculo: Partial<Veiculo>;
  setNovoVeiculo: (veiculo: Partial<Veiculo>) => void;
  editandoVeiculo: Veiculo | null;
  setEditandoVeiculo: (veiculo: Veiculo | null) => void;
  adicionarVeiculo: () => void;
  editarVeiculo: (veiculo: Veiculo) => void;
  excluirVeiculo: (id: string) => void;
  getClienteNome: (clienteId: string) => string;
}

export function Veiculos({
  clientes,
  veiculos,
  novoVeiculo,
  setNovoVeiculo,
  editandoVeiculo,
  setEditandoVeiculo,
  adicionarVeiculo,
  editarVeiculo,
  excluirVeiculo,
  getClienteNome,
}: VeiculosProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Veículos</h2>
          <p className="text-gray-600">
            Gerencie todos os veículos cadastrados
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={clientes.length === 0}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Veículo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Veículo</DialogTitle>
              <DialogDescription>
                Adicione um novo veículo vinculado a um cliente
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <Label htmlFor="cliente-select">Cliente *</Label>
                <Select
                  value={novoVeiculo.clienteId || ""}
                  onValueChange={(value) =>
                    setNovoVeiculo({ ...novoVeiculo, clienteId: value })
                  }
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
                <Label htmlFor="marca">Marca *</Label>
                <Input
                  id="marca"
                  value={novoVeiculo.marca || ""}
                  onChange={(e) =>
                    setNovoVeiculo({ ...novoVeiculo, marca: e.target.value })
                  }
                  placeholder="Ex: Toyota, Honda, Ford"
                />
              </div>
              <div>
                <Label htmlFor="modelo">Modelo *</Label>
                <Input
                  id="modelo"
                  value={novoVeiculo.modelo || ""}
                  onChange={(e) =>
                    setNovoVeiculo({ ...novoVeiculo, modelo: e.target.value })
                  }
                  placeholder="Ex: Corolla, Civic, Focus"
                />
              </div>
              <div>
                <Label htmlFor="ano">Ano</Label>
                <Input
                  id="ano"
                  value={novoVeiculo.ano || ""}
                  onChange={(e) =>
                    setNovoVeiculo({ ...novoVeiculo, ano: e.target.value })
                  }
                  placeholder="Ex: 2020"
                />
              </div>
              <div>
                <Label htmlFor="placa">Placa *</Label>
                <Input
                  id="placa"
                  value={novoVeiculo.placa || ""}
                  onChange={(e) =>
                    setNovoVeiculo({ ...novoVeiculo, placa: e.target.value })
                  }
                  placeholder="Ex: ABC-1234"
                />
              </div>
              <div>
                <Label htmlFor="cor">Cor</Label>
                <Input
                  id="cor"
                  value={novoVeiculo.cor || ""}
                  onChange={(e) =>
                    setNovoVeiculo({ ...novoVeiculo, cor: e.target.value })
                  }
                  placeholder="Ex: Branco, Preto, Prata"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={adicionarVeiculo}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Veículo
              </Button>
            </div>
            {clientes.length === 0 && (
              <p className="text-sm text-gray-500 text-center">
                Cadastre pelo menos um cliente antes de adicionar veículos
              </p>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Veículos</CardTitle>
          <CardDescription>
            Gerencie todos os veículos cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {veiculos.map((veiculo) => (
              <div
                key={veiculo.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium">
                    {veiculo.marca} {veiculo.modelo}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Cliente: {getClienteNome(veiculo.clienteId)}
                  </p>
                  <div className="flex gap-4 text-sm text-gray-600 mt-1">
                    <span>Placa: {veiculo.placa}</span>
                    {veiculo.ano && <span>Ano: {veiculo.ano}</span>}
                    {veiculo.cor && <span>Cor: {veiculo.cor}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditandoVeiculo(veiculo)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Veículo</DialogTitle>
                        <DialogDescription>
                          Atualize as informações do veículo
                        </DialogDescription>
                      </DialogHeader>
                      {editandoVeiculo && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-marca">Marca</Label>
                            <Input
                              id="edit-marca"
                              value={editandoVeiculo.marca}
                              onChange={(e) =>
                                setEditandoVeiculo({
                                  ...editandoVeiculo,
                                  marca: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-modelo">Modelo</Label>
                            <Input
                              id="edit-modelo"
                              value={editandoVeiculo.modelo}
                              onChange={(e) =>
                                setEditandoVeiculo({
                                  ...editandoVeiculo,
                                  modelo: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-placa">Placa</Label>
                            <Input
                              id="edit-placa"
                              value={editandoVeiculo.placa}
                              onChange={(e) =>
                                setEditandoVeiculo({
                                  ...editandoVeiculo,
                                  placa: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-ano">Ano</Label>
                            <Input
                              id="edit-ano"
                              value={editandoVeiculo.ano}
                              onChange={(e) =>
                                setEditandoVeiculo({
                                  ...editandoVeiculo,
                                  ano: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-cor">Cor</Label>
                            <Input
                              id="edit-cor"
                              value={editandoVeiculo.cor}
                              onChange={(e) =>
                                setEditandoVeiculo({
                                  ...editandoVeiculo,
                                  cor: e.target.value,
                                })
                              }
                            />
                          </div>
                          <Button
                            onClick={() => editarVeiculo(editandoVeiculo)}
                          >
                            Salvar Alterações
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => excluirVeiculo(veiculo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {veiculos.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                Nenhum veículo cadastrado
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
