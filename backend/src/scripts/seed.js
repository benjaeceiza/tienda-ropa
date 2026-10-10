import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/product.model.js'; // Ajustá la ruta a tu modelo

dotenv.config(); 

const productosSTRETEAT = [
  // --- HOODIES ---
  {
    nombre: "ESSENTIAL BOX LOGO",
    descripcion: "Hoodie ESSENTIAL BOX LOGO premium, corte oversize y confort máximo.",
    precio: 58000,
    imagen: "https://i.pinimg.com/1200x/0e/e7/b6/0ee7b6799c61addc021c41b860dcd844.jpg",
    imagenes: ["https://i.pinimg.com/736x/19/e0/9e/19e09eecbe766ef0287ffcfe39fde2d3.jpg"],
    categoria: "hoodies",
    stock: { "S": 5, "M": 12, "L": 8, "XL": 3, "XXL": 0 },
    destacado: true
  },
  {
    nombre: "ACID WASH OVERSIZE",
    descripcion: "Hoodie ACID WASH OVERSIZE de algodón rústico pesado. Lavado especial.",
    precio: 62500,
    imagen: "https://i.pinimg.com/736x/fd/64/39/fd6439035b925ffcec73f16d4793d3f8.jpg",
    imagenes: ["https://i.pinimg.com/1200x/b3/85/43/b3854384c3a2fdf4925f62d734d8baa5.jpg"],
    categoria: "hoodies",
    stock: { "S": 2, "M": 8, "L": 15, "XL": 5, "XXL": 2 },
    destacado: true
  },
  {
    nombre: "GHOST GREY HOODIE",
    descripcion: "Hoodie GHOST GREY. Ideal para media estación con un fit perfecto.",
    precio: 55000,
    imagen: "https://i.pinimg.com/1200x/a5/29/3d/a5293d8385505760cec6e34efc52d85f.jpg",
    imagenes: ["https://i.pinimg.com/1200x/28/da/a3/28daa3c4b7fe92350b9a4174d0fa9fb4.jpg"],
    categoria: "hoodies",
    stock: { "S": 0, "M": 4, "L": 10, "XL": 8, "XXL": 1 },
    destacado: false
  },
  {
    nombre: "STRETEAT CORE BLACK",
    descripcion: "El clásico STRETEAT CORE BLACK que no te puede faltar. Básicos esenciales.",
    precio: 58000,
    imagen: "https://i.pinimg.com/1200x/30/57/76/3057764f824f8344a1051cd45a6fa690.jpg",
    imagenes: [],
    categoria: "hoodies",
    stock: { "S": 10, "M": 20, "L": 15, "XL": 10, "XXL": 5 },
    destacado: false
  },
  {
    nombre: "OFF-WHITE HEAVY COTTON",
    descripcion: "Hoodie OFF-WHITE HEAVY COTTON. Textura pesada de máxima calidad.",
    precio: 67000,
    imagen: "https://i.pinimg.com/1200x/10/00/78/100078674794e21a3328723797e66f02.jpg",
    imagenes: ["https://i.pinimg.com/736x/49/f7/ff/49f7ff41618df13a3657c530ce7916fb.jpg"],
    categoria: "hoodies",
    stock: { "S": 1, "M": 0, "L": 2, "XL": 0, "XXL": 0 },
    destacado: false
  },
  {
    nombre: "CYBER-PUNK TECHWEAR",
    descripcion: "Diseño CYBER-PUNK TECHWEAR futurista con detalles funcionales.",
    precio: 72000,
    imagen: "https://i.pinimg.com/736x/3a/20/66/3a206653d6a4bd0f6f50ab087fccc92e.jpg",
    imagenes: ["https://i.pinimg.com/736x/dd/e0/d2/dde0d27897369d94d27c745ebb9d2d30.jpg"],
    categoria: "hoodies",
    stock: { "S": 3, "M": 5, "L": 5, "XL": 2, "XXL": 1 },
    destacado: true
  },
  {
    nombre: "VINTAGE 90s HOOD",
    descripcion: "Estilo retro VINTAGE 90s HOOD. Nostalgia urbana en cada costura.",
    precio: 49000,
    imagen: "https://i.pinimg.com/1200x/bd/15/30/bd1530797757e209078c12452f6258c4.jpg",
    imagenes: [
      "https://i.pinimg.com/1200x/ad/1f/51/ad1f51a775a183af295a98bb6f5640c4.jpg",
      "https://i.pinimg.com/1200x/80/7f/64/807f6475fa1ff87c3a762e7007b5b7a6.jpg"
    ],
    categoria: "hoodies",
    stock: { "S": 8, "M": 12, "L": 0, "XL": 4, "XXL": 2 },
    destacado: false
  },
  {
    nombre: "STREET MASTER ZIP-UP",
    descripcion: "Buzo con cierre STREET MASTER ZIP-UP. Versatilidad para tu outfit.",
    precio: 64000,
    imagen: "https://i.pinimg.com/1200x/4d/34/ae/4d34ae12659c94c0f8116aa71d4ad3fa.jpg",
    imagenes: [
      "https://i.pinimg.com/1200x/b5/25/c0/b525c0f1e4810764a4064f44988f8897.jpg",
      "https://i.pinimg.com/1200x/a7/24/15/a72415ceb38a9256c2503b321638b265.jpg",
      "https://i.pinimg.com/1200x/10/43/d9/1043d9bb4b339f3460b94543db66381d.jpg"
    ],
    categoria: "hoodies",
    stock: { "S": 4, "M": 6, "L": 6, "XL": 2, "XXL": 0 },
    destacado: false
  },
  {
    nombre: "PASTEL DROPS LIMITED",
    descripcion: "Edición limitada PASTEL DROPS. Colores suaves, diseño duro.",
    precio: 61000,
    imagen: "https://i.pinimg.com/1200x/3c/b6/97/3cb697565d2bb5c04a8ac6d546fa107c.jpg",
    imagenes: [
      "https://i.pinimg.com/1200x/2d/8f/b0/2d8fb07de067c827390f2d79787ccbb8.jpg",
      "https://i.pinimg.com/1200x/b2/d2/2f/b2d22f68ea82a2e05d8fcd2b8e80f52f.jpg"
    ],
    categoria: "hoodies",
    stock: { "S": 0, "M": 0, "L": 5, "XL": 8, "XXL": 3 },
    destacado: false
  },

  // --- REMERAS ---
  {
    nombre: "HEAVYWEIGHT OVERSIZE",
    descripcion: "Remera HEAVYWEIGHT OVERSIZE. Algodón de alto gramaje y durabilidad.",
    precio: 22000,
    imagen: "https://i.pinimg.com/1200x/87/7f/62/877f62a966ac349bf18dd20e75ae7cbc.jpg",
    imagenes: ["https://i.pinimg.com/1200x/94/d0/22/94d0223ab3e46a0b986e704af1f7a7b4.jpg"],
    categoria: "remeras",
    stock: { "S": 15, "M": 25, "L": 20, "XL": 10, "XXL": 5 },
    destacado: true
  },
  {
    nombre: "BOX LOGO TEE",
    descripcion: "Remera BOX LOGO TEE. Minimalismo al frente, calidad en la tela.",
    precio: 19500,
    imagen: "https://i.pinimg.com/1200x/9b/29/d6/9b29d6f7b2286f0eea493f48695f1ab3.jpg",
    imagenes: [
      "https://i.pinimg.com/1200x/b6/4d/b1/b64db17bfacc6a9256cb42e763619d5a.jpg",
      "https://i.pinimg.com/1200x/80/f7/d1/80f7d14e16c44ae22d967b54280b240a.jpg",
      "https://i.pinimg.com/1200x/0c/34/0f/0c340fc70d249e6c154c5db3ad674b4c.jpg"
    ],
    categoria: "remeras",
    stock: { "S": 10, "M": 15, "L": 8, "XL": 2, "XXL": 0 },
    destacado: false
  },
  {
    nombre: "STREET ART GRAPHIC",
    descripcion: "Gráficos únicos en la STREET ART GRAPHIC. Llevá el arte en vos.",
    precio: 24000,
    imagen: "https://i.pinimg.com/1200x/13/43/b1/1343b119844d97745bb51bb2c6544843.jpg",
    imagenes: [],
    categoria: "remeras",
    stock: { "S": 5, "M": 10, "L": 10, "XL": 5, "XXL": 2 },
    destacado: true
  },
  {
    nombre: "VINTAGE ROCK WASH",
    descripcion: "Remera VINTAGE ROCK WASH con lavado localizado estilo banda de rock.",
    precio: 26000,
    imagen: "https://i.pinimg.com/736x/0d/71/a6/0d71a608a9cd660106ba8e34d2ed87c6.jpg",
    imagenes: [
      "https://i.pinimg.com/1200x/b4/55/f5/b455f5e7a017ee94957791ae7f6f7dbe.jpg",
      "https://i.pinimg.com/736x/0d/71/a6/0d71a608a9cd660106ba8e34d2ed87c6.jpg"
    ],
    categoria: "remeras",
    stock: { "S": 8, "M": 14, "L": 12, "XL": 6, "XXL": 1 },
    destacado: false
  },
  {
    nombre: "MINIMAL LOGO T-SHIRT",
    descripcion: "La MINIMAL LOGO T-SHIRT es perfecta para combinar con cualquier prenda.",
    precio: 18000,
    imagen: "https://i.pinimg.com/1200x/31/63/63/3163637e0c77a553f4077d349ccfee93.jpg",
    imagenes: [
      "https://i.pinimg.com/1200x/a569865eb97b165516f7101ae79164df.jpg",
      "https://i.pinimg.com/1200x/34/21/da/3421da193719507e72efb30dd4ce508b.jpg"
    ],
    categoria: "remeras",
    stock: { "S": 20, "M": 30, "L": 25, "XL": 15, "XXL": 8 },
    destacado: false
  },
  {
    nombre: "URBAN DRIFT WHITE",
    descripcion: "URBAN DRIFT WHITE, la remera blanca definitiva para salir a la calle.",
    precio: 21000,
    imagen: "https://i.pinimg.com/736x/77/e4/9f/77e49f75bb816056082f936fbd9133fe.jpg",
    imagenes: [
      "https://i.pinimg.com/1200x/68/ab/d7/68abd7ad84e9307a8f87d28b8e9a92d6.jpg",
      "https://i.pinimg.com/1200x/00/53/36/0053363fa70eea3028db9b4061edc7d0.jpg",
      "https://i.pinimg.com/1200x/b5/2d/b1/b52db16a89a48f6abcab9b9d6fc8b05e.jpg"
    ],
    categoria: "remeras",
    stock: { "S": 4, "M": 8, "L": 5, "XL": 0, "XXL": 0 },
    destacado: false
  },
  {
    nombre: "POCKET BASIC TEE",
    descripcion: "POCKET BASIC TEE. Clásica remera con bolsillo para el día a día.",
    precio: 17500,
    imagen: "https://i.pinimg.com/1200x/91/68/4e/91684e665e1a087f95cdeef8ec9ddde0.jpg",
    imagenes: ["https://i.pinimg.com/1200x/92/b1/01/92b101bbe32a020a279d97ccda04513e.jpg"],
    categoria: "remeras",
    stock: { "S": 12, "M": 18, "L": 14, "XL": 7, "XXL": 3 },
    destacado: false
  },
  {
    nombre: "LONG SLEEVE STREET",
    descripcion: "Remera manga larga LONG SLEEVE STREET. Capas de estilo para tu outfit.",
    precio: 28000,
    imagen: "https://i.pinimg.com/1200x/9f/ce/c4/9fcec42ee89b66b7825d4f8f2270b248.jpg",
    imagenes: ["https://i.pinimg.com/736x/b2/8f/50/b28f5033f204ca883fa28a03aa3b833c.jpg"],
    categoria: "remeras",
    stock: { "S": 6, "M": 10, "L": 8, "XL": 4, "XXL": 1 },
    destacado: false
  },
  {
    nombre: "STRIPES URBAN STYLE",
    descripcion: "Patrón a rayas en la STRIPES URBAN STYLE, un touch diferencial.",
    precio: 23000,
    imagen: "https://i.pinimg.com/736x/bc/cc/62/bccc620652e0583d2ad87185bf344fd3.jpg",
    imagenes: ["https://i.pinimg.com/1200x/87/c4/8e/87c48ea4e33629499b4d4988ef632cf8.jpg"],
    categoria: "remeras",
    stock: { "S": 0, "M": 5, "L": 12, "XL": 6, "XXL": 2 },
    destacado: false
  },

  // --- PANTALONES ---
  {
    nombre: "CARGO MULTIPOCKET",
    descripcion: "Pantalón CARGO MULTIPOCKET. Estilo táctico con amplios bolsillos.",
    precio: 68000,
    imagen: "https://i.pinimg.com/736x/ca/92/ba/ca92bafe634ae22c59bc82402a96f68c.jpg",
    imagenes: [
      "https://i.pinimg.com/736x/d6/41/23/d641230f67217f8231acc074209f3288.jpg",
      "https://i.pinimg.com/736x/20/98/51/2098516934628e900723f7801aacf6a6.jpg",
      "https://i.pinimg.com/736x/2d/2f/88/2d2f8847b208adcafe9b7808399c2f3e.jpg"
    ],
    categoria: "pantalones",
    stock: { "S": 3, "M": 8, "L": 10, "XL": 6, "XXL": 2 },
    destacado: true
  },
  {
    nombre: "TECHWEAR JOGGERS",
    descripcion: "TECHWEAR JOGGERS. Comodidad deportiva con estética futurista.",
    precio: 62000,
    imagen: "https://i.pinimg.com/1200x/d3/2a/f8/d32af82042b24fc99ca5028e22fb587e.jpg",
    imagenes: ["https://i.pinimg.com/736x/d6/45/65/d64565404d9393ed95d58228604c38fe.jpg"],
    categoria: "pantalones",
    stock: { "S": 5, "M": 12, "L": 8, "XL": 4, "XXL": 0 },
    destacado: false
  },
  {
    nombre: "BAGGY DENIM WASH",
    descripcion: "Jeans anchos BAGGY DENIM WASH. Movimiento y estilo de los 2000s.",
    precio: 75000,
    imagen: "https://i.pinimg.com/1200x/6f/4f/b8/6f4fb89845e88b4b1437e2c6dd3512bd.jpg",
    imagenes: [
      "https://i.pinimg.com/736x/db/27/b3/db27b3b7676b71e8b089d5b7e392e9df.jpg",
      "https://i.pinimg.com/736x/0a/b9/75/0ab975e56c32762b87188e9ba2f06282.jpg"
    ],
    categoria: "pantalones",
    stock: { "S": 2, "M": 6, "L": 14, "XL": 8, "XXL": 3 },
    destacado: true
  },
  {
    nombre: "WIDE LEG CARGO",
    descripcion: "Pantalón WIDE LEG CARGO de corte ancho en toda la pierna.",
    precio: 71000,
    imagen: "https://i.pinimg.com/736x/5b/cd/4d/5bcd4dd1c2ea1761277aae6ba8f33f3f.jpg",
    imagenes: ["https://i.pinimg.com/736x/be/cc/0e/becc0e6e7424a334c720ac34ef368b6d.jpg"],
    categoria: "pantalones",
    stock: { "S": 0, "M": 4, "L": 8, "XL": 5, "XXL": 1 },
    destacado: false
  },
  {
    nombre: "RELAXED CHINO BLACK",
    descripcion: "RELAXED CHINO BLACK. El intermedio perfecto entre casual y streetwear.",
    precio: 54000,
    imagen: "https://i.pinimg.com/1200x/55/c8/92/55c892ad4e57f946c680bb3a701ca27e.jpg",
    imagenes: [
      "https://i.pinimg.com/1200x/f4/54/5f/f4545f99897fe6e659010a4529579730.jpg",
      "https://i.pinimg.com/1200x/bb/04/c8/bb04c825121e3cd25fdc0825e566903b.jpg"
    ],
    categoria: "pantalones",
    stock: { "S": 10, "M": 15, "L": 15, "XL": 8, "XXL": 4 },
    destacado: false
  },
  {
    nombre: "DISTRESSED JEANS",
    descripcion: "DISTRESSED JEANS con roturas localizadas y desgastes manuales.",
    precio: 78000,
    imagen: "https://i.pinimg.com/1200x/9c/40/93/9c4093a6d38fe461aeee0689a2ad2b21.jpg",
    imagenes: ["https://i.pinimg.com/736x/84/2b/6c/842b6cd2b16dcd38629a63e9bfa9478a.jpg"],
    categoria: "pantalones",
    stock: { "S": 1, "M": 3, "L": 5, "XL": 2, "XXL": 0 },
    destacado: false
  },
  {
    nombre: "TRACK PANTS RED",
    descripcion: "TRACK PANTS RED con banda lateral. Actitud y contraste para las calles.",
    precio: 45000,
    imagen: "https://i.pinimg.com/1200x/79/a8/98/79a89860b51b0dfd20ed4dbca55b80cd.jpg",
    imagenes: ["https://i.pinimg.com/736x/30/21/55/30215566765b9bf15210870df1cafd6e.jpg"],
    categoria: "pantalones",
    stock: { "S": 8, "M": 10, "L": 6, "XL": 3, "XXL": 1 },
    destacado: false
  },
  {
    nombre: "MILITARY CARGO OLIVE",
    descripcion: "El clásico MILITARY CARGO OLIVE verde oliva. Tela ultra resistente.",
    precio: 69000,
    imagen: "https://i.pinimg.com/1200x/68/8e/3c/688e3ca17e4dd6d8ac7184e95bccf4e3.jpg",
    imagenes: [
      "https://i.pinimg.com/736x/12/0d/37/120d373db9ae1dd348c9774765bda9c8.jpg",
      "https://i.pinimg.com/1200x/62/cc/7b/62cc7ba2251b9fafbb296a25014f9ca0.jpg"
    ],
    categoria: "pantalones",
    stock: { "S": 4, "M": 9, "L": 12, "XL": 6, "XXL": 2 },
    destacado: false
  },
  {
    nombre: "UTILITY SWEATPANTS",
    descripcion: "UTILITY SWEATPANTS. Pantalón de jogging con detalles utilitarios.",
    precio: 51000,
    imagen: "https://i.pinimg.com/1200x/45/46/16/454616aa73261079142351a3e0702b2f.jpg",
    imagenes: [
      "https://i.pinimg.com/1200x/9c/90/39/9c90396220ba8970da66d1a2e9bdbdfe.jpg",
      "https://i.pinimg.com/1200x/65/d4/08/65d4088fb7bc5147bab8a30e7dc1ddf8.jpg"
    ],
    categoria: "pantalones",
    stock: { "S": 6, "M": 8, "L": 10, "XL": 4, "XXL": 0 },
    destacado: false
  },

  // --- CALZADOS ---
  {
    nombre: "Air Jordan 1 Mid SE",
    descripcion: "Zapatillas Air Jordan 1 Mid SE. Un icono que no pasa de moda.",
    precio: 299999,
    imagen: "https://nikearprod.vtexassets.com/arquivos/ids/1549121-1200-1200?width=1200&height=1200&aspect=true",
    imagenes: [
      "https://nikearprod.vtexassets.com/arquivos/ids/1554535-1200-1200?width=1200&height=1200&aspect=true",
      "https://nikearprod.vtexassets.com/arquivos/ids/1556360-1200-1200?width=1200&height=1200&aspect=true"
    ],
    categoria: "calzados",
    stock: { "39": 2, "40": 4, "41": 6, "42": 5, "43": 2, "44": 1 },
    destacado: true
  },
  {
    nombre: "Air Jordan 1 Low SE",
    descripcion: "Air Jordan 1 Low SE. La versión de caña baja para mayor agilidad.",
    precio: 279999,
    imagen: "https://nikearprod.vtexassets.com/arquivos/ids/1335286-1200-1200?width=1200&height=1200&aspect=true",
    imagenes: [
      "https://nikearprod.vtexassets.com/arquivos/ids/1347225-1200-1200?width=1200&height=1200&aspect=true",
      "https://nikearprod.vtexassets.com/arquivos/ids/1350613-1200-1200?width=1200&height=1200&aspect=true"
    ],
    categoria: "calzados",
    stock: { "39": 0, "40": 2, "41": 5, "42": 8, "43": 4, "44": 0 },
    destacado: true
  },
  {
    nombre: "Nike SB Chron 2",
    descripcion: "Nike SB Chron 2, diseñadas para el skate y la ciudad.",
    precio: 134999,
    imagen: "https://nikearprod.vtexassets.com/arquivos/ids/498907-1200-1200?width=1200&height=1200&aspect=true",
    imagenes: [
      "https://nikearprod.vtexassets.com/arquivos/ids/503270-1200-1200?width=1200&height=1200&aspect=true",
      "https://nikearprod.vtexassets.com/arquivos/ids/504680-1200-1200?width=1200&height=1200&aspect=true"
    ],
    categoria: "calzados",
    stock: { "39": 5, "40": 8, "41": 12, "42": 10, "43": 6, "44": 3 },
    destacado: false
  },
  {
    nombre: "Vans U Upland",
    descripcion: "Las Vans U Upland aportan frescura al estilo clásico de skate.",
    precio: 199900,
    imagen: "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2026/1/6/11491018_800.jpg",
    imagenes: [
      "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2026/1/6/11491019_800.jpg",
      "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2026/1/6/11491020_800.jpg",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80"
    ],
    categoria: "calzados",
    stock: { "39": 3, "40": 5, "41": 5, "42": 2, "43": 0, "44": 0 },
    destacado: false
  },
  {
    nombre: "Vans U OLD SKOOL",
    descripcion: "Vans U OLD SKOOL. El par que combina con absolutamente todo.",
    precio: 99000,
    imagen: "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2025/11/25/11384284_800.jpg",
    imagenes: ["https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2025/11/25/11384287_800.jpg"],
    categoria: "calzados",
    stock: { "39": 10, "40": 15, "41": 20, "42": 18, "43": 10, "44": 5 },
    destacado: false
  },
  {
    nombre: "Vans U SK8-HI",
    descripcion: "Vans U SK8-HI caña alta. Soporte y diseño inconfundible.",
    precio: 169900,
    imagen: "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2024/12/6/10254259_800.jpg",
    imagenes: [
      "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2024/12/6/10254041_800.jpg",
      "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2024/12/6/10254042_800.jpg",
      "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2024/12/6/10254043_800.jpg"
    ],
    categoria: "calzados",
    stock: { "39": 4, "40": 6, "41": 8, "42": 6, "43": 4, "44": 2 },
    destacado: false
  },
  {
    nombre: "HANDBALL SPEZIAL",
    descripcion: "Zapatillas HANDBALL SPEZIAL. Toque vintage para tu rotación de zapas.",
    precio: 189999,
    imagen: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/a66498d59fe14baca91bb3bc26823b9c_9366/HANDBALL_SPEZIAL_Negro_HP3673_HM4.jpg",
    imagenes: [
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/7c428b0201474aff871c09ecb2ce309a_9366/HANDBALL_SPEZIAL_Negro_HP3673_HM1.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/40f1004b6dab4e63b1b961b51b31e4d8_9366/HANDBALL_SPEZIAL_Negro_HP3673_HM5.jpg"
    ],
    categoria: "calzados",
    stock: { "39": 1, "40": 0, "41": 3, "42": 4, "43": 1, "44": 0 },
    destacado: true
  },
  {
    nombre: "Campus 00s",
    descripcion: "Las Campus 00s reviven la época dorada con proporciones oversize.",
    precio: 179999,
    imagen: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/7a9ea13dc9094b92be7418b1a4409f4e_9366/Zapatillas_Campus_00s_Blanco_JR1646_01_00_standard.jpg",
    imagenes: [
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/b671453b90524f20add1c2270c3692f1_9366/Zapatillas_Campus_00s_Blanco_JR1646_02_standard.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/9c22b3c6444442d8939e994ff339f378_9366/Zapatillas_Campus_00s_Blanco_JR1646_15_hover_standard.jpg"
    ],
    categoria: "calzados",
    stock: { "39": 5, "40": 5, "41": 8, "42": 12, "43": 6, "44": 2 },
    destacado: false
  },
  {
    nombre: "Zapatillas Samba XLG",
    descripcion: "Zapatillas Samba XLG. La evolución de un clásico inmortal.",
    precio: 209999,
    imagen: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/a16aacd2a80b4897bda6ad67f987b8dd_9366/Zapatillas_Samba_XLG_Blanco_IE1377_01_standard.jpg",
    imagenes: [
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/9ceeecb2b21f4d44b638920804a4bebd_9366/Zapatillas_Samba_XLG_Blanco_IE1377_HM53.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/bc3094116b254497b9dcee01b4299229_9366/Zapatillas_Samba_XLG_Blanco_IE1377_HM52.jpg",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    ],
    categoria: "calzados",
    stock: { "39": 2, "40": 4, "41": 4, "42": 6, "43": 3, "44": 1 },
    destacado: false
  },

  // --- ACCESORIOS ---
  {
    nombre: "Lentes 304 Reef",
    descripcion: "Lentes 304 Reef, polarizados y con filtro UV.",
    precio: 15000,
    imagen: "https://reefeyewear.com/6948-thickbox_default/304.jpg",
    imagenes: ["https://reefeyewear.com/6949-thickbox_default/304.jpg"],
    categoria: "accesorios",
    stock: { "Único": 15 },
    destacado: false
  },
  {
    nombre: "Lentes 292 Reef",
    descripcion: "Lentes 292 Reef de diseño envolvente.",
    precio: 150000,
    imagen: "https://reefeyewear.com/5901-thickbox_default/292.jpg",
    imagenes: ["https://reefeyewear.com/5902-thickbox_default/292.jpg"],
    categoria: "accesorios",
    stock: { "Único": 4 },
    destacado: false
  },
  {
    nombre: "BOLSO PARA OBJETOS PEQUEÑOS",
    descripcion: "Bolso cruzado compacto, ideal para llevar lo esencial.",
    precio: 59999,
    imagen: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/a2b18769d2394dbebecaeccb39bfb2a2_9366/BOLSO_PARA_OBJETOS_PEQUENOS_Gris_KE0745_01_00_standard.jpg",
    imagenes: [
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/c308a918856d4a47aba77e443e60f415_9366/BOLSO_PARA_OBJETOS_PEQUENOS_Gris_KE0745_02_standard.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/00356c7aa67247b196d7aaad445ca938_9366/BOLSO_PARA_OBJETOS_PEQUENOS_Gris_KE0745_05_hover_standard.jpg"
    ],
    categoria: "accesorios",
    stock: { "Único": 22 },
    destacado: false
  },
  {
    nombre: "Mochila Adicolor",
    descripcion: "Mochila Adicolor clásica y espaciosa para el día a día.",
    precio: 99999,
    imagen: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/d272d59a7dd448239408b715c12a2926_9366/Mochila_Adicolor_Beige_KD7803_01_00_standard.jpg",
    imagenes: ["https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/ffc938fe486947bb952d59e6a6a40045_9366/Mochila_Adicolor_Beige_KD7803_02_standard.jpg"],
    categoria: "accesorios",
    stock: { "Único": 18 },
    destacado: false
  },
  {
    nombre: "Nike Elemental",
    descripcion: "Mochila Nike Elemental resistente con múltiples compartimentos.",
    precio: 99999,
    imagen: "https://nikearprod.vtexassets.com/arquivos/ids/209327-1200-1200?width=1200&height=1200&aspect=true",
    imagenes: [
      "https://nikearprod.vtexassets.com/arquivos/ids/222685-1200-1200?width=1200&height=1200&aspect=true",
      "https://nikearprod.vtexassets.com/arquivos/ids/213807-1200-1200?width=1200&height=1200&aspect=true"
    ],
    categoria: "accesorios",
    stock: { "Único": 30 },
    destacado: true
  },
  {
    nombre: "Gorra Argentina",
    descripcion: "Gorra oficial de la Selección Argentina con cierre a presión.",
    precio: 49999,
    imagen: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/85cb67de52504f66a94c03c25ca2c4f8_9366/Gorra_con_cierre_a_presion_Seleccion_Argentina_26_Azul_KE1380_01_00_standard.jpg",
    imagenes: [
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/c38dda432efe427fac42275f8acff3e0_9366/Gorra_con_cierre_a_presion_Seleccion_Argentina_26_Azul_KE1380_02_standard_hover.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/80b2176e63684489b8e1c80d71b8ace2_9366/Gorra_con_cierre_a_presion_Seleccion_Argentina_26_Azul_KE1380_41_detail.jpg"
    ],
    categoria: "accesorios",
    stock: { "Único": 45 },
    destacado: true
  },
  {
    nombre: "Piluso Terrex Xperior",
    descripcion: "Piluso Terrex Xperior ideal para el sol y la exploración urbana.",
    precio: 74999,
    imagen: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/f7cdf5540bd4484ebecfbfc1fb2ef931_9366/Piluso_Terrex_Xperior_Beige_JY5687_01_00_standard.jpg",
    imagenes: [
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/9750c8affc72454f8035aca24eb1abfe_9366/Piluso_Terrex_Xperior_Beige_JY5687_02_standard_hover_hover.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/05f1df8c35f448fbaba63adefba97cbd_9366/Piluso_Terrex_Xperior_Beige_JY5687_41_detail_hover.jpg"
    ],
    categoria: "accesorios",
    stock: { "Único": 12 },
    destacado: false
  },
  {
    nombre: "Jordan Essentials Cap",
    descripcion: "Gorra Jordan Essentials Cap, detalle de Jumpman metálico.",
    precio: 38999,
    imagen: "https://nikearprod.vtexassets.com/arquivos/ids/1284120-1200-1200?width=1200&height=1200&aspect=true",
    imagenes: ["https://nikearprod.vtexassets.com/arquivos/ids/1285008-1200-1200?width=1200&height=1200&aspect=true"],
    categoria: "accesorios",
    stock: { "Único": 28 },
    destacado: false
  },
  {
    nombre: "Gorra Adicolor Classic",
    descripcion: "Gorra Adicolor Classic Trefoil, el complemento básico de tu look.",
    precio: 49999,
    imagen: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/714b6f4c2adf458ba8ed6bca0c72178b_9366/Gorra_Adicolor_Classic_Trefoil_Baseball_Negro_JC6023_01_00_standard.jpg",
    imagenes: [
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/c8902b47a66b4c9cba83f3c57b82805e_9366/Gorra_Adicolor_Classic_Trefoil_Baseball_Negro_JC6023_02_standard_hover.jpg",
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/107b37129c8842158670230a24a3cd4d_9366/Gorra_Adicolor_Classic_Trefoil_Baseball_Negro_JC6023_41_detail_hover.jpg"
    ],
    categoria: "accesorios",
    stock: { "Único": 50 },
    destacado: false
  }
];

const seedDB = async () => {
  try {
    // 1. Nos conectamos a Mongo
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔌 Conectado a MongoDB para el Seeding...");

    // 2. Opcional: Borramos los productos anteriores para no tener duplicados
    await Product.deleteMany({});
    console.log("🗑️  Catálogo anterior eliminado.");

    // 3. Insertamos el array completo
    await Product.insertMany(productosSTRETEAT);
    console.log("✅ ¡Catálogo de STRETEAT inyectado con éxito!");

    // 4. Cerramos la conexión
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error en el Seeding:", error);
    process.exit(1);
  }
};

seedDB();