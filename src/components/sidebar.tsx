"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  Car,
  Users,
  Wrench,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface Operador {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  iniciais: string;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  operadorAtual: Operador;
  operadores: Operador[];
  trocarOperador: (operadorId: string) => void;
  abrirEdicaoPerfil: () => void;
  fazerLogoff: () => void;
}

const NavButton = ({
  icon: Icon,
  label,
  tabKey,
  tooltip,
  activeTab,
  setActiveTab,
  sidebarCollapsed,
}: {
  icon: any;
  label: string;
  tabKey: string;
  tooltip?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarCollapsed: boolean;
}) => {
  const isActive = activeTab === tabKey;
  const button = (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-blue-50 text-blue-700 border border-blue-200"
          : "text-gray-700 hover:bg-gray-50"
      } ${sidebarCollapsed ? "justify-center px-2" : ""}`}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!sidebarCollapsed && <span className="truncate">{label}</span>}
    </button>
  );

  if (sidebarCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="right">
            <p>{tooltip || label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
};

export function Sidebar({
  activeTab,
  setActiveTab,
  sidebarCollapsed,
  setSidebarCollapsed,
  operadorAtual,
  operadores,
  trocarOperador,
  abrirEdicaoPerfil,
  fazerLogoff,
}: SidebarProps) {
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-lg border-r border-gray-200 flex flex-col transition-all duration-300 z-50 ${
        sidebarCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!sidebarCollapsed && (
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">
              Sistema de Oficina
            </h1>
            <p className="text-xs text-gray-600 truncate">
              Gerencie sua oficina
            </p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="flex-shrink-0 h-8 w-8 p-0"
        >
          {sidebarCollapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <NavButton
            icon={Wrench}
            label="Dashboard"
            tabKey="dashboard"
            tooltip="Visão geral da oficina"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarCollapsed={sidebarCollapsed}
          />
          <NavButton
            icon={Users}
            label="Clientes"
            tabKey="clientes"
            tooltip="Gerenciar clientes"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarCollapsed={sidebarCollapsed}
          />
          <NavButton
            icon={Car}
            label="Veículos"
            tabKey="veiculos"
            tooltip="Gerenciar veículos"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarCollapsed={sidebarCollapsed}
          />
          <NavButton
            icon={Calendar}
            label="Agendamentos"
            tabKey="agendamentos"
            tooltip="Gerenciar agendamentos"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarCollapsed={sidebarCollapsed}
          />
          <NavButton
            icon={FileText}
            label="Ordens de Serviço"
            tabKey="ordens-servico"
            tooltip="Gerenciar ordens de serviço"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarCollapsed={sidebarCollapsed}
          />
        </div>
      </nav>

      {/* Profile */}
      <div className="p-4 border-t border-gray-200">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start p-3 h-auto ${
                sidebarCollapsed ? "px-2" : ""
              }`}
            >
              <div
                className={`flex items-center gap-3 w-full ${
                  sidebarCollapsed ? "justify-center" : ""
                }`}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt={operadorAtual.nome}
                  />
                  <AvatarFallback className="bg-blue-500 text-white text-xs">
                    {operadorAtual.iniciais}
                  </AvatarFallback>
                </Avatar>
                {!sidebarCollapsed && (
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {operadorAtual.nome}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {operadorAtual.email}
                    </p>
                  </div>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {operadorAtual.nome}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {operadorAtual.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Trocar Operador
            </DropdownMenuLabel>
            {operadores.map((operador) => (
              <DropdownMenuItem
                key={operador.id}
                onClick={() => trocarOperador(operador.id)}
                className={operador.id === operadorAtual.id ? "bg-blue-50" : ""}
              >
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarFallback className="bg-gray-500 text-white text-xs">
                    {operador.iniciais}
                  </AvatarFallback>
                </Avatar>
                <span>{operador.nome}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={abrirEdicaoPerfil}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Editar Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={fazerLogoff} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
