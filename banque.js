// Écrit sur la sortie la banque de sujets (TCF EO + CELPIP Speaking, images
// comprises), en clair. C'est le tableau de bord (drill.html) qui la chiffre,
// dans le navigateur, avant de l'envoyer ici sous forme de datos.enc.
//   node banque.js > /dev/null    (pour vérifier qu'elle se fabrique)
const fs = require("fs"), path = require("path");
const DASH = path.join(process.env.HOME, "tcf-canada/dashboard");

function banque() {
  const tcf = JSON.parse(fs.readFileSync(path.join(DASH, "sujets_oraux.json"), "utf8"));
  global.window = {};
  require(path.join(DASH, "banque/celpip.js"));
  const img = p => "data:image/webp;base64," + fs.readFileSync(path.join(DASH, p)).toString("base64");
  const celpip = window.__CELPIP.S.map(t => ({
    title: t.title,
    tasks: t.tasks.map(k => {
      const o = {n: k.n, name: k.name, prep: k.prepSeconds, rec: k.recordSeconds, prompt: k.prompt};
      if (k.image) o.image = img(k.image);
      if (k.branches) o.branches = k.branches;
      if (k.options) {
        o.choose = k.chooseSeconds; o.choosePrompt = k.choosePrompt; o.rivalLabel = k.rivalLabel;
        const opt = x => ({key: x.key, title: x.title, img: img(x.img), bullets: x.bullets || []});
        o.options = k.options.map(opt); o.rival = opt(k.rivalChoice);
      }
      return o;
    }),
  }));
  return {cree: new Date().toISOString().slice(0, 10), tcf: {t2: tcf.tache2, t3: tcf.tache3}, celpip};
}

process.stdout.write(JSON.stringify(banque()));
