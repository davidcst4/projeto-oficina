export const MOCK_CLIENTES = [
  {
    id: "1",
    nome: "Ana Silva Santos",
    telefone: "(11) 99876-5432",
    email: "ana.silva@email.com",
    endereco: "Rua das Flores, 123 - Vila Madalena, São Paulo - SP",
  },
  {
    id: "2",
    nome: "Carlos Eduardo Oliveira",
    telefone: "(11) 98765-4321",
    email: "carlos.oliveira@gmail.com",
    endereco: "Av. Paulista, 1500 - Bela Vista, São Paulo - SP",
  },
  {
    id: "3",
    nome: "Maria José da Costa",
    telefone: "(11) 97654-3210",
    email: "maria.costa@hotmail.com",
    endereco: "Rua Augusta, 789 - Consolação, São Paulo - SP",
  },
  {
    id: "4",
    nome: "João Pedro Ferreira",
    telefone: "(11) 96543-2109",
    email: "joao.ferreira@yahoo.com",
    endereco: "Rua Oscar Freire, 456 - Jardins, São Paulo - SP",
  },
  {
    id: "5",
    nome: "Fernanda Lima Souza",
    telefone: "(11) 95432-1098",
    email: "fernanda.lima@outlook.com",
    endereco: "Av. Faria Lima, 2000 - Itaim Bibi, São Paulo - SP",
  },
  {
    id: "6",
    nome: "Roberto Carlos Mendes",
    telefone: "(11) 94321-0987",
    email: "roberto.mendes@gmail.com",
    endereco: "Rua Haddock Lobo, 300 - Cerqueira César, São Paulo - SP",
  },
  {
    id: "7",
    nome: "Patricia Alves Rodrigues",
    telefone: "(11) 93210-9876",
    email: "patricia.alves@email.com",
    endereco: "Rua da Consolação, 1200 - Consolação, São Paulo - SP",
  },
  {
    id: "8",
    nome: "Marcos Antonio Silva",
    telefone: "(11) 92109-8765",
    email: "marcos.silva@hotmail.com",
    endereco: "Av. Rebouças, 800 - Pinheiros, São Paulo - SP",
  },
];

export const MOCK_VEICULOS = [
  {
    id: "1",
    clienteId: "1",
    marca: "Toyota",
    modelo: "Corolla",
    ano: "2020",
    placa: "ABC-1234",
    cor: "Prata",
  },
  {
    id: "2",
    clienteId: "1",
    marca: "Honda",
    modelo: "Civic",
    ano: "2019",
    placa: "DEF-5678",
    cor: "Branco",
  },
  {
    id: "3",
    clienteId: "2",
    marca: "Volkswagen",
    modelo: "Jetta",
    ano: "2021",
    placa: "GHI-9012",
    cor: "Preto",
  },
  {
    id: "4",
    clienteId: "3",
    marca: "Ford",
    modelo: "Focus",
    ano: "2018",
    placa: "JKL-3456",
    cor: "Azul",
  },
  {
    id: "5",
    clienteId: "4",
    marca: "Chevrolet",
    modelo: "Cruze",
    ano: "2022",
    placa: "MNO-7890",
    cor: "Vermelho",
  },
  {
    id: "6",
    clienteId: "5",
    marca: "Nissan",
    modelo: "Sentra",
    ano: "2020",
    placa: "PQR-1234",
    cor: "Cinza",
  },
  {
    id: "7",
    clienteId: "6",
    marca: "Hyundai",
    modelo: "Elantra",
    ano: "2021",
    placa: "STU-5678",
    cor: "Branco",
  },
  {
    id: "8",
    clienteId: "7",
    marca: "Renault",
    modelo: "Fluence",
    ano: "2019",
    placa: "VWX-9012",
    cor: "Prata",
  },
  {
    id: "9",
    clienteId: "8",
    marca: "Fiat",
    modelo: "Cronos",
    ano: "2023",
    placa: "YZA-3456",
    cor: "Azul",
  },
  {
    id: "10",
    clienteId: "2",
    marca: "BMW",
    modelo: "320i",
    ano: "2022",
    placa: "BCD-7890",
    cor: "Preto",
  },
];

export const MOCK_SERVICOS = [
  "Troca de óleo",
  "Revisão geral",
  "Alinhamento",
  "Balanceamento",
  "Freios",
  "Suspensão",
  "Motor",
  "Ar condicionado",
  "Troca de pneus",
  "Bateria",
  "Sistema elétrico",
  "Embreagem",
  "Câmbio",
  "Radiador",
  "Escapamento",
  "Filtros",
  "Velas de ignição",
  "Correia dentada",
  "Amortecedores",
  "Outros",
];

