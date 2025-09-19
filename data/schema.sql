CREATE TYPE Occupation as ENUM (
  'ESTUDIANTE',
  'TRABAJADOR'
);

-- No agregamos temas de login todavía, porque vamos a usar
-- una librería que ya lo maneja.
CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "age" SMALLINT NOT NULL,
  "occupation" Occupation NULL DEFAULT NULL,
  "is_mexican" BOOLEAN NOT NULL DEFAULT TRUE,
  -- Esta propiedad es importante por si queremos ofrecer descuentos a personas nuevas
  "created_at" TIMESTAMP NOT NULL DEFAULT now()
);

-- Son las paradas en las cuales se recogen pasajeros
CREATE TABLE "stop" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "latitude" DECIMAL(8, 6) NOT NULL,
  "longitude" DECIMAL(9, 6) NOT NULL
);

CREATE TYPE TransportSystem as ENUM (
  'CAMIÓN',
  'METROBÚS',
  'AUTOBÚS',
  'TROLEBÚS',
  'TELEFÉRICO',
  'RTP',
  'COMBI',
  'METRO',
  'TAXI',
  'TREN_LIGERO',
  'TREN_INTERURBANO',
  'BICYCLE'
);

CREATE TYPE PriceModel as ENUM (
  'PAGO_POR_PARADA',
  'PAGO_ÚNICO'
);

CREATE TABLE "route" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "transport_system" TransportSystem NOT NULL,

   -- necesitamos dividir entre 100 cuando trabajemos con dinero
  "price_in_cents" INT NOT NULL,
  "price_model" PriceModel NOT NULL
);

-- Esta tabla será una relación many-to-many que conectará
-- las rutas con las paradas.
-- El order es el número de parada en la ruta. El order tiene
-- que estar espaciado por 100 por si queremos reordenar, agregar
-- o eliminar 
CREATE TABLE "route_stop" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "route_id" INT NOT NULL,
  "stop_id" INT NOT NULL,
  "order" SMALLINT NOT NULL 
);

ALTER TABLE "route_stop" ADD FOREIGN KEY ("route_id") REFERENCES "route";
ALTER TABLE "route_stop" ADD FOREIGN KEY ("stop_id") REFERENCES "stop";

-- Esta tabla probablemente requerirá ser más complejo
-- débido a que es la entidad en la que se manejan los
-- pagos de open payments
CREATE TABLE "trip" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "route" INT NOT NULL,
  "from" INT NULL,

  -- "to" puede ser nulo porque no sabemos con exactitud
  -- donde baja el usuario. Aunque podemos usar un sistema
  -- de ubicación para aproximar en qué parada se bajó.
  "to" INT NOT NULL,

  "user_id" INT NOT NULL,

  -- recuerda multiplicar por 100 al insertar
  "total_cents" INT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT now()
);

ALTER TABLE "trip" ADD FOREIGN KEY ("route") REFERENCES "route";
ALTER TABLE "trip" ADD FOREIGN KEY ("from") REFERENCES "stop";
ALTER TABLE "trip" ADD FOREIGN KEY ("to") REFERENCES "stop";
ALTER TABLE "trip" ADD FOREIGN KEY ("user_id") REFERENCES "user";
