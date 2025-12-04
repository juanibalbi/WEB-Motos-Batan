import { Bike } from './types';

// Contact Configuration
export const GOOGLE_FORM_URL = 'https://forms.gle/7q3jTaAceoVPZbYA8';
export const INSTAGRAM_URL = 'https://www.instagram.com/mb.motosbatan';
export const FACEBOOK_URL = 'https://www.facebook.com/moto.batan?sfnsn=scwspwa';

// Phone Numbers
export const PHONE_SALES = '5492235433958';
export const PHONE_WORKSHOP = '5492235401224';

export const WHATSAPP_SALES_URL = `https://wa.me/${PHONE_SALES}`;
export const WHATSAPP_WORKSHOP_URL = `https://wa.me/${PHONE_WORKSHOP}`;

// Upload API
// NOTA: Si estás en localhost, esta URL debe apuntar a tu servidor real o a un localhost PHP.
// Al subir a DonWeb, como el archivo estará en el mismo dominio, funcionará bien.
// Puedes cambiar esto a '/upload.php' para usar rutas relativas una vez subido a producción.
export const UPLOAD_API_URL = 'https://motosbatan.com/upload.php'; 

// Helper to provide fallbacks if external images break
const PLACEHOLDER_IMG = 'https://placehold.co/600x400/png?text=Moto+Sin+Imagen';

