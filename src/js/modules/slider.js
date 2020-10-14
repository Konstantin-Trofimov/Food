function slider({
    container,
    slide,
    nextArrow,
    prewArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
}) {

    //* Slider ************************************************************************

    //? Инициализация.

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        next = document.querySelector(nextArrow),
        prev = document.querySelector(prewArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper), //! Окно показа.
        slidesField = document.querySelector(field), //! Поле во всю ширину.
        width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1; //! Текущий номер слайда.
    let offset = 0; //! Значение показателя смещения слайда.

    //! Добавляем ноль в поле номера слайда и общего колличества слайдов,
    //! если номер или общее колличество мнеьше 10.

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    //! Конфигурация slidesField: 100% - общая шикрина всех слайдов.
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '.5s all';

    slidesWrapper.style.overflow = 'hidden'; //! Обрезаем зону видимости. 

    //! Устанавливаем ширину одинаковой для всех элеменотв.
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    //? Точки. 
    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    //? Событие клик на стрелки: 

    next.addEventListener('click', () => {

        //! Если показатель смешения == общей длине - 
        //! перематываем в начало.

        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            //! Иначе, изменяем показатель смешения, добавляя числовое значение
            //! равное ширине одного слайда. 

            offset += deleteNotDigits(width);
        }

        //! Передвигаем slidesField. 

        slidesField.style.transform = `translateX(-${offset}px)`;

        //! Изменяем текущий слайд, если индекс равет общему колл-ву, 
        //! возвращаем в начало. 

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        setSliderChanges();
    });

    //! Обратная операция.

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        setSliderChanges();
    });

    //? Событие клик на точки: 

    dots.forEach(dot => dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = offset = deleteNotDigits(width) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        setSliderChanges();
    }));

    //? Фн приобразует строковое значение ширины в число, обрезая px на конце. 

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    //? Фн изменяет визуальноке отображение состаяния переключения слайдов.

    function setSliderChanges() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }
}

export default slider;