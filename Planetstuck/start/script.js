var name, times = 0, message_p,
message_current = 0, messages = [
    'Приветствую, <NAME>. Меня зовут Док Скретч и я приветствую тебя в этой вселенной!',
    'Я проведу тебя по всем существующим здесь планетам и расскажу о их владельцах.',
    'Но для начала, тебе нужна физическая форма для путешествия по планетам.',
    'Так...', 'Как ты выглядишь?'
];

$(() => {

    nextEnabled(false);
    message_p = $('#message p');

    $('#name .next').click(() => {
        var input = $('#name input');
        name = input.val();
        if (name == '')
            if (++times == 3) name = 'СВИНОПАХ КАКАШКИН';
            else {
                input.animate({ marginLeft: '-10px' }, 150);
                input.delay(60).animate({ marginLeft: '20px' }, 150);
                input.delay(60).animate({ marginLeft: '0px' }, 150);
                return;
            }
        name = name.toUpperCase();
        for (let i = 0; i < messages.length; i++)
            messages[i] = messages[i].replace('<NAME>', name);
        $('#name').animate({ opacity: '0' }, 300, () => {
            $('body').animate({ backgroundPositionY: '-100vh' }, 1000);
            $('header').animate({ marginTop: '-100vh' }, 1000);
            $('main').animate({ top: '-100vh' }, 1000);
            setTimeout(printMessage, 1000);
        });
    });

    $('#message .next').click(() => {
        if ($('#message .next').css('opacity') == 1) printMessage();
    });

    $(this).on('keyup', event => {
        if (event.key == 'Enter')
            if ($('#name').css('opacity') == 1) $('#name .next').click(); else
            if ($('#message').css('opacity') == 1) $('#message .next').click();
    });

});

function printMessage() {
    if (message_current == messages.length)
        $('#message').animate({ opacity: '0' }, 300, () => {
            sessionStorage.setItem('name', name);
            window.location.href = '../editor';
        });
    else {
        nextEnabled(false);
        message_p.animate({ opacity: '0' }, 500, () => {
            $('#message p').text('');
            message_p.css({ opacity: '1' });
            (message => {
                for (let i = 0; i < message.length; i++)
                    setTimeout(() => message_p.append(message[i]), i * 50);
                setTimeout(() => nextEnabled(true), message.length * 50);
            })(messages[message_current++]);
        });
    }
}
function nextEnabled(status) {
    $('#message .next').css({ opacity: status ? '1' : '0.5' });
}