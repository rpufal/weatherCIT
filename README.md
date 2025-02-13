# WeatherApp - CIT Test
Este é um aplicativo simples de previsão do tempo construído com React, TypeScript e a API do OpenWeatherMap.
Ao todo foram cerca de 6 horas para estudar, desenvolver e fazer o deploy do projeto. Ele está hospedado atualmente em https://weather-cit.vercel.app/ e pode ser visto em mobile ou browser desktop.

## Escolhas

Após uma breve pesquisa percebi que a melhor opção de API que não necessitasse inclusão de dados de pagamento foi a OpenWeatherMap. Apesar da documentação estar um pouco depreciada pela falta de suporte as versões mais antigas (versão 2.5 que foi utilizada neste projeto) a integração e obtenção de dados relevantes foi direta. Para estruturação visual do projeto foi utilizado como norte manter uma estilização simplificada e com base em aplicativos de previsão climática mobile. Para funcionar corretamente e não causar problemas com a integração da API um hook useDebouncer foi criado para que não houvesse concatenação de requests a medida que o usuário digitasse sua pesquisa.

## Como Rodar o Aplicativo

Instale as Dependências
Certifique-se de ter o Node.js instalado e clonado o repositório. Em seguida, instale as dependências do projeto:

```bash
npm install
npm run dev
```
O aplicativo estará disponível em uma porta como essa http://localhost:5173.
Não se esqueça de aceitar que ele tenha acesso a sua geolocalização através do browser, este recurso é essencial para o aplicativo.

## Estrutura de Pastas
A estrutura do projeto é organizada da seguinte maneira:

### hooks/
Esta pasta contém hooks personalizados que encapsulam a lógica para buscar dados de clima e previsão do tempo. A organização dos hooks em uma pasta dedicada melhora a reutilização e manutenção do código.

useWeatherData.ts: Hook para buscar dados climáticos atuais.
useForecastData.ts: Hook para buscar dados de previsão do tempo.
### api/
Nesta pasta, são definidos os métodos para interagir com a API do OpenWeatherMap. Manter a lógica de API separada facilita a troca ou atualização de APIs no futuro.

weather.ts: Arquivo contendo funções para buscar dados de clima e previsão do tempo da API.
### components/
Contém componentes reutilizáveis da interface do usuário. A separação dos componentes torna o código mais modular e fácil de entender.

WeatherCard.tsx: Componente que exibe os dados climáticos atuais.
ForecastTable.tsx: Componente que exibe a tabela de previsão do tempo.
ErrorMessage.tsx: Componente para exibir mensagens de erro.

## Melhorias Futuras
### Testes de Integração
Atualmente, o aplicativo não possui testes de integração que validem o fluxo geral e a interação entre componentes, APIs e ações do usuário. Introduzir tais testes garantirá que o aplicativo se comporte corretamente de ponta a ponta, simulando jornadas do usuário e verificando se os componentes funcionam juntos conforme esperado.

### Testes Unitários para API e Hooks
Testes unitários são essenciais para garantir a confiabilidade e correção do código das funções de API e hooks. Esses testes ajudam a identificar problemas de forma isolada e asseguram que cada função realize suas tarefas corretamente.

### Otimização de Performance com Lazy Loading
Para melhorar a performance, especialmente em aplicativos maiores, considerar o uso de lazy loading para componentes e recursos pode acelerar a renderização inicial e reduzir o tempo de carregamento da aplicação.
