function timer(id, deadLine, dateSelector) {
    //* Timer ************************************************************************

    //? Фн возвращает Object, содержащий данные об оставшемся времяни,
    //? сранивая deadLine с текущий датой.

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()), //! Разница в ms.
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);



        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    //? Фн возвращает строку добавляе 0 перед числом, если оно меньше 10.

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    //? Фн выводит таймер на страницу и обнавляет таймер куждую секунду. 

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval); //! Прекращаем обновлять таймер если разница ровна 0.
            }
        }

    }

    function setDate(deadLine) {
        const date = new Date(deadLine).getDate(),
            month = new Date(deadLine).getMonth(),
            months = {
                0: 'января',
                1: 'февряля',
                2: 'марта',
                3: 'априеля',
                4: 'мая',
                5: 'июня',
                6: 'июля',
                7: 'августа',
                8: 'сентября',
                9: 'октября',
                10: 'ноября',
                11: 'декабря'
            };

        console.log(month);
        document.querySelector(dateSelector).textContent = `${date} ${months[month]}`;
    }

    setDate(deadLine);

    setClock(id, deadLine);

}

export default timer;