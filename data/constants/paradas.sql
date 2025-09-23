-- Paradas Línea 1
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Observatorio', 19.3901, -99.2595),
('Tacubaya', 19.4022, -99.1865),
('Juanacatlán', 19.4172, -99.1731),
('Chapultepec', 19.4260, -99.1605),
('Sevilla', 19.4335, -99.1490),
('Insurgentes', 19.4363, -99.1424),
('Cuauhtémoc', 19.4285, -99.1428),
('Balderas', 19.4162, -99.1411),
('Niños Héroes', 19.4048, -99.1362),
('Hospital General', 19.3965, -99.1322),
('Centro Médico', 19.3913, -99.1313),
('Etiopía-Plaza de la Transparencia', 19.3842, -99.1302),
('Eugenia', 19.3750, -99.1300),
('División del Norte', 19.3661, -99.1298),
('Zapata', 19.3582, -99.1291),
('Coyoacán', 19.3500, -99.1269),
('Viveros', 19.3390, -99.1219),
('Miguel Ángel de Quevedo', 19.3283, -99.1180),
('Copilco', 19.3200, -99.1210),
('Universidad', 19.3200, -99.1870),
('Pantitlán', 19.3980, -99.0720);

-- Ruta_parada Línea 1
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(1, 1, 100),
(1, 2, 200),
(1, 3, 300),
(1, 4, 400),
(1, 5, 500),
(1, 6, 600),
(1, 7, 700),
(1, 8, 800),
(1, 9, 900),
(1, 10, 1000),
(1, 11, 1100),
(1, 12, 1200),
(1, 13, 1300),
(1, 14, 1400),
(1, 15, 1500),
(1, 16, 1600),
(1, 17, 1700),
(1, 18, 1800),
(1, 19, 1900),
(1, 20, 2000),
(1, 21, 2100);

-- Paradas Línea 2
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Cuatro Caminos', 19.4593, -99.2154),
('Panteones', 19.4560, -99.2032),
('Tacuba', 19.4594, -99.1883),
('Cuitláhuac', 19.4572, -99.1811),
('Popotla', 19.4540, -99.1756),
('Colegio Militar', 19.4489, -99.1736),
('Normal', 19.4445, -99.1714),
('San Cosme', 19.4401, -99.1646),
('Revolución', 19.4358, -99.1640),
('Hidalgo', 19.4355, -99.1505),
('Bellas Artes', 19.4340, -99.1411),
('Allende', 19.4351, -99.1374),
('Zócalo/Tenochtitlan', 19.4326, -99.1332),
('Pino Suárez', 19.4271, -99.1332),
('San Antonio Abad', 19.4215, -99.1337),
('Chabacano', 19.4146, -99.1328),
('Viaducto', 19.4043, -99.1320),
('Xola', 19.3972, -99.1321),
('Villa de Cortés', 19.3890, -99.1322),
('Nativitas', 19.3808, -99.1323),
('Portero', 19.3736, -99.1324), -- Nombre correcto: Portero → Portero en algunos mapas, pero es "Portero" oficial
('Ermita', 19.3664, -99.1326),
('General Anaya', 19.3548, -99.1371),
('Tasqueña', 19.3432, -99.1417);

-- Ruta_parada Línea 2
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(2, 21, 100),
(2, 22, 200),
(2, 23, 300),
(2, 24, 400),
(2, 25, 500),
(2, 26, 600),
(2, 27, 700),
(2, 28, 800),
(2, 29, 900),
(2, 30, 1000),
(2, 31, 1100),
(2, 32, 1200),
(2, 33, 1300),
(2, 34, 1400),
(2, 35, 1500),
(2, 36, 1600),
(2, 37, 1700),
(2, 38, 1800),
(2, 39, 1900),
(2, 40, 2000),
(2, 41, 2100),
(2, 42, 2200),
(2, 43, 2300),
(2, 44, 2400);

-- Paradas Línea 3
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Indios Verdes', 19.4954, -99.1195),
('Deportivo 18 de Marzo', 19.4819, -99.1278),
('Potrero', 19.4747, -99.1297),
('La Raza', 19.4636, -99.1331),
('Tlatelolco', 19.4499, -99.1400),
('Guerrero', 19.4451, -99.1472),
('Hidalgo', 19.4355, -99.1505),
('Juárez', 19.4320, -99.1462),
('Balderas', 19.4243, -99.1527),
('Niños Héroes', 19.4175, -99.1523),
('Hospital General', 19.4119, -99.1522),
('Centro Médico', 19.4063, -99.1520),
('Etiopía-Plaza de la Transparencia', 19.3977, -99.1520),
('Eugenia', 19.3907, -99.1520),
('División del Norte', 19.3836, -99.1520),
('Zapata', 19.3766, -99.1521),
('Coyoacán', 19.3695, -99.1523),
('Viveros-Derechos Humanos', 19.3612, -99.1525),
('Miguel Ángel de Quevedo', 19.3530, -99.1527),
('Copilco', 19.3435, -99.1620),
('Universidad', 19.3355, -99.1660);

