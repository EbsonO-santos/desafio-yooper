import axios from 'axios';
import md5 from 'crypto-js/md5';

const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
const baseURL = 'https://gateway.marvel.com/v1/public';

const ts = Date.now().toString();
const hash = md5(ts + privateKey + publicKey).toString();

const api = axios.create({
  baseURL,
  params: {
    apikey: publicKey,
    ts,
    hash,
  },
});

export default api;