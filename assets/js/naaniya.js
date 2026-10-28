(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const img = n => `assets/img/${n}.jpg`;
  const CLE = "naaniya.selection";

  let selection = [];
  try { selection = JSON.parse(localStorage.getItem(CLE)) || []; } catch (e) { selection = []; }
  const sauver = () => { try { localStorage.setItem(CLE, JSON.stringify(selection)); } catch (e) {} };

  const annonce = $("[data-annonce]");
  let minuteur;
  const annoncer = txt => {
    annonce.textContent = txt;
    annonce.classList.add("est-visible");
    clearTimeout(minuteur);
    minuteur = setTimeout(() => annonce.classList.remove("est-visible"), 2600);
  };

  const piste = $("[data-piste]");
  piste.innerHTML = PASSAGES.map((n, i) => `
    <li class="passage">
      <img src="${img(n)}" alt="Passage ${i + 1} du défilé Tombouctou" loading="lazy" draggable="false">
      <span class="passage__numero">${i + 1}</span>
    </li>`).join("");

  $$("[data-defile]").forEach(b => b.addEventListener("click", () => {
    const pas = piste.querySelector(".passage").getBoundingClientRect().width + 12;
    piste.scrollBy({ left: Number(b.dataset.defile) * pas * 2, behavior: "smooth" });
  }));

  let tire = null;
  piste.addEventListener("pointerdown", e => {
    if (e.pointerType !== "mouse") return;
    tire = { x: e.clientX, g: piste.scrollLeft };
    piste.classList.add("est-tire");
  });
  window.addEventListener("pointermove", e => { if (tire) piste.scrollLeft = tire.g - (e.clientX - tire.x); });
  window.addEventListener("pointerup", () => { tire = null; piste.classList.remove("est-tire"); });

  const filtres = $("[data-filtres]");
  const grille = $("[data-grille]");
  let familleActive = FAMILLES[0];

  filtres.innerHTML = FAMILLES.map(f => `<button type="button" class="filtre" aria-pressed="${f === familleActive}">${f}</button>`).join("");
  filtres.addEventListener("click", e => {
    const b = e.target.closest(".filtre");
    if (!b) return;
    familleActive = b.textContent;
    $$(".filtre", filtres).forEach(x => x.setAttribute("aria-pressed", x === b));
    afficherGrille();
  });

  const afficherGrille = () => {
    const liste = familleActive === FAMILLES[0] ? PIECES : PIECES.filter(p => p.famille === familleActive);
    grille.innerHTML = liste.map((p, i) => `
      <li class="piece piece--${i % 6}">
        <button type="button" class="piece__bouton" data-piece="${p.id}" aria-label="Voir ${p.nom}">
          <span class="piece__cadre">
            <img class="piece__image" src="${img(p.images[0])}" alt="" loading="lazy">
            ${p.images[1] ? `<img class="piece__image piece__image--seconde" src="${img(p.images[1])}" alt="" loading="lazy">` : ""}
          </span>
          <span class="piece__etiquette">
            <span class="piece__nom">${p.nom}</span>
            <span class="piece__info">${p.statut || p.matiere}</span>
          </span>
        </button>
      </li>`).join("");
  };
  afficherGrille();

  const voile = $("[data-voile]");
  const fiche = $("[data-fiche]");
  const panneau = $("[data-selection]");
  let ouvert = null;
  let retour = null;

  const ouvrir = el => {
    if (ouvert) fermer(false);
    retour = document.activeElement;
    voile.hidden = false;
    el.hidden = false;
    requestAnimationFrame(() => { voile.classList.add("est-ouvert"); el.classList.add("est-ouvert"); });
    document.body.classList.add("sans-defilement");
    ouvert = el;
    $(".fermer", el).focus();
  };
  const fermer = (rendre = true) => {
    if (!ouvert) return;
    const el = ouvert;
    el.classList.remove("est-ouvert");
    voile.classList.remove("est-ouvert");
    setTimeout(() => { el.hidden = true; if (!ouvert) voile.hidden = true; }, 380);
    document.body.classList.remove("sans-defilement");
    ouvert = null;
    if (rendre && retour) retour.focus();
  };

  voile.addEventListener("click", () => fermer());
  $$("[data-fermer]").forEach(b => b.addEventListener("click", () => fermer()));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") fermer();
    if (e.key === "Tab" && ouvert) {
      const f = $$("button, a, input, [tabindex]:not([tabindex='-1'])", ouvert).filter(x => !x.disabled && x.offsetParent);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  let pieceCourante = null;
  const ouvrirFiche = id => {
    const p = PIECES.find(x => x.id === id);
    if (!p) return;
    pieceCourante = p;
    $("[data-fiche-images]").innerHTML = p.images.map((n, i) => `<img src="${img(n)}" alt="${p.nom}, vue ${i + 1}">`).join("");
    $("[data-fiche-famille]").textContent = p.famille;
    $("[data-fiche-nom]").textContent = p.nom;
    const st = $("[data-fiche-statut]");
    st.textContent = p.statut;
    st.hidden = !p.statut;
    $("[data-fiche-texte]").textContent = p.texte;
    $("[data-fiche-matiere]").textContent = p.matiere;
    $("[data-fiche-tailles]").innerHTML = p.tailles.map((t, i) => `
      <label class="taille"><input type="radio" name="taille" value="${t}" ${i === 0 && p.tailles.length === 1 ? "checked" : ""}><span>${t}</span></label>`).join("");
    ouvrir(fiche);
  };

  grille.addEventListener("click", e => {
    const b = e.target.closest("[data-piece]");
    if (b) ouvrirFiche(b.dataset.piece);
  });

  $("[data-ajouter]").addEventListener("click", () => {
    const choix = $("input[name='taille']:checked", fiche);
    if (!choix) {
      annoncer("Choisissez une taille pour ajouter cette pièce.");
      $(".tailles", fiche).classList.add("a-choisir");
      setTimeout(() => $(".tailles", fiche).classList.remove("a-choisir"), 900);
      return;
    }
    const deja = selection.find(x => x.id === pieceCourante.id && x.taille === choix.value);
    if (!deja) selection.push({ id: pieceCourante.id, taille: choix.value });
    sauver();
    majSelection();
    annoncer(deja ? "Cette pièce est déjà dans votre sélection." : `${pieceCourante.nom} ajoutée à votre sélection.`);
    fermer();
  });

  const liste = $("[data-selection-liste]");
  const majSelection = () => {
    $$("[data-compteur]").forEach(c => c.textContent = selection.length);
    $("[data-selection-vide]").hidden = selection.length > 0;
    $("[data-selection-pied]").hidden = selection.length === 0;
    liste.innerHTML = selection.map((s, i) => {
      const p = PIECES.find(x => x.id === s.id);
      if (!p) return "";
      return `<li class="ligne">
        <img src="${img(p.images[0])}" alt="">
        <div><p class="ligne__nom">${p.nom}</p><p class="ligne__taille">Taille ${s.taille}</p></div>
        <button type="button" class="ligne__retirer" data-retirer="${i}">Retirer</button>
      </li>`;
    }).join("");
  };
  liste.addEventListener("click", e => {
    const b = e.target.closest("[data-retirer]");
    if (!b) return;
    selection.splice(Number(b.dataset.retirer), 1);
    sauver();
    majSelection();
    annoncer("Pièce retirée de votre sélection.");
    if (!selection.length) $(".fermer", panneau).focus();
  });
  majSelection();

  $$("[data-ouvrir-selection]").forEach(b => b.addEventListener("click", () => ouvrir(panneau)));

  $("[data-envoyer]").addEventListener("click", async () => {
    const lignes = selection.map(s => `• ${PIECES.find(p => p.id === s.id).nom}, taille ${s.taille}`);
    const message = `Bonjour Madina, je souhaite recevoir le prix et le délai pour :\n${lignes.join("\n")}\nMerci !`;
    let copie = false;
    try { await navigator.clipboard.writeText(message); copie = true; } catch (e) {}
    annoncer(copie ? "Liste copiée. Collez la dans la conversation." : "Ouvrez la conversation et décrivez votre sélection.");
    window.open("https://ig.me/m/naaniya__", "_blank", "noopener");
  });

  const barre = $("#barre");
  const surveiller = () => barre.classList.toggle("est-pleine", window.scrollY > window.innerHeight * 0.6);
  window.addEventListener("scroll", surveiller, { passive: true });
  surveiller();

  requestAnimationFrame(() => document.body.classList.add("est-pret"));
})();