-- Ruta_parada Línea 3
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(3, 45, 100),
(3, 46, 200),
(3, 47, 300),
(3, 48, 400),
(3, 49, 500),
(3, 50, 600),
(3, 51, 700),
(3, 52, 800),
(3, 53, 900),
(3, 54, 1000),
(3, 55, 1100),
(3, 56, 1200),
(3, 57, 1300),
(3, 58, 1400),
(3, 59, 1500),
(3, 60, 1600),
(3, 61, 1700),
(3, 62, 1800),
(3, 63, 1900),
(3, 64, 2000),
(3, 65, 2100);

-- Paradas Línea 4
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Martín Carrera', 19.4833, -99.0997),
('Talismán', 19.4742, -99.1036),
('Bondojito', 19.4686, -99.1063),
('Consulado', 19.4588, -99.1121),
('Canal del Norte', 19.4486, -99.1177),
('Morelos', 19.4412, -99.1205),
('Candelaria', 19.4276, -99.1197),
('Fray Servando', 19.4247, -99.1214),
('Jamaica', 19.4105, -99.1217),
('Santa Anita', 19.4058, -99.1219);

-- Ruta_parada Línea 4
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(4, 66, 100),
(4, 67, 200),
(4, 68, 300),
(4, 69, 400),
(4, 70, 500),
(4, 71, 600),
(4, 72, 700),
(4, 73, 800),
(4, 74, 900),
(4, 75, 1000);

-- Paradas Línea 5
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Pantitlán', 19.4159, -99.0724),
('Hangares', 19.4193, -99.0823),
('Terminal Aérea', 19.4322, -99.0886),
('Oceanía', 19.4453, -99.0966),
('Aragón', 19.4506, -99.1020),
('Eduardo Molina', 19.4591, -99.1037),
('Consulado', 19.4588, -99.1121),
('Valle Gómez', 19.4535, -99.1191),
('Misterios', 19.4607, -99.1237),
('La Raza', 19.4636, -99.1331),
('Autobuses del Norte', 19.4754, -99.1395),
('Instituto del Petróleo', 19.4902, -99.1439),
('Politécnico', 19.5039, -99.1480);

-- Ruta_parada Línea 5
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(5, 76, 100),
(5, 77, 200),
(5, 78, 300),
(5, 79, 400),
(5, 80, 500),
(5, 81, 600),
(5, 82, 700),
(5, 83, 800),
(5, 84, 900),
(5, 85, 1000),
(5, 86, 1100),
(5, 87, 1200),
(5, 88, 1300);

-- Paradas Línea 6
INSERT INTO parada (nombre, latitud, longitud) VALUES
('El Rosario', 19.5046, -99.2006),
('Tezozómoc', 19.4957, -99.1958),
('UAM-Azcapotzalco', 19.4908, -99.1897),
('Ferrería/Arena Ciudad de México', 19.4874, -99.1815),
('Norte 45', 19.4843, -99.1739),
('Vallejo', 19.4825, -99.1674),
('Instituto del Petróleo', 19.4902, -99.1439),
('Lindavista', 19.4895, -99.1342),
('Deportivo 18 de Marzo', 19.4819, -99.1278),
('La Villa-Basílica', 19.4763, -99.1199),
('Martín Carrera', 19.4833, -99.0997);

-- Ruta_parada Línea 6
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(6, 89, 100),
(6, 90, 200),
(6, 91, 300),
(6, 92, 400),
(6, 93, 500),
(6, 94, 600),
(6, 95, 700),
(6, 96, 800),
(6, 97, 900),
(6, 98, 1000),
(6, 99, 1100);

-- Paradas Línea 7
INSERT INTO parada (nombre, latitud, longitud) VALUES
('El Rosario', 19.5046, -99.2006),
('Aquiles Serdán', 19.4900, -99.1900),
('Camarones', 19.4843, -99.1830),
('Refinería', 19.4753, -99.1773),
('Tacuba', 19.4594, -99.1883),
('San Joaquín', 19.4505, -99.1911),
('Polanco', 19.4337, -99.1914),
('Auditorio', 19.4265, -99.1912),
('Constituyentes', 19.4147, -99.1918),
('Tacubaya', 19.4039, -99.1872),
('San Pedro de los Pinos', 19.3952, -99.1842),
('San Antonio', 19.3875, -99.1871),
('Mixcoac', 19.3765, -99.1876),
('Barranca del Muerto', 19.3616, -99.1890);

