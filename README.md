# Open Transporte
The unificative solution of the transportation system in Mexico.

---

## ¿Cuál es el problema?
- Fragmentación de pagos (efectivo, tarjetas bancarias, tarjeta MI).  
- Rutas y sistemas aislados sin interoperabilidad.  
- Falta de transparencia en subsidios y apoyos sociales.  
- Inseguridad por accesos no controlados.  
- Escasez de datos públicos sobre transporte.  

---

## ¿Qué tecnología usarán?
- TypeScript  
- NodeJS  
- ExpressJS  
- NextJS  
- Docker  
- PostgreSQL  
- [Open Payments From Interledger](https://interledger.org/open-payments)  

---

## ¿Cuál es la solución?
Unificar el sistema de pagos del transporte público en México usando **Open Payments**.  
Integrar datos de uso y rutas.  
Permitir acceso controlado y trazable.  

---

## ¿Cuáles son los beneficios?
**Para usuarios**  
- Un solo medio de pago para todo el transporte.  
- Costos en tiempo real de un viaje.  
- Historial accesible y verificable.  

**Para gobierno**  
- Subsidios y programas sociales aplicados de forma directa.  
- Datos de flujo de usuarios en tiempo real.  
- Ajuste de oferta de transporte según la demanda.  

---

## ¿Cuál es su arquitectura/stack simple?
- **Frontend**: NextJS  
- **Backend**: NodeJS con Express  
- **Base de datos**: PostgreSQL  
- **Infraestructura**: Docker  
- **Pagos**: Open Payments (Interledger)  

---

## ¿Qué funciones son indispensables?
- Pago directo con Open Payments.  
- Pre-pagos con QR validado en torniquetes.  
- Interoperabilidad entre metro, metrobús, RTP, taxis, etc.  
- Pagos en distintas ciudades.  
- Historial de viajes y pagos.  
- Panel de estadísticas para gobierno.  

---

## ¿Quién será responsable de construir qué parte?
- **Angel Uriel Ramirez de la Cruz**: Backend y pagos con Open Payments.  
- **Neydi Michell Marin Torres**: Interfaz de usuario y experiencia (frontend).  
- **Moises Hernandez Lazaro**: Infraestructura, despliegues con Docker y base de datos.  
- **Daniel Mondragon Tapia**: Integración de datos, modelos de rutas y panel gubernamental.  
```

