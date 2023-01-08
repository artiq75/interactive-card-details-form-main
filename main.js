/**
 * @type HTMLFormElement
 */
const form = document.forms[0]

/**
 * @type HTMLInputElement[]
 */
const inputs = form.querySelectorAll('input')

/**
 * @type HTMLElement[]
 */
const cardsFields = []

inputs.forEach(input => {
    const target = input.dataset.target

    if (target) {
        const field = document.getElementById(target)
        field.textContent = field.dataset.default
        cardsFields.push(field)
    }
});

/**
 * @param SubmitEvent e
 */
form.addEventListener('submit', function (e) {
    e.preventDefault()

    for (const input of inputs) {
        let nextElementSibling = input.nextElementSibling

        // only for date section
        if (nextElementSibling === null) {
            nextElementSibling = document.getElementById('date-invalid-feedback')
        }

        const value = input.value
        const id = input.id

        if (!value) {
            nextElementSibling.textContent = "Can't be blank"
        }

        if (input.type === 'number' && isNaN(value)) {
            nextElementSibling.textContent = 'Wrong format, number only'
        }

        if (id === 'number' && value.length != 16) {
            nextElementSibling.textContent = 'You need enter 16 digits'
        }

        if ((id === 'month' || id === 'year') && value.length != 2) {
            nextElementSibling.textContent = 'You need enter 2 digits, for month and year field'
        }

        if (id === 'cvc' && value.length != 3) {
            nextElementSibling.textContent = 'You need enter 3 digits'
        }
    }
})

/**
 * @param FocusEvent e
 */
form.addEventListener('focusin', function (e) {
    e.preventDefault()

    let nextElementSibling = e.target.nextElementSibling

    // only for date section
    if (nextElementSibling === null) {
        nextElementSibling = document.getElementById('date-invalid-feedback')
    }

    nextElementSibling.textContent = ''
})

inputs.forEach(input => {
    input.addEventListener('input', function (e) {
        const id = e.target.id
        const value = e.target.value
        const target = e.target.dataset.target

        if (id === 'name' && value.length > 20) {
            return
        }

        if (id === 'number' && value.length > 16) {
            return
        }

        if ((id === 'month' || id === 'year') && value.length > 2) {
            return
        }

        if (id === 'cvc' && value.length > 3) {
            return
        }

        cardsFields.forEach(field => {
            if (field.getAttribute('id') !== target) return

            field.textContent = value

            if (!value) {
                field.textContent = field.dataset.default
            }
        });
    })
});