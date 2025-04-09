const NAME_REGEX = new RegExp(/^[a-zA-Z\u00C0-\u017F\s]+$/);
const EMAIL_REGEX = new RegExp(/^([a-z\d]+(?:[a-z\d._-])*)(@[a-z\d]+(?:[a-z\d.-])*)(\.[a-z]{2,})$/i);
const form = document.getElementById('newsletter-form');

const swiper = new Swiper('.swiper', {
    // Property to make slider loop
    loop: true,
    
    // Changes slides on it's own
    autoplay: {
        delay: 5000,
    },

    // Assign pagination to element
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

    // Assign navigation arrows to element
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
});

form.addEventListener('submit', async (event) => {
    // Get value from the form inputs
    const nameValue = form['name'].value;
    const emailValue = form['email'].value;
    
    // Validate the data from each input
    if (!NAME_REGEX.test(nameValue)) {
        alert('Username is invalid');
        return;
    }
    
    if (!EMAIL_REGEX.test(emailValue)) {
        alert('Email is invalid');
        return;
    }
    
    // Setup post request
    const request = new Request("../form.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            name: nameValue, 
            email: emailValue 
        }),
    });
    
    // Request to php file
    try {
        const response = await fetch(request);
        const result = await response.json();
        alert('Success');
    } catch (error) {
        alert('Error signing to newsletter');
    }
});