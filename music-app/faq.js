let faqs = [
    { question: "What is this website?", answer: "This website is a platform for learning and sharing FAQs." },
    { question: "How do I use this platform?", answer: "You can browse and add FAQs to the list." }
];

function renderFaqs() {
    const faqList = document.getElementById('faq-list');
    faqList.innerHTML = '';

    faqs.forEach((faq, index) => {
        faqList.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${faq.question}</h5>
                        <p class="card-text">${faq.answer}</p>
                    </div>
                </div>
            </div>
        `;
    });
}


function saveFaq() {
    const question = document.getElementById('faq-question').value;
    const answer = document.getElementById('faq-answer').value;

    if (question && answer) {
        faqs.push({ question, answer });
        renderFaqs();

        $('#addFaqModal').modal('hide');
        document.getElementById('faq-form').reset();
    } else {
        alert("Please fill in both fields.");
    }
}


document.getElementById('save-faq-btn').addEventListener('click', saveFaq);

window.onload = renderFaqs;