export const MOCK_AGENDAMENTOS = [
  {
    id: "1",
    clienteId: "1",
    veiculoId: "1",
    operadorId: "1",
    servico: "Troca de óleo",
    descricao: "Troca de óleo do motor e filtro",
    data: "2024-01-20",
    hora: "08:00",
    status: "agendado" as const,
    valor: 120.0,
  },
  {
    id: "2",
    clienteId: "2",
    veiculoId: "3",
    operadorId: "2",
    servico: "Revisão geral",
    descricao: "Revisão completa dos 20.000 km",
    data: "2024-01-20",
    hora: "09:30",
    status: "em-andamento" as const,
    valor: 450.0,
  },
  {
    id: "3",
    clienteId: "3",
    veiculoId: "4",
    operadorId: "1",
    servico: "Alinhamento",
    descricao: "Alinhamento e balanceamento das rodas",
    data: "2024-01-21",
    hora: "10:00",
    status: "agendado" as const,
    valor: 80.0,
  },
  {
    id: "4",
    clienteId: "4",
    veiculoId: "5",
    operadorId: "3",
    servico: "Freios",
    descricao: "Troca de pastilhas de freio dianteiras",
    data: "2024-01-21",
    hora: "14:00",
    status: "concluido" as const,
    valor: 280.0,
  },
  {
    id: "5",
    clienteId: "5",
    veiculoId: "6",
    operadorId: "2",
    servico: "Ar condicionado",
    descricao: "Limpeza do sistema e recarga de gás",
    data: "2024-01-22",
    hora: "08:30",
    status: "agendado" as const,
    valor: 150.0,
  },
  {
    id: "6",
    clienteId: "6",
    veiculoId: "7",
    operadorId: "1",
    servico: "Suspensão",
    descricao: "Troca de amortecedores traseiros",
    data: "2024-01-22",
    hora: "13:00",
    status: "em-andamento" as const,
    valor: 320.0,
  },
  {
    id: "7",
    clienteId: "7",
    veiculoId: "8",
    operadorId: "3",
    servico: "Motor",
    descricao: "Diagnóstico de ruído no motor",
    data: "2024-01-23",
    hora: "09:00",
    status: "agendado" as const,
    valor: 200.0,
  },
  {
    id: "8",
    clienteId: "8",
    veiculoId: "9",
    operadorId: "2",
    servico: "Troca de pneus",
    descricao: "Troca dos 4 pneus - pneus fornecidos pelo cliente",
    data: "2024-01-23",
    hora: "15:30",
    status: "agendado" as const,
    valor: 60.0,
  },
  {
    id: "9",
    clienteId: "1",
    veiculoId: "2",
    operadorId: "1",
    servico: "Bateria",
    descricao: "Troca de bateria - bateria com defeito",
    data: "2024-01-24",
    hora: "10:30",
    status: "concluido" as const,
    valor: 180.0,
  },
  {
    id: "10",
    clienteId: "2",
    veiculoId: "10",
    operadorId: "3",
    servico: "Sistema elétrico",
    descricao: "Reparo no sistema de iluminação",
    data: "2024-01-24",
    hora: "16:00",
    status: "cancelado" as const,
    valor: 150.0,
  },
  {
    id: "11",
    clienteId: "3",
    veiculoId: "4",
    operadorId: "2",
    servico: "Embreagem",
    descricao: "Regulagem da embreagem - pedal muito alto",
    data: "2024-01-25",
    hora: "08:00",
    status: "agendado" as const,
    valor: 120.0,
  },
  {
    id: "12",
    clienteId: "4",
    veiculoId: "5",
    operadorId: "1",
    servico: "Filtros",
    descricao: "Troca de filtro de ar e filtro de combustível",
    data: "2024-01-25",
    hora: "11:00",
    status: "em-andamento" as const,
    valor: 90.0,
  },
];

export const MOCK_ORDENS_SERVICO = [
  {
    id: "1",
    agendamentoId: "4",
    clienteId: "4",
    veiculoId: "5",
    operadorId: "3",
    servico: "Freios",
    descricao: "Troca de pastilhas de freio dianteiras",
    dataInicio: "2024-01-21",
    dataConclusao: "2024-01-21",
    pecasUtilizadas: [
      {
        nome: "Pastilha de freio dianteira",
        quantidade: 1,
        valorUnitario: 120.0,
      },
      {
        nome: "Fluido de freio DOT 4",
        quantidade: 1,
        valorUnitario: 25.0,
      },
    ],
    maoDeObra: 135.0,
    valorTotal: 280.0,
    observacoes:
      "Cliente orientado sobre prazo de garantia das peças (6 meses)",
    status: "entregue" as const,
  },
  {
    id: "2",
    agendamentoId: "9",
    clienteId: "1",
    veiculoId: "2",
    operadorId: "1",
    servico: "Bateria",
    descricao: "Troca de bateria - bateria com defeito",
    dataInicio: "2024-01-24",
    dataConclusao: "2024-01-24",
    pecasUtilizadas: [
      {
        nome: "Bateria 60Ah",
        quantidade: 1,
        valorUnitario: 150.0,
      },
    ],
    maoDeObra: 30.0,
    valorTotal: 180.0,
    observacoes:
      "Bateria antiga descartada adequadamente. Garantia de 18 meses.",
    status: "concluida" as const,
  },
];

// Função para obter dados mock com delay (simula API)
export const getMockData = async (delay = 500) => {
  await new Promise((resolve) => setTimeout(resolve, delay));

  return {
    clientes: MOCK_CLIENTES,
    veiculos: MOCK_VEICULOS,
    servicos: MOCK_SERVICOS,
    agendamentos: MOCK_AGENDAMENTOS,
    ordensServico: MOCK_ORDENS_SERVICO,
  };
};

// Função para gerar IDs únicos
export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Função para formatar data brasileira
export const formatDateBR = (date: string) => {
  return new Date(date + "T00:00:00").toLocaleDateString("pt-BR");
};

// Função para formatar moeda brasileira
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Função para gerar cor aleatória para status
export const getRandomStatusColor = () => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-indigo-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