export const INITIAL_BIKES: Bike[] = [
  // CORVEN
  { 
    id: '1', 
    brand: 'CORVEN', 
    model: 'DAX 70 C', 
    imageUrl: 'https://corvenmotos.com.ar/wp-content/uploads/2020/09/Energy-Dax-70-Roja-2021.png' 
  },
  { 
    id: '2', 
    brand: 'CORVEN', 
    model: 'TRIAX 150 C', 
    imageUrl: 'https://corvenmotos.com.ar/wp-content/uploads/2021/08/Triax-150-R3-Blanca-2021.png' 
  },
  { 
    id: '3', 
    brand: 'CORVEN', 
    model: 'MIRAGE 110 C', 
    imageUrl: 'https://corvenmotos.com.ar/wp-content/uploads/2020/09/Mirage-110-AD-Azul-2021.png' 
  },
  { 
    id: '4', 
    brand: 'CORVEN', 
    model: 'ENERGY TUNNING', 
    imageUrl: 'https://corvenmotos.com.ar/wp-content/uploads/2022/11/Energy-110-Tuning-R2-2023.png' 
  },
  
  // ROUSER
  { 
    id: '5', 
    brand: 'ROUSER', 
    model: 'NS250 C', 
    imageUrl: 'https://corvenmotos.com.ar/wp-content/uploads/2022/08/Rouser-N250-Roja.png' 
  },
  { 
    id: '6', 
    brand: 'ROUSER', 
    model: 'DOMINAR 400 C', 
    imageUrl: 'https://corvenmotos.com.ar/wp-content/uploads/2019/11/Dominar-D400-Verde-2019.png' 
  },
  { 
    id: '7', 
    brand: 'ROUSER', 
    model: 'NS200 C', 
    imageUrl: 'https://corvenmotos.com.ar/wp-content/uploads/2017/02/Rouser-NS-200-Fi-Gris-Piedra.png' 
  },

  // SUZUKI
  { 
    id: '8', 
    brand: 'SUZUKI', 
    model: 'EN 125 C', 
    imageUrl: 'https://suzukimotos.com.ar/wp-content/uploads/2019/07/EN125-2A-NEGRA.png' 
  },
  { 
    id: '9', 
    brand: 'SUZUKI', 
    model: 'GN 125 C', 
    imageUrl: 'https://suzukimotos.com.ar/wp-content/uploads/2019/07/GN125F-NEGRA.png' 
  },
  { 
    id: '10', 
    brand: 'SUZUKI', 
    model: 'AX 100 C', 
    imageUrl: 'https://suzukimotos.com.ar/wp-content/uploads/2019/07/AX100-ROJA.png' 
  },

  // ZANELLA
  { 
    id: '11', 
    brand: 'ZANELLA', 
    model: 'ZB 110 C', 
    imageUrl: 'https://zanella.com.ar/wp-content/uploads/2021/10/ZB-110-LT-White-2021.png' 
  },
  { 
    id: '12', 
    brand: 'ZANELLA', 
    model: 'ZR 250 C', 
    imageUrl: 'https://zanella.com.ar/wp-content/uploads/2021/10/ZR-250-OHC-White-2021.png' 
  },
  { 
    id: '13', 
    brand: 'ZANELLA', 
    model: 'STYLER 150 C', 
    imageUrl: 'https://zanella.com.ar/wp-content/uploads/2021/10/Styler-150-RS-White-2021.png' 
  },

  // MOTOMEL
  { 
    id: '14', 
    brand: 'MOTOMEL', 
    model: 'DLX 110 C', 
    imageUrl: 'https://motomel.com.ar/wp-content/uploads/2020/08/DLX-110-DELUXE-GRIS.png' 
  },
  { 
    id: '15', 
    brand: 'MOTOMEL', 
    model: 'BLITZ 110 C', 
    imageUrl: 'https://motomel.com.ar/wp-content/uploads/2023/04/Blitz-110-V8-Full-Azul.png' 
  },
  { 
    id: '16', 
    brand: 'MOTOMEL', 
    model: 'SKUA 150 C', 
    imageUrl: 'https://motomel.com.ar/wp-content/uploads/2020/08/SKUA-150-SILVER-V6-AZUL.png' 
  },

  // MONDIAL
  { 
    id: '17', 
    brand: 'MONDIAL', 
    model: 'MAX 110 C', 
    imageUrl: 'https://mondial.com.ar/wp-content/uploads/2020/09/MAX-110-RT-AZUL.png' 
  },
  { 
    id: '18', 
    brand: 'MONDIAL', 
    model: 'LD Llanta Aleación 110 C', 
    imageUrl: 'https://mondial.com.ar/wp-content/uploads/2020/09/LD-110-MAX-RT-ROJA.png' 
  },
  { 
    id: '19', 
    brand: 'MONDIAL', 
    model: 'TD 150 C', 
    imageUrl: 'https://mondial.com.ar/wp-content/uploads/2020/09/TD-150-L-BLANCA.png' 
  },
  { 
    id: '20', 
    brand: 'MONDIAL', 
    model: 'RD 150 C', 
    imageUrl: 'https://mondial.com.ar/wp-content/uploads/2020/09/RD-150-RT-NEGRA.png' 
  },

  // GILERA
  { 
    id: '21', 
    brand: 'GILERA', 
    model: 'SMX 250 C', 
    imageUrl: 'https://gilera.com.ar/wp-content/uploads/2020/10/SMX-250-PRO-Blanca.png' 
  },
  { 
    id: '22', 
    brand: 'GILERA', 
    model: 'TUNING 110 C', 
    imageUrl: 'https://gilera.com.ar/wp-content/uploads/2020/10/Smash-Tuning-R-Azul.png' 
  },
  { 
    id: '23', 
    brand: 'GILERA', 
    model: 'VC 150 C', 
    imageUrl: 'https://gilera.com.ar/wp-content/uploads/2020/10/VC150-Power-R-Azul.png' 
  },
  { 
    id: '24', 
    brand: 'GILERA', 
    model: 'R 110 C', 
    imageUrl: 'https://gilera.com.ar/wp-content/uploads/2020/10/Smash-R-Roja.png' 
  },
  { 
    id: '25', 
    brand: 'GILERA', 
    model: '125 X', 
    imageUrl: 'https://gilera.com.ar/wp-content/uploads/2022/05/VC-125-VS-Negra.png' 
  },
  { 
    id: '26', 
    brand: 'GILERA', 
    model: 'SMASH 110 C', 
    imageUrl: 'https://gilera.com.ar/wp-content/uploads/2020/10/Smash-VS-R-Azul.png' 
  },
];

export const BRANDS = ['CORVEN', 'ROUSER', 'SUZUKI', 'ZANELLA', 'MOTOMEL', 'MONDIAL', 'GILERA'];