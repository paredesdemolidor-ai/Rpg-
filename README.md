# Mundo de Grimórios (protótipo mobile)

RPG de mundo aberto de sobrevivência em HTML5 + Three.js. Roda no navegador do celular, sem Roblox.

## Como publicar no GitHub
1. Crie um repositório e envie `index.html`, `style.css`, `game.js`, `grimorio.js`, `espiritos.js`, `racas.js`, `economia.js`, `monstros.js`, `mar.js`, `visuais.js`, `menu.js`, `interface.js`, `multi.js`, `multisync.js` e este `README.md`.
2. Em Settings > Pages, escolha a branch `main` e a pasta `/ (root)`.
3. Abra o link gerado no celular (precisa de internet para carregar o Three.js).

## Controles
- Celular: joystick à esquerda, arraste a tela para olhar, botões à direita. Em Configurações, "Mover controles na tela".
- Teclado: WASD, Shift correr, Espaço pular, E agir, F atacar, Q magia, T titã, I inventário.
- Gamepad: stick esquerdo move, direito olha, A pula, X age, RB ataca, B magia, Y titã. A interface touch some ao usar o controle e volta ao tocar na tela.
- Código de desenvolvedor: `ARK-DEV-777` (em Configurações).

## Já incluído
Menu com 3 slots (nome e hora), criação de personagem, modo leve, 3ª pessoa, ciclo dia/noite com sol, lua, estrelas e nuvens, chuva, fome, sede, frio, doenças, fôlego e natação, ferimentos por parte do corpo e sangramento, quedas, armaduras com requisitos, inventário e craft, treino por afinidade, NPCs com funções e falas masculinas/femininas, vila, lobos e animais com comportamento, reputação e prisão, magia que cria crateras, transformação em Titã, minimapa, morte permanente com espera de 2 horas.

## Ainda por fazer
Multiplayer em rede local e voz por proximidade, grimórios e bênçãos únicas, espíritos e guardiões, raças com mecânicas próprias, maldições, cavernas, tradução de vozes, animações e modelos mais ricos.

## Grimórios e bênçãos
- Casa roxa na vila: Biblioteca Ancestral. Use Agir para tentar ser escolhido (a cada 3 dias). Níveis 1 a 4; o 5 e o 6 ainda não existem.
- Cada uso cria experiência; o grimório escreve páginas novas: Chuva flamejante, Metralhadora de fogo, Chama do inferno. Escolha a magia no painel Grimório.
- Bênçãos únicas surgem ao amanhecer, com pouca chance. Cada uma só existe uma vez no mundo e volta a ficar livre quando o dono morre.
- Ao morrer, o grimório fica no seu corpo (esfera roxa). Outro jogador pode pegá-lo, mas só usa se tiver afinidade mágica suficiente (nível x 4).

## Espíritos e guardiões
- Três espíritos elementais (fogo, vento, água) vagam pela terra e o Leviatã nada no mar. Chegando perto, há uma chance pequena de pacto (ajuste `PACT` no início de `espiritos.js`, `racas.js`, `economia.js`, `monstros.js`, `mar.js`, `visuais.js`, `menu.js`, `interface.js`, `multi.js`, `multisync.js`).
- Elementais pedem afinidade mágica 2; o Leviatã pede afinidade de natação 3. Reputação ruim bloqueia o pacto.
- Com o pacto, o botão Espírito (tecla V, LB no controle) usa o poder, com recarga de 30 s. O poder cresce com a afinidade mágica.
- Cada espírito é único no mundo e fica livre de novo se o dono morrer.

## Raças
- Humano: começa com 10 moedas a mais.
- Elfo: nasce na vila élfica (oeste), regenera mana mais rápido.
- Semi-humano coelho: corre mais e pula mais alto. Serpente: nada rápido e se recupera mais rápido de doenças, mas sofre mais com o frio da noite.
- Demônio: nasce no inferno (noroeste), mais forte e imune ao frio, sofre na água. Só sai depois de abrir o portão (5 Pedra, 3 Pele, afinidade mágica 2). Fora do inferno, guardas tentam prendê-lo.
- Anjo: nasce no paraíso (nuvem alta a sudeste), plana ao cair e voa segurando Pular, gastando estamina.
- Demônios e semi-humanos sofrem preconceito: aldeões podem se recusar a atender.

## Economia e vida da vila
- Ferreiro, mercador, alfaiate, arqueira e fazendeira: use Agir para abrir a loja. Os preços variam a cada dia e com a reputação (boa reputação dá desconto, má reputação encarece). Também dá para vender materiais.
- Cada loja tem a opção Trabalhar (gasta estamina, rende moedas).
- Alfaiate vende roupas, incluindo a Capa real (com coroa) e o Manto dourado (ombreiras exageradas).
- Os NPCs têm rotina: trabalham de dia, vão à praça no fim da tarde e dormem em casa à noite. As lojas fecham das 21h às 6h.
- Botão Construir: gasta 20 Madeira e 10 Pedra e levanta uma casa à sua frente. As casas ficam salvas no slot.

## Monstros e chefes
- Acampamento de goblins a leste-sul (90, -80): atacam em grupo e renascem depois de 2 minutos.
- Golem de pedra (60, 130) e Dragão Ancião (140, 20, na montanha): chefes únicos. Quando morrem, não voltam mais neste mundo.
- O dragão cospe bolas de fogo e usa a cauda. O golem dá pancadas fortes de perto. Há barra de vida do chefe no topo da tela.
- Os materiais deles viram itens únicos em Inventário > Criar: Espada de escama, Maça do golem e Armadura de escamas. O ferreiro também compra os materiais.

