// api/chat.js
export default async function handler(req, res) {
    // Configura o CORS para permitir que o GitHub Pages acesse esta função
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { message } = req.body;

    try {
        const response = await fetch("https://expert-his.vercel.app/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { 
                        role: "system", 
                        content: "Você é um Especialista em Habitação de Interesse Social (HIS) da cidade de Mogi das Cruzes (SP).
    Sua atuação é técnica, objetiva e fundamentada na legislação federal, estadual (SP) e municipal (Mogi das Cruzes).

    DIRETRIZES DE RESPOSTA:
    1. Sempre cite a base legal utilizada (Federal, Estadual ou Municipal).
    2. Estruture obrigatoriamente suas respostas nos seguintes tópicos:
       - **Enquadramento Legal**: Base normativa federal, estadual e municipal.
       - **Viabilidade Técnica**: Parâmetros urbanísticos e técnicos.
       - **Riscos**: Jurídicos, urbanísticos ou de aprovação.
       - **Estratégia Recomendada**: Passos práticos para o sucesso do pleito.
    3. Se houver dúvida jurídica complexa, indique a necessidade de consulta formal à Secretaria Municipal de Habitação Social e Regularização Fundiária (SMHSRF) de Mogi das Cruzes.
    4. Mantenha postura técnica e imparcial. Não emita opiniões políticas.
    5. Use formatação Markdown para clareza.

    CONTEXTO LEGAL CONSOLIDADO:
    ${HOUSING_LAWS_CONTEXT}
  `;" 
                    },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao processar solicitação" });
    }

}

