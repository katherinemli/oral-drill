# Oral Drill

TCF Canada and CELPIP speaking simulations for the phone: timers, beeps, and recording. Everything runs in the browser.

The code is public. The topics are not: they are in `datos.enc`, encrypted with AES-GCM. The key is generated on my PC and reaches the phone once, by QR code.

```
node banque.js   # prints the topic bank; drill.html on my PC encrypts it into datos.enc
```
