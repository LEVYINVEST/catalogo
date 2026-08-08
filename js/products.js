// Catálogo organizado por seções (módulos). Cada seção tem um título e uma lista de produtos.
// Cada produto tem uma "category" usada nos filtros de busca da página (Perfumes, Skincare, Hidratantes, Cabelo).
// Para adicionar uma nova seção, copie um bloco { title: "...", products: [...] } inteiro.
const CATALOG = [
  {
    title: "Skincare One Prime Imports",
    products: [
      { name: "Celimax Pore + Dark Spot", price: "R$ 139,99", image: "images/d8181815-4de9-4e51-a0fd-530988d01f37.jpg", category: "Skincare" },
      { name: "Celimax Retinal Shot", price: "R$ 149,99", image: "images/d8181815-4de9-4e51-a0fd-530988d01f37.jpg", category: "Skincare" },
      { name: "Medicube Mask Noite", price: "R$ 169,99", image: "images/31024019-4a50-4eab-a77f-3c1443713f71.jpg", category: "Hidratantes" },
      { name: "Numbuzin No.9 Eye Cream", price: "R$ 185,00", image: "images/c0db730b-5061-4676-8fe2-ca7331709151.jpg", category: "Skincare" },
      { name: "Dr. Althea 345 Relief Cream", price: "R$ 210,00", image: "images/e202938a-2bae-43e9-b784-19f27cedc4fd.jpg", category: "Hidratantes" },
      { name: "Medicube PDRN Serum", price: "R$ 159,00", image: "images/18acf2d1-0c36-40fe-b1ba-d977421ca4b0.jpg", category: "Skincare" },
      { name: "Medicube Zero Pore Pad", price: "R$ 165,00", image: "images/cbb46bd7-9d26-4f78-9bec-0c5c7bfc5ff8.jpg", category: "Skincare" },
      { name: "Ampola Centella (SKIN1004)", price: "R$ 190,00", image: "images/22a9b0e1-05e4-42cf-b4c5-d5cd3b4c1148.jpg", category: "Hidratantes" },
      { name: "Medicube 60 Par Rosa", price: "R$ 194,99", image: "images/50dda873-29cc-4844-a6db-7bce573d64ed.jpg", category: "Skincare" },
      { name: "Medicube Vitamina C", price: "R$ 164,99", image: "images/1dbb24af-e246-44bc-9816-51baec89f3d3.jpg", category: "Skincare" },
      { name: "Kit Joico Moisture Recovery", price: "R$ 280,00", image: "images/9d413b9d-d3e4-454a-ad1a-0552ce2a756f.jpg", category: "Cabelo" },
      { name: "Kit Fino Premium Touch", price: "R$ 750,00", image: "images/44043db3-8170-4dc5-ba89-b37b7c2b56c3.jpg", category: "Cabelo" },
      { name: "Esfoliante Tree Hut", price: "R$ 124,99", image: "images/e03b5939-a509-4495-98f4-3c4eb8acb7dd.jpg", category: "Skincare" }
    ]
  },
  {
    title: "Perfumes Yara",
    products: [
      { name: "Yara Rose", price: "R$ 200,00", image: "images/yara/WhatsApp%20Image%202026-08-02%20at%2023.22.39.jpeg", category: "Perfumes" },
      { name: "Yara Elixir", price: "R$ 200,00", image: "images/yara/WhatsApp%20Image%202026-08-02%20at%2023.22.39%20(1).jpeg", category: "Perfumes" },
      { name: "Yara Tous", price: "R$ 200,00", image: "images/yara/WhatsApp%20Image%202026-08-02%20at%2023.22.39%20(2).jpeg", category: "Perfumes" },
      { name: "Yara Moi Branco", price: "R$ 200,00", image: "images/yara/WhatsApp%20Image%202026-08-02%20at%2023.22.39%20(3).jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Perfumes Sabah Al Ward",
    products: [
      { name: "Sabah Sugar", price: "R$ 150,00", image: "images/sabah/WhatsApp%20Image%202026-08-02%20at%2023.22.27.jpeg", category: "Perfumes" },
      { name: "Sabah Tradicional", price: "R$ 150,00", image: "images/sabah/WhatsApp%20Image%202026-08-02%20at%2023.22.27%20(3).jpeg", category: "Perfumes" },
      { name: "Sabah Valentino", price: "R$ 160,00", image: "images/sabah/WhatsApp%20Image%202026-08-02%20at%2023.22.27%20(1).jpeg", category: "Perfumes" },
      { name: "Sabah Delilah", price: "R$ 170,00", image: "images/sabah/WhatsApp%20Image%202026-08-02%20at%2023.22.27%20(2).jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Perfumes Club de Nuit",
    products: [
      { name: "Club de Nuit Intense", price: "R$ 250,00", image: "images/club%20nuit/WhatsApp%20Image%202026-08-02%20at%2023.22.04.jpeg", category: "Perfumes" },
      { name: "Club Woman", price: "R$ 250,00", image: "images/club%20nuit/WhatsApp%20Image%202026-08-02%20at%2023.22.03%20(1).jpeg", category: "Perfumes" },
      { name: "Club de Nuit Maleska", price: "R$ 280,00", image: "images/club%20nuit/WhatsApp%20Image%202026-08-02%20at%2023.22.04%20(1).jpeg", category: "Perfumes" },
      { name: "Club Untaid", price: "R$ 280,00", image: "images/club%20nuit/WhatsApp%20Image%202026-08-02%20at%2023.22.03%20(2).jpeg", category: "Perfumes" },
      { name: "Club Icon", price: "R$ 280,00", image: "images/club%20nuit/WhatsApp%20Image%202026-08-02%20at%2023.22.04%20(2).jpeg", category: "Perfumes" },
      { name: "Club Oud – Caixa de Madeira", price: "R$ 349,99", image: "images/club%20nuit/WhatsApp%20Image%202026-08-02%20at%2023.22.03.jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Perfumes Al Oud (Badee Al Oud)",
    products: [
      { name: "Oud Blush", price: "R$ 200,00", image: "images/Al%20oud/WhatsApp%20Image%202026-08-02%20at%2023.23.00%20(2).jpeg", category: "Perfumes" },
      { name: "Oud Sublime", price: "R$ 200,00", image: "images/Al%20oud/WhatsApp%20Image%202026-08-02%20at%2023.23.00.jpeg", category: "Perfumes" },
      { name: "Oud Honor", price: "R$ 220,00", image: "images/Al%20oud/WhatsApp%20Image%202026-08-02%20at%2023.22.59.jpeg", category: "Perfumes" },
      { name: "Oud Amethyst", price: "R$ 220,00", image: "images/Al%20oud/WhatsApp%20Image%202026-08-02%20at%2023.23.00%20(1).jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Perfumes Asad",
    products: [
      { name: "Asad", price: "R$ 200,00", image: "images/Asad/de8a38c1-db84-4352-8d79-b760dd603c5d.jpg", category: "Perfumes" },
      { name: "Asad Bourbon", price: "R$ 280,00", image: "images/Asad/6b4a98f7-5c1f-428c-8ce6-d0c3f0490eb3.jpg", category: "Perfumes" }
    ]
  },
  {
    title: "Perfumes Hawas",
    products: [
      { name: "Hawas Kobra", price: "R$ 250,00", image: "images/Hawas/d50f380e-75de-449c-be34-49df234975aa.jfif", category: "Perfumes" },
      { name: "Hawas Chrome", price: "R$ 300,00", image: "images/Hawas/e453e4e9-ed6e-445c-b9a5-e2e97a2b6304.jfif", category: "Perfumes" }
    ]
  },
  {
    title: "Perfumes Vulcan",
    products: [
      { name: "Vulcan Bale", price: "R$ 220,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.24.58.jpeg", category: "Perfumes" },
      { name: "Vulcan Feu", price: "R$ 220,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.24.58%20(1).jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Perfumes Musamam",
    products: [
      { name: "Musamam", price: "R$ 290,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.25.00%20(3).jpeg", category: "Perfumes" },
      { name: "Musamam Black", price: "R$ 290,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.25.00%20(4).jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Perfumes Delilah",
    products: [
      { name: "Delilah Rosa", price: "R$ 220,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.25.00%20(1).jpeg", category: "Perfumes" },
      { name: "Delilah Branco", price: "R$ 250,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.25.00%20(2).jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Outros Perfumes Árabes",
    products: [
      { name: "Ameerati", price: "R$ 170,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.25.00%20(6).jpeg", category: "Perfumes" },
      { name: "Duratt", price: "R$ 190,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.25.00%20(5).jpeg", category: "Perfumes" },
      { name: "Haya", price: "R$ 190,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.24.59%20(3).jpeg", category: "Perfumes" },
      { name: "Fakar Rose", price: "R$ 190,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.24.59.jpeg", category: "Perfumes" },
      { name: "Abeer Riiffs", price: "R$ 210,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.24.59%20(1).jpeg", category: "Perfumes" },
      { name: "Safeer Alce", price: "R$ 220,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.25.00%20(8).jpeg", category: "Perfumes" },
      { name: "Wold A Ace Baralho", price: "R$ 240,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.24.57.jpeg", category: "Perfumes" },
      { name: "Oud Is Great (Zimaya)", price: "R$ 230,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.24.59%20(2).jpeg", category: "Perfumes" },
      { name: "Borouj Gravity", price: "R$ 300,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.24.59%20(5).jpeg", category: "Perfumes" },
      { name: "Borouj Mysterious", price: "R$ 300,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.25.00.jpeg", category: "Perfumes" },
      { name: "Atheeri", price: "R$ 320,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.25.00%20(7).jpeg", category: "Perfumes" },
      { name: "Royal Amber", price: "R$ 380,00", image: "images/outros%20arabes/WhatsApp%20Image%202026-08-02%20at%2023.24.59%20(4).jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Perfumes 212",
    products: [
      { name: "212 Men NYC", price: "R$ 600,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.05%20(2).jpeg", category: "Perfumes" },
      { name: "212 Sexy", price: "R$ 600,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.04%20(2).jpeg", category: "Perfumes" },
      { name: "212 VIP Rosé", price: "R$ 600,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.04%20(3).jpeg", category: "Perfumes" },
      { name: "212 VIP Black", price: "R$ 670,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.05%20(1).jpeg", category: "Perfumes" },
      { name: "212 Men NYC Parfum", price: "R$ 700,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.05%20(4).jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Perfumes Phantom",
    products: [
      { name: "Phantom EDT", price: "R$ 600,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.04%20(7).jpeg", category: "Perfumes" },
      { name: "Phantom Parfum", price: "R$ 680,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.04%20(6).jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Perfumes Scandal",
    products: [
      { name: "Scandal Absolu", price: "R$ 620,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.04%20(4).jpeg", category: "Perfumes" },
      { name: "Scandal Le Parfum", price: "R$ 630,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.04%20(5).jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Perfumes La Vie Est Belle",
    products: [
      { name: "La Vie Tradicional", price: "R$ 790,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.06.jpeg", category: "Perfumes" },
      { name: "La Vie Extrait (Rose Extraordinaire)", price: "R$ 790,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.05%20(8).jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Bleu de Chanel",
    products: [
      { name: "Bleu de Chanel EDP 100 ml", price: "R$ 1.200,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.02.jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Perfumes Invictus",
    products: [
      { name: "Invictus EDT", price: "R$ 570,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.05%20(3).jpeg", category: "Perfumes" },
      { name: "Invictus Parfum", price: "R$ 610,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.05.jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Perfumes Million",
    products: [
      { name: "Lady Million", price: "R$ 599,99", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.06%20(2).jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Outros Perfumes Importados",
    products: [
      { name: "Seduction X – Antonio Banderas", price: "R$ 190,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.04%20(1).jpeg", category: "Perfumes" },
      { name: "Silver Scent", price: "R$ 200,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.02%20(1).jpeg", category: "Perfumes" },
      { name: "Fantasy", price: "R$ 290,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.05%20(7).jpeg", category: "Perfumes" },
      { name: "Liquid Brun", price: "R$ 290,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.06%20(1).jpeg", category: "Perfumes" },
      { name: "Lacoste L12", price: "R$ 549,99", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.02%20(2).jpeg", category: "Perfumes" },
      { name: "Boss", price: "R$ 599,99", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.05%20(5).jpeg", category: "Perfumes" },
      { name: "Olympea", price: "R$ 600,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.05%20(6).jpeg", category: "Perfumes" },
      { name: "La Bomba", price: "R$ 760,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.05%20(9).jpeg", category: "Perfumes" },
      { name: "Miss Dior", price: "R$ 849,99", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.03.jpeg", category: "Perfumes" },
      { name: "Sauvage EDP", price: "R$ 850,00", image: "images/importados/WhatsApp%20Image%202026-08-02%20at%2023.27.04.jpeg", category: "Perfumes" }
    ]
  },
  {
    title: "Victoria's Secret – Body Splash (1 por R$ 115 | 2 por R$ 220 | 3 por R$ 315)",
    products: [
      { name: "Pure Seduction", price: "R$ 115,00", image: "images/vict%C3%B3ria%20secrets/WhatsApp%20Image%202026-08-02%20at%2023.28.05%20(6).jpeg", category: "Perfumes" },
      { name: "Love Spell", price: "R$ 115,00", image: "images/vict%C3%B3ria%20secrets/WhatsApp%20Image%202026-08-02%20at%2023.28.04%20(7).jpeg", category: "Perfumes" },
      { name: "Midnight Bloom", price: "R$ 115,00", image: "images/vict%C3%B3ria%20secrets/WhatsApp%20Image%202026-08-02%20at%2023.28.03%20(2).jpeg", category: "Perfumes" },
      { name: "Coconut Passion", price: "R$ 115,00", image: "images/vict%C3%B3ria%20secrets/WhatsApp%20Image%202026-08-02%20at%2023.28.04%20(6).jpeg", category: "Perfumes" },
      { name: "Velvet Petals", price: "R$ 115,00", image: "images/vict%C3%B3ria%20secrets/WhatsApp%20Image%202026-08-02%20at%2023.28.05%20(3).jpeg", category: "Perfumes" },
      { name: "Bare Vanilla", price: "R$ 115,00", image: "images/vict%C3%B3ria%20secrets/WhatsApp%20Image%202026-08-02%20at%2023.28.05%20(4).jpeg", category: "Perfumes" },
      { name: "Rush", price: "R$ 115,00", image: "images/vict%C3%B3ria%20secrets/WhatsApp%20Image%202026-08-02%20at%2023.28.05%20(2).jpeg", category: "Perfumes" },
      { name: "Aqua Kiss", price: "R$ 115,00", image: "images/vict%C3%B3ria%20secrets/WhatsApp%20Image%202026-08-02%20at%2023.28.05%20(2).jpeg", category: "Perfumes" }
    ]
  }
];
