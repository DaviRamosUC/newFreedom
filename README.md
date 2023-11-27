# Freedom - Para Mulheres Empoderadas Alcançar sua Liberdade Financeira

## Descrição
Breve descrição do seu projeto, incluindo sua finalidade e funcionalidades.

## Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript para o backend.
- **Express**: Framework web para criar as APIs.
- **Firebase**: Usado para armazenar dados e gerenciar autenticação.
- **Docker**: Usado para containerizar os microserviços.
- **Jest**: Utilizado para testes automatizados.
- Outras tecnologias...

## Microserviços

### Microserviço de Autenticação
Descrição do microserviço de autenticação.

#### Endpoints
- `POST /auth/signup`: Cadastrar um novo usuário.
- `POST /auth/login`: Autenticar um usuário existente.
- Outros endpoints...

### Microserviço de Blog
Descrição do microserviço de blog.

#### Endpoints
- `POST /blog/posts`: Criar uma nova publicação.
- `GET /blog/posts`: Listar todas as publicações.
- `GET /blog/posts/:id`: Recuperar uma publicação específica.
- `PUT /blog/posts/:id`: Atualizar uma publicação.
- `DELETE /blog/posts/:id`: Deletar uma publicação.
- Outros endpoints...

### Microserviço de Marketplace
Descrição do microserviço de marketplace.

#### Endpoints
- `POST /marketplace/products`: Criar um novo produto/serviço.
- `GET /marketplace/products`: Listar todos os produtos/serviços.
- `GET /marketplace/products/:id`: Recuperar um produto/serviço específico.
- `PUT /marketplace/products/:id`: Atualizar um produto/serviço.
- `DELETE /marketplace/products/:id`: Deletar um produto/serviço.
- Outros endpoints...

## Como Executar

### Pré-requisitos
- Docker e Docker Compose.
- Node.js (caso queira executar fora do Docker).

### Instruções de Execução
1. Clone o repositório do projeto.
2. Navegue até a pasta do projeto e construa os containers com Docker Compose:
docker-compose up --build

## DDD

## Domínios e Subdomínios:

* Domínio Principal: Plataforma de Educação Financeira.
Subdomínios:
* Autenticação: Gerencia a identificação dos usuários.
Cursos: Lida com informações relacionadas a cursos, como inscrições, conteúdo e progresso.

* Blog: Gerenciamento de conteúdos e artigos relacionados à educação financeira.

* Marketplace: Plataforma para compra e venda de produtos ou serviços relacionados ao tema.

## Bounded Contexts:
Cada subdomínio tem seu próprio contexto delimitado, definindo claramente a fronteira e a interação entre diferentes modelos de domínio.

* AuthContext: Encapsula tudo relacionado à autenticação e identidade do usuário.
CourseContext: Lida com a criação, gestão e participação em cursos.
* BlogContext: Administração de posts, comentários e interações do usuário.

* MarketplaceContext: Funcionalidades relacionadas à transações comerciais.

## Entidades e Agregados:
#### Autenticação:
* Entidades: User, Role.
* Agregado: UserAggregate (User, Role).
* Cursos:
* Entidades: Course, Lesson, Enrollment.
* Agregados: CourseAggregate (Course, Lesson), EnrollmentAggregate (User, Course).
#### Blog:
* Entidades: Post, Comment.
* Agregados: PostAggregate (Post, Comment).
* Marketplace:
* Entidades: Product, Order.
* Agregados: OrderAggregate (Order, Product).

## Repositórios:
Cada agregado pode ter um repositório correspondente para lidar com a persistência de dados.

* AuthRepository: Gerencia a persistência dos dados de autenticação.
* CourseRepository: Armazena informações sobre cursos e lições.
* BlogRepository: Lida com a persistência de posts e comentários.
MarketplaceRepository: Gerencia dados de produtos e pedidos.

## Serviços de Domínio:
Serviços que contêm lógicas de negócios específicas que não pertencem naturalmente a uma entidade ou agregado.

* AuthService: Lógica relacionada à autenticação e autorização.
* CourseService: Serviços relacionados à gestão de cursos.
* BlogService: Serviços para gerenciamento de conteúdo de blog.
* MarketplaceService: Serviços para transações e gerenciamento de produtos.

## Integração entre Contextos Delimitados:
Definir como diferentes contextos delimitados se comunicam, seja por meio de chamadas de API, eventos de domínio ou outro mecanismo de integração.