-- Ruta_parada Línea 7
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(7, 100, 100),
(7, 101, 200),
(7, 102, 300),
(7, 103, 400),
(7, 104, 500),
(7, 105, 600),
(7, 106, 700),
(7, 107, 800),
(7, 108, 900),
(7, 109, 1000),
(7, 110, 1100),
(7, 111, 1200),
(7, 112, 1300),
(7, 113, 1400);

-- Paradas Línea 8
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Garibaldi/Lagunilla', 19.4415, -99.1391),
('Bellas Artes', 19.4340, -99.1411),
('San Juan de Letrán', 19.4290, -99.1422),
('Salto del Agua', 19.4260, -99.1461),
('Doctores', 19.4205, -99.1505),
('Obrera', 19.4158, -99.1459),
('Chabacano', 19.4146, -99.1328),
('La Viga', 19.4080, -99.1227),
('Santa Anita', 19.4058, -99.1219),
('Coyuya', 19.3972, -99.1213),
('Iztacalco', 19.3897, -99.1196),
('Apatlaco', 19.3844, -99.1176),
('Aculco', 19.3776, -99.1155),
('Escuadrón 201', 19.3707, -99.1133),
('Atlalilco', 19.3618, -99.1111),
('Iztapalapa', 19.3570, -99.1030),
('Cerro de la Estrella', 19.3482, -99.0996),
('UAM-I', 19.3350, -99.0969),
('Constitución de 1917', 19.3266, -99.0896);

-- Ruta_parada Línea 8
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(8, 114, 100),
(8, 115, 200),
(8, 116, 300),
(8, 117, 400),
(8, 118, 500),
(8, 119, 600),
(8, 120, 700),
(8, 121, 800),
(8, 122, 900),
(8, 123, 1000),
(8, 124, 1100),
(8, 125, 1200),
(8, 126, 1300),
(8, 127, 1400),
(8, 128, 1500),
(8, 129, 1600),
(8, 130, 1700),
(8, 131, 1800),
(8, 132, 1900);

-- Paradas Línea 9
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Pantitlán', 19.4152, -99.0719),
('Puebla', 19.4116, -99.0998),
('Iztacalco', 19.4003, -99.1090),
('Ciudad Deportiva', 19.4046, -99.0985),
('Velódromo', 19.4007, -99.1032),
('Mixiuhca', 19.3946, -99.1106),
('Jamaica', 19.4061, -99.1221),
('Chabacano', 19.4146, -99.1328),
('Lázaro Cárdenas', 19.4215, -99.1413),
('Centro Médico', 19.3913, -99.1313),
('Chilpancingo', 19.4066, -99.1640),
('Patriotismo', 19.4028, -99.1762),
('Tacubaya', 19.4022, -99.1865);

-- Ruta_parada Línea 9
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(9, 133, 100),
(9, 134, 200),
(9, 135, 300),
(9, 136, 400),
(9, 137, 500),
(9, 138, 600),
(9, 139, 700),
(9, 140, 800),
(9, 141, 900),
(9, 142, 1000),
(9, 143, 1100),
(9, 144, 1200),
(9, 145, 1300);

-- Paradas Línea B
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Buenavista', 19.4451, -99.1502),
('Guerrero', 19.4459, -99.1526),
('Garibaldi-Lagunilla', 19.4415, -99.1391),
('Lagunilla', 19.4457, -99.1347),
('Tepito', 19.4450, -99.1235),
('Morelos', 19.4412, -99.1190),
('San Lázaro', 19.4306, -99.1196),
('Ricardo Flores Magón', 19.4456, -99.1110),
('Romero Rubio', 19.4480, -99.1040),
('Oceanía', 19.4337, -99.0965),
('Deportivo Oceanía', 19.4498, -99.0884),
('Bosque de Aragón', 19.4585, -99.0812),
('Villa de Aragón', 19.4700, -99.0746),
('Nezahualcóyotl', 19.4861, -99.0697),
('Impulsora', 19.4952, -99.0596),
('Río de los Remedios', 19.5004, -99.0526),
('Múzquiz', 19.5062, -99.0462),
('Ecatepec', 19.5134, -99.0308),
('Olímpica', 19.5204, -99.0234),
('Plaza Aragón', 19.5312, -99.0140),
('Ciudad Azteca', 19.5374, -99.0032);

