// Iniciando o array de tarefas vazio, que armazenará todas as tarefas adicionadas
let tarefas = [];

// Selecionando os elementos do DOM (Document Object Model) e atribuindo-os a variáveis para facilitar o acesso no código
const inputNovaTarefa = document.getElementById('novaTarefa');
const adicionarBtn = document.getElementById('adicionarBtn');
const listaTarefas = document.getElementById('listaTarefas');

// Função responsável por adicionar uma nova tarefa à lista
function adicionarTarefa() {
    // Capturando o valor inserido no campo de input (campo de texto)
    const nomeTarefa = inputNovaTarefa.value.trim(); // trim() remove espaços em branco no início e no fim do texto

    // Verificando se o campo de input não está vazio
    if (nomeTarefa !== '') {
        // Criando um novo objeto para a tarefa com duas propriedades: 
        // 'nome' para o nome da tarefa e 'concluida' para marcar se a tarefa foi concluída ou não
        const novaTarefa = {
            nome: nomeTarefa,
            concluida: false
        };

        // Adicionando o novo objeto de tarefa ao array 'tarefas' usando o método 'push', que insere o elemento no final do array
        tarefas.push(novaTarefa);

        // Atualizando a interface do usuário para refletir a nova lista de tarefas
        renderizarTarefas();

        // Limpando o campo de input após a adição da tarefa
        inputNovaTarefa.value = '';
    }
}

// Função responsável por renderizar (exibir) as tarefas na lista visual
function renderizarTarefas() {
    // Limpa o conteúdo atual da lista no DOM para evitar duplicações ao renderizar
    listaTarefas.innerHTML = '';

    // Percorre o array 'tarefas' utilizando o método 'forEach', que executa uma função para cada item do array
    tarefas.forEach((tarefa, indice) => {
        // Cria um novo elemento 'li' (item de lista) para representar cada tarefa
        const li = document.createElement('li');

        // Define a classe do elemento 'li' com base na propriedade 'concluida' da tarefa
        // Se a tarefa estiver marcada como concluída, a classe 'completed' será adicionada, aplicando estilo de linha sobre o texto
        li.className = tarefa.concluida ? 'completed' : '';

        // Usa template strings para criar o conteúdo HTML do elemento 'li', incluindo um botão de marcação de conclusão
        // O índice da tarefa é passado como parâmetro para o botão de alternar conclusão
        li.innerHTML = `
            <span>${tarefa.nome}</span>
            <div>
                <button onclick="toggleConcluida(${indice})">✔</button>
                <button class="remove" onclick="removerTarefa(${indice})">✖</button>
            </div>
        `;

        // Adiciona o novo elemento 'li' ao final da lista de tarefas no DOM
        listaTarefas.appendChild(li);

    });
}

// Função responsável por alternar o estado de conclusão de uma tarefa
// Recebe o índice da tarefa como parâmetro para identificar qual tarefa deve ser alterada
function toggleConcluida(indice) {
    // Alterna o valor da propriedade 'concluida' da tarefa para o oposto do valor atual
    tarefas[indice].concluida = !tarefas[indice].concluida;
    
    // Re-renderiza a lista de tarefas para refletir a alteração no estado de conclusão
    renderizarTarefas();
}

// Função responsável por remover um tarefa da lista
function removerTarefa(indice) {
    // Remove a tarefa do array de tarefas usando o índice
    tarefas.splice(indice, 1)

    // Re-renderiza a lista de tarefas oara refletir a remoção
    renderizarTarefas()
}

// Adiciona um ouvinte de evento ao botão de adicionar, que chama a função 'adicionarTarefa' quando o botão é clicado
adicionarBtn.addEventListener('click', adicionarTarefa);

// Adiciona um ouvinte de evento ao campo de input, que chama a função 'adicionarTarefa' quando a tecla Enter é pressionada
inputNovaTarefa.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});