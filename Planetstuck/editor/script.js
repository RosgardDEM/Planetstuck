var row, col, skin;

function setEditView() {

    var eye, face, head;

    function setSkinDiff() {
        head = $('#head input[type=range]').val();
        switch (skin) {
            case 0:
                $('#eye2').css({display: 'none'});
                $('#face2').css({display: 'none'});
                $('#eye').css({display: 'inline'});
                $('#face').css({display: 'inline'});
                eye = $('#eye input[type=range]').val();
                face = $('#face input[type=range]').val();
                eye = parseInt(eye); face = parseInt(face);
                break;
            case 1:
                $('#eye').css({display: 'none'});
                $('#face').css({display: 'none'});
                $('#eye2').css({display: 'inline'});
                $('#face2').css({display: 'inline'});
                eye = $('#eye2 input[type=range]').val();
                face = $('#face2 input[type=range]').val();
                eye = parseInt(eye); face = parseInt(face);
                eye += 24; face += 60; break;
        }
    }

    function check() {
        return col != undefined &&
               row != undefined &&
               skin != undefined;
    }

    function setPos(num, x, y) {
        var img = $($('#editview img')[num]);
        img.css({left: -x, top: -y});
    }

    if ((check())) {

        // Разблокировка ползунков
        $('main>h1').css('opacity', 1);
        var x, y; $('#col-3').css({opacity: 1});
        $('#editview').css({visibility: 'visible'});
        $('#col-3>:last-child').css({visibility: 'hidden'});

        // Установка ползунков для разных рас
        setSkinDiff();

        // Установка класса и аспекта
        x = col * 237;
        y = row * 204;
        setPos(0, x, y);

        // Установка расы
        switch (skin) {
            case 0: x = 2000; y = 1250; break;
            case 1: x = 2250; y = 1250; break;
        } setPos(1, x, y);

        // Установка причёски
        x = head % 12 * 250;
        y = (head / 12 | 0) * 250;
        if (x != 0) x -= 1;
        setPos(3, x, y);

        // Установка глаз
        x = eye % 12 * 150;
        y = (eye / 12 | 0) * 120;
        setPos(2, x , y);

        // Установка рта
        x = face % 12 * 100;
        y = (face / 12 | 0) * 50;
        setPos(4, x , y);

        // Запомнить значения
        sessionStorage.setItem('eye', eye);
        sessionStorage.setItem('face', face);
        sessionStorage.setItem('head', head);

    }

}

function setActive(list, targ) {
    list = $(list); targ = $(targ);
    list.removeClass('active');
    targ.addClass('active');
    for (i in list)
        if (list[i] == targ[0])
            return parseInt(i);
}
function setRange(cont) {
    var text = $(cont + ' input[type=text]');
    var range = $(cont + ' input[type=range]');
    var value = range.val(); text.val(value);
}
function setText(cont) {

    function onlyDigits(input) {
        var output = '';
        for (i in input)
            if (input[i].match(/[0-9]/i))
                output += input[i];
        return output;
    }

    var range = $(cont + ' input[type=range]');
    var text = $(cont + ' input[type=text]');
    var value = onlyDigits(text.val());
    if (value.length == 0) value = '0';
    if (value.length == 2 && value[0] == '0') value = value.slice(1);
    if (parseInt(value) > parseInt(range.prop('max'))) value = range.prop('max');
    text.val(value); range.val(value);

}

$(() => {

    var name = sessionStorage.getItem('name');
    if (name != null) $('#name').text(name);
    else window.location.href = '../start';

    $('#eye input[type=text]').on('input', () => { setText('#eye'); setEditView(); });
    $('#eye2 input[type=text]').on('input', () => { setText('#eye2'); setEditView(); });
    $('#head input[type=text]').on('input', () => { setText('#head'); setEditView(); });
    $('#face input[type=text]').on('input', () => { setText('#face'); setEditView(); });
    $('#face2 input[type=text]').on('input', () => { setText('#face2'); setEditView(); });
    
    $('#eye input[type=range]').on('input', () => { setRange('#eye'); setEditView(); });
    $('#eye2 input[type=range]').on('input', () => { setRange('#eye2'); setEditView(); });
    $('#head input[type=range]').on('input', () => { setRange('#head'); setEditView(); });
    $('#face input[type=range]').on('input', () => { setRange('#face'); setEditView(); });
    $('#face2 input[type=range]').on('input', () => { setRange('#face2'); setEditView(); });

    $('#skin .choose').click(event => { skin = setActive('#skin .choose', event.target); setEditView(); });
    $('#class .choose').click(event => { col = setActive('#class .choose', event.target); setEditView(); });
    $('#aspect .choose').click(event => { row = setActive('#aspect .choose', event.target); setEditView(); });

    $('main>h1').click(() => {
        if ($('main>h1').css('opacity') == 1) {
            sessionStorage.setItem('row', row);
            sessionStorage.setItem('col', col);
            sessionStorage.setItem('skin', skin);
            window.location.href = '../main';
        }
    });

});