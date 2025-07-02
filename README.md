# CIVIS – Sistema de Gestão de Vistorias

![Build Status](https://github.com/bkauan099/G2_CONSTRUTORA/actions/workflows/main.yml/badge.svg)
## Sumário 

- [📌 Visão Geral](#-visão-geral)
- [🗂️ Mapa do Repositório](#️-mapa-do-repositório)
- [🚀 Como rodar o projeto localmente](#-como-rodar-o-projeto-localmente)
- [🧱 Stack Tecnológico](#-stack-tecnológico)
- [🧪 Status da Build](#-status-da-build)
- [📄 Anexo A – Licença de Uso](#-anexo-a--licença-de-uso)

## 📌 Visão Geral

O processo de vistoria de imóveis, quando feito manualmente, pode gerar atrasos, confusões e retrabalho entre construtoras, clientes e vistoriadores.  
O **CIVIS** resolve esse problema com uma plataforma digital web que centraliza e automatiza o processo de vistoria.  
O sistema permite o agendamento, execução, acompanhamento e validação de vistorias de forma prática, rápida e transparente.  
Utiliza tecnologias modernas como **React.js**, **Node.js (Express)** e banco de dados **PostgreSQL via Supabase**, com autenticação baseada em permissões.  
O sistema é acessado diretamente por navegadores, sem necessidade de instalação local.

---

## 🗂️ Mapa do Repositório


```

Sistema-de-Vistoria/ 

│ 

├── backend/                     →Backend da aplicação (Node.js + Express) 

│   ├── assets/                   → Recursos auxiliares (imagens, documentos, etc.) 

│   ├── controllers/             →Lógica de controle das rotas 

│   ├── models/                  →Modelos das entidades do banco de dados 

│   ├── relatorios/              → Geração e manipulação de relatórios 

│   ├── routes/                   → Definição das rotas da API 

│   ├── uploads/                → Pasta para arquivos enviados 

│   ├── .env                       → Variáveis de ambiente 

│   ├── app.js                    → Configuração principal do Express 

│   ├── db.js                      → Conexão com o banco de dados 

│   ├── enviarEmail.js       → Lógica para envio de e-mails 

│   └── server.js                → Ponto de entrada do backend 

│ 

├── docs-backend/            → Documentação do backend (pasta opcional) 

│ 

├── node_modules/           →Dependências do Node.js (gerado automaticamente) 

│ 

├── public/                         → Arquivos estáticos do frontend 

│ 

├── src/                                         → Código-fonte do frontend (React.js) 

│   ├── pages/                               → Páginas divididas por tipo de usuário 

│   │   ├── Cadastro/                     → Tela de cadastro 

│   │   ├── HomeAdm/                  → Página inicial do administrador 

│   │   ├── HomeCliente/               → Página inicial do cliente 

│   │   └── HomeVistoriador/         → Página inicial do vistoriador 

│   │       ├── CriarRelatorio/         → Etapa de criação de relatório 

│   │       ├── IniciarVistoria/          → Etapa de início da vistoria 

│   │       ├── ReagendarVistoria/  → Etapa para reagendamento 

│   │       └── RealizarVistoria/       → Etapa para realizar vistoria 

│   ├── VistoriaData/                      → Dados relacionados às vistorias 

│   ├── Inicial/                                 → Página inicial antes do login 

│   ├── Login/                                  → Página de login 

│   ├── utils/                                    → Funções utilitárias 

│   ├── App.jsx                                → Componente principal da aplicação React 

│   ├── index.jsx                              → Ponto de entrada do React 

│   ├── main.jsx                               → Arquivo de renderização 

│   ├── Home.jsx                             → Página inicial padrão 

│   ├── Home.css                            → Estilos globais da home 

│   ├── supabaseClient.js                → Conexão com Supabase 

│ 

├── .gitignore                                   → Arquivos/pastas ignorados pelo Git 

├── eslint.config.js                           → Configurações do ESLint 

├── index.html                                 → HTML base da aplicação React 

├── novo script.sql                          → Script SQL extra (opcional) 

├── package.json                            → Configurações e dependências do projeto 

├── package-lock.json                    → Versões exatas das dependências 

├── README.md                           →Arquivo de instruções e documentação 

└── script.sql                                  → Script para criação do banco de dados ````

---

## 🚀 Como rodar o projeto localmente

Requisitos:
- Node.js 18+
- Conta no [Supabase](https://supabase.com/) com base de dados PostgreSQL configurada
- Ferramentas como Git e terminal

### 1. Clone o repositório

```bash
git clone https://github.com/bkauan099/G2_CONSTRUTORA.git
cd G2_CONSTRUTORA/codigos/projeto/Sistema\ de\ Vistoria
````

### 2. Instale as dependências do frontend/backend

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` com as credenciais do seu projeto no Supabase:

```env
SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_KEY=your-public-anon-key
```

### 4. Inicie a aplicação
Inicie o frontend: 

No terminal, execute: 
```bash
npm run dev
```
O sistema estará acessível por padrão em `http://localhost:5432`

Inicie o backend: 

No terminal, navegue até a pasta do backend:  
```bash
cd backend  

Em seguida, execute: 

node server.js 


---

## 🧱 Stack Tecnológico

| Camada         | Tecnologia                |
| -------------- | ------------------------- |
| Frontend       | React.js + Vite           |
| Backend        | Node.js + Express.js      |
| Banco de Dados | PostgreSQL via Supabase   |
| Autenticação   | Supabase Auth + JWT       |
| Armazenamento  | Upload local (`/uploads`) |

---

## 🧪 Status da Build

> O sistema utiliza GitHub Actions para CI/CD.
> Verifique o status da última build acima através do badge.

---

## 📄 Anexo A – Licença de Uso

> A seguir encontra-se a Licença de Uso conforme exigido pela disciplina.

---

### **Anexo A – Licença de Uso**

@autor: [Bruno Kauan Rodrigues Silva, Ellen Cristina De Sousa Castro, Manoel Lucas Pacheco Junior, Mateus Dutra Vale, Paulo Eduardo Lima Rabelo]  

@contato: [bruno.kauan@discente.ufma.br, ellen.castro@discente.ufma.br, manoel.lucas@discente.ufma.br, rabelo.paulo@discente.ufma.br, mateus.dv@discente.ufma.br] 

@data última versão: [01/07/2025] 

@versão: 1.0 

@outros repositórios: [https://github.com/Mateus-dutravale; https://github.com/Ellen6185] 

@Agradecimentos: Universidade Federal do Maranhão (UFMA), Professor Doutor Thales Levi Azevedo Valente, e colegas de curso.  

Copyright/License 

Este material é resultado de um trabalho acadêmico para a disciplina PROJETO E DESENVOLVIMENTO DE SOFTWARE, sob a orientação do professor Dr. THALES LEVI AZEVEDO VALENTE, semestre letivo 2025.1, curso Engenharia da Computação, na Universidade Federal do Maranhão (UFMA). 

Todo o material sob esta licença é software livre: pode ser usado para fins acadêmicos e comerciais sem nenhum custo. Não há papelada, nem royalties, nem restrições de "copyleft" do tipo GNU. Ele é licenciado sob os termos da Licença MIT, conforme descrito abaixo, e, portanto, é compatível com a GPL e também se qualifica como software de código aberto. É de domínio público. Os detalhes legais estão abaixo. O espírito desta licença é que você é livre para usar este material para qualquer finalidade, sem nenhum custo. O único requisito é que, se você usá-los, nos dê crédito. 

Licenciado sob a Licença MIT. Permissão é concedida, gratuitamente, a qualquer pessoa que obtenha uma cópia deste software e dos arquivos de documentação associados (o "Software"), para lidar no Software sem restrição, incluindo sem limitação os direitos de usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender cópias do Software, e permitir pessoas a quem o Software é fornecido a fazê-lo, sujeito às seguintes condições: 

Este aviso de direitos autorais e este aviso de permissão devem ser incluídos em todas as cópias ou partes substanciais do Software. 

O SOFTWARE É FORNECIDO "COMO ESTÁ", SEM GARANTIA DE QUALQUER TIPO, EXPRESSA OU IMPLÍCITA, INCLUINDO MAS NÃO SE LIMITANDO ÀS GARANTIAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UM DETERMINADO FIM E NÃO INFRINGÊNCIA. EM NENHUM CASO OS AUTORES OU DETENTORES DE DIREITOS AUTORAIS SERÃO RESPONSÁVEIS POR QUALQUER RECLAMAÇÃO, DANOS OU OUTRA RESPONSABILIDADE, SEJA EM AÇÃO DE CONTRATO, TORT OU OUTRA FORMA, DECORRENTE DE, FORA DE OU EM CONEXÃO COM O SOFTWARE OU O USO OU OUTRAS NEGOCIAÇÕES NO SOFTWARE. 

Para mais informações sobre a Licença MIT: https://opensource.org/licenses/MIT 
