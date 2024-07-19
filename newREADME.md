
### Documentação do Sistema de Cardápio

---

#### Sumário
1. [Visão Geral do Projeto](#visao-geral-do-projeto)
2. [Instalação](#instalacao)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Detalhamento das Funcionalidades](#detalhamento-das-funcionalidades)
    - [Funções e Métodos](#funcoes-e-metodos)
5. [Uso do Sistema](#uso-do-sistema)
6. [Contribuindo](#Contribuindo)

---

<a name="visao-geral-do-projeto"></a>
### 1. Visão Geral do Projeto

O sistema web de cardápio permite que os clientes escolham produtos, visualizem o carrinho de compras, e enviem seus pedidos para o WhatsApp da hamburgueria. Ele é construído utilizando HTML, CSS, JavaScript e Tailwind CSS para o estilo.
---

<a name="instalacao"></a>
### 2. Instalação

1. **Clone o repositório:**
    ```sh
    git clone https://github.com/seu-usuario/cardapio.git
    cd cardapio
    ```

2. **Instale as dependências:**
    ```sh
    npm install
    ```

3. **Inicie o Tailwind CSS em modo watch:**
    ```sh
    npm run dev
    ```

---

<a name="estrutura-do-projeto"></a>
### 3. Estrutura do Projeto

```
cardapio/
│
├── index.html          # Arquivo HTML principal
├── styles/
│   ├── style.css       # Estilos principais
│   └── output.css      # Estilos gerados pelo Tailwind CSS
├── scripts/
│   └── script.js       # Lógica principal do JavaScript
└── package.json        # Arquivo de configuração do npm
```

---

<a name="detalhamento-das-funcionalidades"></a>
### 4. Detalhamento das Funcionalidades

#### Funções e Métodos

##### 4.1. `addToCart`

**Descrição:** Adiciona itens ao carrinho de compras.

**Métodos Utilizados:**
- `find()`: Localiza se o produto já existe no carrinho.
- `push()`: Adiciona um novo item ao carrinho se ele ainda não existe.

**Funcionamento:**
```javascript
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }

    updateCartModal();
}
```
Quando um item é adicionado, a função verifica se ele já existe no carrinho:
- Se existir (`existingItem`), incrementa a quantidade.
- Caso contrário, cria um novo objeto de item e adiciona ao carrinho com `push()`.

##### 4.2. `updateCartModal`

**Descrição:** Atualiza a visualização do carrinho no modal.

**Métodos Utilizados:**
- `forEach()`: Itera sobre os itens do carrinho para gerar o HTML correspondente.
- `innerHTML`: Define o conteúdo HTML dos elementos.

**Funcionamento:**
```javascript
function updateCartModal() {
    cartItemsContainers.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col');

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}<p/>
                <p> Qtd: ${item.quantity}<p/>
                <p class="font-medium mt-2 ">${item.price.toFixed(2)}<p/>
            </div>
            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>
        </div>
        `;

        total += item.price * item.quantity;
        totalItems += item.quantity;

        cartItemsContainers.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = totalItems;
}
```
Esta função limpa o conteúdo existente do modal e insere os itens do carrinho:
- Calcula o total do pedido e o total de itens.
- Atualiza os elementos do DOM com os valores calculados.

##### 4.3. `removerItemCart`

**Descrição:** Remove itens do carrinho.

**Métodos Utilizados:**
- `findIndex()`: Localiza a posição do item no array do carrinho.
- `splice()`: Remove o item do array se a quantidade for 1, caso contrário, decrementa a quantidade.

**Funcionamento:**
```javascript
function removerItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}
```
A função verifica a quantidade do item:
- Se a quantidade for maior que 1, apenas decrementa a quantidade.
- Se a quantidade for 1, remove o item do carrinho usando `splice()`.

##### 4.4. `checkoutBtn`

**Descrição:** Finaliza o pedido e envia um resumo via WhatsApp.

**Métodos Utilizados:**
- `reduce()`: Calcula o valor total do pedido.
- `map()`: Cria uma lista formatada dos itens do carrinho.

**Funcionamento:**
```javascript
checkoutBtn.addEventListener('click', function () {
    if (cart.length === 0) return;

    if (addressInputName.value === "") {
        addressWarm.classList.remove('hidden');
        addressInputName.classList.add('border-red-500');
        return;
    }

    let totalPedido = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const cartItems = cart.map((item) => {
        return (
            `*${item.name}*
Quantidade: (${item.quantity}) Preço: R$${item.price.toFixed(2)}
`
        );
    }).join("");

    const valorTotalPedido = `_Valor Total: R$${totalPedido.toFixed(2)}_
`;

    const dadosCliente = `Nome: ${addressInputName.value}
Rua: ${addressInputStreet.value}, ${addressInputNumber.value}
Complemento: ${addressInputAdditional.value}
Bairro: ${addressInputLocale.value}`;

    const message = encodeURIComponent(
        `*Resumo do Pedido*

${cartItems}
${valorTotalPedido}
${dadosCliente}`
    );
    const phone = "35999057566";

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

    cart = [];
    addressInputName.value = "";
    addressInputStreet.value = "";
    addressInputNumber.value = "";
    addressInputAdditional.value = "";
    addressInputLocale.value = "";
    cartModal.style.display = 'none';

    updateCartModal();
});
```
Esta função realiza as seguintes verificações e ações:
- Verifica se o carrinho está vazio ou se o nome do cliente foi preenchido.
- Calcula o valor total do pedido.
- Cria uma mensagem formatada com os itens do carrinho e dados do cliente.
- Abre o WhatsApp com a mensagem gerada.

---

<a name="uso-do-sistema"></a>
### 5. Uso do Sistema

1. **Visualizar Menu:**
    - Navegue pelo menu e veja os itens disponíveis.

2. **Adicionar Itens ao Carrinho:**
    - Clique no botão "Adicionar ao Carrinho" para incluir um item.

3. **Visualizar Carrinho:**
    - Clique no ícone do carrinho para abrir o modal e ver os itens adicionados.

4. **Remover Itens do Carrinho:**
    - No modal do carrinho, clique no botão "Remover" para retirar um item.

5. **Finalizar Pedido:**
    - Preencha os dados do cliente e clique em "Finalizar Pedido" para enviar o resumo via WhatsApp.



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

Para mais informações ou contribuições, por favor, consulte o repositório do projeto no GitHub.
