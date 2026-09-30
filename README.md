# Cartão de visita digital

Aplicativo de tela única feito com Expo e React Native para o desafio de cartão de visita digital. O perfil de Marina Costa e a foto são fictícios.

## Funcionalidades

- Foto circular, nome e bio inicialmente vazia.
- Edição da bio em modal com `TextInput`; **Salvar Bio** só fica disponível quando o texto muda.
- Switch de notificações com mensagens aleatórias em `Alert` a cada 5 segundos. Ativar exige tocar em **Salvar**; desligar interrompe as mensagens imediatamente.
- **Salvar** só fica disponível quando há alteração nas notificações e confirma com um toast na tela.
- Uma versão comentada do botão **Salvar** usa o `Alert` com a mensagem exata do enunciado. Ela está em `src/app/index.tsx`, logo abaixo do botão ativo, para troca rápida se exigida na avaliação.
- Área segura e rolagem para telas de tamanhos diferentes.

## Executar

```bash
npm install
npx expo start
```

Abra o projeto no Expo Go no Android ou use as opções exibidas no terminal para iOS e web.

## Verificar

```bash
npx expo lint
npx tsc --noEmit
```
