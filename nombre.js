const U = ["zéro","un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize"];
const T = ["","","vingt","trente","quarante","cinquante","soixante"];
const lt20 = n => n < 17 ? U[n] : "dix-" + U[n - 10];

function lt100(n, pl) {
  if (n < 20) return lt20(n);
  if (n < 70) {
    const t = Math.floor(n / 10), u = n % 10;
    return u === 0 ? T[t] : u === 1 ? T[t] + " et un" : T[t] + "-" + U[u];
  }
  if (n < 80) return n === 71 ? "soixante et onze" : "soixante-" + lt20(n - 60);
  if (n === 80) return pl ? "quatre-vingts" : "quatre-vingt";
  return "quatre-vingt-" + lt20(n - 80);
}

function lt1000(n, pl) {
  const h = Math.floor(n / 100), r = n % 100;
  let s = "";
  if (h > 0) {
    s = h === 1 ? "cent" : U[h] + " cent";
    if (h > 1 && r === 0 && pl) s += "s";
  }
  if (r > 0) s += (s ? " " : "") + lt100(r, pl);
  return s;
}

function fr(n) {
  if (n === 0) return "zéro";
  const p = [];
  const mrd = Math.floor(n / 1e9), mil = Math.floor(n / 1e6) % 1000,
        th = Math.floor(n / 1e3) % 1000, r = n % 1000;
  if (mrd) p.push(mrd === 1 ? "un milliard" : lt1000(mrd, true) + " milliards");
  if (mil) p.push(mil === 1 ? "un million" : lt1000(mil, true) + " millions");
  if (th) p.push(th === 1 ? "mille" : lt1000(th, false) + " mille");
  if (r) p.push(lt1000(r, true));
  return p.join(" ");
}

function frMoney(n, c) {
  const parts = [];
  if (n > 0 || c === 0) parts.push(fr(n) + " dinar" + (n > 1 ? "s" : "") + " algérien" + (n > 1 ? "s" : ""));
  if (c > 0) parts.push(fr(c) + " centime" + (c > 1 ? "s" : ""));
  return parts.join(" et ");
}
