const env = { ...process.env, ...window['env'] };

export const URL_API_REPORT = env.URL_REPORT;
export const URL_API = true ? env.URL_APP : "http://localhost:5001";

export let SystemLang = [];

// export async function UpdateSystemLang() {
//   const response = await fetch(URL_API + '/api/Defines/GetLanguages').catch(() => { });
//   if (response) SystemLang = await response.json();
// }

// await UpdateSystemLang();

export function GetLang(lang) {
  return SystemLang.reduce(function (acc, cur, i) {
    acc[cur.id] = cur[lang];
    return acc;
  }, {});
}
