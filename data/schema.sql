-- Diagrama entidad-relación:
-- https://dbdiagram.io/d/68cdc023960f6d821afb6975

CREATE TYPE Ocupacion as ENUM (
  'ESTUDIANTE',
  'TRABAJADOR'
);

-- No agregamos temas de inicio de sesión todavía, porque vamos a usar
-- una librería que ya lo maneja.
CREATE TABLE "usuario" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nombre" VARCHAR(80) NOT NULL,
  "edad" SMALLINT NOT NULL,
  "ocupacion" Ocupacion NULL DEFAULT NULL,
  "es_mexicano" BOOLEAN NOT NULL DEFAULT TRUE,

  -- Para propósitos de "Open Payments"
  "payment_pointer" VARCHAR(255) NOT NULL,
  "wallet_address" VARCHAR(255) NOT NULL,

  -- Esta propiedad es importante por si queremos ofrecer descuentos a personas nuevas
  "creado_en" TIMESTAMP NOT NULL DEFAULT now()
);

-- Esto es para
-- Transporte público gestionado por privados
CREATE TABLE "conductor" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nombre" VARCHAR(80) NOT NULL,

  -- Para propósitos de "Open Payments"
  "payment_pointer" VARCHAR(255) NOT NULL,
  "wallet_address" VARCHAR(255) NOT NULL
);

-- Son las paradas en las cuales se recogen pasajeros
-- Esto es para
-- Transporte público gestionado por gobierno
CREATE TABLE "parada" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nombre" VARCHAR(50) NOT NULL,
  "latitud" DECIMAL(8, 6) NOT NULL,
  "longitud" DECIMAL(9, 6) NOT NULL
);

-- Esto nos ayudará a saber a quién le corresponde la
-- verificación del pago, cómo se da acceso, y también
-- a quién se destina el dinero recolectado por los viajes.
CREATE TYPE ResponsableSistemaTransporte as ENUM (
  'GOBIERNO',
  'CONDUCTOR'
);

CREATE TABLE "sistema_transporte" (
  "id" SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nombre" VARCHAR(50) NOT NULL,
  "indicaciones_usuario" VARCHAR(255) NOT NULL,

  -- ayudará a saber si requiere actualización optimista
  -- si el responsable es gobierno sabemos que es un 
  -- sistema de transporte colectivo
  "responsable" ResponsableSistemaTransporte NOT NULL
);

CREATE TYPE ModeloPrecio as ENUM (
  'PAGO_POR_KM',
  'PAGO_UNICO'
);

CREATE TABLE "ruta" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "identificador_local" VARCHAR(64) NOT NULL, -- por ejemplo Linea 2 (Cuatro Caminos - Tasqueña)
  "sistema_transporte_id" SMALLINT NOT NULL,

   -- necesitamos dividir entre 100 cuando trabajemos con dinero
  "precio_centavos" INT NOT NULL,
  "modelo_precio" ModeloPrecio NOT NULL
);

ALTER TABLE "ruta" ADD FOREIGN KEY ("sistema_transporte_id") REFERENCES "sistema_transporte";

-- Esta tabla será una relación muchos-a-muchos que conectará
-- las rutas con las paradas.
-- El orden es el número de parada en la ruta. El orden tiene
-- que estar espaciado por 100 por si queremos reordenar, agregar
-- o eliminar 
CREATE TABLE "ruta_parada" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "ruta_id" INT NOT NULL,
  "parada_id" INT NOT NULL,
  "orden" SMALLINT NOT NULL 
);

ALTER TABLE "ruta_parada" ADD FOREIGN KEY ("ruta_id") REFERENCES "ruta";
ALTER TABLE "ruta_parada" ADD FOREIGN KEY ("parada_id") REFERENCES "parada";

-- Esta tabla probablemente requerirá ser más compleja
-- debido a que es la entidad en la que se manejan los
-- pagos de open payments
CREATE TABLE "viaje" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "ruta" INT NOT NULL,
  "origen" INT NOT NULL,

  -- "destino" puede ser nulo porque no sabemos con exactitud
  -- dónde baja el usuario. Aunque podemos usar un sistema
  -- de ubicación para aproximar en qué parada se bajó.
  "destino" INT NULL,

  "usuario_id" INT NOT NULL,

  -- Puede ser nulo porque conductor solo aplica para 
  -- transporte público gestionado por privados
  "conductor_id" INT NULL,
  "payment_id" VARCHAR(1000) NOT NULL,

  -- recuerda multiplicar por 100 al insertar
  "total_centavos" INT NOT NULL,
  "creado_en" TIMESTAMP NOT NULL DEFAULT now()
);

ALTER TABLE "viaje" ADD FOREIGN KEY ("ruta") REFERENCES "ruta";
ALTER TABLE "viaje" ADD FOREIGN KEY ("origen") REFERENCES "parada";
ALTER TABLE "viaje" ADD FOREIGN KEY ("destino") REFERENCES "parada";
ALTER TABLE "viaje" ADD FOREIGN KEY ("usuario_id") REFERENCES "usuario";
ALTER TABLE "viaje" ADD FOREIGN KEY ("conductor_id") REFERENCES "conductor";

CREATE TABLE "programa_social" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nombre" VARCHAR(80) NOT NULL,
  "descripcion" TEXT NOT NULL
);
