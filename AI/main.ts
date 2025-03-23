import axios from 'axios';

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Nhập id: ', (idInput: string) => {
    const id = parseInt(idInput);

    readline.question('Nhập câu hỏi: ', async (question: string) => {
        const url = "http://localhost:8000/ask";

        try {
            const response = await axios.post(url, { query: question, id: id });
            console.log(response.data.result);
        } catch (error) {
            console.error(`Lỗi khi gọi API: ${error}`);
        } finally {
            readline.close();
        }
    });
});