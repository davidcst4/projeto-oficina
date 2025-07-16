# Projeto - Gerenciador de Agendamento de Oficina

# Introdução

## Objetivo do Documento

Este documento tem como objetivo fornecer uma visão geral do projeto, incluindo sua descrição, público alvo, informações do projeto e requisitos.

## Público Alvo

O público-alvo deste projeto inclui:

- Usuários finais: Atendentes, Mecânicos, Gerentes de Oficina.
- Desenvolvedores: Equipe de desenvolvimento.
- Proprietário da empresa: Dono da oficina.

# Informações do Projeto

## Visão Geral

O projeto tem como objetivo criar um sistema de gerenciamento de agendamento de oficina. Ele permitirá que os usuários criem, editem e excluam agendamentos, clientes, veículos e serviços.

## Benefícios

- Gerenciamento eficiente de agendamentos de oficina.
- Controle de clientes, veículos, serviços e funcionários.
- Melhoria na organização e eficiência operacional.

## Escopo

Inclui cadastro de clientes, veículos, serviços e funcionários, controle agendamentos, relatórios e estatísticas.

## Limitações

- Não inclui funcionalidades de pagamento ou faturamento.
- Não contempla a gestão de estoque de peças e materiais.
- Sem acesso offline.

## Cronograma

- **Data de Início**: 14/07/2025
- **Data de Término**: A definir

# Requisitos

## Requisitos Funcionais

- RF01 - O sistema deve permitir a criação, edição e exclusão de agendamentos de oficina.
- RF02 - O sistema deve permitir a criação, edição e exclusão de clientes.
- RF03 - O sistema deve permitir a criação, edição e exclusão de veículos associados a clientes.
- RF04 - O sistema deve permitir a criação, edição e exclusão de serviços oferecidos pela oficina.
- RF05 - O sistema deve permitir a criação, edição e exclusão de funcionários da oficina.

## Requisitos Não Funcionais

- RNF01 - O sistema deve ser acessível por meio de um navegador da web.
- RNF02 - O sistema deve ser responsivo e funcionar em dispositivos móveis.
- RNF03 - O sistema deve ser seguro e proteger as informações dos clientes e funcionários.
- RNF04 - O sistema deve ser escalável para atender a um grande número de usuários.
- RNF05 - O sistema deve ser compatível com diferentes navegadores da web.

## Regras de Negócio

- RN01 - Cada agendamento deve estar associado a um cliente, veículo e serviço.
- RN02 - Cada cliente deve ter um ou mais veículos associados.
- RN03 - Cada funcionário deve estar associado a uma função na oficina.
- RN04 - Cada serviço deve ter um preço associado.
- RN05 - Cada agendamento deve ter uma data e hora associada.
- RN06 - Cada agendamento deve ter um status associado (pendente, confirmado, cancelado).
- RN07 - Cada agendamento deve ter um funcionário associado.
- RN08 - Um agendamento não pode ser criado se o cliente, veículo ou serviço não existirem.
- RN09 - Um agendamento não pode ser feito se o horário escolhido estiver ocupado.

## Matriz de Rastreabilidade

| Requisito Funcional | Descrição                                              | Regra de Negócio                   |
| ------------------- | ------------------------------------------------------ | ---------------------------------- |
| RF01                | Criar, editar e excluir agendamentos de oficina        | RN01, RN05, RN06, RN07, RN08, RN09 |
| RF02                | Criar, editar e excluir clientes                       | RN02, RN08                         |
| RF03                | Criar, editar e excluir veículos associados a clientes | RN02, RN08                         |
| RF04                | Criar, editar e excluir serviços                       | RN04, RN08                         |
| RF05                | Criar, editar e excluir funcionários                   | RN03, RN07                         |

# Modelagem de Classes

## Diagrama de Classes de Domínio

Inclue as classes:

- Cliente
- Veículo
- Serviço
- Funcionário
- Agendamento

## Diagrama de Objetos

```
+----------------+          +----------------+           +----------------+
|    Cliente     |<>--------|    Veículo     |           |    Serviço     |
+----------------+          +----------------+           +----------------+
| - id           |          | - id           |           | - id           |
| - nome         |          | - placa        |           | - nome         |
| - cnpj_cpf     |          | - marca        |           | - descrição    |
| - telefone     |          | - modelo       |           | - preço        |
| - email        |          | - cor          |           +----------------+
+----------------+          | - ano          |
                            | - cliente_id   |
                            +----------------+
                                    |
                                    |
                                    v
                           +-------------------+       +---------------------+
                           |    Agendamento    |<------|     Funcionário     |
                           +-------------------+       +---------------------+
                           | - id              |       | - id                |
                           | - data            |       | - nome              |
                           | - hora            |       | - cargo             |
                           | - status          |       | - telefone          |
                           | - cliente_id      |       | - email             |
                           | - veiculo_id      |       +---------------------+
                           | - servico_id      |
                           | - funcionario_id  |
                           +-------------------+
```
