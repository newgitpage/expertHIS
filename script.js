async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatLog = document.getElementById('chat-log');
    const message = input.value;

    if (!message) return;

    chatLog.innerHTML += `<div><b>Você:</b> ${message}</div>`;
    input.value = "";

    try {
        const response = await fetch("https://expert-his.vercel.app/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        chatLog.innerHTML += `<div><b>Assistente:</b> ${botMessage}</div>`;
    } catch (error) {
        chatLog.innerHTML += `<div>Erro ao conectar ao servidor.</div>`;
    }
}
