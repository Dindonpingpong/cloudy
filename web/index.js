const BASE_PATH = "http://localhost:8000/"

function show_hide_password(target) {

    let input = document.getElementById('password-input');

    if (input.getAttribute('type') == 'password') {

        target.classList.add('view');

        input.setAttribute('type', 'text');

    } else {

        target.classList.remove('view');

        input.setAttribute('type', 'password');

    }

    return false;

}

function login() {

    let input = document.getElementById('login_input');

    const url = BASE_PATH + "users"

    const params = {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input.nodeValue)
    }

    console.log(input.value);
    
    // localStorage.setItem('login', input.textContent)
}

(() => {
    let login = localStorage.getItem('login');

    if (login !== null) {
        window.location.href = 'game.html';
    }
})();