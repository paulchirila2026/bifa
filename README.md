# Bifa

Aplicație web pentru liste cu bifă, gândită ca înlocuitor pentru Microsoft To Do.
Funcționează pe Windows, Mac, iPhone și iPad, cu sincronizare printr-un repository GitHub privat.

© Paul Chirilă · realizat cu ajutorul Claude

---

## Funcții

Comportamentul urmează Microsoft To Do. Pe PC aspectul este cel al aplicației To Do pentru Windows, iar pe telefon cel al aplicațiilor iOS.

**Pe PC:**
- Bara „Adaugă o sarcină” jos în listă: Enter adaugă elementul și cursorul rămâne pregătit pentru următorul; în timpul scrierii apar butoanele pentru dată, repetare, sumă și kilometraj
- Fiecare element este un card separat, cu linii de caiet sub listă
- Bara laterală cu căutare, liste inteligente, liste și **grupuri de liste** (foldere pliabile)
- **Clic dreapta** pe un element: Ziua mea, Important, Finalizat, Scadent azi / mâine, Alege o dată, Mută în altă listă, Șterge (cu „Anulează” timp de 5 secunde)
- Clic dreapta pe o listă: Opțiuni, Mută în grup, Șterge; pe un grup: Redenumește, Șterge
- **Reordonare prin tragere** cu mouse-ul
- **Căutare** în toate listele (titlu, notă, pași), fără să conteze diacriticele
- Scurtături: **Ctrl+N** sau **N** = element nou, **Ctrl+F** = căutare, **Esc** = închide

**Pe telefon:**
- **Glisare** pe un element: spre dreapta = bifat, spre stânga = șters (cu „Anulează”)
- **Ținere apăsat ~0,4 s, apoi tragere** = schimbarea ordinii

**Pe toate dispozitivele:**
- **Statistici pe luni** pentru listele cu sume: grafic pe an, total, medie și plățile din fiecare lună
- **Export în Excel** (fișier CSV): o listă sau toate listele
- **Următoarea revizie** pentru listele cu kilometraj: se calculează din ultimul kilometraj și intervalul ales (implicit 15.000 km sau 12 luni); un clic o adaugă în Planificate
- **Poze atașate** la elemente (bonuri, facturi): se micșorează automat și se păstrează și în `bifa-date/poze`, ca să apară pe toate dispozitivele
- **Notificare „Versiune nouă disponibilă”** după fiecare actualizare a aplicației

- **Liste inteligente**: Ziua mea (se golește în fiecare noapte), Important (elementele cu steluță), Planificate, Toate
- **Tipuri de liste** la creare: Sarcini, Datorii și plăți, Cumpărături, Bagaj / checklist, Auto și întreținere, Listă simplă (fără bifă)
- Pictograme plate și 12 culori iOS pentru fiecare listă
- **Finalizatele rămân în lista lor**, într-o secțiune „Finalizate” pliabilă, ca în To Do
- **Detalii element**: pe PC într-un panou în dreapta, pe telefon într-o foaie; salvare automată
  - pași (sub-sarcini), cu contor „1 din 3” în listă
  - „Adaugă la Ziua mea”, steluță pentru Important
  - dată limită **opțională**: la activare devine automat azi; se alege doar ziua și luna, plus scurtăturile Azi / Mâine / Peste o săptămână
  - repetare: zilnic, săptămânal, lunar, anual (la bifare apare automat următoarea apariție)
  - sumă și kilometraj, după tipul listei; notă; mutare în altă listă; data creării
- Bara laterală se poate ascunde pe PC
- Sunet scurt la bifare (se poate opri din setări)
- Totaluri: rămas de plătit, plătit luna aceasta, cheltuit anul acesta, ultimul kilometraj
- „Începe din nou” pentru listele de cumpărături și bagaj
- **Personalizare**: mod Sistem / Luminos / Întunecat, fundal Neutru / Subtil / Colorat, culoare principală, afișarea sau ascunderea elementelor
- Funcționează și fără internet; backup manual (export/import)

