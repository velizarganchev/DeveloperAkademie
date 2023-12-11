function sendMail(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    fetch("https://formspree.io/f/xeqbwqdy",
        {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(() => {
            window.location.href = "./send_mail.html"
        }).catch((error) => {
            console.log(error);
        })
}