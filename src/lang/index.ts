const BASE = 'intterra-';

interface JsonIndex {
  [index: string]: string;
}
const loadLangJson = (location: string): Promise<JsonIndex> => import(`@/lang/lib/${BASE}${location || 'ru-RU'}`);

let json: JsonIndex | null = null;

const lang = (key: string): string => {
  if (!json) {
    throw new Error('Need to init lang first');
  }
  return json[key];
};
lang.init = async (location: string): Promise<void>  => {
  json = await loadLangJson(location);
};
export default lang;