Pictogramele provin din setul [Lucide](https://lucide.dev) (licență ISC), iar fontul folosit pe Windows și Android este [Inter](https://rsms.me/inter/) (licență OFL).

---

## Instalare (o singură dată)

### 1. Publicarea aplicației pe GitHub Pages

1. Pe GitHub se creează un repository nou, **public**, de exemplu `bifa`.
2. Se urcă toate fișierele din acest folder: **Add file → Upload files**, apoi **Commit changes**.
3. Din **Settings → Pages**, la „Branch” se alege `main` și folderul `/ (root)`, apoi **Save**.
4. După 1–2 minute aplicația devine disponibilă la adresa:
   `https://NUME-UTILIZATOR.github.io/bifa/`

Codul aplicației e public, dar nu conține nicio dată personală. Datele stau separat, în repository-ul privat de la pasul 2.

### 2. Repository-ul privat pentru date

1. Se creează un al doilea repository, **privat**, de exemplu `bifa-date`.
2. La creare se bifează **Add a README file**, ca repository-ul să nu fie gol.

Aplicația va salva aici un singur fișier, `liste.json`. GitHub păstrează fiecare versiune a lui, deci orice modificare poate fi recuperată din istoric (**History**).

### 3. Token-ul de acces

Token-ul este o cheie care permite aplicației să scrie doar în repository-ul de date.

1. Pe GitHub: poza de profil → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. **Token name**: `Bifa`.
3. **Expiration**: cea mai lungă durată disponibilă. La expirare se generează unul nou și se introduce din nou în aplicație.
4. **Repository access**: **Only select repositories** → `bifa-date`.
5. **Permissions → Repository permissions → Contents**: **Read and write**.
6. **Generate token**, apoi se copiază valoarea (începe cu `github_pat_`). GitHub o afișează o singură dată.

### 4. Instalarea pe dispozitive

**iPhone / iPad**
1. Adresa aplicației se deschide în **Safari**.
2. Butonul **Share** → **Add to Home Screen** → **Add**.
3. Aplicația se deschide de pe ecranul principal, pe tot ecranul.

**Windows / Mac (Edge sau Chrome)**
1. Se deschide adresa aplicației.
2. Meniul **⋯ → Apps → Install this site as an app** (Edge) sau iconița de instalare din bara de adrese (Chrome).

**Mac (Safari)**
1. Meniul **File → Add to Dock**.

### 5. Conectarea sincronizării

Pe fiecare dispozitiv, o singură dată:

1. **⚙ Setări** → se completează utilizatorul GitHub, numele repository-ului de date (`bifa-date`) și token-ul.
2. **Conectează**.

Indicatorul din colțul stânga-jos arată starea: verde pentru sincronizat, albastru pentru sincronizare în curs, portocaliu pentru offline, roșu pentru eroare.

---

## Cum funcționează sincronizarea

- Fiecare modificare se salvează imediat pe dispozitiv și se trimite în GitHub după aproximativ 2 secunde.
- La deschiderea aplicației și la fiecare 30 de secunde, cât timp e deschisă, se preiau modificările făcute pe alte dispozitive.
- Dacă același element e modificat pe două dispozitive, se păstrează varianta cea mai nouă.
- Fără internet, modificările se păstrează local și se trimit la reconectare.

## Actualizarea aplicației

Se urcă noul `index.html` în repository-ul `bifa`, peste cel vechi. Dispozitivele preiau versiunea nouă la următoarea deschidere. Datele nu sunt afectate.

## Fișiere

| Fișier | Rol |
|---|---|
| `index.html` | Aplicația propriu-zisă |
| `manifest.webmanifest` | Nume și iconiță pentru instalare |
| `sw.js` | Funcționarea fără internet |
| `version.json` | Versiunea publicată (pentru notificarea de actualizare) |
| `fonts/` | Fontul Inter (pe Windows și Android) |
| `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `favicon.png` | Iconițe |