## Mar e subsolo
- Botão Mergulhar (barra do jogo): permite afundar até o fundo do mar. O fôlego dura 20 s. Use Pular para subir. A tela fica azulada debaixo d'água.
- Duas ruínas submersas a oeste, cada uma com um baú de tesouro (único no mundo) e dois tritões. Os tritões vendem o Tridente e compram pérolas.
- Entrada da caverna em terra, ao sul (20, 150): use Agir no portal escuro. Dentro há veios de minério, cristais raros e goblins. Precisa de picareta para minerar. A saída fica na parede oeste.
- Novas receitas: Armadura de ferro (6 Minério, 2 Pele) e Armadura de mithril (3 Cristal, 8 Minério).

## Visuais
- Grama ao redor do jogador que balança com o vento (mais forte na chuva), com flores em manchas de cor.
- Árvores variadas: pinheiros, carvalhos (alguns em tons de outono) e bétulas. Arbustos pelo mapa e juncos nas margens.
- Vida: borboletas e pássaros de dia, vaga-lumes à noite, mar que muda de cor entre dia e noite, sombras mais suaves.
- O modo leve reduz a grama e desliga borboletas, pássaros e vaga-lumes.

## Menu e sons
- Tela inicial com a vila ao fundo: Jogar (escolha de slot), Continuar (último save), Configurações, Como jogar e Sobre.
- Configurações de som: volume geral, música, efeitos e ambiente, cada um com seu controle, e o botão Testar sons.
- A música é gerada no próprio aparelho e muda conforme o momento: calma de dia, mais grave à noite, tensa com chefes ou vida baixa, sombria na caverna.
- Ambiente: vento, chuva, pássaros de dia, grilos à noite, água e passos.
- Todas as configurações (e a posição dos botões na tela) ficam salvas no aparelho.

## Entrada, mapa e HUD
- Tela de entrada animada antes do menu. Botões com animação ao tocar.
- Toque no minimapa (ou tecla M) para abrir o mapa completo. Só aparece o que você já explorou; o resto fica escuro. Sua posição é a setinha amarela, que também aparece no minimapa. Locais descobertos (caverna, ruínas, vilas) ganham nome.
- Configurações > Personalizar HUD: tamanho, opacidade, espessura das barras, cor de destaque, mostrar ou esconder cada elemento e mover elementos arrastando.

## Multiplayer em rede local
Funciona sem servidor, trocando dois códigos entre os aparelhos (WebRTC). Ambos na mesma rede Wi-Fi e dentro do jogo.
1. Anfitrião: botão Online > Gerar convite > copiar e enviar o código ao amigo.
2. Convidado: Online > colar o convite > Gerar resposta > copiar e enviar de volta.
3. Anfitrião: colar a resposta > Conectar jogador. Repita os passos para cada amigo.
- Os jogadores se veem, aparecem no mapa e no minimapa, e o horário e o clima são os do anfitrião. Os NPCs seguem o anfitrião.
- Chat de texto (botão Chat) e voz por proximidade (Online > Microfone): você ouve quem está até 40 m de distância, com volume que cai com a distância. Se tiver problema de conexão, ative o microfone antes de gerar o convite.
- Monstros, goblins e os chefes (Golem e Dragão) são simulados pelo anfitrião e aparecem para todos. Eles escolhem o jogador mais próximo, e o dano que um jogador causa vale para todos. O loot é cooperativo: quando um monstro morre, todos recebem os itens.
- As casas construídas por qualquer jogador aparecem para todos.
- Ainda não são compartilhados: animais, itens soltos, baús e minério. Cada jogador mantém seu próprio personagem e save.

## Raça e altura
- Não há mais escolha de raça nem de altura: tudo é sorteado ao nascer. Humano é o mais comum. Elfo, semi-humanos, anjo, demônio e Titã são mais raros, nessa ordem aproximada.
- A altura depende da raça. O Titã é gigante, muito forte e rápido, come mais e causa medo nos aldeões.
- Você ainda escolhe nome, cor da pele e cor do cabelo.

## HUD
- Na tela ficam só Agir, Atacar e Pular (e Magia, depois que um grimório te escolher; e Espírito, depois de um pacto).
- Correr é automático: empurre o joystick até a ponta.
- O botão Menu (abaixo do minimapa) abre tudo o mais: Mapa, Inventário, Corpo, Afinidades, Grimório, Espíritos, Construir, Mergulhar, Online, Chat e Pausa.

## Gerar o APK (pelo GitHub, sem computador)
1. No repositório, envie os arquivos do jogo e também `package.json` e `capacitor.config.json` (na raiz).
2. Crie o arquivo `.github/workflows/build-apk.yml` (Add file > Create new file, digite esse caminho exato) e cole o conteúdo de `build-apk.yml`.
3. Abra a aba Actions, escolha "Gerar APK" e toque em Run workflow (ele também roda sozinho a cada envio). Leva uns 5 a 10 minutos.
4. Baixe o APK em Releases ("APK mais recente") ou, na execução, em Artifacts. Instale no celular permitindo "fontes desconhecidas".
- O APK leva o Three.js dentro dele, então roda sem internet. O jogo abre em tela cheia, deitado.
- É um APK de teste (debug). Para publicar na Play Store seria preciso assinar o app, o que pode ser feito depois.
