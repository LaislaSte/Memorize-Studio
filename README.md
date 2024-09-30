# Projeto Memorize Studio

**Memorize Studio** é um projeto de TCC focado no desenvolvimento de um site para auxiliar na memorização de conteúdos didáticos básicos.

## Rotas
### Públicas
- **Página Inicial:** Visão geral do conteúdo e funcionalidades.
- **Explorar:** Navegação e descoberta de novos conteúdos.
- **Registro/Login:** Criação e acesso à conta de usuário.

## Componentes
- **Componente de Postagem:** Exibe posts de conteúdo educativo.
- **Componente de Perfil:** Mostra informações do usuário e suas atividades.
- **Componente de Filtro:** Permite filtrar posts por categoria ou autor.
- **Componente de Revisão:** Função que permite aos usuários revisar conteúdos.

## Funcionalidades
- Cadastro e login de usuários.
- Criação, edição e exclusão de posts.
- Revisão e like de conteúdos.
- Filtragem por categorias.
- Integração com anúncios (Google Ads).
- Sistema de seguidores e feed personalizado.
  
## Limitações
- Atualmente, o sistema só permite até 3 categorias por post.
- Algumas funcionalidades ainda estão em fase de testes (ex.: notificações e chat).
- Implementações de segurança a serem realizadas, como a criação de novas instâncias de serviços do Firebase para atualizar as credenciais de acesso.

---

# Contribua para o Projeto

> ```bash
> tag: descrição
> ```
> 
> A **tag** deve indicar o tipo de alteração, seguindo as referências abaixo; a **descrição** deve ser uma mensagem simples que resuma as mudanças do PR.

### Tipos de Alterações (Tag)
- [ ] `feat`: Nova funcionalidade
- [ ] `fix`: Correção de bug
- [ ] `docs`: Atualização de documentação
- [ ] `refact`: Refatoração de código sem novas funcionalidades
- [ ] `perf`: Otimização de performance
- [ ] `test`: Criação ou alteração de testes
- [ ] `build`: Alterações no processo de build ou dependências
- [ ] `ci`: Alterações no pipeline de CI/CD
- [ ] `chore`: Outras mudanças que não afetam código-fonte ou testes
- [ ] `revert`: Reversão de mudanças anteriores

**Exemplo**: `fix/deleteaccount route: conserto de bug no botão delete`

## Tarefas: Frontend

### Concluídas
- [x] Corrigir links de redirecionamento em páginas de registro e login.
- [x] Corrigir estilo dos checkboxes.
- [x] Ajustar layout da biografia nos perfis de usuário.
- [x] Filtragem de posts por categoria.
- [x] Adicionar Google Ads ao layout.

### Não Concluídas
- [ ] Implementar notificações.
- [ ] Melhorar layout de postagens.

## Tarefas: Backend

### Concluídas
- [x] Função para atualizar perfil de usuário (foto, nome, bio).
- [x] Implementar função para criação e exclusão de posts.
- [x] Verificação de URL do storage.
- [x] Filtrar posts por categorias e usuários.
  
### Não Concluídas
- [ ] Implementar notificações de seguidores e curtidas.
- [ ] Criptografar tokens de usuários.

## Possíveis Implementações Futuras
- Sistema de notificações para revisões e novos seguidores.
- Chat entre usuários.
- Utilização de IA para categorizar posts automaticamente.

---

# Memorize Studio Project

**Memorize Studio** is a graduation project focused on developing a website to assist with memorizing basic educational content.

## Routes
### Public
- **Home Page:** Overview of content and features.
- **Explore:** Browse and discover new content.
- **Register/Login:** User account creation and access.

## Components
- **Post Component:** Displays educational content posts.
- **Profile Component:** Shows user information and activities.
- **Filter Component:** Allows filtering posts by category or author.
- **Review Component:** Lets users review content.

## Features
- User registration and login.
- Create, edit, and delete posts.
- Like and review content.
- Filter by categories.
- Google Ads integration.
- Follower system with personalized feed.

## Limitations
- Currently, only 3 categories can be selected per post.
- Some features are still in testing (e.g., notifications and chat).
- Security implementations to be carried out, such as creating new Firebase service instances to update access credentials.

---

# Contribute to the Project

> ```bash
> tag: description
> ```
> 
> The **tag** should indicate the type of change, following the references below, and the **description** should be a simple commit message summarizing the changes in the PR.

### Change Types (Tag)
- [ ] `feat`: New feature
- [ ] `fix`: Bug fix
- [ ] `docs`: Documentation update
- [ ] `refact`: Code refactor without new features
- [ ] `perf`: Performance optimization
- [ ] `test`: Test creation or modification
- [ ] `build`: Build process or dependency changes
- [ ] `ci`: CI/CD pipeline changes
- [ ] `chore`: Other changes that don't affect source or test files
- [ ] `revert`: Reverting previous commits

**Example**: `fix/deleteaccount route: bug fix on delete button`

## Tasks: Frontend

### Completed
- [x] Fix redirect links in register and login pages.
- [x] Fix checkboxes styles.
- [x] Adjust profile biography layout.
- [x] Filter posts by category.
- [x] Add Google Ads to the layout.

### Not Completed
- [ ] Implement notifications.
- [ ] Improve post layout.

## Tasks: Backend

### Completed
- [x] Function to update user profile (photo, name, bio).
- [x] Implement post creation and deletion functions.
- [x] Verify storage URL.
- [x] Filter posts by category and user.

### Not Completed
- [ ] Implement follower and like notifications.
- [ ] Encrypt user tokens.

## Future Implementations
- Notification system for reviews and new followers.
- User chat feature.
- AI-based automatic post categorization.
