const SUPABASE_URL = "https://printokm.pages.dev";
const SUPABASE_KEY = "sb_publishable_bh81yaSR466WGVMFKTr6Kw_AAxBUqiV";

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function requireAuth() {
  document.documentElement.style.visibility = "hidden";
  const { data } = await sb.auth.getSession();
  if (!data.session) {
    location.replace("compte.html");
  } else {
    document.documentElement.style.visibility = "visible";
  }
}

async function logout() {
  await sb.auth.signOut();
  location.replace("compte.html");
}
