# 📍 Parei Aqui

Aplicativo PWA para voluntários registrarem locais de trabalho e compartilhar sua localização de forma rápida.

---

## 🚀 Recursos implementados

### 🗺️ Geolocalização & mapa
- Captura de posição atual via **Geolocation API**
- Mapas interativos com **Leaflet + React-Leaflet**
- Marcador + círculo de precisão (raio) no mapa
- Botão para “seguir” onde o mapa centraliza automaticamente conforme a posição atual (modo “seguir usuário”)

### 📍 Endereço e contexto
- Reverse geocoding (OpenStreetMap/Nominatim) para obter rua, bairro e cidade
- Exibição do endereço e precisão diretamente na interface

### 🔗 Compartilhamento
- Compartilha localização via **Web Share API**, com fallback para WhatsApp Web
- Copia as coordenadas para clipboard

### 🧠 Persistência local
- Armazenamento local (localStorage) para nome do usuário e histórico rápido (pode ser estendido)

### ✅ Extras técnicos
- PWA pronto para instalação (service worker + manifest via Vite)
- Sem backend: todos os dados ficam no dispositivo (LGPD-friendly)

---

## 🧰 Tecnologias
- React 19 (via Vite)
- Leaflet + React-Leaflet
- html2canvas (captura de tela)
- Web Share API
- ESLint (padrões de lint)

---

## ▶️ Como rodar localmente

```bash
npm install
npm run dev
```

Em seguida, acesse: `http://localhost:5173`

---

## 🧪 Build para produção

```bash
npm run build
```

---

## 🚢 Publicar no GitHub Pages (opcional)

1. Instale o pacote (se ainda não estiver):
   ```bash
   npm install gh-pages --save-dev
   ```
2. Adicione aos scripts do `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Execute:
   ```bash
   npm run deploy
   ```

---

## 📌 Dicas de próximos passos
- Salvar histórico de localizações (com timestamp) no indexedDB
- Adicionar filtros/favoritos de pontos salvos
- Melhorar UI de mapa com camadas (satélite, ruas, etc.)
- Adicionar testes de integração (Playwright / Cypress)

