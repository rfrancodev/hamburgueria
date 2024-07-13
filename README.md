# Cardápio de Hamburgueria

Este projeto é um sistema web para gerenciar o cardápio de uma hamburgueria, permitindo que os clientes visualizem os itens disponíveis, adicionem itens ao carrinho e finalizem o pedido via WhatsApp.

## Visão Geral

O sistema web de cardápio permite que os clientes escolham produtos, visualizem o carrinho de compras, e enviem seus pedidos para o WhatsApp da hamburgueria. Ele é construído utilizando HTML, CSS, JavaScript e Tailwind CSS para o estilo.

## Funcionalidades

### Interface do Menu

- **Visualização de Produtos:** Exibe todos os itens disponíveis no cardápio com informações como nome, preço e botão para adicionar ao carrinho.
- **Adicionar ao Carrinho:** Permite ao usuário adicionar itens ao carrinho. Se o item já estiver no carrinho, a quantidade é incrementada.

### Carrinho de Compras

- **Abrir Carrinho:** Ao clicar no botão do carrinho, um modal é aberto exibindo todos os itens adicionados, suas quantidades e preços.
- **Remover Itens:** O usuário pode remover itens ou reduzir a quantidade de um item no carrinho.
- **Calcular Total:** O total do pedido é calculado automaticamente e exibido no modal do carrinho.

### Finalização de Pedido

- **Dados do Cliente:** O cliente deve preencher seus dados (nome, rua, número, complemento e bairro) antes de finalizar o pedido.
- **Enviar Pedido:** Ao finalizar, o pedido é enviado via WhatsApp para o número da hamburgueria, contendo todos os itens do carrinho e os dados do cliente.

### Verificação de Horário de Funcionamento

- **Indicação de Funcionamento:** O sistema verifica se a hamburgueria está aberta com base no horário atual e altera a cor de um indicador na interface.

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/username/cardapio.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd cardapio
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Inicie o Tailwind CSS para compilar os estilos:
    ```bash
    npm run dev
    ```

## Uso

- Abra o arquivo `index.html` no navegador.
- Navegue pelo menu e adicione itens ao carrinho.
- Clique no ícone do carrinho para visualizar e gerenciar os itens.
- Preencha seus dados e finalize o pedido para enviar via WhatsApp.

## Contribuindo

1. Fork o repositório.
2. Crie uma nova branch com sua feature:
    ```bash
    git checkout -b feature/nova-feature
    ```
3. Commit suas mudanças:
    ```bash
    git commit -m 'Adiciona nova feature'
    ```
4. Faça o push para a branch:
    ```bash
    git push origin feature/nova-feature
    ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais informações.