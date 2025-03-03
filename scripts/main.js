document.addEventListener("DOMContentLoaded", () => {
    const generatebtn = document.querySelector(".js-retry-button");
    const voicebtn = document.querySelector(".js-voice-button");
    const quote = document.querySelector(".js-main-text");
    const author = document.querySelector(".js-secondary-text");

    generatebtn.addEventListener("click", () => {
        fetch("https://quotes-api-self.vercel.app/quote")
            .then(response => response.json())
            .then(
                data => {
                    quote.textContent = data.quote;
                    author.textContent = '- ' + data.author;
                    if (data.author == 'Simon') {
                        author.textContent += ' The Digger';
                    }
                })
            .catch(error => {
                console.log(error);
                quote.textContent = "Failed to fetch a quote.";
                author.textContent = "";
            });
    });

    voicebtn.addEventListener("click", () => {
        const quoteText = quote.textContent;
        const authorText = author.textContent;
        const voiceText = quoteText + "By" + authorText.substring(2, authorText.length);

        const speech = new SpeechSynthesisUtterance(voiceText);
        speech.lang = 'en-US';
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;
        window.speechSynthesis.speak(speech);
    });
});