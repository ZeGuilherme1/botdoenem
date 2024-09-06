import { BskyAgent } from '@atproto/api';
import * as dotenv from 'dotenv';
import * as process from 'process';
import cron from 'node-cron';

dotenv.config();


const agent = new BskyAgent({
  service: 'https://bsky.social',
});

function getDiasRestantes(): number { 
  const hoje = new Date();
  const dataAlvo = new Date('2024-11-3');
  const diffTime = dataAlvo.getTime() - hoje.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
  
}

async function diasCounter() {  
  try {
    await agent.login({ identifier: process.env.BLUESKY_USERNAME!, password: process.env.BLUESKY_PASSWORD! });

    const diasRestantes = getDiasRestantes();
    if (diasRestantes > 0) {
      await agent.post({
        text: `Faltam ${diasRestantes} dias até a primeira prova do ENEM!`
        
      });    
    } else {
      console.log("O dia do ENEM chegou!");
    }
  } catch (error) {
    console.error("Erro ao tentar postar a contagem de dias:", error);
  }
}

cron.schedule('0 12 * * *', diasCounter,{
  timezone: 'America/Sao_Paulo'
});
diasCounter()
console.log(process.env)
console.log("Bot iniciado. Postando a cada 24 horas!");
