## Adicionando charts

1. Após salvar o gráfico, selecione **`Save and go to Dashboard`**.  
2. No dashboard, clique em **`Edit Dashboard`** (canto superior direito).  
3. Agora é possível:

    - Redimensionar os gráficos (arrastar as bordas).
    - Mover os gráficos pela grade.
    - Adicionar outros charts, markdowns e filtros.

4. Clique em **`Save`** para salvar o layout do dashboard.

## Filtros


##  Customizando a visualização do dashboard via URL

Você pode adicionar parâmetros à URL para alterar como o dashboard é exibido:

| Parâmetro | Opções         | Descrição |
|----------|----------------|-----------|
| `standalone` | 0 (default), 1, 2, 3 | Remove elementos da interface (ex: navegação, título) |
| `show_filters` | 0, 1 (default) | Oculta ou exibe a barra de filtros |
| `expand_filters` | 0, 1 | Controla se a barra de filtros aparece expandida |

Exemplo de URL:
```bash
http://localhost:8088/superset/dashboard/my-dashboard/?standalone=1&show_filters=0
```