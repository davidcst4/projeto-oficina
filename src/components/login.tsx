import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wrench, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

interface LoginProps {
  onLogin: (usuario: string, senha: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrarMe, setLembrarMe] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Usuários válidos para demonstração
  const usuariosValidos = [
    { usuario: "joao@oficina.com", senha: "123456", nome: "João Silva" },
    { usuario: "maria@oficina.com", senha: "123456", nome: "Maria Santos" },
    { usuario: "carlos@oficina.com", senha: "123456", nome: "Carlos Oliveira" },
    { usuario: "admin", senha: "admin123", nome: "Administrador" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    // Simular delay de autenticação
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Validar campos obrigatórios
    if (!usuario || !senha) {
      setErro("Por favor, preencha todos os campos");
      setCarregando(false);
      return;
    }

    // Verificar credenciais
    const usuarioValido = usuariosValidos.find(
      (u) => u.usuario === usuario && u.senha === senha
    );

    if (usuarioValido) {
      // Salvar no localStorage se "Lembrar-me" estiver marcado
      if (lembrarMe) {
        localStorage.setItem("oficina_usuario", usuario);
      }

      onLogin(usuario, senha);
    } else {
      setErro("Usuário ou senha incorretos");
    }

    setCarregando(false);
  };

  const handleEsqueciSenha = () => {
    alert("Funcionalidade de recuperação de senha será implementada em breve!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Wrench className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Oficina
          </h1>
          <p className="text-gray-600">Faça login para acessar o sistema</p>
        </div>

        {/* Card de Login */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Digite suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo de Usuário/Email */}
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuário ou Email</Label>
                <Input
                  id="usuario"
                  type="text"
                  placeholder="Digite seu usuário ou email"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  disabled={carregando}
                  className="h-11"
                />
              </div>

              {/* Campo de Senha */}
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <div className="relative">
                  <Input
                    id="senha"
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    disabled={carregando}
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    disabled={carregando}
                  >
                    {mostrarSenha ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Opções */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lembrar"
                    checked={lembrarMe}
                    onCheckedChange={(checked) =>
                      setLembrarMe(checked as boolean)
                    }
                    disabled={carregando}
                  />
                  <Label htmlFor="lembrar" className="text-sm font-normal">
                    Lembrar-me
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="link"
                  className="px-0 font-normal text-sm"
                  onClick={handleEsqueciSenha}
                  disabled={carregando}
                >
                  Esqueci a senha
                </Button>
              </div>

              {/* Mensagem de Erro */}
              {erro && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{erro}</AlertDescription>
                </Alert>
              )}

              {/* Botão de Login */}
              <Button
                type="submit"
                className="w-full h-11"
                disabled={carregando}
              >
                {carregando ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Informações de Demonstração */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-800">
              Contas de Demonstração
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-2">
                Use uma das contas abaixo para testar:
              </p>
              <div className="space-y-1">
                <p>
                  <strong>Admin:</strong> admin / admin123
                </p>
                <p>
                  <strong>João:</strong> joao@oficina.com / 123456
                </p>
                <p>
                  <strong>Maria:</strong> maria@oficina.com / 123456
                </p>
                <p>
                  <strong>Carlos:</strong> carlos@oficina.com / 123456
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>&copy; 2024 Sistema de Oficina. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
