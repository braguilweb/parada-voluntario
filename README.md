# 📍 Parada Voluntário

App PWA para registrar locais de trabalho voluntário. Desenvolvido como projeto de portfólio.

## 🛠️ Tecnologias
- React 18
- Vite
- Leaflet (mapas)
- html2canvas (captura de tela)
- Web Share API

## 📱 Funcionalidades
- Geolocalização precisa (5-10m)
- Identificação de rua e bairro
- Print do mapa com raio de 50m
- Compartilhamento WhatsApp/Copiar
- Histórico local (30 dias)
- PWA instalável

## 🔒 Privacidade
- Dados 100% no dispositivo
- Sem servidor externo
- Sem login obrigatório
- Conforme LGPD

## 🚀 Como rodar
```bash
npm install
npm run dev
📸 Screenshots
[Adicionar depois]
EOF

============================================
5. PRIMEIRO COMMIT (ENTREGA 1)
============================================
Veja o que mudou (vazio, pois acabamos de criar)
git status

Adicione tudo para "área de staging"
git add .

Crie o commit com mensagem descritiva
git commit -m "feat: estrutura inicial do projeto

Configuração Vite + React
Estrutura de pastas organizada
Git inicializado com .gitignore
README.md com documentação"
============================================
6. INSTALAR DEPENDÊNCIAS
============================================
npm install

============================================
7. VERIFICAR SE FUNCIONA
============================================
npm run dev

text

---

## **🔍 O que você acabou de fazer?**

| Comando | Para que serve |
|---------|---------------|
| `git init` | Cria repositório Git local |
| `git add .` | Prepara arquivos para commit |
| `git commit -m "..."` | Salva "foto" do estado atual |
| `mkdir -p` | Cria pastas (incluindo pais se não existirem) |
| `cat > arquivo` | Cria arquivo com conteúdo |

---

## **✅ CHECKLIST - Entrega 1**

Antes de continuar, verifique:
- [ ] `git log` mostra seu commit?
- [ ] `npm run dev` abre navegador em `http://localhost:5173`?
- [ ] Pastas `src/components/`, `src/hooks/`, etc existem?
- [ ] Arquivo `.gitignore` existe?

---

## **🐦 Subir no GitHub (remote)**

Quando quiser guardar na nuvem:

```bash
# 1. No GitHub.com, crie repositório VAZIO (sem README)

# 2. Conecte seu local ao remoto
git remote add origin https://github.com/SEU-USUARIO/parada-voluntario.git

# 3. Envie seu código
git branch -M main
git push -u origin main