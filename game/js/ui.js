
export function setupInputRow(inputRow){
    const inputs = inputRow.querySelectorAll('.letter-input');

    inputs.forEach((input, index) => {
        
        input.addEventListener( 'input' ,(e) => {
            const currentInput = e.target;

            if (currentInput.value.length === 1 && index < inputs.length - 1 ) {
                inputs[index + 1].focus();
            }
        })

        input.addEventListener( 'keydown', (e) => {
            const currentInput = e.target;
            const parentRow = currentInput.parentElement;

            // apagar
            if(e.key === 'Backspace' && currentInput.value === '' && index > 0){
                e.preventDefault();
                inputs[index - 1].focus();
            }

            // esquerda
            if(e.key === 'ArrowLeft' && index > 0){
                e.preventDefault();
                inputs[index - 1].focus();
            }

            // direita
            if(e.key === 'ArrowRight' && index < inputs.length - 1){
                e.preventDefault();
                inputs[index + 1].focus();
            }
            
            // enter
            if(e.key === 'Enter'){
                const word = Array.from(inputs).map(input => input.value).join('').toUpperCase();
                                
                const event = new CustomEvent('attemptSubmitted', {detail: {word, parentRow}})
                document.dispatchEvent(event);
            }
        });
    });
}

export function createNewAttemptRow(targetContainer, wordsLength){
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('attempt-row');

    for(let i=0; i < wordsLength; i++){
        const input = document.createElement('input');
        input.maxLength = 1;
        input.type = 'text';
        input.classList.add('letter-input');
        rowDiv.appendChild(input)
    }

    targetContainer.insertBefore(rowDiv, document.querySelector('.target-word'));

    setupInputRow(rowDiv);

    rowDiv.querySelector('.letter-input').focus();
}

export function updateFixedWord(selector, word){
    const container = document.querySelector(selector);

    console.log(word);
    [...word].forEach(letter => {
        const span = document.createElement('span');
        span.textContent = letter;
        container.appendChild(span);
    });

}

// export function updateFirstAttempRow(wordsLength){
//     const container = document.querySelector('.attempt-row');
    
//     for(let i=0; i<wordsLength; i++){
//         const inputBox = document.createElement('input');
//         inputBox.type="text";
//         inputBox.maxlength="1";
//         inputBox.class="letter-input";
//     }
// }