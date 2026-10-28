const FAMILLES = ["Toutes les pièces", "Vestes et gilets", "Robes", "Ensembles", "Jupes et pantalons", "Pièces uniques"];

const PIECES = [
  {
    id: "sankore",
    nom: "Surchemise Sankoré",
    famille: "Vestes et gilets",
    images: ["tombouctou-02", "tombouctou-01"],
    texte: "Une surchemise large aux poches plaquées, fermée par une rangée de boutons. Les surpiqûres claires dessinent la coupe sur le brun.",
    matiere: "Toile brune, surpiqûres contrastées",
    tailles: ["S", "M", "L", "XL"],
    statut: ""
  },
  {
    id: "fleuve",
    nom: "Ensemble Fleuve",
    famille: "Ensembles",
    images: ["pfw26-03", "pfw26-01", "ig-24"],
    texte: "Chemise corsetée à la taille et jupe ample imprimée de nuances de sable. La silhouette que Madina portait pour saluer à Paris.",
    matiere: "Chemise en toile cuivrée, jupe imprimée",
    tailles: ["XS", "S", "M", "L"],
    statut: ""
  },
  {
    id: "ahmed-baba",
    nom: "Gilet Ahmed Baba",
    famille: "Vestes et gilets",
    images: ["tombouctou-04"],
    texte: "Un gilet écru sans manches, souligné d’un passepoil camel qui court jusqu’aux poches. À porter sur une chemise ou à même la peau.",
    matiere: "Toile écrue, passepoil camel",
    tailles: ["S", "M", "L", "XL"],
    statut: ""
  },
  {
    id: "taoudeni",
    nom: "Jupe patchwork Taoudeni",
    famille: "Jupes et pantalons",
    images: ["tombouctou-06"],
    texte: "Une longue jupe assemblée de carrés de tissus, verts, bruns et ocres, fendue sur le côté d’une fermeture apparente.",
    matiere: "Patchwork de tissus choisis",
    tailles: ["XS", "S", "M", "L"],
    statut: ""
  },
  {
    id: "araouane",
    nom: "Boubou patchwork Araouane",
    famille: "Ensembles",
    images: ["tombouctou-07"],
    texte: "Le boubou revu en bandes et en carrés, ouvert sur le devant par une longue fermeture blanche. Une pièce d’allure, faite pour marcher.",
    matiere: "Patchwork de tissus, fermeture contrastée",
    tailles: ["M", "L", "XL"],
    statut: ""
  },
  {
    id: "sidi-yahia",
    nom: "Robe Sidi Yahia",
    famille: "Robes",
    images: ["tombouctou-08"],
    texte: "Une robe longue sans manches au col montant, qui s’évase en volants froncés à la cheville.",
    matiere: "Toile écrue",
    tailles: ["XS", "S", "M", "L"],
    statut: ""
  },
  {
    id: "banco",
    nom: "Jupe portefeuille Banco",
    famille: "Jupes et pantalons",
    images: ["ig-23", "ig-14"],
    texte: "Une jupe drapée en deux tons, croisée sur le devant comme un pan de tissu noué. Elle tombe longue et bouge à chaque pas.",
    matiere: "Toiles kaki et chocolat",
    tailles: ["XS", "S", "M", "L"],
    statut: ""
  },
  {
    id: "azalai",
    nom: "Manteau ceinturé Azalaï",
    famille: "Vestes et gilets",
    images: ["tombouctou-05"],
    texte: "Un manteau gris sable à capuche, serré par une ceinture à boucle et ponctué de grandes poches claires.",
    matiere: "Lainage gris, poches en toile",
    tailles: ["S", "M", "L"],
    statut: ""
  },
  {
    id: "bouctou",
    nom: "Robe Bouctou",
    famille: "Robes",
    images: ["tombouctou-20"],
    texte: "Du nom de la femme qui, selon la légende, gardait le puits autour duquel la ville est née. Une robe drapée sous un long voile de dentelle.",
    matiere: "Drapé sable, voile de dentelle",
    tailles: ["XS", "S", "M", "L"],
    statut: ""
  },
  {
    id: "niger",
    nom: "Gilet Niger",
    famille: "Vestes et gilets",
    images: ["tombouctou-12", "tombouctou-11"],
    texte: "Un plastron rouille à la texture tressée, asymétrique, porté sur une chemise claire. La couleur du fleuve au coucher.",
    matiere: "Matière tressée rouille",
    tailles: ["S", "M", "L"],
    statut: ""
  },
  {
    id: "erg",
    nom: "Robe tablier Erg",
    famille: "Robes",
    images: ["tombouctou-14", "tombouctou-13"],
    texte: "Une robe tablier dans un camouflage couleur désert, à poches plaquées et fermeture sur toute la longueur.",
    matiere: "Toile camouflage sable",
    tailles: ["XS", "S", "M", "L"],
    statut: ""
  },
  {
    id: "kabara",
    nom: "Manteau long Kabara",
    famille: "Vestes et gilets",
    images: ["tombouctou-09"],
    texte: "Un long manteau écru boutonné, porté ouvert sur la peau et un pantalon assorti. Kabara, c’est le port de Tombouctou sur le fleuve.",
    matiere: "Toile écrue",
    tailles: ["S", "M", "L", "XL"],
    statut: ""
  },
  {
    id: "dune",
    nom: "Robe croisée Dune",
    famille: "Robes",
    images: ["tombouctou-17"],
    texte: "Des bandes claires croisées sur un fourreau chocolat, sous un manteau long couleur sable.",
    matiere: "Jersey chocolat, bandes de toile",
    tailles: ["XS", "S", "M", "L"],
    statut: ""
  },
  {
    id: "wagadou",
    nom: "Tunique Wagadou",
    famille: "Ensembles",
    images: ["tombouctou-19", "tombouctou-18"],
    texte: "Une tunique au col officier bordée de galons, portée avec un pantalon droit. Wagadou, le nom ancien du pays soninké.",
    matiere: "Toile beige, galons",
    tailles: ["M", "L", "XL"],
    statut: ""
  },
  {
    id: "djoliba",
    nom: "Ensemble dentelle Djoliba",
    famille: "Ensembles",
    images: ["bamako-15", "bamako-16"],
    texte: "Robe sable à volants et grand foulard de dentelle, portée à Bamako pour le soir du défilé.",
    matiere: "Toile sable, dentelle",
    tailles: ["XS", "S", "M", "L"],
    statut: ""
  },
  {
    id: "nuit",
    nom: "Jupe Nuit",
    famille: "Jupes et pantalons",
    images: ["jupe-04", "ig-27", "jupe-08"],
    texte: "La nouvelle jupe noire de la maison, plissée sur le devant, pensée pour se porter longue sous un kimono.",
    matiere: "Toile noire",
    tailles: ["XS", "S", "M", "L"],
    statut: "Bientôt disponible"
  },
  {
    id: "kinshasa",
    nom: "Jupe Kinshasa",
    famille: "Jupes et pantalons",
    images: ["crocro-01", "crocro-04"],
    texte: "Une jupe fourreau en simili croco, créée pour un mariage au thème coloré et audacieux, portée avec un top à nouer.",
    matiere: "Simili croco rouge",
    tailles: ["XS", "S", "M"],
    statut: ""
  },
  {
    id: "olise",
    nom: "Maillot recousu",
    famille: "Pièces uniques",
    images: ["maillot-01", "maillot-06", "maillot-05"],
    texte: "Le maillot de l’équipe de France découpé puis recomposé avec de la soie et du bogolan malien. Une seule pièce existe.",
    matiere: "Maillot, soie, bogolan",
    tailles: ["Unique"],
    statut: "Pièce unique"
  }
];

const PASSAGES = Array.from({ length: 20 }, (_, i) => "tombouctou-" + String(i + 1).padStart(2, "0"));
