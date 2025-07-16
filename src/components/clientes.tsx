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
import { Plus, Edit, Trash2, Phone, Mail } from "lucide-react";
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

interface ClientesProps {
  clientes: Cliente[];
  novoCliente: Partial<Cliente>;
  setNovoCliente: (cliente: Partial<Cliente>) => void;
  editandoCliente: Cliente | null;
  setEditandoCliente: (cliente: Cliente | null) => void;
  adicionarCliente: () => void;
  editarCliente: (cliente: Cliente) => void;
  excluirCliente: (id: string) => void;
  getVeiculosPorCliente: (clienteId: string) => Veiculo[];
}

export function Clientes({
  clientes,
  novoCliente,
  setNovoCliente,
  editandoCliente,
  setEditandoCliente,
  adicionarCliente,
  editarCliente,
  excluirCliente,
  getVeiculosPorCliente,
}: ClientesProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Clientes</h2>
          <p className="text-gray-600">Gerencie todos os clientes da oficina</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
              <DialogDescription>
                Adicione um novo cliente ao sistema
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={novoCliente.nome || ""}
                  onChange={(e) =>
                    setNovoCliente({ ...novoCliente, nome: e.target.value })
                  }
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  value={novoCliente.telefone || ""}
                  onChange={(e) =>
                    setNovoCliente({ ...novoCliente, telefone: e.target.value })
                  }
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={novoCliente.email || ""}
                  onChange={(e) =>
                    setNovoCliente({ ...novoCliente, email: e.target.value })
                  }
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={novoCliente.endereco || ""}
                  onChange={(e) =>
                    setNovoCliente({ ...novoCliente, endereco: e.target.value })
                  }
                  placeholder="Endereço completo"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={adicionarCliente}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Cliente
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>
            Gerencie todos os clientes cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientes.map((cliente) => (
              <div
                key={cliente.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{cliente.nome}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {cliente.telefone}
                    </span>
                    {cliente.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {cliente.email}
                      </span>
                    )}
                  </div>
                  {cliente.endereco && (
                    <p className="text-sm text-gray-600 mt-1">
                      {cliente.endereco}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Veículos: {getVeiculosPorCliente(cliente.id).length}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditandoCliente(cliente)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Cliente</DialogTitle>
                        <DialogDescription>
                          Atualize as informações do cliente
                        </DialogDescription>
                      </DialogHeader>
                      {editandoCliente && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-nome">Nome</Label>
                            <Input
                              id="edit-nome"
                              value={editandoCliente.nome}
                              onChange={(e) =>
                                setEditandoCliente({
                                  ...editandoCliente,
                                  nome: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-telefone">Telefone</Label>
                            <Input
                              id="edit-telefone"
                              value={editandoCliente.telefone}
                              onChange={(e) =>
                                setEditandoCliente({
                                  ...editandoCliente,
                                  telefone: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-email">Email</Label>
                            <Input
                              id="edit-email"
                              value={editandoCliente.email}
                              onChange={(e) =>
                                setEditandoCliente({
                                  ...editandoCliente,
                                  email: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-endereco">Endereço</Label>
                            <Input
                              id="edit-endereco"
                              value={editandoCliente.endereco}
                              onChange={(e) =>
                                setEditandoCliente({
                                  ...editandoCliente,
                                  endereco: e.target.value,
                                })
                              }
                            />
                          </div>
                          <Button
                            onClick={() => editarCliente(editandoCliente)}
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
                    onClick={() => excluirCliente(cliente.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {clientes.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                Nenhum cliente cadastrado
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