-- Ruta_parada Línea B
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(10, 146, 100),
(10, 147, 200),
(10, 148, 300),
(10, 149, 400),
(10, 150, 500),
(10, 151, 600),
(10, 152, 700),
(10, 153, 800),
(10, 154, 900),
(10, 155, 1000),
(10, 156, 1100),
(10, 157, 1200),
(10, 158, 1300),
(10, 159, 1400),
(10, 160, 1500),
(10, 161, 1600),
(10, 162, 1700),
(10, 163, 1800),
(10, 164, 1900),
(10, 165, 2000),
(10, 166, 2100);

-- Paradas Línea A
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Pantitlán', 19.4152, -99.0719),
('Agrícola Oriental', 19.4064, -99.0641),
('Canal de San Juan', 19.3968, -99.0553),
('Tepalcates', 19.3890, -99.0482),
('Guelatao', 19.3842, -99.0398),
('Peñón Viejo', 19.3815, -99.0314),
('Acatitla', 19.3759, -99.0226),
('Santa Marta', 19.3699, -99.0142),
('Los Reyes', 19.3584, -98.9989),
('La Paz', 19.3505, -98.9805);

-- Ruta_parada Línea A
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(11, 167, 100),
(11, 168, 200),
(11, 169, 300),
(11, 170, 400),
(11, 171, 500),
(11, 172, 600),
(11, 173, 700),
(11, 174, 800),
(11, 175, 900),
(11, 176, 1000);

-- Paradas Línea 12
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Tláhuac', 19.2861, -99.0147),
('Tlaltenco', 19.2942, -99.0251),
('Zapotitlán', 19.3028, -99.0346),
('Nopalera', 19.3089, -99.0444),
('Olivos', 19.3154, -99.0536),
('Tezonco', 19.3199, -99.0614),
('Periférico Oriente', 19.3244, -99.0702),
('Calle 11', 19.3310, -99.0794),
('Lomas Estrella', 19.3368, -99.0859),
('San Andrés Tomatlán', 19.3442, -99.0918),
('Culhuacán', 19.3522, -99.0972),
('Atlalilco', 19.3618, -99.1111),
('Mexicaltzingo', 19.3627, -99.1236),
('Ermita', 19.3575, -99.1345),
('Eje Central', 19.3579, -99.1419),
('Parque de los Venados', 19.3615, -99.1468),
('Zapata', 19.3582, -99.1291),
('Hospital 20 de Noviembre', 19.3703, -99.1572),
('Insurgentes Sur', 19.3736, -99.1661),
('Mixcoac', 19.3763, -99.1870);

-- Ruta_parada Línea 12
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(12, 177, 100),
(12, 178, 200),
(12, 179, 300),
(12, 180, 400),
(12, 181, 500),
(12, 182, 600),
(12, 183, 700),
(12, 184, 800),
(12, 185, 900),
(12, 186, 1000),
(12, 187, 1100),
(12, 188, 1200),
(12, 189, 1300),
(12, 190, 1400),
(12, 191, 1500),
(12, 192, 1600),
(12, 193, 1700),
(12, 194, 1800),
(12, 195, 1900),
(12, 196, 2000);
-- Nota: Las líneas 1 a 12 y B corresponden a las líneas del Metro de la Ciudad de México.o

-- MetroBus
-- Paradas Línea 1
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Indios Verdes', 19.496853351807463, -99.11971262485865),
('Dep. 18 de Marzo', 19.486285379281284, -99.12453169877706),
('Eúzkaro', 19.482519101724726, -99.12763223387697),
('Potrero', 19.476638471332368, -99.13246823843683),
('La Raza', 19.468700050075963, -99.13898666414428),
('Circuito', 19.462612766654022, -99.14400676821562),
('El Caminero', 19.27931377110038, -99.16907765168787);

-- Ruta_parada Línea 1
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(1, 1, 1),
(1, 2, 2),
(1, 3, 3),
(1, 4, 4),
(1, 5, 5),
(1, 6, 6),
(1, 7, 7);

-- Nota: La Línea 1 del Metrobús cuenta con 45 paradas en total
-- Paradas Línea 2
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Parque Lira', 19.407793172832058, -99.1891043635208),
('Tepalcates', 19.390767861575902, -99.04761259244655),
('Tacubaya', 19.40199476042971, -99.18700776326118),
('Antonio Maceo', 19.4048746245951, -99.18590086578114),
('De la Salle', 19.407589548910526, -99.18350884873917),
('Patriotismo', 19.40556676448849, -99.17737148120327),
('Escandón', 19.404409851760686, -99.1738288990292);

