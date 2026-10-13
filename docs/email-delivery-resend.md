# Correos de JJK New World — Resend + Supabase Auth

## Estado de instalación y seguridad
La instalación del plugin Resend en ChatGPT no configura automáticamente el SMTP de Supabase. No se considera terminado hasta que el dominio remitente figure como **verificado** en Resend, los valores SMTP estén guardados de forma segura en Supabase Auth y se haya recibido de forma correcta un correo de confirmación y otro de recuperación de contraseña.

**Nunca subir claves SMTP/API al repositorio ni pegarlas en el chat.** Configurarlas directamente en los paneles autorizados.

## 1. Verificar dominio en Resend
- Ingresar a https://resend.com/domains e incorporar el dominio del que se enviarán correos (por ejemplo, `jjknewworld.uk`, siempre que su DNS esté bajo control del administrador).
- Crear exactamente los registros DNS que Resend indique, incluidas las verificaciones de dominio y autenticación SPF/DKIM. Mantener DMARC coherente con el dominio.
- Esperar estado **Verified**. No inventar ni copiar registros DNS de ejemplos.
- Elegir un remitente del dominio verificado, por ejemplo `no-reply@jjknewworld.uk`.

## 2. Conectar SMTP a Supabase Auth
Proyecto: https://supabase.com/dashboard/project/qaagrybxkxverxvgaimb/auth/smtp

Configuración oficial de Resend:
| Campo | Valor |
| --- | --- |
| Habilitar Custom SMTP | Sí |
| Sender name | JJK New World |
| Sender email | no-reply@jjknewworld.uk (solo tras verificar dominio) |
| Host | smtp.resend.com |
| Port | 465 (SSL) o 587 (STARTTLS, de acuerdo con la interfaz de Supabase) |
| Username | resend |
| Password | API key de Resend (secreta, introducir únicamente en Supabase) |

Los valores anteriores **no están aplicados automáticamente**. Se requiere guardar la configuración en el panel, con una clave de Resend que tenga acceso de envío.

## 3. Verificar redirecciones y seguridad
- Auth URL configuration: Site URL `https://jjknewworld.uk/`.
- Allowed redirect URLs: incluir `https://jjknewworld.uk/`.
- No deshabilitar la confirmación por email (`mailer_autoconfirm=false`).
- Revisar rate limits y activar protección ante abuso.
- Activar protección contra contraseñas filtradas desde Supabase Auth si está disponible.

## 4. Prueba de aceptación desde cuentas nuevas controladas
1. Registrar un correo de prueba controlado.
2. Comprobar en Resend: intento, envío, entrega o rebote. Sin exponer destinatarios reales en logs públicos.
3. Confirmar el enlace una sola vez y comprobar el inicio de sesión.
4. Crear un personaje de prueba, cerrar sesión y reingresar para comprobar persistencia.
5. Solicitar recuperación de contraseña y confirmar entrega, enlace y actualización.
6. Probar reenvío antes/después del cooldown de 60 segundos; verificar mensajes y errores.
7. Repetir al menos con dos proveedores de correo diferentes.

## Referencias oficiales
- https://resend.com/supabase
- https://resend.com/changelog/smtp-service
- https://supabase.com/docs/guides/auth/auth-smtp

Fecha de preparación: 2026-10-12. Pendiente de verificación de configuración real y pruebas autenticadas.
