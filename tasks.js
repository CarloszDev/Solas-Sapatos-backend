import axios from 'axios';
import fs from 'fs'
import { inngest } from './client.js'
// const inngest = new Inngest({ name: "My App" });
const jsonPath = './csvjson.json'; 
const api_key = '930a34e6973ad67a34f820a6dafa25a5d72eb43599b4a1ab5e7c913426c14c45594a0d53';

// This function will be invoked by Inngest via HTTP any time
// the "app/user.signup" event is sent to to Inngest
export default inngest.createFunction(
  { name: "User onboarding communication" },
  { event: "app/update.json" },
  async ({ event, step }) => {
    try {
      let todosItens = [];
      let pagina = 1;
  
      while (true) {
        const response = await axios.get(`https://bling.com.br/Api/v2/produtos/page=${pagina}/json`, {
          params: { apikey: api_key },
        });
        console.log('dps da requisicao');
  
        const data = response.data;
        //console.log('Preto1', data);
 
 
        if (data.retorno.erros) {
          // console.log('Preto');
          break;
        }
  
        if (data && data.retorno && data.retorno.produtos) {
          if (data.retorno.produtos.length > 0) {
            todosItens = [...todosItens, ...data.retorno.produtos];
            pagina++;
          } else {
            break;
          }
         } else {
           console.error('Dados da API não estão no formato esperado:', data);
           return;
         }
      }
 
      fs.writeFileSync(jsonPath, JSON.stringify(todosItens, null, 2)); 
      
      console.log('Requisição à API do Bling concluída com sucesso.');
     } catch (error) {
       console.error('Erro ao obter dados da API', error);
       console.error('Resposta da API:', error.response.data);
     }
  }
);