-- Ruta_parada Línea 2
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(2, 1, 1),
(2, 2, 2),
(2, 3, 3),
(2, 4, 4),
(2, 5, 5),
(2, 6, 6),
(2, 7, 7);

-- Nota: La Línea 2 del Metrobús cuenta con 37 paradas en total
-- Paradas Línea 3
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Tenayuca', 19.5286169823938, -99.17011135799122),
('Pueblo Sta. Cruz Atoyac', 19.371569277530458, -99.16100881216738),
('S. J. de la Escalera', 19.5227187693797, -99.16555534825103),
('Progreso Nacional', 19.519688433851808, -99.16377197209003),
('Tres Anegas', 19.51550543826689, -99.16193283006699),
('Júpiter', 19.508614111481233, -99.1592357567791),
('La Patera', 19.503663641847012, -99.15726666835555);

-- Ruta_parada Línea 3
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(3, 1, 1),
(3, 2, 2),
(3, 3, 3),
(3, 4, 4),
(3, 5, 5),
(3, 6, 6),
(3, 7, 7);

-- Nota: La Línea 3 del Metrobús cuenta con 38 paradas en total
-- Paradas Línea 4
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Plaza de la República', 19.436804, -99.154138),
('Alameda Oriente', 19.4307516, -99.0532703),
('Plaza de la República', 19.437128, -99.153982),
('Amajac', 19.434159, -99.153532),
('México Tenochtitlan', 19.438641, -99.153457),
('Amajac', 19.435014, -99.153371),
('México Tenochtitlan', 19.439025, -99.153269);

-- Ruta_parada Línea 4
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(4, 1, 1),
(4, 2, 2),
(4, 3, 3),
(4, 4, 4),
(4, 5, 5),
(4, 6, 6),
(4, 7, 7);

-- Nota: La Línea 4 del Metrobús cuenta con 66 paradas en total
-- Paradas Línea 5
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Río de Los Remedios', 19.507111490097344, -99.08593450039032),
('Preparatoria 1', 19.27337399733259, -99.1207959232013),
('314 M. New''s Divine', 19.500606215084737, -99.08872828160582),
('5 de Mayo', 19.497090158579475, -99.09017761443822),
('Vasco de Quiroga', 19.493296020128245, -99.09178273408934),
('El Coyol', 19.48753788436704, -99.09417599898956),
('Preparatoria 3', 19.483362132501473, -99.09600930284314);

-- Ruta_parada Línea 5
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(5, 1, 1),
(5, 2, 2),
(5, 3, 3),
(5, 4, 4),
(5, 5, 5),
(5, 6, 6),
(5, 7, 7);

-- Nota: La Línea 5 del Metrobús cuenta con 51 paradas en total
-- Paradas Línea 6
INSERT INTO parada (nombre, latitud, longitud) VALUES
('El Rosario', 19.50716631284481, -99.19954567196123),
('Villa de Aragón', 19.464921728470635, -99.05951753909282),
('C. de Bachilleres 1', 19.51163711523765, -99.19731457976131),
('De Las Culturas', 19.510944816535513, -99.19260534067485),
('F.F.C.C. Nacionales', 19.50487347822404, -99.18859764733908),
('UAM Azcapotzalco', 19.504008672336422, -99.18398723579402),
('Tecnoparque', 19.502473142993285, -99.17887631199247);

-- Ruta_parada Línea 6
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(6, 1, 1),
(6, 2, 2),
(6, 3, 3),
(6, 4, 4),
(6, 5, 5),
(6, 6, 6),
(6, 7, 7);

-- Nota: La Línea 6 del Metrobús cuenta con 37 paradas en total
-- Paradas Línea 7
INSERT INTO parada (nombre, latitud, longitud) VALUES
('Indios Verdes', 19.493039918074693, -99.12101265908572),
('Alameda Tacubaya', 19.40148534150958, -99.18591745888253),
('Hospital Infantil La Villa', 19.48727845482721, -99.1137844649315),
('De Los Misterios', 19.48699198907555, -99.11792283467751),
('Gustavo A. Madero', 19.483547744379912, -99.11392804511135),
('Garrido', 19.483248207318105, -99.11934970352202),
('Av. Talismán', 19.478675139039872, -99.12107849358654);

-- Ruta_parada Línea 7
INSERT INTO ruta_parada (ruta_id, parada_id, orden) VALUES
(7, 1, 1),
(7, 2, 2),
(7, 3, 3),
(7, 4, 4),
(7, 5, 5),
(7, 6, 6),
(7, 7, 7);

-- Nota: La Línea 7 del Metrobús cuenta con 48 paradas en total
