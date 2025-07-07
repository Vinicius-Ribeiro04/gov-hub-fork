## Integração contínua (CI)

## Entrega contínua (CD)

Para a maioria das aplicações estamos usando imagens de containers públicos, porém para o caso do Airflow é necessário instalar algumas dependências para garantir que temos todas as bibliotecas necessárias para rodar das DAGs, para esse caso foi implementado um passo extra no CI do gitlab garantido que qualquer mudança no `Dockerfile` ou no `requirements.txt` gere uma versão nova da imagem do Airflow e publique a mesma no repositório público do gitlab.

O processo de atualização da imagem do Airflow ficou manual para garantir que o usuário que atualizou as dependências se responsabilize por subir a imagem nova e verificar que nada quebrou no processo de atualização.
