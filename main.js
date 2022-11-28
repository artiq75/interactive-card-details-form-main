const form = document.forms[0]
const inputs = form.querySelectorAll('input')

form.addEventListener('submit', function (e) {
    e.preventDefault()

    for (const input of inputs) {
        if (!input.value && input.nextElementSibling !== null) {
            input.nextElementSibling.textContent = "Can't be blank"
        }
    }

    for (const input of inputs) {
        if (input.type !== 'number' || !input.value) continue
        if (isNaN(input.valueAsNumber)) {
            input.nextElementSibling.textContent = 'Wrong format, number only'
        }
    }
})

form.addEventListener('focusin', function (e) {
    e.preventDefault()

    const target = e.target

    if (target.nextElementSibling !== null) {
        target.nextElementSibling.textContent = ''
    }
})
