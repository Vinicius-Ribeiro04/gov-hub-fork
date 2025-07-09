
## Registrando um Dataset (Tabela)

1. Vá até **`Data` → `Datasets`**.  
2. Clique no botão **`+ Dataset`** no canto superior direito.  
3. Na janela que abrir:

    - Escolha o banco de dados conectado.
    - Selecione o **Schema**.
    - Escolha a **Tabela** que deseja analisar.

4. Clique em **`Add`** para registrar o dataset.


### Personalizando as colunas (opcional)

1. Após adicionar um dataset, clique nele na lista.
2. Clique em **`Edit Dataset`** (ícone de lápis).
3. Para cada coluna, você pode:

    - Marcar se é temporal (datas/horários).
    - Definir como filtrável.
    - Adicionar descrições ou expressões personalizadas.
    - Criar **métricas virtuais** (ex: `SUM(receita`).
    - Criar **colunas calculadas** (ex: `CAST(valor AS FLOAT)`).


## Criando gráficos (charts)

1. No menu **Datasets**, clique no nome do dataset que deseja visualizar.  
2. Isso abrirá o modo **Explore**, onde você pode criar gráficos com interface no-code.  
3. Na tela de Explore:

    - Selecione o tipo de visualização (ex: Bar Chart, Time Series, Pie, etc).
    - Defina a métrica (ex: soma de vendas).
    - Escolha dimensões e filtros (ex: por região, por produto).

4. Clique em **`Run`** para visualizar o gráfico.  
5. Quando estiver satisfeito, clique em **`Save`**:

    - Dê um nome ao gráfico.
    - Escolha adicionar a um dashboard existente ou criar um novo.