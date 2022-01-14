// function(name, in, out, info, x, y){}
// где name это заголовок блока,

// in и out это массивы с названиями типа: [“name1“,”name2”]

// и info это текст внизу блока

// x и y координаты отрисовки
// console.log(dataInfo);
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1500;
canvas.height = 1500;

var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStorePixelRatio = ctx.webkitBackingStorePixelRatio
        || ctx.mozBackingStorePixelRatio
        || ctx.msBackingStorePixelRatio
        || ctx.oBackingStorePixelRatio
        || ctx.backingStorePixelRatio
        || 1;

    var pixelRatio = devicePixelRatio / backingStorePixelRatio;

    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    canvas.width *= pixelRatio;
    canvas.height *= pixelRatio;
    canvas.webcodePixelRatio = pixelRatio;

    ctx.scale(pixelRatio, pixelRatio);

function paintBlock(x, y, width, height, isBorder, borderColor, borderWidth) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, width, height);

    if (isBorder) {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(x, y, width, height);
    }
}


// paintBlock(20, 20, 50, 50, true, 'green', 5);
// paintBlock(100, 50, 50, 50, false, 'green', 5);
// paintBlock(150, 50, 50, 50, true, 'blue', 2);

function paintText(font, size, text, x, y, maxWidth, isColor, colorText) {
	ctx.font = `${size}px ${font}`;

	let textObj = ctx.measureText(text);
    let textArraySymbolMetrics = Array.from(text, symbol => ctx.measureText(symbol));
    let textArraySymbol = Array.from(text);

    // console.log(textArraySymbol);
    // console.log(textArraySymbolMetrics);
    // console.log(textObj.width);
    
	if (isColor) {
        ctx.fillStyle = colorText;
    } else {
        ctx.fillStyle = 'black';
    }
    
	if(ctx.measureText(text).width > maxWidth) {
		var last = text.length
		var withCurr = ctx.measureText("...").width
		var textCurr = ""
		for(var c = 0; withCurr<maxWidth; c++) {
			//
			let w = ctx.measureText(text[c]).width
			textCurr += text[c]
			withCurr += w
		}
	
		// console.log("withCurr", withCurr, textCurr)
		ctx.fillText(textCurr+"...", x, y, maxWidth);
		return
	}

    ctx.fillText(text, x, y, maxWidth);
}

paintText('serif', 24, 'Hello world', 10, 50, 55, true, 'green');
paintText('serif', 12, 'name', 20, 100, 50, true, 'yellow');
paintText('serif', 12, 'info', 50, 100, 50, false, 'blue');


function paintImg(src, x, y, width, height) {
    let img = new Image;
    img.onload = function() {
        ctx.drawImage(img, x, y, width, height);
    }
    img.src = src;
}

// paintImg('http://www.gravatar.com/avatar/0e39d18b89822d1d9871e0d1bc839d06?s=128&d=identicon&r=PG', 20, 20, 50, 60);
// paintImg('https://img.icons8.com/plasticine/100/000000/mail-contact.png', 40, 40, 50, 60);



function blockLogic(name, enter, out, info, x, y, width) {


    isBorder = true;
    borderColor = 'black';
    borderWidth = 2;
    font = 'serif';
    size = 15;
    height = size * 4 + size * 2;
    maxWidth = width;
    isColor = true;
    colorText = 'red';
    src = 'https://img.icons8.com/plasticine/100/000000/mail-contact.png';
    widthImg = 20;
    heightImg = 20;

    
    paintBlock(x, y, width, height, isBorder, borderColor, borderWidth);
    paintText(font, size, name, x + 33, y + size, maxWidth, isColor, colorText);
    paintText(font, size, info, x + 33, y + height - height * 0.10, maxWidth, isColor, 'blue');
    paintImg(src, x + 5, y, widthImg, heightImg);
    

    indentEnter = 0;
    enter.forEach(elem => {
        paintText(font, size, elem, x + 5, y + 15 + 20 + indentEnter, maxWidth / 2, false, 'black');
        indentEnter += 20;
    });

    indentOut = 0;
    out.forEach(elem => {
        paintText(font, size, elem, x + width / 2, y + 15 + 20 + indentOut, maxWidth / 2, false, 'black');
        indentOut += 20;
    });

}

blockLogic('HEADER', ['name1', 'name2'], ['name1', 'name2'], 'INFO', 100, 100, 100);
// blockLogic('HEADER', ['name1', 'name2'], ['name1', 'name2'], 'INFO', 200, 200, 150);


let counterX = 10;
let counterY = 50;



function animation () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paintText('serif', 24, 'Hello world', counterX, counterY, 55, true, 'green');
    counterX++;
    counterY++;  
    window.requestAnimationFrame(animation);
}


// window.requestAnimationFrame(animation);

function animationBlock () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blockLogic('HEADER', ['name1', 'name2'], ['name1', 'name2'], 'INFO', counterX, counterY, 100);
    counterX++;
    counterY++;  
    window.requestAnimationFrame(animationBlock);
}

// window.requestAnimationFrame(animationBlock);

let coordinateMoveX = 0;
let coordinateMoveY = 0;
let transfer = false;
console.log(transfer);

function onMouseMove(event) {
    coordinateMoveX = event.offsetX;
    coordinateMoveY = event.offsetY;

    if(transfer) {
        console.log(transfer);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        blockLogic('HEADER', ['name1', 'name2'], ['name1', 'name2'], 'INFO', coordinateMoveX, coordinateMoveY, 100);
    }
}

function onMouseUp(event) {
    transfer = false;
}

function onMouseDown(event) {
    coordinateX = event.offsetX;
    coordinateY = event.offsetY;

    if(coordinateX >= 100 && coordinateX <= 200 && coordinateY >= 100 && coordinateY <= 190){
        transfer = true;
        console.log(transfer);
        // window.requestAnimationFrame(animationBlock);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // blockLogic('HEADER', ['name1', 'name2'], ['name1', 'name2'], 'INFO', 100, 100, 100);
        blockLogic('HEADER', ['name1', 'name2'], ['name1', 'name2'], 'INFO', coordinateX, coordinateY, 100);
    }
}


canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);
