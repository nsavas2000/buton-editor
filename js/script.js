// CodeMirror editörü başlatma
var editor = CodeMirror(document.getElementById("editor"), {
    mode: "javascript",
    lineNumbers: true,
    theme: "dracula",
    indentUnit: 4
});

// Yazı tipini özelleştirme
editor.getWrapperElement().style.color = "orange";

function playTypewriterSound() {
    const audio = new Audio('path/to/typewriter-sound.mp3'); // Ses dosyasını ayarlayın
    audio.play();
}

function toggleKeypad(keypadId, buttonId) {
    const keypad = document.getElementById(keypadId);
    const button = document.getElementById(buttonId);

    if (keypad.style.display === 'flex') {
        keypad.style.display = 'none';
        return;
    }

    document.querySelectorAll('.keypad').forEach(k => k.style.display = 'none');

    const buttonRect = button.getBoundingClientRect();
    const keypadHeight = keypad.offsetHeight || 80; // Keypad yüksekliği tahmini
    keypad.style.top = `${buttonRect.top - keypadHeight - 10}px`; // Butonun üstünde açılacak
    keypad.style.left = `${buttonRect.left}px`;

    keypad.innerHTML = ''; // İçeriği temizle

    if (keypadId === 'ledKeypad' || keypadId === 'buzzerKeypad') {
        const actions = [
            { text: 'on', icon: 'fa-toggle-on' }, 
            { text: 'off', icon: 'fa-toggle-off' }
        ];
        actions.forEach(action => {
            const actionButton = document.createElement('button');
            actionButton.innerHTML = `<i class="fa ${action.icon}"></i> ${action.text.toUpperCase()}`;
            actionButton.classList.add('action-button');
            actionButton.onclick = () => {
                const text = `robot.${buttonId === 'ledButton' ? 'far' : 'korna'} ${action.text}\n`;
                typeCharacterByCharacter(text);
                keypad.style.display = 'none';
            };
            keypad.appendChild(actionButton);
        });
    } else if (keypadId === 'driveKeypad') {
        const directions = [
            { text: 'ileri', icon: 'fa-arrow-up' },
            { text: 'geri', icon: 'fa-arrow-down' }
        ];
        directions.forEach(dir => {
            const directionButton = document.createElement('button');
            directionButton.innerHTML = `<i class="fa ${dir.icon}"></i> ${dir.text.toUpperCase()}`;
            directionButton.classList.add('direction');
            directionButton.onclick = () => {
                openNumberPad(dir.text, keypad);
            };
            keypad.appendChild(directionButton);
        });
    } else if (keypadId === 'turnKeypad') {
        const turns = [
            { text: 'sag', icon: 'fa-arrow-right' },
            { text: 'sol', icon: 'fa-arrow-left' }
        ];
        turns.forEach(turn => {
            const turnButton = document.createElement('button');
            turnButton.innerHTML = `<i class="fa ${turn.icon}"></i> ${turn.text.toUpperCase()}`;
            turnButton.classList.add('direction');
            turnButton.onclick = () => {
                // Burada text'i istediğiniz formata göre ayarlıyoruz
                const text = `robot.don ${turn.text}\n`;
                typeCharacterByCharacter(text);
                keypad.style.display = 'none';
            };
            keypad.appendChild(turnButton);
        });
    }

    if (keypadId === 'repeatKeypad') {
        // Sayı seçimi için tuşları oluştur
        for (let i = 2; i <= 6; i++) {
            const numberButton = document.createElement('button');
            numberButton.textContent = i;
            numberButton.classList.add('number-button');
            numberButton.onclick = () => {
                const text = `tekrarla ${i}:\n`;
                typeCharacterByCharacter(text);
                keypad.style.display = 'none';
            };
            keypad.appendChild(numberButton);
        }
    }

    keypad.style.display = 'flex';
}

function typeCharacterByCharacter(text) {
    let currentValue = editor.getValue();
    let lines = text.split("\n"); // Kullanıcının girdiği metni satırlara ayır
    let result = ""; // Editöre yazılacak metin

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim(); // Her bir satırı al

        if (line.startsWith("tekrarla")) {
            // "tekrarla 3:" şeklindeki satırı döngüye çevir
            const repeatMatch = line.match(/tekrarla (\d+):/);
            if (repeatMatch) {
                const repeatCount = repeatMatch[1];
                result += `for _ in range(${repeatCount}):\n`; // Python döngü formatı
            }
        } else if (line.startsWith("ileri")) {
            // "ileri 100" şeklindeki komutları uygun forma çevir
            const ileriMatch = line.match(/ileri (\d+)/);
            if (ileriMatch) {
                const distance = ileriMatch[1];
                result += `    ileri(${distance})\n`; // İçeri girinti ile yaz
            }
        } else if (line.startsWith("sağa")) {
            const sağaMatch = line.match(/sağa (\d+)/);
            if (sağaMatch) {
                const angle = sağaMatch[1];
                result += `    sağa(${angle})\n`;
            }
        } else if (line.startsWith("sola")) {
            const solaMatch = line.match(/sola (\d+)/);
            if (solaMatch) {
                const angle = solaMatch[1];
                result += `    sola(${angle})\n`;
            }
        } else if (line.startsWith("geri")) {
            const geriMatch = line.match(/geri (\d+)/);
            if (geriMatch) {
                const distance = geriMatch[1];
                result += `    geri(${distance})\n`;
            }
        }
    }

    // Editördeki mevcut değere yeni metni ekle
    editor.setValue(currentValue + result);
    editor.setCursor(editor.lineCount(), 0); // İmleci son satıra yerleştir
}

function typeCharacterByCharacter(text) {
    const editor = document.getElementById('editor'); // CodeMirror editörü
    const cm = editor.CodeMirror; // CodeMirror nesnesini al

    // Texti mor renkte eklemek için özel bir stil ekleyin
    cm.replaceRange(`<span style="color: purple;">${text}</span>`, cm.getCursor(), cm.getCursor());
}


function typeCharacterByCharacter(text) {
    const editor = document.getElementById('editor'); // Editör alanı
    editor.innerHTML += text; // HTML olarak ekle
}


function typeCharacterByCharacter(text) {
    const editor = document.getElementById('editor'); // Editör alanı
    editor.innerHTML += text; // HTML olarak ekle
}


function typeCharacterByCharacter(text) {
    const editor = document.getElementById('editor'); // Editör alanı
    editor.textContent += text; // Yazıyı ekle
}


function openNumberPad(direction, parentKeypad) {
    parentKeypad.innerHTML = ''; // Önceki içerikleri temizle
    for (let i = 1; i <= 5; i++) {
        const numberButton = document.createElement('button');
        numberButton.textContent = i;
        numberButton.classList.add('number-button');
        numberButton.onclick = () => {
            const text = `${direction} ${i}\n`;
            typeCharacterByCharacter(text);
            parentKeypad.style.display = 'none';
        };
        parentKeypad.appendChild(numberButton);
    }
}


function typeCharacterByCharacter(text) {
    let currentValue = editor.getValue();
    let index = 0;

    function typeNext() {
        if (index < text.length) {
            currentValue += text[index];
            editor.setValue(currentValue);
            editor.setCursor(editor.lineCount(), 0);
            playTypewriterSound();
            index++;
            setTimeout(typeNext, 100);
        }
    }

    typeNext();
}
