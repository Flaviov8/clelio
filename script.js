document.addEventListener('DOMContentLoaded', function() {
    // Verificar se a biblioteca html2pdf está carregada
    if (typeof html2pdf === 'undefined') {
        console.error('A biblioteca html2pdf não foi carregada corretamente');
        return;
    }

    // Animação de entrada
    initAnimations();

    // Configurar interatividade
    setupContactLinks();
    setupContactButton();
    setupTypingEffect();
    setupPDFGenerator();
});

// ==================== FUNÇÕES PRINCIPAIS ====================

function initAnimations() {
    // Animação de entrada do container principal
    setTimeout(() => {
        const mainContainer = document.getElementById('main-container');
        if (mainContainer) {
            mainContainer.classList.add('loaded');
        }
    }, 100);

    // Animação das seções com scroll
    const sections = document.querySelectorAll('section');
    
    function checkVisibility() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
}

function setupContactLinks() {
    // Link para WhatsApp
    const phoneLink = document.getElementById('phone-link');
    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://wa.me/5511942991667', '_blank');
        });
    }
    
    // Link para e-mail
    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'mailto:cleliotenorio31@gmail.com';
        });
    }
}

function setupContactButton() {
    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            createContactMenu(this);
        });
    }
}

function createContactMenu(buttonElement) {
    const contactOptions = [
        { icon: 'phone-alt', text: 'Ligar', action: 'tel:+5511942991667' },
        { icon: 'whatsapp', text: 'WhatsApp', action: 'https://wa.me/5511942991667' },
        { icon: 'envelope', text: 'E-mail', action: 'mailto:cleliotenorio31@gmail.com' }
    ];
    
    const contactMenu = document.createElement('div');
    contactMenu.className = 'contact-menu';
    
    contactOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.innerHTML = `<i class="fas fa-${option.icon}"></i> ${option.text}`;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (option.action.startsWith('http')) {
                window.open(option.action, '_blank');
            } else {
                window.location.href = option.action;
            }
        });
        contactMenu.appendChild(btn);
    });
    
    buttonElement.parentNode.replaceChild(contactMenu, buttonElement);
}

function setupTypingEffect() {
    const introMessage = document.querySelector('.intro-message');
    if (introMessage) {
        typeWriterEffect(introMessage);
    }
}

function typeWriterEffect(element) {
    const originalText = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const speed = 30; // velocidade em ms
    
    function type() {
        if (i < originalText.length) {
            element.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

function setupPDFGenerator() {
    const downloadPdfBtn = document.getElementById('download-pdf');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', generatePDF);
    }
}

function generatePDF() {
    const element = document.getElementById('main-container');
    if (!element) {
        console.error('Elemento principal não encontrado');
        return;
    }

    const button = this;
    const originalText = button.innerHTML;

    // Configurações do PDF
    const pdfOptions = {
        margin: 10,
        filename: 'Curriculo-Clelio-Tenorio.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            logging: true,
            useCORS: true,
            allowTaint: true
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait'
        }
    };

    // Mostrar estado de carregamento
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando PDF...';
    button.disabled = true;

    // Gerar PDF
    html2pdf()
        .set(pdfOptions)
        .from(element)
        .save()
        .then(() => {
            // Restaurar botão ao estado original
            resetButton(button, originalText);
        })
        .catch((error) => {
            console.error('Erro ao gerar PDF:', error);
            showError(button, originalText);
        });
}

function resetButton(button, originalText) {
    button.innerHTML = originalText;
    button.disabled = false;
}

function showError(button, originalText) {
    button.innerHTML = '<i class="fas fa-exclamation-circle"></i> Erro';
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}