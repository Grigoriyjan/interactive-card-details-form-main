const form = document.getElementById("cardForm");
const inputs = document.querySelectorAll('.myInput');

const inputsContainer = document.querySelector('.inputs')
const completedBlock = document.querySelector('.completed_block')

const cardNum = document.querySelector('.card_num');
const cardHolder = document.querySelector('.cardholder_name')
const cardDate = document.querySelector('.card_date')
const cardCvc = document.querySelector('.card_cvc')

const cardData = {
    cardholder: "",
    cardNumber: "",
    date: {month:"", year:""},
    cvc:""
}

const isAlpha = (str) => /^[A-Za-zА-Яа-я]+$/.test(str);
const isNumeric = (str) => /^\d+$/.test(str);
const messageOn = (message, elem) => elem.textContent = message


const onInput = (values, index) => {
    const value = values[index];
    console.log(cardData);
    
    if (index === 0) { // cardholder
        return isAlpha(value) ? value : null;
    }
    if (index === 1) { // cardNumber
        return value.replace(/(.{4})/g, '$1 ').trim();
    }
    if (index === 2) { // month
        return value
    }
    if (index === 3) { // year
        return value
    }
    if (index === 4) { // cvc
        return value
    }
};

const fillCard = () => {
    cardHolder.textContent = cardData.cardholder || "Jane Appleseed";
    cardNum.textContent = cardData.cardNumber || "0000 0000 0000 0000";
    cardDate.textContent = (cardData.date.month && cardData.date.year) ? `${cardData.date.month}/${cardData.date.year}` : "00/00";
    cardCvc.textContent = cardData.cvc || "000";
};

inputs.forEach(input => {
    
    input.addEventListener('input', (event) => {
        const values = Array.from(inputs).map(input => input.value);
        cardData.cardholder = onInput(values, 0)
        cardData.cardNumber = onInput(values, 1)
        cardData.date.month = onInput(values, 2)
        cardData.date.year = onInput(values, 3)
        cardData.cvc = onInput(values, 4)
        fillCard()
    });
})

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isCardholderValid = isAlpha(cardData.cardholder);
    const isCardNumberValid = !isAlpha(cardData.cardNumber);
    const isMonthValid = !isAlpha(cardData.date.month);
    const isYearValid = !isAlpha(cardData.date.year);
    const isCVCValid = !isAlpha(cardData.cvc);

    if (!isCardholderValid) {
        messageOn("Invalid cardholder name", cardHolder);
    }
    if (!isCardNumberValid) {
        messageOn("Invalid card number", cardNum);
    }
    if (!isMonthValid || !isYearValid) {
        messageOn("Invalid date", cardDate);
    }
    if (!isCVCValid) {
        messageOn("Invalid CVC", cardCvc);
    }

    if (isCardholderValid && isCardNumberValid && isMonthValid && isYearValid && isCVCValid) {
        
        if(completedBlock.style.display === "none"){
            inputsContainer.style.display = "none"
            completedBlock.style.display = "block"
        }
        else{
            inputsContainer.style.display = "grid"
            completedBlock.style.display = "none"
        }
        
    }
});